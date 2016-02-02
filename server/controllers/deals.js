var express = require('express');
var Deal = require('../models/deal.js');
var bodyParser = require('body-parser');
var http = require('https');

var router = express.Router();
module.exports = router;

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

router.post('/filterByProximity', function(req, res) {

  var origins = req.body.startingPoint
  var formatOrigins = origins.replace(/\s/g, '+')
  var destinations = req.body.destinations;

var options = {
  "method": "GET",
  "hostname": "maps.googleapis.com",
  "port": null,
  "path": "/maps/api/distancematrix/json?origins=" + formatOrigins + "&destinations=" + destinations + "&units=imperial&key=AIzaSyCsOnxdY0OYiuT4WOPL2LQIMBPfkJUveX8",
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
    var body = Buffer.concat(chunks);
  });

  res.on("end", function (body) {
    var body = Buffer.concat(chunks);
    sendData(body)
  });
 

});
req.end();

var sendData = function(body) {
  res.send(body)
}

})

