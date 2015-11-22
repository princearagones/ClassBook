var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM account",
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
};

exports.findId = function(req,res,next){
	db.query("SELECT userid FROM account WHERE username=$1 LIMIT 1", [req.params.username],
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
};




exports.insert = function(req, res, next) {
	if (!req.body.username) {
		return res.status(451).send({'error': true, 'message': 'Missing parameter: username'});
	}
	if (!req.body.password) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: password'});
	}
	if (!req.body.type) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: section'});
	}

	db.query("INSERT INTO account(username,password,type) VALUES($1, $2, $3)", [req.body.username, req.body.password,req.body.type], function(err, row) {
		if (err) return next(err);
		selectOne(row.userid, function(newRow) {
			if (!newRow) {
				res.status(552).send({message: 'Account ('+row.userid+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM account WHERE userid=$1 LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}