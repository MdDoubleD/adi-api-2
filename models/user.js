var mongoose = require('mongoose');

var User = mongoose.Schema({
	email: String,
	firstName: String,
	lastName: String,
	avatar_url: String	
})

module.exports = mongoose.model('User', User)