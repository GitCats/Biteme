var express = require('express');
var Deal = require('../models/deal.js');
var bodyParser = require('body-parser');
var http = require('https');
var Yelp = require('yelp');
var router = express.Router();
module.exports = router;

router.post('/yelp', function (req, res){
  var yelp = new Yelp({
    consumer_key: 'P5JOHbpFp2VWQdxfVxYgiA',
    consumer_secret: 'aOTQkNccr_r5IW02HQV60aE7gDs',
    token: 'XWIT44nqMQMkT9K4aS-IteSnIrpTctzh',
    token_secret: 'lIAtC5G8I3x2oJnaGQbxzaGzyNY',
  });

  console.log('data from yelp req to backend', req.body);
  yelp.search({ term: req.body.term, location: req.body.location })
  .then(function (data) {
    console.log('data from actual yelp api', data);
    res.status(200).send(data);
  })
  .catch(function (err) {
    console.error(err);
  });
})

//GET ALL DEALS
//this will grab all of the deals from the database
//which haven't yet expired and send them along with a 200 response
router.get('/getAll', function (req, res) {
	Deal.all()
		.then(function(result){
			res.status(200).send(result);
		})
})

//Delete a deal
router.post('/update', function(req, res){
  Deal.update(req.body)
    .then(function(result){
      res.status(200).send(result);
    })
})

//Filter deals by proximity to location
router.post('/filterByProximity', function(req, res) {

  var origins = req.body.startingPoint
  var formatOrigins = origins.replace(/\s/g, '+')
  var destinations = req.body.destinations;

  var options = {
    "method": "GET",
    "hostname": "maps.googleapis.com",
    "port": null,
    "path": "/maps/api/distancematrix/json?origins=" + formatOrigins + "&destinations=" + destinations + "&units=imperial&key=AIzaSyCsOnxdY0OYiuT4WOPL2LQIMBPfkJUveX8"
  };

  var request = http.request(options, function (response) {
    var chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
      var body = Buffer.concat(chunks);
    });

    response.on("end", function (body) {
      var body = Buffer.concat(chunks);
      sendData(body)
    });
  });
  request.end();

  var sendData = function(body) {
    res.send(body)
  }
})

router.post('/remove', function(req, res){
  Deal.remove(req.body)
    .then(function(data){
      console.log('is there data:', data);
      res.sendStatus(201);
    })
})
