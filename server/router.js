const express = require('express');
const config = require('../config.json');
let app = express();
const transfer = require('./middleware/transfer');

exports.init = ()=>{
	app.get('/add_item', transfer.addItem);
	app.get('/get_owner', transfer.getOwner);
	app.get('/check_auth', transfer.checkAuth);

	app.listen(config.web.port, ()=>{
		console.log("web server listened at : " + config.web.port);
	});
}