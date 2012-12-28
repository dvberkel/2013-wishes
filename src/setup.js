(function($, Raphael, Wish, undefined){
    var parameters = requestParameters();
    var wish = $.base64.decode(unescape(parameters.w)) || "Happy 2013!";
    console.log(wish);
    
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

    $(function(){
	var paper = Raphael("screen", 640, 480);
	paper.rect(0, 0, 640, 480).attr({
	    "fill": "#eeeeee",
	    "stroke": "none"
	});
	
	var environment = new Wish.Environment({ 
	    "width" : paper.width, "height" : paper.height,
	    "horizontalBrickCount" : 10, "verticalBrickCount" : 3,
	    "velocity" : { vx : 2.5, vy : 4 },
	    "paddleExtend" : { width : 80, height : 10 },
	    "wish" : wish
	});
	new Wish.EnvironmentView({ "model" : environment, "paper" : paper });

	(function loop(){
	    requestAnimFrame(loop);
	    environment.update();
	})();
    });
})(jQuery, Raphael, Wish);
