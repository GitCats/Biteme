var db = require('../db/index.js');

var Owner = module.exports

//selects and returns all deals for the specified restaurant
//only if they are not yet expired
Owner.prevDeals = function(restaurantId) {
  return db('deals')
    .join('restaurants', 'deals.restaurant_id', '=', 'restaurants.restaurant_id')
    .select('restaurants.name', 'restaurants.image_name', 'deals.description', 'deals.expiration', 'deals.deal_id')
    .where ('deals.restaurant_id', restaurantId)
};

//this will check to see if the username is in the restaurant table
//if it isn't it will return an error
//if it is, it will check password for a match
//if they both match it will send a 200 (okay) response
Owner.signin = function(body){
	var attemptName = body.username;
	var attemptPass = body.password;
	return db('restaurants')
	.select('password')
	.where('username' === body.username)
}


//inserts a new deal into the database
Owner.create = function(attrs) {
	return db('deals').insert(attrs)
}
