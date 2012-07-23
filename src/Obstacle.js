(function(_, Backbone, Wish, undefined){
    var Obstacle = Backbone.Model.extend({
	observe : function(aBall){
	    aBall.bind("change:position", function(ball){
		if (this.isHitBy(ball)) {
		    this.change(ball);
		}
	    }, this);
	},

	isHitFromLeftBy : function(aBall) {
	    return aBall.isHeadingRight() && this.isInRangeOf(aBall);
	},

	isHitFromRightBy : function(aBall) {
	    return aBall.isHeadingLeft() && this.isInRangeOf(aBall);
	},

	isHitFromBelowBy : function(aBall) {
	    return aBall.isHeadingUp() && this.isInRangeOf(aBall);
	},

	isHitFromAboveBy : function(aBall) {
	    return aBall.isHeadingDown() && this.isInRangeOf(aBall);
	},

	isInHorizontalRangeOf : function(aBall) {
	    var position = aBall.get("position");
	    var velocity = aBall.get("velocity");
	    return Math.abs(position.x - this.get("x")) <= Math.abs(velocity.vx);
	},

	isInVerticalRange : function(aBall) {
	    var position = aBall.get("position");
	    var velocity = aBall.get("velocity");
	    return Math.abs(position.y - this.get("y")) <= Math.abs(velocity.vy);
	},
    });

    var Wall = Obstacle.extend({
	defaults : { x: 0 },


	isHitBy : function(aBall) {
	    return this.isHitFromLeftBy(aBall) || this.isHitFromRightBy(aBall);
	},

	isInRangeOf : function(aBall) {
	    return this.isInHorizontalRangeOf(aBall);
	},

	change : function(aBall) {
	    aBall.reflectVx();
	}	
    });

    var Ceiling = Obstacle.extend({
	defaults : { y : 0 },

	isHitBy : function(aBall) {
	    return this.isHitFromBelowBy(aBall) || this.isHitFromAboveBy(aBall);
	},

	isInRangeOf : function(aBall) {
	    return this.isInVerticalRange(aBall);
	},

	change : function(aBall) {
	    aBall.reflectVy();
	}
    });

    var Brick = Obstacle.extend({
	defaults : {
	    "position" : { x: 0, y:0 },
	    "extend" : { width: 5, height: 3 }
	},

	isHitBy : function(aBall) {
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    var ballPosition = aBall.get("position");
	    return Math.abs(ballPosition.y - position.y) <= extend.height/2;
	},

	change : function(aBall) {
	    aBall.reflectVx();
	}	
    });

    Wish.Wall = Wall;
    Wish.Ceiling = Ceiling;
    Wish.Brick = Brick;
})(_, Backbone, Wish);
