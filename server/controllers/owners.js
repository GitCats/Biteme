var express = require('express')
var Owner = require('../models/owner');

var router = express.Router();
module.exports = router;

//GET A RESTAURANTS DEALS
//this will grab all of the deals from the database
//for this specific restaurant id
//and send them along with a 200 response
router.get('/getAllDeals/*', function (req, res) {
	console.log('request body:', req.url)
	Owner.allDeals(req.url)
		.then(function(result){
			res.status(200).send(result);
		})
})

//SIGN UP (POST)
//when owner inputs a new username, this will check against the database 
//to see if it already exists if it doesn't then it will create it and 
//save the password associated with it (after hashing) to the restaurants database
//then send back 201 (created) response
router.post('/signup', function (req, res){
	Owner.signup(req.body)
	.then(function(data){
		if(data.length > 0){
			res.status(401).send({message: 'Email already exists!'});
		} else{
			Owner.create(req.body)
			.then(function(data){
				res.json(Owner.genToken(req.body.username)).status(201)
			})
		}
	})
})

//POST OWNER LOG IN
//this will take the inputed username and password
//and compare the username to the database
//if found, it will compare the passwords and
//if they match it will send a 200 response
router.post('/login', function (req, res) {
	Owner.signin(req.body)
	.then(function (data) {
		if(Owner.validPassword(req.body.password, data[0].password)){
			res.json(Owner.genToken(data[0])).status(200);
		}
		else{
			res.status(400).send({reason: "Password incorrect"});
		}
	})
	.catch(function(err){
    res.status(400).send({reason: "User not found"});
  })
})

router.post('/updatePassword', function(req, res){
	Owner.updatePassword(req.body)
	.then(function(data) {
		res.sendStatus(201).send(data);
	})
})

//POST A NEW DEAL
//this will take user inputed information and use
//it to add a new deal to the database
router.post('/create', function (req, res) {
	Owner.create(req.body).then(function() {
		res.sendStatus(201);
	})
})

router.get('/getProfile/*', function(req, res){
	console.log('req url:', req.url);
	Owner.getProfile(req.url)
	.then(function (data){
		res.status(200).send(data);
	})
})


router.post('/updateProfile', function (req, res) {
	Owner.update(req.body).then(function(data) {
		res.status(200).send(data);
	})
})

router.get('/logout', function(req,res) {
	Owner.logout()
	.then(function(){
		res.sendStatus(200);
	})
})

// router.get('')
