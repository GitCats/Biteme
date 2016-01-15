var express = require('express')
var Auth = require('../models/auth');

var router = express.Router();
module.exports = router;

router.post('/login', function (req, res) {
	Login.(req.body).then(function () {
		res.sendStatus(201)
	})
})