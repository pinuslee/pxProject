/**
 * Created by pinus on 16. 8. 12.
 */
function index(ignore, res) {
	res.render('chatting', { title: 'Pinus Workspace Home' });
}
exports.init = function init(app) {
	app.route('/chat').get(index);
};

exports.getName = function getName() {
	return "chatting";
};
