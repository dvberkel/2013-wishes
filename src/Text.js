(function($, _, Backbone, Wish, undefined){
    var TextView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},

	render : function(){
	    var paper = this.paper();
	    var text = paper.text(5, paper.height/2, this.model.get("wish"));
	    text.attr({
		"text-anchor" : "start",
		"font-family" : "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
		"font" : "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
		"font-size" : 10
	    });
	    var bbox = text.getBBox();
	    text.translate(0, bbox.height/2);
	},

	paper : function(){
	    return this.options.paper;
	}
    });

    Wish.TextView = TextView;
})(jQuery, _, Backbone, Wish);
