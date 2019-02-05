let canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random (min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }

function Ball (x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;

}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

  Ball.prototype.draw = function() {
      if (this.exists) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
      }
  }

  Ball.prototype.update = function () {
      if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
      }
      if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
  }
  var balls = [];

  Ball.prototype.collisionDetect = function () {
    for (let j = 0; j<balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
  }

  function EvilCircle (x, y, velX, velY, exists) {
      Shape.call(this, x, y, 20, 20, exists);
      this.color = 'white';
      this.size = 10;
  }
  EvilCircle.prototype = Object.create(Shape.prototype);
  EvilCircle.prototype.constructor = EvilCircle;

  EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  EvilCircle.prototype.checkBounds = function () {
    if ((this.x + this.size) >= width) {
        this.x -=  10;
    }

    if ((this.x - this.size) <= 0) {
        this.x += 10;
    }

    if ((this.y + this.size) >= height) {
        this.y -= 10;
    }
    if ((this.y - this.size) <= 0) {
        this.y += 10;
    }
    }

    EvilCircle.prototype.setControls = function () {
        var _this = this;
        window.onkeydown = function(e) {
            if (e.keyCode === 65) {
            _this.x -= _this.velX;
            } else if (e.keyCode === 68) {
            _this.x += _this.velX;
            } else if (e.keyCode === 87) {
            _this.y -= _this.velY;
            } else if (e.keyCode === 83) {
            _this.y += _this.velY;
            }
        }
    }

    EvilCircle.prototype.collisionDetect = function () {
        for (let j = 0; j<balls.length; j++) {
            if (balls[j].exists) {
                var dx = this.x - balls[j].x;
                var dy = this.y - balls[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.size + balls[j].size) {
                    balls[j].exists = false;
                }
            }
        }
    }
/*
class Ball {
    constructor (x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    update () {
      if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
      }
      if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
    }
    collisionDetect () {
        for (let j = 0; j<balls.length; j++) {
            if (!(this === balls[j])) {
                var dx = this.x - balls[j].x;
                var dy = this.y - balls[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                }
            }
        }
    }
}
*/
var balls = [];

var eBall = new EvilCircle(10, 10, 20, 20, true);
eBall.setControls();

function loop () {


    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width, height);

    while (balls.length < 25) {
        var size = random(10, 20);
        var ball = new Ball (
            // ball position always drawn at least one ball width
              // away from the edge of the canvas, to avoid drawing errors
              random(0 + size,width - size),
              random(0 + size,height - size),
              random(-7,7),
              random(-7,7),
              true,
              'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
              size
        );
        balls.push (ball);
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    eBall.draw();
    eBall.checkBounds();
    eBall.collisionDetect();

    requestAnimationFrame(loop);
}

loop();
