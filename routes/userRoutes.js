var express 	= require('express');
var router 		= express.Router();
var bodyParser = require('body-parser');
var usersController = require('../controllers/users.js')

console.log("user routes")

router.route('/')
	.get(usersController.getIndex)
	.post(usersController.postUser)

module.exports = router