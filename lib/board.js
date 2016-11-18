const Game = require("./game");

class Board {
  constructor(game, context) {
    this.game = game;
    this.context = context;
    this.score = 0;
    this.entry = true;
    this.muted = false;
    this.muteButton = document.getElementById('mute-button');

    this.explosion = new Audio("audio/explosion.mp3");
    this.title = new Audio("audio/title.mp3");
    this.gameSong = new Audio("audio/gameSong.mp3");
    this.loss = new Audio("audio/loss.mp3");
    this.muteButton.addEventListener("click", () => {this.mute();});
  }

  handleStart() {
    document.getElementById('title-screen').style.display = "none";
    document.getElementById('game-over').style.display = "none";

    this.entry = false;
    this.title.pause();
    this.title.currentTime = 0;
    this.loss.pause();
    this.loss.currentTime = 0;
    this.explosion.pause();
    this.explosion.currentTime = 0;

    this.gameSong.loop = true;
    this.gameSong.volume = .10;

    this.gameSong.play();
    this.game.obstacles.shift();
    this.game.playing = true;
  }

  start() {
    this.game.addShip();
    this.lastTime = 0;

    if (this.entry) {
      this.title.loop = true;
      this.title.volume = .10;
      this.title.play();
    } else {
      this.loss.loop = true;
      this.loss.volume = .10;
      this.loss.play();
    }

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
      this.explosion.volume = .10;
      this.explosion.play();
      this.gameSong.pause();
      this.gameSong.currentTime = 0;

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

    mute() {
      if (this.muted) {
        this.muted = false;
        this.title.muted = false;
        this.gameSong.muted = false;
        this.explosion.muted = false;
        this.loss.muted = false;
        this.muteButton.style.background = "url(http://res.cloudinary.com/dfmvfna21/image/upload/v1479491798/Speaker_Icon_jyta2z.png)";
        console.log(this.muted);
      } else {
        this.muted = true;
        this.title.muted = true;
        this.gameSong.muted = true;
        this.explosion.muted = true;
        this.loss.muted = true;
        this.muteButton.style.background = "url(http://res.cloudinary.com/dfmvfna21/image/upload/v1479491799/Mute_Icon_ntn3kg.png)";
        console.log(this.muted);
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
