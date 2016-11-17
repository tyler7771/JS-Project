const Game = require("./game");
const Board = require("./board");
const Ship = require("./ship");

document.addEventListener("DOMContentLoaded", function(){
  const canvasElement = document.getElementsByTagName("canvas")[0];
  canvasElement.width = Game.DIMENSION_X;
  canvasElement.height = Game.DIMENSION_Y;

  const context = canvasElement.getContext("2d");
  const game = new Game();
  const board = new Board(game, context).start();
});
