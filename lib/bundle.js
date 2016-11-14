/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const Board = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvasElement = document.getElementsByTagName("canvas")[0];
	  canvasElement.width = Game.DIM_X;
	  canvasElement.height = Game.DIM_Y;
	
	  const context = canvasElement.getContext("2d");
	  const game = new Game();
	  new Board(game, context).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map