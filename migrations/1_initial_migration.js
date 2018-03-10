var Migrations = artifacts.require("./Migrations.sol");
const config = require('../config');
const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("http://" + config.rpc.host + ":" + config.rpc.port));
let eth = web3.eth;

module.exports = async function(deployer) {
	eth.personal.unlockAccount(config.eth.defaultAccount, config.eth.defaultPassword);
	deployer.deploy(Migrations);
};
