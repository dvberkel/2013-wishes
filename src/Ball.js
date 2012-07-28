(function(_, Backbone, Wish, undefined){
    var nextPosition = function(position, velocity) {
	return {
	    x : (position.x + velocity.vx),
	    y : (position.y + velocity.vy)
	};
    };

    var nextVelocity = function(velocity, xMultiplier, yMultiplier) {
	return {
	    vx : velocity.vx * xMultiplier,
	    vy : velocity.vy * yMultiplier,
	};
    };

    var Ball = Backbone.Model.extend({
	defaults : {
	    "position" : { x: 0, y: 0 },
	    "velocity" : { vx: 1, vy: 1 }
	},

	update : function(){
	    this.set({
		position : nextPosition(this.get("position"), this.get("velocity"))
	    });
	},

	reflectVx : function(){
	    this.set({
		velocity : nextVelocity(this.get("velocity"), -1, 1)
	    });
	},

	reflectVy : function(){
	    this.set({
		velocity : nextVelocity(this.get("velocity"), 1, -1)
	    });
	},

	isHeadingRight : function(){
	    return this.get("velocity").vx > 0;
	},

	isHeadingLeft : function(){
	    return this.get("velocity").vx < 0;
	},

	isHeadingUp : function(){
	    return this.get("velocity").vy > 0;
	},

	isHeadingDown : function(){
	    return this.get("velocity").vy < 0;
	},

	capture : function(){
	    this.trigger("captured");
	}
    });

    BallView = Backbone.View.extend({
	initialize : function(){
	    this.model.bind("change:position", function(){
		this.render();
	    }, this);
	    
	    this.render();
	},

	render : function(){
	    var paper = this.paper();
	    var ball = this.model;
	    var position = ball.get("position");
	    paper.circle(position.x, position.y, 5).attr({
		"fill" : "black",
		"stroke" : "none"
	    });
	},

	paper : function(){
	    return this.options.paper;
	}
    });

    Wish.Ball = Ball;
    Wish.BallView = BallView;
})(_, Backbone, Wish);
