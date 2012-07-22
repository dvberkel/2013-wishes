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

    it("should move on update", function(){
	var position = ball.get("position");
	var velocity = ball.get("velocity");

	ball.update();

	expect(ball).toBeAt({ x: position.x + velocity.vx, y: position.y + velocity.vy });
	expect(ball).toHaveVelocity(velocity);
    });
});
