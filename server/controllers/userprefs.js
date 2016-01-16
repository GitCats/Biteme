var express = require('express')
var UserPref = require('../models/userpref.js');

var router = express.Router();
module.exports = router;

//GET stored preferences from database
//and send them along with a 200 response
router.get('/', function (req, res) {
	UserPref.all()
		.then(function(result){
			res.send(result);
			res.sendStatus(200);
		})
})

//POST to update stored restaurant preferences (replaces previous data)
//sends 201 status
router.post('/', function(req, res){
	UserPref.updateRes()
		.then(function(result){
			res.send(result);
			res.sendStatus(201);
		})
})

//POST to update stored cuisine preferences (replaces previous data)
//sends 201 status
router.post('/', function(req, res){
	UserPref.updateCuis()
		.then(function(result){
			res.send(result);
			res.sendStatus(201);
		})
})
