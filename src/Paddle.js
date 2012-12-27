(function(Backbone, Wish, undefined){
    var Paddle = Wish.Brick.extend({
	defaults : {
	    "position" : { x: 0, y:0 },
	    "extend" : { width: 40, height: 10 },
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
	    var avatar = this.avatar();
	    var paddle = this.model;
	    var position = paddle.get("position");
	    var extend = paddle.get("extend");
	    avatar.attr({
		x : position.x - extend.width/2,
		y : position.y - extend.height/2,
	    });
	},

	avatar : function(){
	    if (! this._avatar) {
		var paper = this.paper();
		var extend = this.model.get("extend");
		this._avatar = paper.rect(0, 0, extend.width, extend.height, extend.height/2);
	    }
	    return this._avatar;
	},

	paper : function(){
	    return this.options.paper;
	}
    });

    Wish.Paddle = Paddle;
    Wish.PaddleView = PaddleView;
})(Backbone, Wish);
