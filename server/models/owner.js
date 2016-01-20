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
	return db('restaurants')
	.where('username', body.username)
	.select('password', 'restaurant_id')
}


//inserts a new deal into the database
Owner.create = function(body) {
	return db('deals')
	.insert({restaurant_id: body.restaurant_id, description: body.description, expiration: body.expiration, month: body.month, day: body.day, year: body.year})
}