#bash/sh
forever stopall
echo "================================================================="
echo "   Pinus Server Start "
echo "================================================================="i
forever start -a -l pxboard_forever.log -o log/pxboard_out.log -e log/pxboard_err.log node/bin/px-board.js
forever start -a -l chatting_forever.log -o log/chatting_out.log -e log/chatting_err.log node/bin/px-chat.js
