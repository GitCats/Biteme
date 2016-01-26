var express = require('express')
var Deal = require('../models/deal.js');
var bodyParser = require('body-parser');
var http = require('http')

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
router.post('/delete', function(req, res){
  Deal.remove(req.body.deal_id)
    .then(function(result){
      if(result === 1){
        res.status(200).send('Deleted')
      }
      else{
        res.status(400).send('There was an error. Nothing could be deleted')
      }
    })
})

router.post('/filterByProximity', function(req, res) {
  console.log('req', req.body.startingPoint)
  var startingPoint = '6102+NW+24th+Lane+Gainesville+FL+32606'; 
  // console.log(startingPoint)
  var destination = '701+Brazos+Street+Austin+TX+78701';
  // var startingPoint = req.body.startingPoint
  // var formatStartingPoint = startingPoint.replace(/\s/g, '+')
  // console.log('formatted', formatStartingPoint)
  // Deal.filterByProximity(startingPoint)
  var options = {
  "method": "GET",
  "hostname": "maps.googleapis.com",
  "port": null,
  "path": "/maps/api/distancematrix/json?origins=" + startingPoint + "&destinations=" + destination + "&key=AIzaSyCsOnxdY0OYiuT4WOPL2LQIMBPfkJUveX8",
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    console.log('chunky')
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log('body', body.toString());
  });

req.end();
  })


})



