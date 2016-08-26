
/**
 * Created by pinus on 16. 8. 25.
 */

var chatserver = require('pxTcpServer');

// fn(csocket, ssocket, msg)
var packets = [
	{id:'chat_msg',		fn: sendBroadMessage	}
];

chatserver.packets.concat(packets);

function sendBroadMessage(csocket, ssocket, msg){
	console.log('message: ' + msg);
	ssocket.emit('message', msg);
}


module.exports = chatserver;