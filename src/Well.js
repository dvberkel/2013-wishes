(function(_, Backbone, Wish){
    var Well = Backbone.Model.extend({
	defaults : { y : 0 },
	
	capture : function(aBall){
	    aBall.capture();
	},

	observe : function(aBall) {
	    aBall.bind("change:position", function(){
		if (aBall.get("position").y < this.get("y") ) {
		    this.capture(aBall);
		}
	    }, this);
	}
    });

    Wish.Well = Well;
})(_, Backbone, Wish);
