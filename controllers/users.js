var User = require('../models/user.js')

//GET users (all / index)
function getIndex (req, res){
	User.find({}, function(error, users){
		if(error) console.log(error);
		// console.log('users controller')
		res.json(users)
	})
}

//POST users (user create)
function postUser(req,res){
	var user = new User
	
	console.log(req.body);
	user.firstName = req.body.firstName
	user.lastName = req.body.lastName
	user.email = req.body.email
	user.avatar_url = req.body.avatar_url
	user.save(function(error){
		if (error) console.log("couldn't save user")
	})
	res.json({message: "successfully created", success: true})

}



module.exports = {
	getIndex: getIndex,
	postUser: postUser
}