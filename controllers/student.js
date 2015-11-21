var db = require(__dirname + '/../lib/pg');

exports.find = function(req,res,next){
	db.query("SELECT * FROM student",
		function(err,rows){
			if(err) return next(err); 
			res.send(rows.rows);
		});
}