pragma solidity ^0.4.21;

contract TicketingContract {
    uint256 constant MAX_EVENT_COUNT = 1000000;
    enum EventStatus {Pre, Canceled}
    enum TicketStatus {Normal, ForSale}
    uint256 public eventCount;
    uint256 public ticketCount;
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => Event) public events;
    mapping(address => uint256) public balances;

    event FundTransfer(address backer, uint amount);
    event EventCreation(
        uint256 eventId,
        uint256 date,
        uint ticketAmount,
        uint ticketPrice,
        string name,
        bool isTicketTradable,
        bool isTicketCancelable,
        uint256 lastCancelDate,
        address owner
    );
    event EventCanceled(uint256 eventId, string name, address owner);
    event EventEnded(uint256 eventId, string name, address owner);
    event TicketBought(uint256 ticketId, uint256 eventId, address owner);
    event FailedToBuy(address buyer);
    event FailedToTransfer(address backer);
    event TicketCanceled(uint256 ticketId, address backer);
    event ResellTicketListed(uint256 ticketId, uint256 eventId, uint price);
    event TicketEventIdRequest(uint256 ticketId, uint256 eventId);
    

    struct Ticket {
        uint256 eventId;
        address owner;
        uint price;
        TicketStatus status;
    }

    struct Event {
        uint256 date;
        uint ticketAmount;
        uint ticketPrice;
        string name;
        bool isTicketTradable;
        bool isTicketCancelable;
        EventStatus status;
        uint256 lastCancelDate;
        uint ticketsBought;
        uint ticketsCanceled;
        address owner;
    }

    constructor() public
    {
        ticketCount = 1000000;
    }

    function createEvent(
        uint256 date,
        uint ticketAmount,
        uint ticketPrice,
        string name,
        bool isTicketTradable,
        bool isTicketCancelable,
        uint256 lastCancelDate
    ) public returns (uint256) {
        require(
            date > now + 30 minutes, 
            "unacceptable date");
        require(
            !isTicketCancelable ||
            lastCancelDate < date,
            "unacceptable cancel date");
        require(
            eventCount < MAX_EVENT_COUNT, 
            "event IDs ended");

        eventCount++;
        events[eventCount] = Event(
            date,
            ticketAmount,
            ticketPrice,
            name,
            isTicketTradable,
            isTicketCancelable,
            EventStatus.Pre,
            lastCancelDate,
            0,
            0,
            msg.sender);
        emit EventCreation(
            eventCount,
            date,
            ticketAmount,
            ticketPrice,
            name,
            isTicketTradable,
            isTicketCancelable,
            lastCancelDate,
            msg.sender);
        return eventCount;
    }

    function cancelEvent(uint256 eventId) public returns (bool) {
        require(
            events[eventId].status == EventStatus.Pre, 
            "wrong status");
        require(
            events[eventId].owner == msg.sender, 
            "not owner");
        require(
            events[eventId].date > now + 5 hours, 
            "wrong date");

        events[eventId].status = EventStatus.Canceled;
        emit EventCanceled(
            eventId,
            events[eventId].name,
            events[eventId].owner);
        return true;
    }

    function endEvent(uint256 eventId) public returns(bool) {
        require(
            events[eventId].status == EventStatus.Pre, 
            "wrong status");
        require(
            events[eventId].owner == msg.sender, 
            "not owner");
        require(
            events[eventId].date + 1 days < now, 
            "wrong date");

        uint256 ticketsSold = (events[eventId].ticketsBought -
            events[eventId].ticketsCanceled);
        balances[events[eventId].owner] += mul(
            ticketsSold,
            events[eventId].ticketPrice);
        safeWithdrawal();
        emit EventEnded(
            eventId,
            events[eventId].name,
            events[eventId].owner);
        delete events[eventId];
        return true;
    }

    function buyTicket(uint256 eventId) public payable returns (uint256) {
        require(
            events[eventId].ticketPrice == msg.value,
            "not enough payed");
        require(
            events[eventId].status == EventStatus.Pre, 
            "wrong status");
        require(
            events[eventId].date > now + 5 minutes,
            "wrong date");
        require(
            events[eventId].ticketsBought < events[eventId].ticketAmount,
            "tickets ended");
        
        ticketCount++;
        events[eventId].ticketsBought++;
        tickets[ticketCount] = Ticket(
            eventId,
            msg.sender,
            events[eventId].ticketPrice,
            TicketStatus.Normal);
        emit TicketBought(eventId, ticketCount, msg.sender);
        return ticketCount;
    }

    function safeWithdrawal() public {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        if (amount > 0) {
            if (msg.sender.send(amount)) {
                emit FundTransfer(msg.sender, amount);
            } else {
                balances[msg.sender] = amount;
                emit FailedToTransfer(msg.sender);
            }
        }
    }

    function cancelTicket(uint256 ticketId) public returns (bool) {
        uint256 eventId = tickets[ticketId].eventId;
        require(
            tickets[ticketId].owner == msg.sender,
            "not owner");
        require(
            events[eventId].isTicketCancelable,
            "not cancelable");
        require(
            events[eventId].lastCancelDate > now,
            "out of cancel date");

        balances[msg.sender] += events[eventId].ticketPrice;
        events[eventId].ticketsCanceled++;
        emit TicketCanceled(ticketId, msg.sender);
        delete tickets[ticketId];
        return true;
    }

    function returnAfterEventCanceled(uint256 ticketId) public returns (bool) {
        uint256 eventId = tickets[ticketId].eventId;
        require(
            tickets[ticketId].owner == msg.sender,
            "not owner");
        require(
            events[eventId].status == EventStatus.Canceled,
            "event is not canceled");

        balances[msg.sender] += events[eventId].ticketPrice;
        delete tickets[ticketId];
        events[eventId].ticketsBought--;
        emit TicketCanceled(ticketId, msg.sender);
        if (events[eventId].ticketsBought == 0)
            delete events[eventId];
        return true;
    }

    function resellTicket(uint256 ticketId, uint price) public returns (bool) {
        uint256 eventId = tickets[ticketId].eventId;
        require(
            tickets[ticketId].owner == msg.sender,
            "not owner");
        require(
            events[eventId].status == EventStatus.Pre,
            "wrong status");
        require(
            events[eventId].isTicketTradable,
            "not tradable");

        tickets[ticketId].price = price;
        tickets[ticketId].status = TicketStatus.ForSale;
        emit ResellTicketListed(ticketId, eventId, price);
        return true;
    }

    function buyTicketFromReseller(uint256 ticketId)
        public payable returns (bool) {
        uint256 eventId = tickets[ticketId].eventId;
        require(
            tickets[ticketId].status == TicketStatus.ForSale,
            "wrong ticket status");
        require(
            events[eventId].status == EventStatus.Pre,
            "wrong event status");
        require(
            msg.value > tickets[ticketId].price,
            "not enough payed");

        balances[tickets[ticketId].owner] += tickets[ticketId].price;
        balances[msg.sender] += msg.value - tickets[ticketId].price;
        tickets[ticketId].status = TicketStatus.Normal;
        tickets[ticketId].owner = msg.sender;
        emit TicketBought(eventId, ticketId, msg.sender);
        return true;
    }

    function verifyTicket(uint256 ticketId, uint256 eventId) public returns(uint) {
        if (msg.sender != tickets[ticketId].owner) {
            return 0;
        }
        if (tickets[ticketId].eventId != eventId) {
            return 0;
        }
        return 1;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function getEventDate(uint256 eventId) public view returns (uint256) {
        return events[eventId].date;
    }

    function getEventTicketAmount(uint256 eventId) public view returns (uint) {
        return events[eventId].ticketAmount;
    }

    function getEventTicketPrice(uint256 eventId) public view returns (uint) {
        return events[eventId].ticketPrice;
    }

    function getEventName(uint256 eventId) public view returns (string) {
        return events[eventId].name;
    }

    function getEventIsTicketTradable(uint256 eventId) public view returns (bool) {
        return events[eventId].isTicketTradable;
    }

    function getEventIsTicketCancelable(uint256 eventId) public view returns (bool) {
        return events[eventId].isTicketCancelable;
    }

    function getEventEventStatus(uint256 eventId) public view returns (EventStatus) {
        return events[eventId].status;
    }

    function getEventLastCancelDate(uint256 eventId) public view returns (uint256) {
        return events[eventId].lastCancelDate;
    }

    function getEventTicketsBought(uint256 eventId) public view returns (uint) {
        return events[eventId].ticketsBought;
    }

    function getEventTicketsCanceled(uint256 eventId) public view returns (uint) {
        return events[eventId].ticketsCanceled;
    }

    function getEventOwner(uint256 eventId) public view returns (address) {
        return events[eventId].owner;
    }

    function getTicketEventId(uint256 ticketId) public returns (uint256) {
        emit TicketEventIdRequest(ticketId, tickets[ticketId].eventId);
        return tickets[ticketId].eventId;
    }

    function getTicketOwner(uint256 ticketId) public view returns (address) {
        return tickets[ticketId].owner;
    }

    function getTicketPrice(uint256 ticketId) public view returns (uint) {
        return tickets[ticketId].price;
    }

    function getTicketStatus(uint256 ticketId) public view returns (TicketStatus) {
        return tickets[ticketId].status;
    }

    function mul(uint256 a, uint256 b) public pure returns (uint256) {
        uint256 c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }
}