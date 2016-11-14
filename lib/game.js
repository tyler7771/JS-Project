class Game {
  constructor() {

  }


  draw(context) {
    const background = new Image();
    background.src = 'http://res.cloudinary.com/dfmvfna21/image/upload/v1479154795/maxresdefault_x7wf8q.jpg';

  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  background.onload = function(){
    const pattern = context.createPattern(this, "repeat");
    context.fillStyle = pattern;
    context.fill();
  };
  context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  context.clearRect(100, 100, 50, 150);
  context.fillStyle = '#98FB98';
  context.fillRect(100, 100, 50, 150);
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 550;

module.exports = Game;
