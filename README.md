# Never Tell Me the Odds

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1479496494/Screen_Shot_2016-11-18_at_10.54.49_AM_yi8lsn.png)

[Live Site](https://tyler7771.github.io/NeverTellMeTheOdds/)

Users fly the Millennium Falcon through an astroid field in this fun, simple, and addicting game. Press the space bar to make the ship go up and release and the ship will fall. The game ends when they crash their ship into an object or the boundaries of the screen.

## Features & Implementation

The game is made using vanilla JavaScript. It tracks the score over the course of the game and store's the user's high score for the life of the window. As the user's score gets higher the astroids travel faster towards the ship making the game more difficult.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1479496472/Screen_Shot_2016-11-18_at_11.12.51_AM_mpvrwg.png)

#### Ship movement

I use a sprite to animate the ship back and forth as the user plays the game. The animation is done through tracking the animation point of the ship and on the next frame rendering incrementing the frame position to render a new position of the ship. The portion of the code that does that looks like this:

```js
constructor() {
  this.frameIndex = 0;
  this.tickCount = 0;
}

draw(context) {
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
```

### Game Over

When the user collides the ship with an asteroid there is an explosion and a game over page is rendered.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1479496490/Screen_Shot_2016-11-18_at_10.53.18_AM_owrekt.png)

On every frame step there is a check for a crash. The checkCrash method looks at the the position of the ship and each obstacle on the screen and checks if the positions of the two items would be a crash. If there is a crash it returns true and the game over sequence run. If there's no crash, the game continues to run until there is one.

```js
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
```

## Future Additions to the Site

I had an absolute blast making this game and would love to keep adding on to it!

### Different Ships and Planets

I'd love to add other ships and planets from the Star Wars universe to allow users to choose the ship they want to fly and where they want to fly it.

### Gravity changing

Add a feature that allows users to choose the gravity of the game. If they find it too hard make the ship down slower, or if they find it too easy make the ship go down faster.

### Custom backgrounds

Allow users to upload their own custom backgrounds by utilizing cloudinary's upload widget so they can fly their favorite ships anywhere they want!
