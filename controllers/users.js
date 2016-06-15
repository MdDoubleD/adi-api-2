var User = require('../models/user.js')

//GET users (all / index)
function getIndex (req, res){
	console.log('users controller')
	User.find({}, function(error, users){
		if(error) console.log(error);
		res.json(users)
	})
}


module.exports = {
	getIndex: getIndex
}