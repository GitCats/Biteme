var express = require('express')
var Deal = require('../models/deal.js');

var router = express.Router();
module.exports = router;

router.get('/', function (req, res) {
	Deal.all()
		.then(function(result){
			console.log('it ran');
			res.send(result);
		})
})

router.post('/', function (req, res) {
	Deal.create(req.body).then(function () {
		res.sendStatus(201)
	})
})