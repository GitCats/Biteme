var db = require('../db/index.js');

var Deal = module.exports;

//this function grabs all the deals from the database
//it should also sort to remove expired deals before returning
Deal.all = function() {
  var dateArray = Date().split(' '); //grabs current date and time, splits into an array

  //This object's purpose is to convert Date()'s form of month, ex "Jan", to a number
  var months = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "Mar": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
  };

  var month = months[dateArray[1]];
  var day = Number(dateArray[2]);
  var year = Number(dateArray[3]);

  var time = dateArray[4];
  time = time.replace(/\:/g, ''); //removes the ':' from the current time
  time = time.slice(0, 4); //time is now in form 2300 (military)
  // time = Number(time);
  return db('deals')
  .orderBy('year', 'asc')
  .orderBy('month', 'asc')
  .orderBy('day', 'asc')
  .orderBy('expiration', 'asc')
  .join('restaurants', 'deals.restaurant_id', '=', 'restaurants.restaurant_id')
  .select('restaurants.name', 'restaurants.image_name', 'restaurants.cuisine_id', 'restaurants.address', 'restaurants.url', 'restaurants.res_description', 'restaurants.phone_number', 'deals.description', 'deals.expiration', 'deals.deal_id', 'deals.month', 'deals.day', 'deals.year')
};

Deal.update = function(body){
  return db('deals')
  .where('deal_id', body.deal_id)
  .update('expiration', body.expiration)
  .update('day', body.day)
  .update('year', body.year)
  .update('month', body.month)
  .then(function(){
    return db('deals').select('deal_id', 'expiration', 'day', 'month', 'year', 'month')
      .where('deal_id', body.deal_id)
    })
}

Deal.remove = function(body){
  return db('deals')
  .where('deal_id', body.deal_id).del()
}

