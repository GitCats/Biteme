var db = require('../db/index.js');

var Deal = module.exports

Deal.all = function() {
	// return db('deals').select('*').limit(250)
  return db('deals')
    .join('restaurants', 'deals.restaurant_id', '=', 'restaurants.restaurant_id')
    .select('restaurants.name', 'restaurants.image_name', 'deals.description', 'deals.expiration')
};

Deal.create = function(attrs) {
	return db('deals').insert(attrs)
}
