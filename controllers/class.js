var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM class",
		function(err,rows){
			if(err) return next(err); 
			res.send(rows);
		});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM class WHERE coursecode=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}

exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM class WHERE coursecode=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.send(404, {message: 'Class not found.'});
		} else {
			res.send(rows[0]);
		}
	});
};

exports.insert = function(req, res, next) {
	if (!req.body.coursecode) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: coursecode'});
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
	db.query("INSERT INTO class(coursecode, coursetitle, section,userid,empno) VALUES(?, ?, ?, ?, ?)", [req.body.code, req.body.name, req.body.degreeProgramId,req.body.userid,req.body.empno], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.send(552, {message: 'Class ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};