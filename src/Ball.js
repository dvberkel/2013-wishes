(function(_, Backbone, Wish, undefined){
    var Ball = Backbone.Model.extend({
	defaults : {
	    "position" : { x: 0, y: 0 },
	    "velocity" : { vx: 1, vy: 1 }
	},

	update : function(){
	    var position = this.get("position");
	    var velocity = this.get("velocity");

	    this.set({ "position" : {
		x: position.x + velocity.vx,
		y: position.y + velocity.vy
	    }});
	}
    });

     Wish.Ball = Ball;
})(_, Backbone, Wish);
