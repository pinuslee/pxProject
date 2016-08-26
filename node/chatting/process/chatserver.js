
/**
 * Created by pinus on 16. 8. 25.
 */

var chatserver = require('pxTcpServer');

// fn(csocket, ssocket, msg)
var packets = [
	{id:'chat_msg',		fn: sendBroadMessage	}
];

exports.init = function(server){
	chatserver.packets = packets.concat(chatserver.packets);
	chatserver.init(server, packets);
};

function sendBroadMessage(ignore, ssocket, msg){
	console.log('chat_msg: ' + msg);
	ssocket.emit('chat_msg', msg);
}


