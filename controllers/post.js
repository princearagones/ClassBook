var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM post",
		function(err,rows){
			if(err) return next(err);
			res.send(rows.rows);
		});
};

var selectOne = function(id, callback) {
	db.query("SELECT * FROM post WHERE postnum=$1 LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}

exports.insert = function(req, res, next) {
	if (!req.body.posterID) {
		return res.status(451).send({'error': true, 'message': 'Missing parameter: posterID'});
	}
	if (!req.body.crsCode) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: crsCode'});
	}
	if (!req.body.postDate) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: postDate'});
	}
	if (!req.body.thePost) {
		return res.send(451, {'error': true, 'message': 'Missing parameter: thePost'});
	}
	db.query("INSERT INTO post(posterID, crsCode, postDate,thePost) VALUES($1, $2, $3, $4)", [req.body.posterID, req.body.crsCode, req.body.postDate,req.body.thePost], function(err, row) {
		if (err) return next(err);
		selectOne(row.postnum, function(newRow) {
			if (!newRow) {
				res.status(552).send({message: 'Post ('+row.insertId+') was not created.'});
			} else {
				res.send(newRow);
			}
		});
	});
};
