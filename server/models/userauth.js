var db = require('../db/index.js');

var Auth = module.exports

Auth.signin = function(body){
console.log('signin func running')
  var attemptedemail = body.email;
	return db('users')
	.where('email', attemptedemail)
	.select('email', 'password')
};

Auth.signup = function(body){
	var newemail = body.email;
	return db('users')
	.where('email', newemail)
	.select('email', 'password')
}
	//if the database doesnt have a email that matches the new email
	//add a new user (name and password) to the users table

Auth.create = function(body){
	var newUser = body.email;
	var newPass = body.password;
	return db('users').insert({email: newUser, password: newPass});
}	