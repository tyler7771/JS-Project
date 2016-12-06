const MovingObject = require("./moving_object");

class Obstacle extends MovingObject {
  constructor(options = {}) {
  	options.image = 'rock';
    options.pos =  options.pos || options.game.randomPosition();
    options.size = [50, 150];
    options.velocity = options.velocity || [-5, 0];
    super(options);
  }

}

module.exports = Obstacle;
