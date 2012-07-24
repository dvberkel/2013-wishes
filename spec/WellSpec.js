describe("a Well", function(){
    it("should be defined", function(){
	expect(Wish.Well).toBeDefined();
    });

    it("should capture balls", function(){
	var ball = new Wish.Ball({ "position" : { x: 0, y: 1}, "velocity" : { vx: 0, vy: -1 }});
	var captured = false; ball.bind("captured", function(){ captured = true;});
	new Wish.Well({ y : 0 }).observe(ball);

	ball.update();

	expect(captured).toBe(true);
    });
});
