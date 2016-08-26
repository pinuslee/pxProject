/**
 * Created by pinus on 16. 7. 15.
 */
var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var db = mongoose.connection;

exports.connect = function (dbname) {
	//db connection
	mongoose.Promise = global.Promise;
	mongoose.connect("mongodb://pinus.ml:27017/" + dbname);
	db.on('error', console.error.bind(console, 'connection errror:'));
	db.once('open', function callback(){
		console.log("mongo db("  + dbname + ") connection OK.");
	});
	autoIncrement.initialize(db);
};

exports.addSchema = function (name, shema){
	return mongoose.model(name, shema);
};

exports.autoIncrement = autoIncrement;
exports.Schema  = mongoose.Schema;