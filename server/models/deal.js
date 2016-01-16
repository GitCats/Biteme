var db = require('../db/index.js');

var Deal = module.exports

Deal.all = function() {
  var dateArray = Date().split(' ');
  var numberDate = Number(dateArray[2]); //not being used right now. could be used to only get deals from today
  var time = dateArray[4];
  time = time.replace(/\:/g, '');
  time = time.slice(0, 4);
  time = Number(time);
  return db('deals')
    .where('expiration', '>', time)
    .join('restaurants', 'deals.restaurant_id', '=', 'restaurants.restaurant_id')
    .select('restaurants.name', 'restaurants.image_name', 'deals.description', 'deals.expiration', 'deals.deal_id')
};

Deal.create = function(attrs) {
	return db('deals').insert(attrs)
}
