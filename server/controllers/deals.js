var express = require('express')
var Deal = require('../models/deal.js');

var router = express.Router();
module.exports = router;

//GET ALL DEALS
//this will grab all of the deals from the database
//which haven't yet expired and send them along with a 200 response
router.get('/', function (req, res) {
	Deal.all()
		.then(function(result){
			res.status(200).send(result);
		})
})

//POST A NEW DEAL
//this will take user inputed information and use it to add a new deal to the database
router.post('/', function (req, res) {
	Deal.create(req.body).then(function () {
		res.sendStatus(201)
	})
})

