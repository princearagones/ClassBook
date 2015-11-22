var account = require('./../controllers/account');
var classes = require('./../controllers/class');
var teacher = require('./../controllers/teacher');
var student = require('./../controllers/student');
var studentEnrolled = require('./../controllers/studentEnrolled');


module.exports = function(router){
	router.route('/account')
		.get(account.find)
		.post(account.insert);
	router.route('/account/:username')
		.get(account.findId);
	router.route('/class')
		.get(classes.find)
		.post(classes.insert);
	router.route('/class/:coursecode')
		.get(classes.findOne)
		.put(classes.update)
		.delete(classes.remove);
	router.route('/studentEnrolled')
		.get(studentEnrolled.find)
		.post(studentEnrolled.insert);
	router.route('/studentEnrolled/:id')
		.get(studentEnrolled.findOne)
		.delete(studentEnrolled.remove);
	router.route('/teacher')
		.get(teacher.find)
		.post(teacher.insert);
	router.route('/student')
		.get(student.find);
	return router;
;}
