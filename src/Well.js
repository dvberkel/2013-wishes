(function(_, Backbone, Wish){
    var Well = Backbone.Model.extend({
	capture : function(aBall){
	    aBall.capture();
	},

	observe : function(aBall) {
	    aBall.bind("change:position", function(){
		this.capture(aBall);
	    }, this);
	}
    });

    Wish.Well = Well;
})(_, Backbone, Wish);
