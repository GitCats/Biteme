var db = require('../db/index.js');

var Auth = module.exports

Auth.signin = function(body){
console.log('signin func running')
  var attemptedUsername = body.username;
	return db('users')
	.where('username', attemptedUsername)
	.select('username', 'password')
};

