const { networks } = require('qtumjs-wallet')
const abi = require('ethjs-abi');
const contractAddress = "81cd71a1c8b8792e3f859a570d497b7be7b7c1e0";
const TicketingContractAbi = [{ "constant": false, "inputs": [{ "name": "ticketId", "type": "uint256" }, { "name": "eventId", "type": "uint256" }], "name": "verifyTicket", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "events", "outputs": [{ "name": "date", "type": "uint256" }, { "name": "ticketAmount", "type": "uint256" }, { "name": "ticketPrice", "type": "uint256" }, { "name": "name", "type": "string" }, { "name": "isTicketTradable", "type": "bool" }, { "name": "isTicketCancelable", "type": "bool" }, { "name": "status", "type": "uint8" }, { "name": "lastCancelDate", "type": "uint256" }, { "name": "ticketsBought", "type": "uint256" }, { "name": "ticketsCanceled", "type": "uint256" }, { "name": "owner", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventTicketsCanceled", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventTicketAmount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balances", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventDate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "endEvent", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "ticketId", "type": "uint256" }, { "name": "price", "type": "uint256" }], "name": "resellTicket", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "cancelEvent", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventName", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventEventStatus", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "tickets", "outputs": [{ "name": "eventId", "type": "uint256" }, { "name": "owner", "type": "address" }, { "name": "price", "type": "uint256" }, { "name": "status", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventLastCancelDate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "date", "type": "uint256" }, { "name": "ticketAmount", "type": "uint256" }, { "name": "ticketPrice", "type": "uint256" }, { "name": "name", "type": "string" }, { "name": "isTicketTradable", "type": "bool" }, { "name": "isTicketCancelable", "type": "bool" }, { "name": "lastCancelDate", "type": "uint256" }], "name": "createEvent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventTicketPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ticketId", "type": "uint256" }], "name": "buyTicketFromReseller", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "buyTicket", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventIsTicketTradable", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "eventCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ticketId", "type": "uint256" }], "name": "getTicketEventId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventIsTicketCancelable", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ticketId", "type": "uint256" }], "name": "returnAfterEventCanceled", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "ticketId", "type": "uint256" }], "name": "getTicketOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventTicketsBought", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "mul", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [], "name": "ticketCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ticketId", "type": "uint256" }], "name": "cancelTicket", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "ticketId", "type": "uint256" }], "name": "getTicketPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ticketId", "type": "uint256" }], "name": "getTicketStatus", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "safeWithdrawal", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "eventId", "type": "uint256" }], "name": "getEventOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "backer", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "FundTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "eventId", "type": "uint256" }, { "indexed": false, "name": "date", "type": "uint256" }, { "indexed": false, "name": "ticketAmount", "type": "uint256" }, { "indexed": false, "name": "ticketPrice", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "isTicketTradable", "type": "bool" }, { "indexed": false, "name": "isTicketCancelable", "type": "bool" }, { "indexed": false, "name": "lastCancelDate", "type": "uint256" }, { "indexed": false, "name": "owner", "type": "address" }], "name": "EventCreation", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "eventId", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "owner", "type": "address" }], "name": "EventCanceled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "eventId", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "owner", "type": "address" }], "name": "EventEnded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "ticketId", "type": "uint256" }, { "indexed": false, "name": "eventId", "type": "uint256" }, { "indexed": false, "name": "owner", "type": "address" }], "name": "TicketBought", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "buyer", "type": "address" }], "name": "FailedToBuy", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "backer", "type": "address" }], "name": "FailedToTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "ticketId", "type": "uint256" }, { "indexed": false, "name": "backer", "type": "address" }], "name": "TicketCanceled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "ticketId", "type": "uint256" }, { "indexed": false, "name": "eventId", "type": "uint256" }, { "indexed": false, "name": "price", "type": "uint256" }], "name": "ResellTicketListed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "ticketId", "type": "uint256" }, { "indexed": false, "name": "eventId", "type": "uint256" }], "name": "TicketEventIdRequest", "type": "event" }];


module.exports = {
    GetBalance: (callback, wif) => {
        const wallet = networks.testnet.fromWIF(wif);
        wallet.getInfo().then(
            balance => callback(null, balance["balance"]))
    },
    CreateEvent: (callback, date, ticketAmount, ticketPrice, name, isTicketTradable, isTicketCancelable, lastCancelDate, wif) => {
        const wallet = networks.testnet.fromWIF(wif);
        const gas = {
             fee: 0.01,
             gasPrice: 40,
             gasLimit: 500000
        }
        const encodedData = abi.encodeMethod(TicketingContractAbi[13], [date, ticketAmount, ticketPrice, name, 
            isTicketTradable, isTicketCancelable, lastCancelDate]).substr(2);
        const { gasLimit } = gas;
        wallet.contractSend(contractAddress, encodedData, { gasLimit }).then(
                 res => callback(null, res['txid']))
    },
    BuyTicket: (callback, eventId, ticketPrice, wif) => {
        const wallet = networks.testnet.fromWIF(wif);
        const gas = {
            fee: 0.01,
            gasPrice: 40,
            gasLimit: 500000
        }
        const encodedData = abi.encodeMethod(TicketingContractAbi[16], [eventId]).substr(2);
        const { gasLimit } = gas;
        wallet.contractSend(contractAddress, encodedData, { gasLimit, amount: ticketPrice }).then(
            res => callback(null, res['txid']))
    },
    ResellTicket: (callback, ticketId, ticketPrice, wif) => {
        const wallet = networks.testnet.fromWIF(wif);
        const gas = {
            fee: 0.01,
            gasPrice: 40,
            gasLimit: 500000
        }
        const encodedData = abi.encodeMethod(TicketingContractAbi[7], [ticketId, ticketPrice]).substr(2);
        const { gasLimit } = gas;
        wallet.contractSend(contractAddress, encodedData, { gasLimit }).then(
            res => callback(null, res['txid']))
    },
    GetEventCount: (callback) => {
        const wallet = networks.testnet.fromWIF('cNzxsXywamCmFtQAGgGzsWzoktFMT8eTdUp9DYurbT69Cjy7M4ZV');
        const encodedData = abi.encodeMethod(TicketingContractAbi[19], []).substr(2);
        wallet.contractCall(contractAddress, encodedData).then(
            res => {
                const output = res['executionResult']
                const help = output['output']
                const final = parseInt(help, 16)
                callback(null, final)
            }
        )
    },
    GetTicketCount: (callback) => {
        const wallet = networks.testnet.fromWIF('cNzxsXywamCmFtQAGgGzsWzoktFMT8eTdUp9DYurbT69Cjy7M4ZV');
        const encodedData = abi.encodeMethod(TicketingContractAbi[26], []).substr(2);
        wallet.contractCall(contractAddress, encodedData).then(
            res => {
                const output = res['executionResult']
                const help = output['output']
                const final = parseInt(help, 16)
                callback(null, final)
            }
        )
    },
    GetTicketPrice: (callback, eventId) => {
        const wallet = networks.testnet.fromWIF('cNzxsXywamCmFtQAGgGzsWzoktFMT8eTdUp9DYurbT69Cjy7M4ZV');
        const encodedData = abi.encodeMethod(TicketingContractAbi[14], [eventId]).substr(2);
        wallet.contractCall(contractAddress, encodedData).then(
            res => {
                const output = res['executionResult']
                const help = output['output']
                const final = parseInt(help, 16)
                callback(null, final)
            }
        )
    },
    GetAddress: (callback, wif) => {
        const wallet = networks.testnet.fromWIF(wif)
        callback(null, wallet.address)
    }
}