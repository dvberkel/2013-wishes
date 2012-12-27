(function(jQuery, _, Backbone, Wish){
    var Environment = Backbone.Model.extend({
	initialize : function(){
	    var width = this.get("width");
	    var height = this.get("height");
	    var horizontalBrickCount = this.get("horizontalBrickCount");
	    var verticalBrickCount = this.get("verticalBrickCount");

	    var ball = new Wish.Ball({ "position" : { x: 50, y: 30}, "velocity" : { vx: 1, vy: 1}});

	    var observers = {
		"leftWall" : new Wish.Wall({ x: 0 }),
		"rightWall" : new Wish.Wall({ x: width }),
		"ceiling" : new Wish.Ceiling({ y: height }),
		"paddle" : new Wish.Paddle({ "position" : { x: width/2, y: 20 } })
	    };

	    for (key in observers) {
		observers[key].observe(ball);
	    }
	    
	    var bricks = [];
	    var brickWidth = width / horizontalBrickCount;
	    var brickHeight = 20;
	    for (var x = 0; x < horizontalBrickCount; x++) {
		for(var y = 0; y < verticalBrickCount; y++) {
		    var brick = new Wish.Brick({
			position : { 
			    "x" : (x + 0.5) * brickWidth, 
			    "y" : (y + 0.5) * brickHeight + height/2
			},
			extend : { "width" : brickWidth, "height" : brickHeight }
		    });
		    brick.observe(ball);
		    bricks.push(brick);
		}
	    }
	    
	    this.set("ball", ball);
	    this.set(observers);
	    this.set("bricks", bricks);
	    this.set("key", new Wish.Key());
	},

	update : function(){
	    this.get("ball").update();
	    var key = this.get("key");
	    if (key.pressedLeft()) {
		this.movePaddleLeft();
	    }
	    if (key.pressedRight()) {
		this.movePaddleRight();
	    }
	},

	movePaddleLeft : function(){
	    this.get("paddle").moveLeft();
	},

	movePaddleRight : function(){
	    this.get("paddle").moveRight();
	}
    });

    var EnvironmentView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},

	render : function(){
	    var paper = this.options.paper;
	    var model = this.model;

	    new Wish.WallView({ "model" : model.get("leftWall"), "paper" : paper });
	    new Wish.WallView({ "model" : model.get("rightWall"), "paper" : paper });
	    new Wish.CeilingView({ "model" : model.get("ceiling"), "paper" : paper });
	    new Wish.BallView({ "model" : model.get("ball"), "paper": paper });
	    new Wish.PaddleView({ "model": model.get("paddle"), "paper": paper});	    
	    _.each(this.model.get("bricks"), function(brick){
		new Wish.BrickView({ "model" : brick, "paper" : paper });
	    });
	}
    });

    Wish.Environment = Environment;
    Wish.EnvironmentView = EnvironmentView;
})(jQuery, _, Backbone, Wish);
