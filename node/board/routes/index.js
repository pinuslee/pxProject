//var express = require('express');
//var router = express.Router();

/* GET home page. 
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
 */

function index(ignore, res) {
	res.render('index', { title: 'Pinus Workspace Home' });
}
exports.init = function init(app) {
	app.route('/').get(index);
};

exports.getName = function getName() {
	return "index";
};

