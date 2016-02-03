var db = require('../db/index.js');

var UserPref = module.exports;

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
UserPref.updateRes = function(obj) {
	var ids = obj.restaurant_id;
	console.log('ids:', ids)
	var add = [];
	var del = [];
	for(var k in ids) {
		if(ids[k] === 1){
			console.log("ids[k]:", ids[k])
			add.push({user_id: obj.user_id, restaurant_id: Number(k)});
		} else {
			del.push(Number(k))
  		}
	}
	console.log("add", add);
	console.log("del", del);
	return db('res_prefs').insert(add)
		.then(function() {
			return db('res_prefs').whereIn('restaurant_id', del).andWhere('user_id', obj.user_id).del()
		})
}

//this function will replace all of the values in the cuisine prefs table
UserPref.updateCuis = function(obj) {
	var ids = obj["cuisine_id"];
	var add = [];
	var del = [];
	for(var k in ids) {
		if(ids[k] === 1){
			add.push({user_id: obj.user_id, cuisine_id: Number(k)});
		} else {
			del.push(Number(k))
  		}
	}
	console.log("add", add);
	console.log("del", del);
	return db('cuisine_prefs').insert(add)
		.then(function() {
			return db('cuisine_prefs').whereIn('cuisine_id', del).andWhere('user_id', obj.user_id).del()
		})
}

UserPref.allRestaurants = function() {
  return db('restaurants')
    .select('name', 'restaurant_id', 'image_name')
}
//updates phone number
UserPref.phone = function(body){
  if(body.phone){
  	var phoneNum = body.phone;
    var newPhone = '';
    var counter = 0;
    phoneNum.forEach(function(letter){
      if(letter==='(' || letter===')' || letter==='-' || letter==='+'){}
      else{newPhone += letter; counter++;}
    });
    if(counter===10){newPhone = '+1' + newPhone;}
    else{newPhone = '+' + newPhone;}

  	return db('users')
  	.where('user_id', body.user_id)
  	.update('phone', newPhone)
    .update('phone_notify', body.phonePref)
    .update('email_notify', body.email)
  } else {
    return db('users')
    .where('user_id', body.user_id)
    .update('phone_notify', body.phonePref)
    .update('email_notify', body.email)
  }
}

//get preferences for phone and/or email notifications
UserPref.notifications = function(body){
  return db('users')
  .where('user_id', body.user_id)
  .select('phone_notify', 'email_notify')
}
