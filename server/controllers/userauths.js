var express = require('express')
var Auth = require('../models/userauth.js');

var router = express.Router();
module.exports = router;

//SIGN IN (POST)
//when the user submits their username and password, this will check username against the database for a match.
//if it finds a match it will check the password, and if that matches it sends a 200 (okay) response
router.post('/', function (req, res) {
	console.log('body', req.body)
	Auth.signin(req.body).then(function (data) {
		console.log('data password', data.password)
		if(req.body.password === data[0].password){
		res.sendStatus(200)
		}
	})
})

//SIGN UP (POST)
//when a user inputs a new username, this will check against the database to see if it already exists
//if it doesn't then it will create it and save the password associated with it to the users database
//then send back 201 (created) response
router.post('/', function (req, res){
	
})