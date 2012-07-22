describe("a Ball", function(){
    it("should be defined", function(){
	expect(Wish.Ball).toBeDefined();
    });

    it("should have a default position", function(){
	var ball = new Wish.Ball();

	expect(ball).toBeAt({ x: 0, y: 0});
    });

    it("should have a default velocity", function(){
	var ball = new Wish.Ball();

	expect(ball).toHaveVelocity({ vx: 1, vy: 1});
    });
});
