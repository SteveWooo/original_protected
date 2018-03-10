const config = require('../../config');
const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("http://" + config.rpc.host + ":" + config.rpc.port));
let eth = web3.eth;

function error(res, model){
	res.send(JSON.stringify({
		code : model.code || 5000,
		message : model.message
	}))
}

function success(res, model){
	model.code = model.code || 2000;
	res.send(JSON.stringify(model));
}

/**
* 初始化操作包括解锁账号、实例化合约
*/
function init(){
	let contract = new eth.Contract(require('../../build/contracts/Main.json').abi, config.eth.contractAddress);
	eth.defaultAccount = config.eth.defaultAccount;
	eth.personal.unlockAccount(config.eth.defaultAccount, config.eth.defaultPassword);
	return {
		contract
	}
}

/**
* 需要eth
* 增加一个新的item专利操作
* @param item (string) 32位md5
* @param platforms (string) 逗号分隔以太坊钱包地址
*/
exports.addItem = async function(req, res){
	let model = init();
	let item = req.query.item;
	let platforms = req.query.platforms ? req.query.platforms.split(',') : [];
	//只允许32位md5进入
	if(item.length != 32){
		error(res, {
			code : 4010,
			message : "item必须为32位hex md5"
		});
		return ;
	}
	try{
		let result = await model.contract.methods.addItem(item, platforms).send({from : config.eth.defaultAccount});
		success(res, {
			blockNumber : result.blockNumber,
			gasUsed : result.gasUsed,
			message : "交易成功"
		})
	}catch(e){
		error(res, {
			message : e.message,
			code : 5050
		});
		//log
		return ;
	}
}

/*/
* 无需eth
* 提供item专利md5，获取这个专利所属的钱包主人
* @param item (string) 32位md5
*/
exports.getOwner = async function(req, res){
	let model = init();
	let item = req.query.item;
	if(item.length != 32){
		error(res, {
			code : 4010,
			message : "item必须为32位hex md5"
		});
		return ;
	}
	try{
		let result = await model.contract.methods.getItemOwner(item).call();
		success(res, {
			owner : result
		})
	}catch(e){
		error(res, {
			message : e.message,
			code : 5050
		});
		//log
		return ;
	}
}

/*/
* 无需eth
* 提供item专利md5，和平台地址，检查是否授权
* @param item (string) 32位md5
* @param platform (string) eth地址
*/
exports.checkAuth = async function(req, res){
	let model = init();
	let item = req.query.item;
	let platformAddr = req.query.platform;
	if(!platformAddr){
		error(res, {
			code : 4020,
			message : "必须传入platform"
		});
		return ;
	}
	if(item.length != 32){
		error(res, {
			code : 4010,
			message : "item必须为32位hex md5"
		});
		return ;
	}
	try{
		let result = await model.contract.methods.authPlatform(item, platformAddr).call();
		success(res, {
			auth : result
		})
	}catch(e){
		error(res, {
			message : e.message,
			code : 5050
		});
		//log
		return ;
	}
}
