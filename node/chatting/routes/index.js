/**
 * Created by pinus on 16. 8. 12.
 */

function index(ignore, res) {
	res.render('index', { title: '심심풀이 체팅방' });
}
exports.init = function init(app) {
	app.route('/').get(index);
};

exports.getName = function getName() {
	return "index";
};

