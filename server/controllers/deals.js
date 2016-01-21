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
