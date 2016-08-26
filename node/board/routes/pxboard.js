/**
 * Created by pinus on 16. 7. 11.
 */
// process require
var pxboard =  require("../process/pxboard");
var db = require("../process/db_pxboard");
exports.init = function(app) {
	app.route("/pxboard/create").get(pxboard_create);
	app.route("/pxboard/").post(pxboard);
	app.route("/pxboard").get(pxboard);
	app.route("/pxboard/:id").get(pxboard);
	app.route("/pxboard/:id/:action").get(pxboard);
	app.route("/pxboard/:id/:action/:page").get(pxboard);

};

function pxboard_create(ignore, ignore){
	for(var i=1; i<300 ;i++){
		var pxboard = db.pxBoard({
			boardID : 1,
			title : '제 목' + i,
			content : '내 용' + i,
			password : '1123'
		});
		pxboard.save(function(err, ignore){
			if(err) console.error('err:' + err);
		});
	}
}

exports.getName = function getName() {
	return "pxboard";
};