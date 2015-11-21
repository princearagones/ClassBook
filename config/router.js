var account = require('./../controllers/account');
var classes = require('./../controllers/class');
var teacher = require('./../controllers/teacher');
var student = require('./../controllers/student');

module.exports = function(router){
	router.route('/account')
		.get(account.find);
	router.route('/class')
		.get(classes.find)
		.post(classes.insert);
	router.route('/teacher')
		.get(teacher.find);
	router.route('/student')
		.get(student.find);
	return router;
;}
