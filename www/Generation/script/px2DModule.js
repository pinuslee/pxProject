/**
 * Created by pinus on 16. 7. 21.
 */

/**
 *  Canvas 관련 class를 정의한다.
 *  Module Pattern을 사용해서 구현하자.
 */

var px2DModule =(function() {
	var ctx = null; //member
	return { // public

		init: function(canvas) {
			ctx = canvas.getContext('2d');
		},

		clear: function(canvas){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		},

		drawRect: function(x, y, width, height, fillStyle) {
			if(!ctx) return;
			var oldfillStyle = ctx.fillStyle;
			if(fillStyle) {
				ctx.fillStyle = fillStyle;
			}
			ctx.fillRect(x-width/2, y-height/2, width, height);
			ctx.fillStyle = oldfillStyle;
		},

		drawCircle : function(x, y, length, fillStyle){
			if(!ctx) return;
			var oldfillStyle = ctx.fillStyle;
			var anticlockwise = true;
			if(fillStyle) {
				ctx.fillStyle = fillStyle;
				anticlockwise = false;
			}
			if(anticlockwise===false)
			{
				ctx.beginPath();
				ctx.arc(x, y, length, 0, Math.PI*2, anticlockwise);
				ctx.fill();
				//ctx.stroke();
			}
			ctx.fillStyle = oldfillStyle;

		}
	};
})();



