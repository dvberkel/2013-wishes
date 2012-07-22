beforeEach(function() {
    this.addMatchers({
	toBeAt : function(expectedPosition) {
	    actualPosition = this.actual.get("position");
	    return actualPosition.x === expectedPosition.x && actualPosition.y === expectedPosition.y;
	},

	toHaveVelocity : function(expectedVelocity) {
	    actualVelocity = this.actual.get("velocity");
	    return actualVelocity.vx === expectedVelocity.vx && actualVelocity.vy === expectedVelocity.vy;
	},

	toBeLocatedAt : function(expectedLocation){
	    actualLocation = this.actual.get("x");
	    return actualLocation === expectedLocation;
	},

	toHaveExtend : function(expectedExtend){
	    actualExtend = this.actual.get("extend");
	    return actualExtend.width === expectedExtend.width && actualExtend.height === expectedExtend.height;
	}
    });
});
