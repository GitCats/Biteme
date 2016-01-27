var express = require('express')
var UserPref = require('../models/userpref.js');

var router = express.Router();
module.exports = router;

//Obtain stored preferences from database
//and send them along with a 200 response
router.post('/restaurants', function (req, res) {
	console.log("req body: ", req.body)
	UserPref.allRes(req.body.user_id)
		.then(function(result){
			res.status(200).send(result);
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
	var reqParsed = JSON.parse(req.body["a"]);
	console.log('this is parsed', reqParsed);
	UserPref.updateCuis(reqParsed)
		.then(function(result){
			res.status(201).json({});
		})
})
