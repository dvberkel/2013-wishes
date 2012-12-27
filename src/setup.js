(function($, Raphael, Wish, undefined){
    $(function(){
	var paper = Raphael("screen", 640, 480);
	paper.rect(0, 0, 640, 480).attr({
	    "fill": "#eeeeee",
	    "stroke": "none"
	});
	
	var environment = new Wish.Environment({ "width" : paper.width, "height" : paper.height });
	new Wish.EnvironmentView({ "model" : environment, "paper" : paper});
    });
})(jQuery, Raphael, Wish);
