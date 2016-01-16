var db = require('../db/index.js');

var Owner = module.exports

Owner.all = function() {
	// return db('deals').select('*').limit(250)
  return db('deals')
    .join('restaurants', 'deals.restaurant_id', '=', 'restaurants.restaurant_id')
    .select('restaurants.name', 'restaurants.image_name', 'deals.description', 'deals.expiration', 'deals.deal_id')
};

Owner.create = function(attrs) {
	return db('deals').insert(attrs)
}
