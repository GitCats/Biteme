var db = require('../db/index.js');

var singledealview = module.exports

//this function will check for the deal_id that matches the deal_id of the input
//and return more information about that specific deal
singledealview.view = function(){
	return db('deals')
	.where('deal_id')
	.select('description', 'restaurant_id', 'expiration')
};