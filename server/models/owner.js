var db = require('../db/index.js');
var bcrypt = require('bcrypt');

var Owner = module.exports

Owner.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

//selects and returns all deals for the specified restaurant
//only if they are not yet expired
Owner.allDeals = function(url) {
	var id = url.substr(url.lastIndexOf("/")+1);
	console.log('id: ', id)
	return db('deals')
  .orderBy('year', 'asc')
  .orderBy('month', 'asc')
  .orderBy('day', 'asc')
  .orderBy('expiration', 'asc')
	.join('restaurants', 'deals.restaurant_id', '=', 'restaurants.restaurant_id')
  .select('restaurants.name', 'restaurants.image_name', 'restaurants.cuisine_id', 'restaurants.address', 'restaurants.url', 'restaurants.res_description', 'restaurants.phone_number', 'deals.description', 'deals.expiration', 'deals.deal_id', 'deals.month', 'deals.day', 'deals.year')
   .where ('deals.restaurant_id', id)
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

Owner.getProfile = function(url){
	var id = url.substr(url.lastIndexOf("/")+1);
	return db('restaurants')
	.where('restaurant_id', id)
	.select('cuisine_id', 'image_name', 'description', 'url', 'address')
}

//**NEED TO CHECK FOR SIGN IN**
Owner.update = function(body){
	return db('restaurants')
	.where('restaurant_id', body.restaurant_id)
	.update('cuisine_id', body.cuisine_id)
	.update('image_name', body.image_name)
	.update('description', body.description)
	.update('url', body.url)
	.update('address', body.address)
  .then(function(){
    return db('restaurants').select('cuisine_id', 'image_name', 'name', 'description', 'url', 'address')
      .where('restaurant_id', body.restaurant_id)
    })
}

//body will be {"restaurant_id": 1, "cuisine_id": 7,
//"image_name": "http://sheehancan.com/bbq/wp-content/uploads/2015/05/421929_324378574277288_656785892_n.jpg",
//"description": "World Famous Barbecue", "url": "www.franklinbarbecue.com", "address": "900 East 11th Street, Austin, TX"}

