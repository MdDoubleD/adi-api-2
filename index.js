var express 		= require('express');
var app 				= express();
var bodyParser 	= require('body-parser');
var mongoose 		= require('mongoose');
var logger 			= require('morgan');
var port 				= 3000;
var userRoutes 	= require('./routes/userRoutes.js')
var mongoUri 		= "mongodb://test:test@ds015574.mlab.com:15574/api-test-node"

mongoose.connect(mongoUri);

//test route to check that stuff was working
app.use('/test', function(req, res){
	console.log('test request')
})


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/users', userRoutes );



//set port to run app
app.listen(process.env.PORT || port);