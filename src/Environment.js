(function(jQuery, _, Backbone, Wish){
    var Environment = Backbone.Model.extend({
	initialize : function(){
	    var width = this.get("width");
	    var height = this.get("height");

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
	    
	    this.set("ball", ball);
	    this.set(observers);
	},

	update : function(){
	    this.get("ball").update();
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
	}
    });

    Wish.Environment = Environment;
    Wish.EnvironmentView = EnvironmentView;
})(jQuery, _, Backbone, Wish);
