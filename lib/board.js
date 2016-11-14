class Board {
  constructor(game, context) {
    this.game = game;
    this.context = context;
  }

  start() {
  requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    // const timeDelta = time - this.lastTime;
    //
    // this.game.step(timeDelta);
    this.game.draw(this.context);
    // this.lastTime = time;
    //
    //
    requestAnimationFrame(this.animate.bind(this));
  }
}


module.exports = Board;
