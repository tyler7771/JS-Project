const Game = require("./game");

class Board {
  constructor(game, context) {
    this.game = game;
    this.context = context;
  }

  handleStart() {
    this.game.obstacles.shift();
    this.game.playing = true;
  }

  start() {
    this.game.addShip();
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
    document.addEventListener("click", () => {this.handleStart();});
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    const game = this.game;

    game.step(timeDelta);
    game.draw(this.context);

    this.lastTime = time;

    if (game.crash) {
      if (game.score > game.topScore) {
        const score = game.score;
        this.game = new Game({ topScore: score });
      } else {
        const score = game.topScore;
        this.game = new Game({ topScore: score });
      }
      this.start();
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

module.exports = Board;
