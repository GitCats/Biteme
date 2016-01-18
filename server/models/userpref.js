var db = require('../db/index.js');

var UserPref = module.exports

//this function grabs all the user prefs from the database
//it should return all columns and a boolean value if user selects or not
UserPref.allRes = function(user) {
  return db('res_prefs')
  	 .join('restaurants', 'res_prefs.restaurant_id', '=', 'restaurants.restaurant_id')
     .select('name')
     .where('user_id', user)
};

UserPref.allCuis = function(userId) {
  return db('cuisine_prefs')
  	 .join('cuisines', 'cuisine_prefs.cuisine_id', '=', 'cuisines.cuisine_id')
     .select('cuisine_type')
     .where('user_id', userId)
};

//this function will replace all of the values in the restaurant prefs table
UserPref.updateRes = function(attrs) {
  return db('res_prefs').insert({user_id: attrs.user_id, restaurant_id: attrs.restaurant_id})
}

//this function will replace all of the values in the cuisine prefs table
UserPref.updateCuis = function(attrs) {
}