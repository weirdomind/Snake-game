class Snake {
  constructor() {
    this.pos = createVector(0, 0);
    this.speed = createVector(0, 0);
  }
  show() {
    fill(0, 255, 0);
    strokeWeight(4);
    ellipseMode(CORNER);
    ellipse(this.pos.x, this.pos.y, a, a);
    fill(255);
    strokeWeight(1);
  }
  tailShow() {
    fill(0, 255, 0, 120);
    strokeWeight(4);
    for (var tail of tails) {
      noStroke();
      ellipse(tail.x, tail.y, a, a);
    }
    fill(255);
    strokeWeight(1);
  }
  update() {
    this.pos.x += this.speed.x * a;
    this.pos.y += this.speed.y * a;
  }
  ate(food) {
    if (this.pos.x == food.pos.x && this.pos.y == food.pos.y) {
      return true;
    }
    return false;
  }
}


class Food {
  constructor(pos = createVector(parseInt(random(grid)) * a, parseInt(random(grid)) * a)) {
    this.pos = pos;
  }
  show() {
    fill(255, 0, 0);
    strokeWeight(3);
    ellipse(this.pos.x, this.pos.y, a, a);
    fill(255);
    strokeWeight(1);
  }
}