var express = require('express')
var Deal = require('../models/deal.js');

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
      res.status(200).send(data);
    })
})