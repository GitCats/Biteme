var express = require('express')
var Owner = require('../models/owner');

var router = express.Router();
module.exports = router;

//POST ALL PREVIOUS DEALS
//this will grab all of the deals from the database which
//haven't yet expired for this specific restaurant id
//and send them along with a 200 response
router.get('/*', function (req, res) {
	console.log('request body:', req.url)
	Owner.allDeals(req.url)
		.then(function(result){
			res.status(200).send(result);
		})
})

//POST OWNER LOG IN
//this will take the inputed username and password
//and compare the username to the database
//if found, it will compare the passwords and
//if they match it will send a 200 response
router.post('/login', function (req, res) {
	Owner.signin(req.body)
	.then(function (data) {
		if(req.body.password === data[0].password){
			res.status(200).send(data[0]);
		}
		else{
			res.status(400).send({reason: "Password incorrect"});
		}
	})
	.catch(function(err){
		res.status(400).send({reason: "User not found!"});
	})
})

//POST A NEW DEAL
//this will take user inputed information and use
//it to add a new deal to the database
router.post('/create', function (req, res) {
	Owner.create(req.body).then(function() {
		res.sendStatus(201);
	})
})

router.get('/getprofile/*', function(req, res){
	console.log('req url:', req.url);
	Owner.getProfile(req.url)
	.then(function (data){
		res.status(200).send(data);
	})
})


router.post('/updateProfile', function (req, res) {
	Owner.update(req.body).then(function(data) {
		res.status(200).send(data);
	})
})

// router.get('')
