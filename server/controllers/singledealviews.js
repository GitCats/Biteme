var express = require('express')
var singledealview = require('../models/singledealview.js');

var router = express.Router();
module.exports = router;

router.get('/', function (req, res) {
	singledealview.view(req.body)
	.then(function (result) {
		res.sendStatus(result);
	})
})
