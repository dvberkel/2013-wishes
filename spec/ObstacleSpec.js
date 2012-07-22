describe("an Obstacle", function(){
    describe("(a Wall)", function(){
	it("should be defined", function(){
	    expect(Wish.Wall).toBeDefined();
	});

	it("should have a default location", function(){
	    var wall = new Wish.Wall();

	    expect(wall.get("x")).toBe(0);
	    expect(wall).toBeLocatedAt(0);
	})

	it("should bounce back balls from the left", function(){
	    var ball = new Wish.Ball({ "velocity" : { vx: 1, vy: 0  }});
	    new Wish.Wall({ "x" : 1 }).observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: -1, vy: 0 });
	});

	it("should bounce back balls from the right", function(){
	    var ball = new Wish.Ball({ "velocity" : { vx: -1, vy: 0  }});
	    new Wish.Wall({ "x" : -1 }).observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 1, vy: 0 });
	});


	it("should bounce back high velocity balls from the left", function(){
	    var ball = new Wish.Ball({ velocity : { vx : 3, vy : 0 } });
	    new Wish.Wall({ x : 4 }).observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx : -3, vy : 0 });
	});

	it("should bounce back high velocity balls from the right", function(){
	    var ball = new Wish.Ball({ velocity : { vx : -3, vy : 0 } });
	    new Wish.Wall({ x : -4 }).observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx : 3, vy : 0 });
	});

    });
});
