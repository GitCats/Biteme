var express = require('express')
var Auth = require('../models/userauth.js');

var router = express.Router();
module.exports = router;

router.post('/', function (req, res) {
	console.log('body', req.body)
	Auth.signin(req.body).then(function (data) {
		console.log('data password', data.password)
		if(req.body.password === data[0].password){
		res.sendStatus(201)
		}
	})
})
