var db = require('../db/index.js');

var Deal = module.exports

Deal.all = function() {
	return db('deals').select('*').limit(250)
};

Deal.create = function(attrs) {
	return db('deals').insert(attrs)
}