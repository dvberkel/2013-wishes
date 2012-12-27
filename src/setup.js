(function($, Raphael, Wish, undefined){
    var requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    const leftKey = 37;
    const rightKey = 39;
    var pressed = {
	leftKey : false,
	rightKey : false
    }
    function keydown(evt){
        var key = evt.keyCode;
	if (key == leftKey || key == rightKey) {
	    pressed[key] = true;
	}
    };
    function keyup(evt){
        var key = evt.keyCode;
	if (key == leftKey || key == rightKey) {
	    pressed[key] = false;
	}
    };
    window.addEventListener("keydown",keydown);
    window.addEventListener("keyup",keyup);

    $(function(){
	var paper = Raphael("screen", 640, 480);
	paper.rect(0, 0, 640, 480).attr({
	    "fill": "#eeeeee",
	    "stroke": "none"
	});
	
	var environment = new Wish.Environment({ "width" : paper.width, "height" : paper.height });
	new Wish.EnvironmentView({ "model" : environment, "paper" : paper});

	(function loop(){
	    requestAnimFrame(loop);
	    environment.update();
	    if (pressed[leftKey]) {
		environment.movePaddleLeft();
	    }
	    if (pressed[rightKey]) {
		environment.movePaddleRight();
	    }
	})();
    });
})(jQuery, Raphael, Wish);
