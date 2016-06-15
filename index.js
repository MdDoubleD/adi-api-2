var express 		= require('express');
var app 				= express();
var bodyParser 	= require('body-parser');
var mongoose 		= require('mongoose');
var logger 			= require('morgan');
var port 				= 3000;

app.use('/test', function(req, res){
	console.log('test request')
})


app.listen(process.env.PORT || port);