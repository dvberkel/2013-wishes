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
});
