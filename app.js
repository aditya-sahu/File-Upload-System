const express = require('express');
const path = require('path');

// Init app
const app = express();

//Load view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');

// Home route
app.get('/', function(req,res){
	res.render('index', {
		title: 'Hello'
	});
});

// Add route
app.get('/articles/add', function(req,res){
	res.render('add', {
		title: 'Add article'
	});
});


app.listen(3000, function() {
	console.log('Server started on 3000 port this is callback');
});
