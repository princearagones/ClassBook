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
app.get('/Classroom/Classroom1.html', function(req, res, next) {
	res.render('Classroom/Classroom1');
});
app.get('/Classroom/Classroom2.html', function(req, res, next) {
	res.render('Classroom/Classroom2');
});
app.get('/Classroom/Classroom3.html', function(req, res, next) {
	res.render('Classroom/Classroom3');
});
app.get('/Classroom/Classroom4.html', function(req, res, next) {
	res.render('Classroom/Classroom4');
});
app.get('/Classroom/Classroom5.html', function(req, res, next) {
	res.render('Classroom/Classroom5');
});
app.get('/Classroom/Classroom6.html', function(req, res, next) {
	res.render('Classroom/Classroom6');
});


app.get('*', function(req, res, next) {
	res.sendStatus(404);
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('NodeJS Web server is running at http://%s:%s', host, port);
});

