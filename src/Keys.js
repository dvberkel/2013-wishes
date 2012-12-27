(function(_, Wish, undefined){
    var Key = function(){
	var keys = {
	    "Left" : 37, 
	    "Right" : 39
	};

	var isPressed = {};
	var pressed = function(key) {
	    return function(){
		return isPressed[key];
	    }
	}
	
	var self = this;
	_.each(keys, function(value, key){
	    self["pressed" + key] = pressed(value);
	});
	
	var eventHandler = function(value) {
	    return function(event){
		var key = event.keyCode;
		if (_.contains(_.values(keys), key)) {
		    isPressed[key] = value;
		}
	    }
	}
	
	window.addEventListener("keydown", eventHandler(true));
	window.addEventListener("keyup", eventHandler(false));
    }


    Wish.Key = Key;
})(_, Wish);
