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
		    this.changeBall(ball);
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

	changeBall : function(aBall) {
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

	changeBall : function(aBall) {
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
	    return this.isRightExtendInRangeOf(aBall) && this.coversVertically(aBall);
	},

	isRightExtendInRangeOf : function(aBall){
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    return is(this.rightExtend()).within(ballVelocity.vx).of(ballPosition.x)
	},
	
	coversVertically : function(aBall){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    var ballPosition = aBall.get("position");
	    return is(ballPosition.y).within(extend.height/2).of(position.y);
	},


	rightExtend : function(){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    return position.x + extend.width/2;
	},

	isHitFromTheLeftBy : function(aBall){
	    return this.isLeftExtendInRangeOf(aBall) && this.coversVertically(aBall);
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
	    return this.isAboveExtendInRangeOf(aBall) && this.coversHorizontally(aBall);
	},

	isAboveExtendInRangeOf : function(aBall) {
	    var ballPosition = aBall.get("position");
	    var ballVelocity = aBall.get("velocity");
	    return is(this.aboveExtend()).within(ballVelocity.vy).of(ballPosition.y)
	},

	coversHorizontally : function(aBall){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    var ballPosition = aBall.get("position");
	    return is(ballPosition.x).within(extend.width/2).of(position.x)
	},

	aboveExtend : function(){
 	    var position = this.get("position");
	    var extend = this.get("extend");
	    return position.y + extend.height/2;
	},

	isHitFromBelowBy : function(aBall){
	    return this.isBelowExtendInRangeOf(aBall) && this.coversHorizontally(aBall);
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

	changeBall : function(aBall) {
	    if (this.isHitFromTheLeftBy(aBall) || this.isHitFromTheRightBy(aBall)) {
		aBall.reflectVx();
	    } else {
		aBall.reflectVy();
	    }
	}	
    });

    var WallView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},

	render : function() {
	    var paper = this.paper();
	    var width = this.options.width || 1;
	    var height = paper.height;
	    var x = this.model.get("x");
	    paper.rect(x - width/2, 0, width, height);
	},

	paper : function(){
	    return this.options.paper;
	}
    });

    Wish.Wall = Wall;
    Wish.Ceiling = Ceiling;
    Wish.Brick = Brick;

    Wish.WallView = WallView;

})(_, Backbone, Wish);
