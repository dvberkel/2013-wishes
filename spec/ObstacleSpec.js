describe("an Obstacle", function(){
    describe("(a Wall)", function(){
	it("should be defined", function(){
	    expect(Wish.Wall).toBeDefined();
	});

	it("should have a default location", function(){
	    var wall = new Wish.Wall();

	    expect(wall).toBeLocatedAt(0);
	});

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
	var brick;

	beforeEach(function(){
	    brick = new Wish.Brick({ "position" : { x: 0, y: 0 }, "extend" : { width: 1, height: 1} });
	});

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

	it("should bounce back balls from the left", function(){
	    var ball = new Wish.Ball({ "position" : { x: -2, y: 0 }, "velocity" : { vx: 1, vy: 0  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: -1, vy: 0 });
	});

	it("should let high flying balls moving right pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: -2, y: 1 }, "velocity" : { vx: 1, vy: 0  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 1, vy: 0 });
	});

	it("should let low flying balls moving right pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: -2, y: -1 }, "velocity" : { vx: 1, vy: 0  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 1, vy: 0 });
	});

	it("should bounce back balls from the right", function(){
	    var ball = new Wish.Ball({ "position" : { x: 2, y: 0 }, "velocity" : { vx: -1, vy: 0  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 1, vy: 0 });
	});

	it("should let high flying balls moving left pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: 2, y: 1 }, "velocity" : { vx: -1, vy: 0  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: -1, vy: 0 });
	});

	it("should let low flying balls moving left pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: 2, y: -1 }, "velocity" : { vx: -1, vy: 0  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: -1, vy: 0 });
	});

	it("should let balls out of range moving left pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: 10, y: 0 }, "velocity" : { vx: -1, vy: 0  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: -1, vy: 0 });
	});

	it("should let balls out of range moving right pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: 1, y: 0 }, "velocity" : { vx: 1, vy: 0  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 1, vy: 0 });
	});

	it("should bounce back balls from below", function(){
	    var ball = new Wish.Ball({ "position" : { x: 0, y: -2 }, "velocity" : { vx: 0, vy: 1  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 0, vy: -1 });
	});

	it("should let far left flying balls moving up pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: -2, y: -2 }, "velocity" : { vx: 0, vy: 1 }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 0, vy: 1 });
	});

	it("should let far right flying balls moving up pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: 2, y: -2 }, "velocity" : { vx: 0, vy: 1  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 0, vy: 1 });
	});

	it("should bounce back balls from above", function(){
	    var ball = new Wish.Ball({ "position" : { x: 0, y: 2 }, "velocity" : { vx: 0, vy: -1  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 0, vy: 1 });
	});

	it("should let far left flying balls moving down pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: -2, y: 2 }, "velocity" : { vx: 0, vy: -1  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 0, vy: -1 });
	});

	it("should let far right flying balls moving down pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: 2, y: 2 }, "velocity" : { vx: 0, vy: -1  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 0, vy: -1 });
	});

	it("should let balls out of range moving down pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: 0, y: 10 }, "velocity" : { vx: 0, vy: -1  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 0, vy: -1 });
	});

	it("should let balls out of range moving up pass", function(){
	    var ball = new Wish.Ball({ "position" : { x: 0, y: -10 }, "velocity" : { vx: 0, vy: 1  }});
	    brick.observe(ball);

	    ball.update();

	    expect(ball).toHaveVelocity({ vx: 0, vy: 1 });
	});
    });
});
