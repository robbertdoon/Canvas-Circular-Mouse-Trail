var canvas = document.getElementById('myCanvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillStyle = '#091217';
c.fillRect(0, 0, canvas.width, canvas.height);

var animationStarted = false;
var nrOfFrames = 1;
var filled = true;

canvas.addEventListener('click', function() {
  filled = !filled;
});

var pause = false;

var myX;
var myY;

var myCounter = 0;

function loop() {
  if (pause) return;
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#091217';
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < myArray.length; i++) {
    myArray[i].update();
  }
  myCounter++;
  if (myCounter % nrOfFrames == 0) {
    var x = myX;
    var y = myY;
    var dx = randBetween(-2, 1);
    var dy = randBetween(-2, 2);
    var rad = randBetween(30, 40);
    var grow = 1;
    myArray.push(new Circle(x, y, dx, dy, rad, grow));
  }
  requestAnimationFrame(loop);
}

function deg(num) {
  return Math.PI / 180 * num;
}

function randBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

var myColors = [
  'rgba(255,0,0,',
  'rgba(255,255,255,',
  'rgba(13,70,67,'
]

function Circle(x, y, dx, dy, rad, grow) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.rad = rad;
  this.color = myColors[Math.floor(Math.random() * myColors.length)];
  this.opacity = 1;
  this.grow = grow;
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, deg(360));
    c.lineWidth = 1;
    if (filled) {
      c.fillStyle = this.color + this.opacity + ')';
      c.fill();
    } else {
      c.strokeStyle = this.color + this.opacity + ')';
      c.stroke();
    }
  }
  this.update = function() {
    this.rad -= this.grow;
    if (this.rad <= 1) {
      this.rad = 0;
    }
    this.opacity -= (1 / this.rad) / 2;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
  this.update();
  if (myArray.length > 100) {
    myArray.shift();
  }
}

var myArray = [];

canvas.addEventListener('mouseover', e => {
  myArray = [];
  pause = false;
  if (animationStarted == false) {
    loop();
    animationStarted = true;
  }
});

canvas.addEventListener('mouseout', e => {
  myX = NaN;
  myY = NaN;
});

canvas.addEventListener('mousemove', e => {
  myX = e.x;
  myY = e.y;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})
