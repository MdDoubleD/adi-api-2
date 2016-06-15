var express 	= require('express');
var router 		= express.Router();
var usersController = require('../controllers/users.js')

router.route('/')
	.get(usersController.getIndex)

module.exports = router