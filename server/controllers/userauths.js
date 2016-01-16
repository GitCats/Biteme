var express = require('express')
var Auth = require('../models/userauth.js');

var router = express.Router();
module.exports = router;

router.post('/', function (req, res, next) {
	Auth.signin(req.body).then(function (data) {
		if(req.body.password === data[0].password){
		res.sendStatus(200);
		}
    else{
      res.status(400).send({reason: "Password incorrect"});
    }
	})
  .catch(function(err){
    res.status(400).send({reason: "User not found"});
  })
})
