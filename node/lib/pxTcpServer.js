/**
 * Created by pinus on 16. 8. 26.
 */

/**
 * Created by pinus on 16. 8. 25.
 */

var socketio = require('socket.io');


var default_packets =[
	/**
	 * default packet
	 * example fn --> fn(csocket, ssocket, msg)
	 */
	{id:'disconnect', 	fn: disConnect 			}
];
var packets = null;
var io = null;
var pcu = 0;
exports.io = null;
exports.pcu = pcu;

exports.init = function(server, subpackets){
	io = socketio.listen(server);

	packets = default_packets.concat(subpackets);

	io.on('connection', function(csocket){
		console.log('[cnt:' + (++pcu) + ']user connected:' + csocket.id);

		packets.forEach(function(packet) {
			csocket.on(packet.id, function(msg) {
				packet.fn(csocket, io, msg)
			});
		});
	});
};

function disConnect(csocket, ignore, msg) {
	console.log('user disconnected :' + csocket.id + '[cnt:' + --pcu + ']');
	console.log('[msg:' + msg + ']');
}
