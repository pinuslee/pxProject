/**
 * Created by pinus on 16. 7. 21.
 */

var pxMath =(function() {

	function random(min, max){
		if(arguments.length===0){
			return Math.random();
		}else if (arguments.length===1) {
			return Math.floor(Math.random()*min) + 1;
		}else if (arguments.length===2) {
			return Math.floor(Math.random()*(max-min)) + min + 1;
		}else{
			return undefined;
		}
	}

	return{
		random : random
	};

})();


/**
 *  test
 */

for(var i=0; i<10; i++){
	console.log('param['+ i+'] :' + pxMath.random(2));
}



