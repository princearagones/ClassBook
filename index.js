var express = require('express');
var app = express();
var path = require('path');

app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require(__dirname+'/config/router')(express.Router()));

app.use(express.static(__dirname+"/public"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res, next) {
	res.render('index')
});
app.get('/signup', function(req, res, next) {
	res.render('signup');
});
app.get('/panel', function(req, res, next) {
	res.render('Panel');
});
app.get('/signupteacher', function(req, res, next) {
	res.render('signupteacher');
});
app.get('/signupstudent', function(req, res, next) {
	res.render('signupstudent');
});
app.get('/Classroom1', function(req, res, next) {
	res.render('Classroom1');
});
app.get('/Classroom2', function(req, res, next) {
	res.render('Classroom2');
});
app.get('/studentlist', function(req, res, next) {
	res.render('studentlist');
});


app.get('*', function(req, res, next) {
	res.sendStatus(404);
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('NodeJS Web server is running at http://%s:%s', host, port);
});

