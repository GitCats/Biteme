var express = require('express')
var Auth = require('../models/userauth.js');
var router = express.Router();

//SIGN IN (POST)
//when the user submits their username and password
//this will check username against the database for a match.
//if it finds a match it will check the password
//and if that matches it sends a 200 (okay) response
router.post('/signin', function (req, res) {
	Auth.signin(req.body)
	.then(function (data) {
		if(Auth.validPassword(req.body.password, data[0].password)){
			res.json(Auth.genToken(data[0].user_id)).status(200);
		} else {
     	res.status(400).send({reason: "Password incorrect"});
		}
	})
  .catch(function(err){
    res.status(400).send({reason: "User not found"});
  });
});

//SIGN UP (POST)
//when a user inputs a new username, this will check against the database
//to see if it already exists if it doesn't then it will create it and
//save the password associated with it to the users database
//then send back 201 (created) response
router.post('/signup', function (req, res){
	Auth.signup(req.body)
	.then(function(data){
		if(data.length > 0){
			res.status(401).send({message: 'Email already exists!'});
		} else{
			Auth.create(req.body)
			.then(function(data){
				res.json(Auth.genToken(req.body.email)).status(201)
			})
		}
	})
})


module.exports = router;
