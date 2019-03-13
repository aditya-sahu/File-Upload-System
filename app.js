const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Link mongodb database here
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection
db.once('open',function(){
	console.log('Connected to MongoDB =)');
});

// Check for DB Errors
db.on('error', function(err){
	console.log(err);
});


// Init app
const app = express();

// Import data model
let User = require('./models/user');

//Load view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Home route
app.get('/', function(req,res){			
	res.render('index', {
		title: 'Users:'
	});
	
	User.find({}, function(err, output){
		if(err){
			console.log(err);
		} else {
		console.log(output);
		res.render('index', {
			database: output
		});
		}
	});
});

// User log-in facility, notifies the user if invalid username or password
app.post('/', function(req,res) {
	User.find({ userID:req.body.userid }, function(err,output){
		if(err) { 
			console.log(err);
			res.send('INVALID USERID');
		}
		else {
			if(output[0].password==req.body.password) 
			{
				res.send('OK');
			}
			else {
				console.log(output[0].password + ' and ' + req.body.password);
				res.send('INVALID PASSWORD');
			}
		}
	});
});

// Add route
app.get('/users/register', function(req,res){
	res.render('register', {
		title: 'Register User'
	});
});

// Add submit POST route
app.post('/users/register', function(req,res){
	let user = new User();
	user.userID = req.body.userid;
	user.password = req.body.password;
	user.email = req.body.email;
	
	user.save(function(err){
		if(err) {
			console.log(err);
			return;
		}
		else {
			res.redirect('/');
		}
	});
	
});


// Listen for port 3000
app.listen(3000, function() {
	console.log('Server started on 3000 port this is callback');
});
