
var pg = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/cmsc127db";
var db = new pg.Client(connectionString);

db.connect(function(err){
	if(err) console.log("Error: Connection to PostgreSQL was not established!");
	else console.log("Success: Connection to PostgreSQL was established!");
});
module.exports = db;