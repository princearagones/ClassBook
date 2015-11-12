var account = require('./../controllers/account');

module.exports = function(router){
	router.route('/account')
		.get(account.find);
	return router;
;}
