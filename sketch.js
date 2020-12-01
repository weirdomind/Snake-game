function setup() {
  createCanvas(300, 300);
  grid = 20;
  a = width / grid;
  mode = "No Boundary"
  initialize();
  frameRate(grid / 3);
  //frameRate(1)
  p = createP("");
  noStroke();
  createPads();
  restart = createButton("Restart")
  restart.size(70, 50)
  restart.position(238, 430)
  restart.mousePressed(revive)
  cheat = createButton("Cheat")
  cheat.mousePressed(addTail)
  cheat.position(238, 360)
  cheat.size(70, 70)
}

function draw() {
  p.html(big);
  background(255);
  tails.shift();
  tail = snake.pos.copy();
  if (big != 0) {
    tails.push(tail);
  }
  if (snake.ate(food)) {
    food = foodLocation();
    addTail();
  }
  snake.update();
  if (boundaryDead() && mode == "Boundary") {
    kill();
  }
  boundary();
  if (selfEat()) {
    kill();
  } else {
    snake.tailShow();
    food.show();
    snake.show();
  }
}