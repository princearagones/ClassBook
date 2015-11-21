var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM class",
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM class WHERE coursecode=$1 LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}

exports.insert = function(req, res, next) {
	if (!req.body.coursecode) {
		return res.status(451).send({'error': true, 'message': 'Missing parameter: coursecode'});
	}
	if (!req.body.coursetitle) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: coursetitle'});
	}
	if (!req.body.section) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: section'});
	}
	if (!req.body.userid) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: userid'});
	}
	if (!req.body.empno) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: empno'});
	}
	db.query("INSERT INTO class(coursecode, coursetitle, section,userid,empno) VALUES($1, $2, $3, $4, $5)", [req.body.coursecode, req.body.coursetitle, req.body.section,req.body.userid,req.body.empno], function(err, row) {
		if (err) return next(err);
		selectOne(row.coursecode, function(newRow) {
			if (!newRow) {
				res.status(552).send({message: 'Class ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};

exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM class WHERE coursecode=$1", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Class not found.'});
		} else {
			res.send(rows[0]);
		}
	});
};
