const Game = require("./game");
const Board = require("./board");

document.addEventListener("DOMContentLoaded", function(){
  const canvasElement = document.getElementsByTagName("canvas")[0];
  canvasElement.width = Game.DIM_X;
  canvasElement.height = Game.DIM_Y;

  const context = canvasElement.getContext("2d");
  const game = new Game();
  new Board(game, context).start();
});
