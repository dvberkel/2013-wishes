beforeEach(function() {
    this.addMatchers({
	toBeAt : function(expectedPosition) {
	    var actualPosition = this.actual.get("position");
	    return actualPosition.x === expectedPosition.x && actualPosition.y === expectedPosition.y;
	},

	toHaveVelocity : function(expectedVelocity) {
	    var actualVelocity = this.actual.get("velocity");
	    return actualVelocity.vx === expectedVelocity.vx && actualVelocity.vy === expectedVelocity.vy;
	},

	toBeLocatedAt : function(expectedLocation){
	    var actualLocation = this.actual.get("x");
	    return actualLocation === expectedLocation;
	},

	toHaveExtend : function(expectedExtend){
	    var actualExtend = this.actual.get("extend");
	    return actualExtend.width === expectedExtend.width && actualExtend.height === expectedExtend.height;
	},
	
	toBeInstanceOf : function(expectedSuper){
	    return this.actual instanceof expectedSuper;
	},

	toHaveDisplacementSize : function(expectedDisplacementSize) {
	    return this.actual.get("displacementSize") === expectedDisplacementSize;
	},

	toBeDestroyed : function() {
	    return this.actual.get("destroyed") === true;
	}			 
    });
});
