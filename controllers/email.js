var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM email", 
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
};

exports.insert = function(req, res, next) {
	if (!req.body.userid) {
		return res.status(451).send({'error': true, 'message': 'Missing parameter: userid'});
	}
	if (!req.body.email) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: email'});
	}
	
	db.query("INSERT INTO email(userid, email) VALUES($1, $2)", [req.body.userid, req.body.email], function(err, row) {
		if (err) return next(err);
		selectOne(row.id, function(newRow) {
			if (!newRow) {
				res.status(552).send({message: 'email ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM email WHERE id=$1 LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}