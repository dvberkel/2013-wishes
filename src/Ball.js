(function(_, Backbone, Wish, undefined){
    var Ball = Backbone.Model.extend({
	defaults : {
	    "position" : { x: 0, y: 0 },
	    "velocity" : { vx: 1, vy: 1 }
	}
    });

     Wish.Ball = Ball;
})(_, Backbone, Wish);
