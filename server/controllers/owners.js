var express = require('express')
var Owner = require('../models/owner');

var router = express.Router();
module.exports = router;

//POST ALL PREVIOUS DEALS
//this will grab all of the deals from the database which 
//haven't yet expired for this specific restaurant id
//and send them along with a 200 response
router.post('/', function (req, res) {
	Owner.prevDeals(req.body.restaurant_id)
		.then(function(result){
			res.send(result);
			res.sendStatus(200);
		})
})

//POST OWNER LOG IN
//this will take the inputed username and password 
//and compare the username to the database
//if found, it will compare the passwords and 
//if they match it will send a 200 response
router.post('/', function (req, res) {
	Owner.signin(req.body)
	.then(function () {
	if(req.body.password === password){
	res.sendStatus(201)
}
	})
})

//POST A NEW DEAL
//this will take user inputed information and use 
//it to add a new deal to the database
router.post('/', function (req, res) {
	Owner.create(req.body).then(function () {
		res.sendStatus(201)
	})
})