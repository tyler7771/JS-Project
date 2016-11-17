class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.velocity = options.velocity;
    this.size = options.size;
    this.image = options.image;
  }

  draw(context) {
    const img = document.getElementById(`${this.image}`);
    context.drawImage(img, this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }

  move(timeDelta) {
    const scale = timeDelta / NORMAL_TIME_DELTA;
    const newX = this.velocity[0] * scale;
    const newY = this.velocity[1] * scale;

    this.pos = [this.pos[0] + newX, this.pos[1] + newY];
  }
}

const NORMAL_TIME_DELTA = 1000/60;

module.exports = MovingObject;
