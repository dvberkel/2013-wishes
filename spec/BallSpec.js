describe("a Ball", function(){
    var ball;

    beforeEach(function(){
	ball = new Wish.Ball();
    });

    it("should be defined", function(){
	expect(Wish.Ball).toBeDefined();
    });

    it("should have a default position", function(){
	expect(ball).toBeAt({ x: 0, y: 0});
    });

    it("should have a default velocity", function(){
	expect(ball).toHaveVelocity({ vx: 1, vy: 1});
    });
});
