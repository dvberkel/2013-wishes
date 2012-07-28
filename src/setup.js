(function($, Raphael, Wish, undefined){
    $(function(){
	var paper = Raphael("screen", 640, 480);
	paper.rect(0, 0, 640, 480).attr({
	    "fill": "#eeeeee",
	    "stroke": "none"
	});
	
	var width = paper.width;
	var height = paper.height;

	var leftWall = new Wish.Wall({ x: 0 });
	new Wish.WallView({ "model" : leftWall, "paper" : paper });
	var rightWall = new Wish.Wall({ x: width });
	new Wish.WallView({ "model" : rightWall, "paper" : paper });
	var ceiling = new Wish.Ceiling({ y: height });
	new Wish.CeilingView({ "model" : ceiling, "paper" : paper });

	var ball = new Wish.Ball({ "position" : { x: 50, y: 30}, "velocity" : { vx: 1, vy: 1}});
	new Wish.BallView({ "model" : ball, "paper": paper });

	var paddle = new Wish.Paddle({ "position" : { x: width/2, y: 20 }, "extend" : { "width": 40, "height": 10 }});
	new Wish.PaddleView({ "model": paddle, "paper": paper});
    });
})(jQuery, Raphael, Wish);
