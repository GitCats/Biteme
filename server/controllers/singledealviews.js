var express = require('express')
var singledealview = require('../models/singledealview.js');

var router = express.Router();
module.exports = router;

//POST
//this should take whichever deal is selected, and use the deal id to send back more information about that specific deal
router.get('/', function (req, res) {
	singledealview.view(req.body)
	.then(function (result) {
		res.sendStatus(result);
	})
})
