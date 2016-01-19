var db = require('../db/index.js');

var singledealview = module.exports

//this function will check for the deal_id that matches the deal_id of the input
//and return more information about that specific deal
singledealview.view = function(deal){
	return db('deals')
	.select('restaurant_id', 'description', 'expiration')
	.where('deal_id', deal)
};