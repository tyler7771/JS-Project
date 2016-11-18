const Game = require("./game");

class Board {
  constructor(game, context) {
    this.game = game;
    this.context = context;
    this.score = 0;
  }

  handleStart() {
    document.getElementById('title-screen').style.display = "none";
    document.getElementById('game-over').style.display = "none";
    this.game.obstacles.shift();
    this.game.playing = true;
  }

  start() {
    this.game.addShip();
    this.lastTime = 0;

    const title = new Audio("title.mp3");
    title.loop = true;
    title.volume = .10;
    title.play();

    const canvas = document.getElementById( 'game-over');
    const titleScreen = document.getElementById( 'title-screen');
    requestAnimationFrame(this.animate.bind(this));
    canvas.addEventListener("click", () => {this.handleStart();});
    titleScreen.addEventListener("click", () => {this.handleStart();});
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    const game = this.game;

    game.step(timeDelta);
    game.draw(this.context);

    this.lastTime = time;

    if (game.crash) {
      const explosion = new Audio("explosion.mp3");
      explosion.volume = .10;
      explosion.play();
      if (game.score > game.topScore) {
        this.score = game.score;
      } else {
        this.score = game.topScore;
      }

      this.gameOver();
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  gameOver() {
    // this.backgroundAudio.pause();
    // this.gameOverAudio.currentTime = 0;
    // this.gameOverAudio.play();
    document.getElementById('game-over').style.display = "flex";
    this.game = new Game({ topScore: this.score });
    this.start();
  }
}

module.exports = Board;
