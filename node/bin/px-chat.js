/**
 * Created by pinus on 16. 8. 26.
 */


var app = require('../app');
var debug = require('debug')('node:server');
var http = require('http');
var path = require('path');

var projectPath = 'chatting';

var chatServer = require('../' + projectPath + '/process/chatserver');
// view engine setup
app.set('views', path.join(__dirname, '../' + projectPath + '/views'));
app.set('view engine', 'jade');

/**
 * Get port from environment and store in Express.
 */

var port = app.normalizePort(process.env.PORT || '1400');
app.set('port', port);

/**
 * load modules
 */

// register routers

var modules = [
	'index',
	'chatting'
];

var count ="0";
modules.forEach( function (m) {
	var mTemp = require('../' + projectPath + '/routes/' + m);
	mTemp.init(app, function (err) {
		if (err) {
			console.log(err);
			process.exit();
		}
	});
	++count;
	console.log("[" + count + "]" + "Require route modules : " + mTemp.getName());
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
	next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server
	.listen(port)
	.on('error', onError)
	.on('listening', onListening);


/**
 * chat server init
 */
chatServer.init(server);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
