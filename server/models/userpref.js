var db = require('../db/index.js');

var UserPref = module.exports

//this function grabs all the user prefs from the database
//it should return all columns and a boolean value if user selects or not
UserPref.all = function() {
var userId = req.body.user_id;
  return db('res_prefs', 'cuisine_prefs')
  	.join('res_prefs.restaurant_id', '.restaurant_id', '=', 'restaurants.restaurant_id')
    .select('res_prefs.restaurant_id', 'restaurants.image_name', 'deals.description', 'deals.expiration', 'deals.deal_id')
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


// DROP TABLE IF EXISTS res_prefs;
		
// CREATE TABLE res_prefs (
//   id SERIAL,
//   user_id INTEGER,
//   restaurant_id INTEGER,
//   PRIMARY KEY (id)
// );

// -- ---
// -- Table 'cuisine_prefs'
// -- 
// -- ---

// DROP TABLE IF EXISTS cuisine_prefs;
		
// CREATE TABLE cuisine_prefs (
//   id SERIAL,
//   user_id INTEGER,
//   cuisine_id INTEGER,
//   PRIMARY KEY (id)
// );