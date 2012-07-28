describe("a Paddle", function(){
    it("should be defined", function(){
	expect(Wish.Paddle).toBeDefined();
    });

    it("should be a Brick", function(){
	var paddle = new Wish.Paddle();

	expect(paddle).toBeInstanceOf(Wish.Brick);
    });

    it("should have a default displacementSize", function(){
	var paddle = new Wish.Paddle();

	expect(paddle).toHaveDisplacementSize(3);
    });

    it("should be able to move left", function(){
	var paddle = new Wish.Paddle();
	var originalPosition = paddle.get("position");
	var displacementSize = paddle.get("displacementSize");

	paddle.moveLeft();

	expect(paddle).toBeAt({ x: originalPosition.x - displacementSize, y: originalPosition.y});
    });

    it("should be able to move right", function(){
	var paddle = new Wish.Paddle();
	var originalPosition = paddle.get("position");
	var displacementSize = paddle.get("displacementSize");

	paddle.moveRight();

	expect(paddle).toBeAt({ x: originalPosition.x + displacementSize, y: originalPosition.y});
    });
});
