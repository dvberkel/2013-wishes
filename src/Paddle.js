(function(Backbone, Wish, undefined){
    var Paddle = Wish.Brick.extend({
	defaults : {
	    "position" : { x: 0, y:0 },
	    "extend" : { width: 5, height: 3 },
	    "displacementSize" : 3
	},

	moveLeft : function(){
	    this.displaceBy(-this.get("displacementSize"));
	},

	displaceBy : function(dx){
	    var originalPosition = this.get("position");
	    this.set({position : { x: originalPosition.x + dx, y: originalPosition.y }});
	},

	moveRight : function(){
	    this.displaceBy(this.get("displacementSize"));
	}
    });

    var PaddleView = Backbone.View.extend({
	initialize : function(){
	    this.model.bind("change:position", function(){
		this.render();
	    }, this);

	    this.render();
	},

	render : function(){
	    var paper = this.paper();
	    var paddle = this.model;
	    var position = paddle.get("position");
	    var extend = paddle.get("extend");
	    var width = extend.width;
	    var height = extend.height;
	    paper.rect(position.x - extend.width/2, position.y - extend.height/2, width, height);
	},

	paper : function(){
	    return this.options.paper;
	}
    });

    Wish.Paddle = Paddle;
    Wish.PaddleView = PaddleView;
})(Backbone, Wish);
