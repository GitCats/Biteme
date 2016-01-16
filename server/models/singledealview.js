var db = require('../db/index.js');

var singledealview = module.exports

singledealview.view = function(){
	return db('deals')
	.where('deal_id')
	.select('description', 'restaurant_id', 'expiration')
};