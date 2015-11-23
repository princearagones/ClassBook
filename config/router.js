var account = require('./../controllers/account');
var classes = require('./../controllers/class');
var teacher = require('./../controllers/teacher');
var student = require('./../controllers/student');
var contact = require('./../controllers/contact');
var email = require('./../controllers/email');
var studentEnrolled = require('./../controllers/studentEnrolled');
var post = require('./../controllers/post');


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
		.get(student.find)
		.post(student.insert);
	router.route('/contact')
		.get(contact.find)
		.post(contact.insert);
	router.route('/email')
		.get(email.find)
		.post(email.insert);
	router.route('/post')
		.get(post.find)
		.post(post.insert);
	return router;
;}
