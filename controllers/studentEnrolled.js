var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM students_enrolled", 
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
};

exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM students_enrolled WHERE id=$1", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send({message: 'Relation not found.'});
		} else {
			res.send(rows.rows[0]);
		}
	});
};


exports.findClasses = function(req,res,next){
	db.query("SELECT coursecode FROM students_enrolled WHERE studnum = $1	", [req.params.studnum],
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
};

exports.insert = function(req, res, next) {
	if (!req.body.coursecode) {
		return res.status(451).send({'error': true, 'message': 'Missing parameter: coursecode'});
	}
	if (!req.body.studnum) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: studnum'});
	}
	
	db.query("INSERT INTO students_enrolled(coursecode, studnum) VALUES($1, $2)", [req.body.coursecode, req.body.studnum], function(err, row) {
		if (err) return next(err);
		selectOne(row.id, function(newRow) {
			if (!newRow) {
				res.status(552).send({message: 'students_enrolled ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM students_enrolled WHERE id=$1 LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}

exports.remove = function(req, res, next) {
	db.query("DELETE FROM students_enrolled WHERE id=$1", [req.params.id], function(err, row) {
		if (err) return next(err);
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Class ('+req.params.id+') was not removed.'});
		} else {
			res.send(202, row);
		}
	});
};