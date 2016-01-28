var express = require('express')
var UserPref = require('../models/userpref.js');

var router = express.Router();
module.exports = router;

//POST stored preferences from database
//and send them along with a 200 response
router.post('/restaurants', function (req, res) {
	console.log("req body: ", req.body)
	UserPref.allRes(req.body.user_id)
		.then(function(result){
			res.send(result);
			res.status(200);
		})
})

router.post('/cuisines', function (req, res) {
	console.log("req body: ", req.body)
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
	UserPref.updateRes(req.body)
		.then(function(result){
			res.sendStatus(201);
		})
})

//POST to update stored cuisine preferences 
//(replaces previous data)
//sends 201 status
router.post('/updateCuis', function(req, res){
	UserPref.updateCuis(req.body)
		.then(function(result){
			res.sendStatus(201);
		})
})

router.post('/phone', function(req, res){
	UserPref.phone(req.body)
	.then(function(){
		res.sendStatus(201);
	})
})