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
