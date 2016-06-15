#How to build and deploy a node API quick

* mkdir adi-api-2
* cd adi-api-2/
* touch readme.md
* touch .gitignore -> add node_modules
* touch index.js
* open .
* git init
* git add -A
* git commit -m "initial"
* npm init
* npm install body-parser express mongoose morgan --save
* require all dependencies, instantiate express, test route, app.listen

```javascript

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

```

* mkdir models
* touch models/user.js

```
var mongoose = require('mongoose');

var User = mongoose.Schema({
    email: String,
    firstName:String,
    lastName: String,
    avatar_url:String
})


module.exports = mongoose.model('User', User);

```





