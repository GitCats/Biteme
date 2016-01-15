var db = require('../db/index.js');

var Auth = module.exports

Auth.signin = function(body){
  var attemptedUsername = body.username;
  var attemptedPassword = body.password;
	return db('users')
	.where('username', attemptedUsername)
	.select('username', 'password')
};