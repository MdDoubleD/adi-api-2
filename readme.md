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

```javascript

var mongoose = require('mongoose');

var User = mongoose.Schema({
    email: String,
    firstName:String,
    lastName: String,
    avatar_url:String
})


module.exports = mongoose.model('User', User);

```

* mkdir controllers
* touch controllers/users.js


```javascript

var User = require('../models/user.js')

//GET users (all / index)
function getIndex (req, res){
	User.find({}, function(error, users){
		if(error) console.log(error);
		res.json(users)
	})
}

module.exports = {
	getIndex: getIndex
}

```


* go to mongolabs.com, 
	* create a new DB, 
	* give it a dbuser and dbpassword
	* copy the DB URI
	* store it as a variable in index.js and 
	* connect mongoose to it. 


```
var mongoUri 		= "mongodb://test:test@ds015574.mlab.com:15574/api-test-node"

mongoose.connect(mongoUri);

```

* configure body-parser and morgan logger 

```

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

```

* mkdir routes
* touch routes/userRoutes.js

```javascript

var express 	= require('express');
var router 		= express.Router();
var bodyParser = require('body-parser');
var usersController = require('../controllers/users.js')

console.log("user routes")

router.route('/')
	.get(usersController.getIndex)

module.exports = router


```












