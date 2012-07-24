(function(_, Backbone, Wish, undefined){
    var is = function(target){
	return {
	    within : function(epsilon){
		return {
		    of : function(origin){
			return Math.abs(target - origin) <= Math.abs(epsilon);
		    }
		};
	    }
	};
    };

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
	    return (aBall.isHeadingRight() && this.isHitFromTheLeftBy(aBall)) ||
		(aBall.isHeadingLeft() && this.isHitFromTheRightBy(aBall)) ||
		(aBall.isHeadingUp() && this.isHitFromBelowBy(aBall)) ||
		(aBall.isHeadingDown() && this.isHitFromAboveBy(aBall));
	},

	isHitFromTheRightBy : function(aBall){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    var result = this.isRightExtendInRangeOf(aBall) && is(ballPosition.y).within(extend.height/2).of(position.y);
	    return result;
	},

	isRightExtendInRangeOf : function(aBall){
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    return is(this.rightExtend()).within(ballVelocity.vx).of(ballPosition.x)
	},

	rightExtend : function(){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    return position.x + extend.width/2;
	},

	isHitFromTheLeftBy : function(aBall){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    var result = this.isLeftExtendInRangeOf(aBall) && is(ballPosition.y).within(extend.height/2).of(position.y);
	    return result;
	},

	isLeftExtendInRangeOf : function(aBall) {
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    return is(this.leftExtend()).within(ballVelocity.vx).of(ballPosition.x)
	},

	leftExtend : function(){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    return position.x - extend.width/2;
	},

	isHitFromAboveBy : function(aBall){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    var result = this.isAboveExtendInRangeOf(aBall) && is(ballPosition.x).within(extend.width/2).of(position.x);
	    return result;
	},

	isAboveExtendInRangeOf : function(aBall) {
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    return is(this.aboveExtend()).within(ballVelocity.vy).of(ballPosition.y)
	},

	aboveExtend : function(){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    return position.y + extend.height/2;
	},

	isHitFromBelowBy : function(aBall){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    var result = this.isBelowExtendInRangeOf(aBall) && is(ballPosition.x).within(extend.width/2).of(position.x);
	    return result;
	},

	isBelowExtendInRangeOf : function(aBall){
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    return is(this.belowExtend()).within(ballVelocity.vy).of(ballPosition.y)
	},

	belowExtend : function(){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    return position.y - extend.height/2;
	},

	change : function(aBall) {
	    if (this.isHitFromTheLeftBy(aBall) || this.isHitFromTheRightBy(aBall)) {
		aBall.reflectVx();
	    } else {
		aBall.reflectVy();
	    }
	}	
    });

    Wish.Wall = Wall;
    Wish.Ceiling = Ceiling;
    Wish.Brick = Brick;
})(_, Backbone, Wish);
