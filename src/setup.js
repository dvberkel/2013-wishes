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
	
    });
})(jQuery, Raphael, Wish);
