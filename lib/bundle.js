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
	const Ship = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvasElement = document.getElementsByTagName("canvas")[0];
	  canvasElement.width = Game.DIMENSION_X;
	  canvasElement.height = Game.DIMENSION_Y;
	
	  const context = canvasElement.getContext("2d");
	  const game = new Game();
	  const board = new Board(game, context).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Obstacle = __webpack_require__(4);
	const Ship = __webpack_require__(5);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	class Board {
	  constructor(game, context) {
	    this.game = game;
	    this.context = context;
	    this.score = 0;
	    this.entry = true;
	    this.muteButton = document.getElementById('mute-button');
	
	    this.explosion = new Audio("audio/explosion.mp3");
	    this.title = new Audio("audio/title.mp3");
	    this.gameSong = new Audio("audio/gameSong.mp3");
	    this.loss = new Audio("audio/loss.mp3");
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
	
	    this.muteButton.addEventListener("click", () => {this.mute();});
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
	      if (this.title.muted ) {
	          this.title.muted = false;
	          this.gameSong.muted = false;
	          this.explosion.muted = false;
	          this.loss.muted = false;
	          this.muteButton.style.background = "url(http://res.cloudinary.com/dfmvfna21/image/upload/v1479491798/Speaker_Icon_jyta2z.png)";
	      } else {
	        this.title.muted = true;
	        this.gameSong.muted = true;
	        this.explosion.muted = true;
	        this.loss.muted = true;
	          this.muteButton.style.background = "url(http://res.cloudinary.com/dfmvfna21/image/upload/v1479491799/Mute_Icon_ntn3kg.png)";
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	class MovingObject {
	  constructor(options) {
	    this.pos = options.pos;
	    this.velocity = options.velocity;
	    this.size = options.size;
	    this.image = options.image;
	
	    this.frameIndex = 0;
	    this.tickCount = 0;
	  }
	
	  draw(context) {
	    const img = document.getElementById(`${this.image}`);
	
	    if (img.id === 'falcon') {
	      const imgSprite = this.sprite({
	        context: context,
	        width: 3000,
	        height: 100,
	        image: img,
	        numberOfFrames: 30,
	        ticksPerFrame: 3
	      });
	
	      imgSprite.update();
	      imgSprite.render();
	
	    } else {
	      context.drawImage(
	        img,
	        this.pos[0],
	        this.pos[1],
	        this.size[0],
	        this.size[1]
	      );
	    }
	
	  }
	
	  move(timeDelta) {
	    const scale = timeDelta / NORMAL_TIME_DELTA;
	    const newX = this.velocity[0] * scale;
	    const newY = this.velocity[1] * scale;
	
	    this.pos = [this.pos[0] + newX, this.pos[1] + newY];
	  }
	
	  sprite(options) {
	    let that = {},
	      ticksPerFrame = options.ticksPerFrame || 0,
	      numberOfFrames = options.numberOfFrames || 1;
	
	    that.context = options.context;
	    that.width = options.width;
	    that.height = options.height;
	    that.image = options.image;
	
	    that.update = function () {
	      this.tickCount += 1;
	      if (this.tickCount > ticksPerFrame) {
	        this.tickCount = 0;
	        if (this.frameIndex < numberOfFrames - 1) {
	          this.frameIndex += 1;
	        } else {
	          this.frameIndex = 0;
	        }
	      }
	    }.bind(this);
	
	    that.render = function () {
	      that.context.drawImage(
	        that.image,
	        this.frameIndex * that.width / numberOfFrames,
	        0,
	        that.width / numberOfFrames,
	        that.height,
	        this.pos[0],
	        this.pos[1],
	        that.width / numberOfFrames,
	        that.height);
	    }.bind(this);
	    return that;
	  }
	}
	
	const NORMAL_TIME_DELTA = 1000/60;
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	
	class Ship extends MovingObject {
	  constructor(options = {}) {
	  	options.image = 'falcon';
	    options.pos =  [300, 200];
	    options.size = [100, 100];
	    options.velocity = [0, 0];
	    super(options);
	    this.bindEvents();
	  }
	
	  bindEvents() {
	    window.onkeydown = (event) => {
	      if (event.keyCode === 32) {
	        this.movementUp();
	      }
	    };
	
	    window.onkeyup = (event) => {
	      if (event.keyCode === 32) {
	        this.movementDown();
	      }
	    };
	
	    window.onclickdown = (event) => {
	      if (event.keyCode === 32) {
	        this.movementUp();
	      }
	    };
	
	    window.onclickup = (event) => {
	      if (event.keyCode === 32) {
	        this.movementDown();
	      }
	    };
	  }
	
	  movementUp() {
	    this.velocity = [0, -4];
	  }
	
	  movementDown() {
	    this.velocity = [0, 5];
	  }
	}
	
	module.exports = Ship;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map