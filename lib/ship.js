const MovingObject = require("./moving_object");

class Ship extends MovingObject {
  constructor(options = {}) {
  	options.image = 'falcon';
    options.pos =  [300, 200];
    options.size = [100, 100];
    options.velocity = [0, 0];
    super(options);
  }

  movementUp() {
    this.velocity = [0, -4];
  }

  movementDown() {
    this.velocity = [0, 5];
  }
}

module.exports = Ship;
