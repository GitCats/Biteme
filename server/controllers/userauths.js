var express = require('express')
var Auth = require('../models/userauth');

var router = express.Router();
module.exports = router;

router.post('/login', function (req, res) {
	Auth.signin(req.body).then(function (data) {
		if(req.body.password === data.password){
		res.sendStatus(201)
	})
})

	.then(function (data) {
		if(attemptedPassword === data.password){
			res.status(200);
		}
	}