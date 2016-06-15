var express 		= require('express');
var app 				= express();
var bodyParser 	= require('body-parser');
var mongoose 		= require('mongoose');
var logger 			= require('morgan');
var port 				= 3000;

//test route to check that stuff was working
app.use('/test', function(req, res){
	console.log('test request')
})

//set port to run app
app.listen(process.env.PORT || port);