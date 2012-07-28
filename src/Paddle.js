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

    Wish.Paddle = Paddle;
})(Backbone, Wish);
