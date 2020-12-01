function keyPressed() {
  if (keyCode == UP_ARROW && snake.speed.y != 1) {
    fUp();
  } else if (keyCode == DOWN_ARROW && snake.speed.y != -1) {
    fDown();
  } else if (keyCode == LEFT_ARROW && snake.speed.x != 1) {
    fLeft();
  } else if (keyCode == RIGHT_ARROW && snake.speed.x != -1) {
    fRight();
  } else if (keyCode == 32) {
    addTail();
    tails[tails.length - 1].x = -snake.speed.x * a;
    tails[tails.length - 1].y = -snake.speed.y * a;
  }
  if (killed) {
    revive();
  }
}

function fUp() {
  if (snake.speed.y != 1) {
    snake.speed.x = 0;
    snake.speed.y = -1;
  }
}

function fDown() {
  if (snake.speed.y != -1) {
    snake.speed.x = 0;
    snake.speed.y = 1;
  }
}

function fRight() {
  if (snake.speed.x != -1) {
    snake.speed.x = 1;
    snake.speed.y = 0;
  }
}
function fLeft() {
  if (snake.speed.x != 1) {
    snake.speed.x = -1;
    snake.speed.y = 0;
  }
}

function boundary() {
  fill(0, 0, 0, 0);
  stroke(0);
  rect(0, 0, width, height);
  noStroke();
  if (snake.pos.x == width) {
    snake.pos.x = 0;
  } else if (snake.pos.x == -a) {
    snake.pos.x = width-a;
  }
  if (snake.pos.y == height) {
    snake.pos.y = 0;
  } else if (snake.pos.y == -a) {
    snake.pos.y = height-a;
  }
}

function boundaryDead() {
  if (snake.pos.x < 0 || snake.pos.x + a > width || snake.pos.y < 0 || snake.pos.y + a > height) {
    return true;
  }
  return false;
}

function addTail() {
  tail = snake.pos.copy();
  tails.push(tail);
  big++;
}

function toggleMode() {
  if (mode == "Boundary") {
    mode = " No Boundary"
  } else {
    mode = "Boundary"
  }
  modeButton.html(mode)
}

function createPads() {
  modeButton = createButton("Mode")
  modeButton.position(238, height + 10)
  modeButton.size(70, 50)
  modeButton.mousePressed(toggleMode)
  up = createButton("⬆️");
  up.position(80, 310);
  up.size(140, 50);
  left = createButton("⬅️");
  left.position(80, 360);
  left.size(70, 70);
  right = createButton("➡️");
  right.position(150, 360);
  right.size(70, 70);
  down = createButton("⬇️");
  down.position(80, 430);
  down.size(140, 50);
  up.mousePressed(fUp);
  down.mousePressed(fDown);
  right.mousePressed(fRight);
  left.mousePressed(fLeft);
}

function revive() {
  snake.pos = createVector(grid / 2 * a, grid / 2 * a);
  initialize();
  loop();
  killed = false;
}

function initialize() {
  killed = false
  snake = new Snake();
  tails = [];
  food = foodLocation();
  big = 0;
}

function kill() {
  background(50);
  noLoop();
  print("Killed");
  stroke(255);
  textSize(100);
  if (big < 10) {
    textx = width / 2 - 30;
  } else {
    textx = width / 2 - 50;
  }
  text(big, textx, height / 2 + 30);
  stroke(0);
  killed = true;
  return;
}

function foodLocation() {
  food = new Food();
  c = false;
  for (var tail of tails) {
    if (dist(tail.x, tail.y, food.pos.x, food.pos.y) < 1) {
      foodLocation();
    }
  }
  if (dist(snake.pos.x, snake.pos.y, food.pos.x, food.pos.y) < 1) {
    foodLocation();
  }
  return food;
}

function selfEat() {
  for (var tail of tails) {
    if (dist(tail.x, tail.y, snake.pos.x, snake.pos.y) < 1) {
      return true;
    }
  }
  return false;
}