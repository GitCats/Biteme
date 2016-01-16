var db = require('../db/index.js');

var UserPref = module.exports

//this function grabs all the user prefs from the database
//it should return all columns and a boolean value if user selects or not
UserPref.allRes = function() {
var userId = req.body.user_id;
  return db('res_prefs')
  	.join('restaurants', 'res_prefs.restaurant_id', '=', 'restaurants.restaurant_id')
     .join('users', 'res_prefs.user_id', '=', 'users.user_id')
    	.select('restaurant.name')
    	.where('user_id', userId)
};

UserPref.allCuis = function() {
var userId = req.body.user_id;
  return db('cuisine_prefs')
  	.join('cuisines', 'cuisine_prefs.cuisine_id', '=', 'cuisines.cuisine_id')
     .join('users', 'cuisine_prefs.user_id', '=', 'users.user_id')
    	.select('cuisine_type')
    	.where('user_id', userId)
};

//this function will replace all of the values in the restaurant prefs table
UserPref.updateRes = function(attrs) {
	return db('deals').insert(attrs)
}

//this function will replace all of the values in the cuisine prefs table
UserPref.updateCuis = function(attrs) {
	return db('deals').insert(attrs)
}