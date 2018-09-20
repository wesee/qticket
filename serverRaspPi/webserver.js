var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var arrtrue = [13, 19, 16]
var arrfalse = [14, 17, 10, 21, 12]
const { networks } = require('qtumjs-wallet')
const abi = require('ethjs-abi');
const bs58check = require('bs58check')
const contractAddress = "81cd71a1c8b8792e3f859a570d497b7be7b7c1e0";
const TicketingContractAbi = [{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"},{"name":"eventId","type":"uint256"}],"name":"verifyTicket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"events","outputs":[{"name":"date","type":"uint256"},{"name":"ticketAmount","type":"uint256"},{"name":"ticketPrice","type":"uint256"},{"name":"name","type":"string"},{"name":"isTicketTradable","type":"bool"},{"name":"isTicketCancelable","type":"bool"},{"name":"status","type":"uint8"},{"name":"lastCancelDate","type":"uint256"},{"name":"ticketsBought","type":"uint256"},{"name":"ticketsCanceled","type":"uint256"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventTicketsCanceled","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventTicketAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"eventId","type":"uint256"}],"name":"endEvent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"},{"name":"price","type":"uint256"}],"name":"resellTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"eventId","type":"uint256"}],"name":"cancelEvent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventEventStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tickets","outputs":[{"name":"eventId","type":"uint256"},{"name":"owner","type":"address"},{"name":"price","type":"uint256"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventLastCancelDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"date","type":"uint256"},{"name":"ticketAmount","type":"uint256"},{"name":"ticketPrice","type":"uint256"},{"name":"name","type":"string"},{"name":"isTicketTradable","type":"bool"},{"name":"isTicketCancelable","type":"bool"},{"name":"lastCancelDate","type":"uint256"}],"name":"createEvent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventTicketPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"buyTicketFromReseller","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"eventId","type":"uint256"}],"name":"buyTicket","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventIsTicketTradable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"eventCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"getTicketEventId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventIsTicketCancelable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"returnAfterEventCanceled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"getTicketOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventTicketsBought","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"mul","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"ticketCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"cancelTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"getTicketPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"getTicketStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"eventId","type":"uint256"}],"name":"getEventOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"backer","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"FundTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"eventId","type":"uint256"},{"indexed":false,"name":"date","type":"uint256"},{"indexed":false,"name":"ticketAmount","type":"uint256"},{"indexed":false,"name":"ticketPrice","type":"uint256"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"isTicketTradable","type":"bool"},{"indexed":false,"name":"isTicketCancelable","type":"bool"},{"indexed":false,"name":"lastCancelDate","type":"uint256"},{"indexed":false,"name":"owner","type":"address"}],"name":"EventCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"eventId","type":"uint256"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"owner","type":"address"}],"name":"EventCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"eventId","type":"uint256"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"owner","type":"address"}],"name":"EventEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ticketId","type":"uint256"},{"indexed":false,"name":"eventId","type":"uint256"},{"indexed":false,"name":"owner","type":"address"}],"name":"TicketBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"}],"name":"FailedToBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"backer","type":"address"}],"name":"FailedToTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ticketId","type":"uint256"},{"indexed":false,"name":"backer","type":"address"}],"name":"TicketCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ticketId","type":"uint256"},{"indexed":false,"name":"eventId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"}],"name":"ResellTicketListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ticketId","type":"uint256"},{"indexed":false,"name":"eventId","type":"uint256"}],"name":"TicketEventIdRequest","type":"event"}]



function fromhexaddress(hex) {
    return bs58check.encode(new Buffer(hex2uint8arr('78' + hex)))
}
function hex2uint8arr(hex) {
    return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16)
    }))
}
http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  socket.on('light', ({ res1, res2 }) => { //get light switch status from client
    const thisRaspberryPiEventId = 3;
    const wallet = networks.testnet.fromWIF(res1);
    const ticketId = res2
    const encodedData = abi.encodeMethod(TicketingContractAbi[23], [ticketId]).substr(2);
    wallet.contractCall(contractAddress, encodedData).then(exeres => {
      const output = exeres['executionResult']
      const help = output['output']
      const reswif = fromhexaddress(help.replace(/^0+/, ''))
      console.log(reswif);
      const encodedData2 = abi.encodeMethod(TicketingContractAbi[20], [ticketId]).substr(2);
      wallet.contractCall(contractAddress, encodedData2).then(exeres2 => {
        output = exeres['executionResult']
        help = output['output']
        const resid = parseInt(help, 16);
        console.log(resid);
        const checker = wallet.address;
        if (checker == reswif && resid == thisRaspberryPiEventId) {
          for (i = 0; i < arrtrue.length; i++) {
            var LED = new Gpio(arrtrue[i], 'out');
            LED.writeSync(1)
          }
        }
        else {
          for (i = 0; i < arrfalse.length; i++) {
            var LED = new Gpio(arrfalse[i], 'out')
            LED.writeSync(1)
          }
        }

        setTimeout(function () {
          for (i = 0; i < arrtrue.length; i++) {
            var LED = new Gpio(arrtrue[i], 'out');
            LED.writeSync(0)
          }
          for (i = 0; i < arrfalse.length; i++) {
            var LED = new Gpio(arrfalse[i], 'out');
            LED.writeSync(0)
          }
        }, 5000);
      })
    })

  });
});

process.on('SIGINT', function () { //on ctrl+c
  for (i = 0; i < arrtrue.length; i++) {
    var LED = new Gpio(arrtrue[i], 'out');
    LED.writeSync(0); // Turn LED off
    LED.unexport();
  }
  for (i = 0; i < arrfalse.length; i++) {
    var LED = new Gpio(arrfalse[i], 'out');
    LED.writeSync(0); // Turn LED off
    LED.unexport();
  }
  process.exit(); //exit completely
});