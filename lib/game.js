const Obstacle = require("./obstacle");
const Ship = require("./ship");

class Game {
  constructor(options = {}) {
    this.obstacles = [new Obstacle({ game: this, velocity: [0, 0] })];
    this.ship = [];
    this.score = 0;
    this.topScore = options.topScore || 0;

    this.crash = false;
    this.playing = false;
  }

  draw(context) {
    const background = new Image();
    background.src = 'http://res.cloudinary.com/dfmvfna21/image/upload/v1479224549/maxresdefault_lpdks4.jpg';

    context.clearRect(0, 0, Game.DIMENSION_X, Game.DIMENSION_Y);
    background.onload = function(){
      const pattern = context.createPattern(this, "repeat");
      context.fillStyle = pattern;
    };
    context.fillRect(0, 0, Game.DIMENSION_X, Game.DIMENSION_Y);

    context.font = "30px Sans-serif";
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.strokeText(`Current Score: ${this.score}`, 10, 30);
    context.fillStyle = 'black';
    context.fillText(`Current Score: ${this.score}`, 10, 30);

    context.font = "30px Sans-serif";
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.strokeText(`Top Score: ${this.topScore}`, 760, 30);
    context.fillStyle = 'black';
    context.fillText(`Top Score: ${this.topScore}`, 760, 30);

    this.allObjects().forEach((object) => {
      object.draw(context);
    });
  }

  add(object) {
    if (object instanceof Obstacle) {
      this.obstacles.push(object);
    } else if (object instanceof Ship) {
      this.ship.push(object);
    }
  }

  addObstacle(vel) {
    if (this.obstacles.length === 0 ||
        this.obstacles[(this.obstacles.length - 1)].pos[0] < 500 &&
        this.obstacles[(this.obstacles.length - 1)].pos[0] > 490) {
          if (this.score < 1000) {
            this.add(new Obstacle({ game: this }));
          } else if (this.score < 2000) {
            this.add(new Obstacle({ game: this, velocity: [-6, 0] }));
          } else if (this.score < 3000) {
            this.add(new Obstacle({ game: this, velocity: [-7, 0] }));
          } else if (this.score < 4000) {
            this.add(new Obstacle({ game: this, velocity: [-8, 0] }));
          } else {
            this.add(new Obstacle({ game: this, velocity: [-9, 0] }));
          }
    }
  }

  addShip() {
    const ship = new Ship({ game: this });
    this.add(ship);
    return ship;
  }

  removeObstacle() {
    if (this.obstacles.length > 0 && this.obstacles[0].pos[0] < -50) {
      this.obstacles.shift();
    }
  }

  allObjects() {
    return [].concat(this.obstacles, this.ship);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  step(time) {
    this.moveObjects(time);
    const crash = this.checkCrash();

    if (crash) {
      this.crash = true;
    } else {
      this.addObstacle();
      this.removeObstacle();
      if (this.playing) {
        this.score += 1;
      }
    }
  }

  checkCrash() {
    const ship = this.ship[0];
    let returnValue = false;

    this.obstacles.forEach((obstacle) => {
      if (obstacle.pos[0] > 249 && obstacle.pos[0] < 398) {
        if (ship.pos[1] > obstacle.pos[1]
          && (ship.pos[1] + 100) < (obstacle.pos[1] + 150)) {
            returnValue = true;
        } else if ((ship.pos[1] < obstacle.pos[1])
          && (ship.pos[1] + 70) > (obstacle.pos[1])) {
            returnValue = true;
        } else if ((ship.pos[1] < (obstacle.pos[1] + 120))
          && (ship.pos[1] + 100) > (obstacle.pos[1] + 150)) {
            returnValue = true;
        }
      } else if (ship.pos[1] <= -25 || ship.pos[1] >= 425){
        returnValue = true;
      }
    });
    return returnValue;
  }

  randomPosition() {
    return [
      999,
      350 * Math.random()
    ];
  }
}

Game.DIMENSION_X = 1000;
Game.DIMENSION_Y = 500;

module.exports = Game;
