var db = require('../db/index.js');

var Auth = module.exports

Auth.signin = function(body){
console.log('signin func running')
  var attemptedUsername = body.username;
	return db('users')
	.where('username', attemptedUsername)
	.select('username', 'password')
};

Auth.signup = function(reqBody){
	var newUsername = reqBody.username;
	var newPassword = reqBody.password;
	//if the database doesnt have a username that matches the new username
	//add a new user (name and password) to the users table
}