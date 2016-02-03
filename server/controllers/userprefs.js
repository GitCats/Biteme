var express = require('express');
var UserPref = require('../models/userpref.js');
var jwt = require ('jwt-simple');
var router = express.Router();

//Obtain stored preferences from database
//and send them along with a 200 response
router.post('/restaurants', function (req, res) {
	UserPref.allRes(req.body.user_id)
		.then(function(result){
			res.status(200).send(result);
		})
})

router.post('/cuisines', function (req, res) {
	UserPref.allCuis(req.body.user_id)
		.then(function(result){
			res.send(result);
			res.status(200);
		})
})
//POST to update stored restaurant preferences
//(replaces previous data)
//sends 201 status
router.post('/updateRes', function(req, res){
	var reqParsed = JSON.parse(req.body["a"]);
	console.log('this is parsed', reqParsed);
	UserPref.updateRes(reqParsed)
		.then(function(result){
			res.status(201).json({});
		})
})

//POST to update stored cuisine preferences
//(replaces previous data)
//sends 201 status
router.post('/updateCuis', function(req, res){
	var reqParsed = JSON.parse(req.body["a"]);
	UserPref.updateCuis(reqParsed)
		.then(function(result){
			res.status(201).json({});
		})
})

router.get('/allRestaurants', function(req, res){
	var token = req.headers['x-access-token'];
  var decoded = jwt.decode(token, require('../config/secret')());
  //The 'exp' property of the decoded token comes from when it was encoded (see userauth.js).
  console.log("Token still valid:", decoded.exp >= Date.now());
  if (decoded.exp >= Date.now()) {
		UserPref.allRestaurants()
			.then(function(result){
				res.status(200).send(result);
			})
			.catch(function(err){
	    	res.status(400).send({"Error": err});
	  })
	} else {
		res.sendStatus(403);
	}
})

router.post('/phone', function(req, res){
	var reqParsed = JSON.parse(req.body["a"]);
	UserPref.phone(reqParsed)
	.then(function(){
		res.status(201).json({});
	})
})

router.post('/notifications', function(req, res){
	UserPref.notifications(req.body)
	.then(function(result){
		res.status(200).send(result);
	})
})

module.exports = router;
