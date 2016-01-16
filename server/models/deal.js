var db = require('../db/index.js');

var Deal = module.exports

Deal.all = function() {
  var dateArray = Date().split(' ');
  var month;
  if(dateArray[1]==="Jan"){
    month = 1;
  }
  else if(dateArray[1]==="Feb"){
    month = 2;
  }
  var date = month.toString() + dateArray[2] + dateArray[3];
  date = Number(date);
  var time = dateArray[4];
  time = time.replace(/\:/g, '');
  time = time.slice(0, 4);
  time = Number(time);
  return db('deals')
    .where('expiration', '>', time)
    .andWhere('date', '=', date)
    .join('restaurants', 'deals.restaurant_id', '=', 'restaurants.restaurant_id')
    .select('restaurants.name', 'restaurants.image_name', 'deals.description', 'deals.expiration', 'deals.deal_id')
};

Deal.create = function(attrs) {
	return db('deals').insert(attrs)
}
