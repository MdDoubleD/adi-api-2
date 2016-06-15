var User = require('../models/user.js')

//GET users (all / index)
function getIndex (req, res){
	
	User.find({}, function(error, users){
		if(error) console.log(error);
		// console.log('users controller')
		res.json(users)
	})
}


module.exports = {
	getIndex: getIndex,
	postUser: postUser
}