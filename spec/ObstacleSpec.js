describe("an Obstacle", function(){
    describe("(a Wall)", function(){
	it("should be defined", function(){
	    expect(Wish.Wall).toBeDefined();
	});

	it("should have a default location", function(){
	    var wall = new Wish.Wall();

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

    describe("(a Ceiling)", function(){
	it("should be defined", function(){
	    expect(Wish.Ceiling).toBeDefined();
	});

	it("should bounce back balls from below", function(){
	    var ball = new Wish.Ball({ velocity : { vx : 0, vy : 1 } });
	    new Wish.Ceiling({ y : 1 }).observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx : 0, vy : -1 });
	});

	it("should bounce back high velocity balls from below", function(){
	    var ball = new Wish.Ball({ velocity : { vx : 0, vy : 3 } });
	    new Wish.Ceiling({ y : 4 }).observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx : 0, vy : -3 });
	});
    });

    describe("(a Brick)", function(){
	it("should be  defined", function(){
	    expect(Wish.Brick).toBeDefined();
	});
	
	it("should have a default position", function(){
	    var brick = new Wish.Brick();

	    expect(brick).toBeAt({ x: 0, y: 0});
	});

	it("should have a default extend", function(){
	    var brick = new Wish.Brick();

	    expect(brick).toHaveExtend({ width : 5, height: 3 });
	});
    });
});
