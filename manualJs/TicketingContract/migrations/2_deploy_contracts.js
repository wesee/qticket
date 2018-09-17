var SafeMath = artifacts.require("SafeMath");
var TicketingContract = artifacts.require("TicketingContract");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.deploy(TicketingContract);
};