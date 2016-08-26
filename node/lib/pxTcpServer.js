/**
 * Created by pinus on 16. 8. 26.
 */

/**
 * Created by pinus on 16. 8. 25.
 */

var socketio = require('socket.io');


var packets =[
	/**
	 * default packet
	 * example fn --> fn(csocket, ssocket, msg)
	 */
	{id:'disconnect', 	fn: disConnect 			}
];
var io = null;
var pcu = 0;
exports.packets = packets;
exports.io = null;
exports.pcu = pcu;

exports.init = function(server){
	io = socketio.listen(server);
	io.on('connection', function(csocket){
		console.log('[cnt:' + (++pcu) + ']user connected:' + csocket.id);

		packets.forEach(function(packet) {
			csocket.on(packet.id, function(msg) {
				packet.fn(csocket, io, msg)
			});
		});
	});
}

function disConnect(csocket, ssocket, msg) {
	console.log('user disconnected :' + csocket.id + '[cnt:' + --pcu + ']');
	console.log('[msg:' + msg + ']');
}
