var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM student",
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
}

exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM student WHERE userid=$1", [req.params.userid], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send({message: 'Teacher not found.'});
		} else {
			res.send(rows.rows[0]);
		}
	});
};

exports.insert = function(req, res, next) {
	if (!req.body.userid) {
		return res.status(451).send({'error': true, 'message': 'Missing parameter: userid'});
	}
	if (!req.body.username) {
		return res.status(451).send({'error': true, 'message': 'Missing parameter: username'});
	}
	if (!req.body.password) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: password'});
	}
	if (!req.body.type) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: section'});
	}
	if (!req.body.studno) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: studno'});
	}
	if (!req.body.name) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: name'});
	}
	db.query("INSERT INTO student(userid,username,password,type,studno,name) VALUES($1, $2, $3, $4, $5, $6)", [req.body.userid, req.body.username, req.body.password,req.body.type,req.body.studno,req.body.name], function(err, row) {
		if (err) return next(err);
		selectOne(row.userid, function(newRow) {
			if (!newRow) {
				res.status(552).send({message: 'Student ('+row.userId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM student WHERE userid=$1 LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}