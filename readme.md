#Instructions

1. clone this app
2. run `npm install`
3. change mongo uri to your own



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


* Make a new user:

```javascript

// in users.js (controller)

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

```

add route:

```javascript

// in userRoutes.js

router.route('/')
	.get(usersController.getIndex)
	.post(usersController.postUser)

```



##Lastly:

full crud on your controller, looks like this:


```javascript

var User = require('../models/user.js');

// POST / users
function postUser (req, res){
    var newUser = new User

    console.log(req.body);
    newUser.avatar_url  = req.body.avatar_url;
    newUser.email = req.body.email;
    newUser.firstName  = req.body.firstName;
    newUser.lastName  = req.body.lastName;
    newUser.save(function (error) {
        if (error) console.log("Could not save resource because:" + error )
    })
    res.json({message: "successfully created", success: true})
}

// GET /users
function getIndex (req, res){
  User.find({}, function (error, users) {
    if(error) console.log(error);
    res.json(users)
  })
};

//GET /users/:id
function getUser (req, res){
    var id = req.params.id;
    User.findById({_id:id}, function (error, user) {
        if(error) console.log(error);
        res.json(user)
    })
};

//DELETE / users/:id
function deleteUser (req, res){
  var id = req.params.id;

  User.remove({_id: id}, function (error) {
    if(error) console.log( "Resource has not been deleted due to the following error:" + error );
    //res.redirect('/users');
    res.json({message: "successfully deleted", success: true})
  })
};

// PUT /resources/:id
function putUser (req, res){
  var id = req.params.id;

  User.findById({ _id: id }, function (error, user){
    if(error) console.log( "There is an error on this page because:" + error );
    
    if (req.body.avatar_url) user.avatar_url  = req.body.avatar_url;
    if (req.body.email) user.local.email = req.body.email;
    if (req.body.firstName) user.firstName  = req.body.firstName;
    if (req.body.lastName) user.lastName  = req.body.lastName;


    user.save( function (error){
      if(error) console.log( "Could not save resource becuase:" + error );  
      res.json({message: "successfully updated", success: true})
    })
  })
};


module.exports = {
    postUser: postUser,
    getIndex: getIndex,
    deleteUser: deleteUser,
    getUser: getUser,
    putUser: putUser
}

```

then your routes need to match:


```javascript

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');



var usersController = require('../controllers/users.js');

router.route('/')
    .post(usersController.postUser)
    .get(usersController.getIndex)

router.route('/:id')
	.put(usersController.putUser)
	.delete(usersController.deleteUser)
    .get(usersController.getUser)

module.exports = router

```

##Deploy to heroku

1. heroku create appname
2. add a start script to package.json:

```
"scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
3. add, commit, git push heroku master
4. heroku open















