var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM account",
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
/*
exports.insert = function(req, res, next) {
	if (!req.body.code) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: code'});
	}
	if (!req.body.name) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: name'});
	}
	if (!req.body.degreeProgramId) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: degreeProgramId'});
	}
	
	db.query("INSERT INTO curriculum(code, name, degreeProgramId) VALUES(?, ?, ?)", [req.body.code, req.body.name, req.body.degreeProgramId], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.send(552, {message: 'Curriculum ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};*/

};
