var db = require('../db/index.js');

var Deal = module.exports

//this function grabs all the deals from the database
//it should also sort to remove expired deals before returning
Deal.all = function() {
	// return db('deals').select('*').limit(250)
  return db('deals')
    .join('restaurants', 'deals.restaurant_id', '=', 'restaurants.restaurant_id')
    .select('restaurants.name', 'restaurants.image_name', 'deals.description', 'deals.expiration', 'deals.deal_id')
};

//this function will insert a new deal to the database
Deal.create = function(attrs) {
	return db('deals').insert(attrs)
}
