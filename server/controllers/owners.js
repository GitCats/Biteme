var express = require('express');
var Owner = require('../models/owner');
var client = require('twilio')('AC396bc879ace8d5ae25ce367daf1cb8bc', '93159cd050ac87c1a1b1e4dca3e9613d');
var mailer = require('nodemailer');
var jwt = require ('jwt-simple');
var router = express.Router();

//GET A RESTAURANT'S DEALS
//this will grab all of the deals from the database
//for this specific restaurant id
//and send them along with a 200 response
router.get('/getAllDeals/*', function (req, res) {
	var token = req.headers['x-access-token'];
  var decoded = jwt.decode(token, require('../config/secret')());
  //The 'exp' property of the decoded token comes from when it was encoded (see owner.js).
  console.log("Token still valid:", decoded.exp >= Date.now());
  if (decoded.exp >= Date.now()) {
		Owner.allDeals(req.url, token)
			.then(function(result){
				res.status(200).send(result);
			})
			.catch(function(err){
	    	res.status(400).send({"Error": err});
	  })
	} else {
		res.sendStatus(403);
	}
})

//POST OWNER LOG IN
//this will take the inputed username and password
//and compare the username to the database
//if found, it will compare the passwords and
//if they match it will send a 200 response
router.post('/login', function (req, res) {
	Owner.signin(req.body)
	.then(function (data) {
		if(Owner.validPassword(req.body.password, data[0].password)){
			res.json(Owner.genToken(data[0])).status(200);
		}
		else{
			res.status(400).send({reason: "Password incorrect"});
		}
	})
	.catch(function(err){
    res.status(400).send({reason: "User not found"});
  })
})

router.post('/signup', function (req, res){
 	Owner.signup(req.body)
 	.then(function(data){
 		if(data.length > 0){
 			res.status(401).send({message: 'Email already exists!'});
 		} else{
 			Owner.createUser(req.body)
 			.then(function(data){
 				res.json(Owner.genToken({email: req.body.email, restaurant_id: data[0].restaurant_id})).status(201)
 			})
 		}
 	})
 })

//POST A NEW DEAL
//this will take user inputed information and use
//it to add a new deal to the database
router.post('/create', function (req, res) {
	Owner.create(req.body).then(function() {
		Owner.matchRestaurants(req.body).then(function(data){
			//data that comes back is an array of objects with only one property, the user phone number
			data.forEach(function(val){
				var num = val.phone;
				var email = val.email;
				var restName = val.name;
				//Twilio
				if(val.phone_notify==='yes'){
					client.sendMessage({
						to: num, //user number
						from: '15125806884', //number twilio assigns us to send messages from
						body: restName + ' has made a new deal! Get on BluePlate and check it out'
					}, function(err, responseData) {if(err){console.log(err);}}
					);
				}

				//everything between here and res.sendStatus(201) deals with email
				if(val.email_notify==='yes'){
					var smtpTransport = mailer.createTransport("SMTP", {
					service: "Gmail",
					auth: {
						user: "blueplate.mks@gmail.com",
						pass: "makerzsquare"
						}
					});

					var mail = {
						from: "blueplate.mks@gmail.com",
						to: email,
						subject: "New Deal up on BluePlate!",
						// text: restName + "has created a new flash deal! Get on BluePlate and check it out!",
						html: "<h1>"+ restName+" has created a new flash deal. Get on BluePlate to check it out!</h1>"
					};

					smtpTransport.sendMail(mail, function(error, response){
						if(error){
							console.log('error', error);
						} else{
							console.log("Message sent: " + response.message);
						}
						smtpTransport.close();
					});
				}

			});
			res.sendStatus(201);
		});
	});
})

router.get('/getProfile/*', function(req, res){
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

module.exports = router;
