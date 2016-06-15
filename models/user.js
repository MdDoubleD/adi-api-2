var mongoose = require('mongoose');

//creates a blueprint for users
var User = mongoose.Schema({
	email: String,
	firstName: String,
	lastName: String,
	avatar_url: String	
})

module.exports = mongoose.model('User', User)