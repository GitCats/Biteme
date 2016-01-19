var express = require('express')
var singledealview = require('../models/singledealview.js');

var router = express.Router();
module.exports = router;

//POST
//this should take whichever deal is selected and use the deal id 
//to send back more information about that specific deal
router.post('/', function (req, res) {
	console.log("deal ID:", req.body.deal_id);
	singledealview.view(req.body.deal_id)
	.then(function (result) {
		res.send(result);
		res.status(200);
	})
})
