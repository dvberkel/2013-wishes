beforeEach(function() {
    this.addMatchers({
	toBeAt : function(expectedPosition) {
	    actualPosition = this.actual.get("position");
	    return actualPosition.x === expectedPosition.x && actualPosition.y === expectedPosition.y;
	}
    });
});
