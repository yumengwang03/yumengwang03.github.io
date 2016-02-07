var inkDrop;
var inkDropList = [];

var angle; //for changing the radius and color smoothly

//for 2d perlin noise
var xoff;
var growSpeed;

var mouseMode;
var clearCanvas;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  angle = 0;
  xoff = 0;
  growSpeed = -1.5;
  mouseMode = false;
  clearCanvas = false;

  for (var i = 0; i < 160; i++) {
    inkDropList.push(new InkDrop());
  }
}

function draw() {
  if (mouseMode) {
    for (var i = 0; i < inkDropList.length; i++) {
      inkDropList[i].controlMouse();
      inkDropList[i].move();
      inkDropList[i].display();
    }
  } else {
    for (var i = 0; i < inkDropList.length; i++) {
      inkDropList[i].controlGrow();
      inkDropList[i].move();
      inkDropList[i].display();
    }
  }

  if (clearCanvas) {
    background(0);
    clearCanvas = false;
  }

  textSize(14);
  fill(245);
  strokeWeight(0.5);
  text("g - self-grow", 10, 20);
  text("m - mouse control", 10, 40);
  text("click - clear", 10, 60);
}

function keyTyped() {
  if (key === 'm') {
    clearCanvas = true;
    mouseMode = true;
  } else if (key === 'g') {
    clearCanvas = true;
    mouseMode = false;
  }
  return false; // prevent any default behavior
}

function mousePressed() {
  clearCanvas = true;
}


function InkDrop() {
  var dropSize = 8;
  var origin = createVector(0, windowHeight);
  var loc = createVector(0, 0);
  var ploc = createVector(0, 0);
  var radius = 0;

  this.controlMouse = function() {
    origin.x = mouseX;
    origin.y = mouseY;
  };

  this.controlGrow = function() {
    xoff += random(0.000001, 0.00003);
    origin.x = noise(xoff) * windowWidth;

    origin.y += growSpeed;
    growSpeed += random(-0.01, 0.01);

    constrain(growSpeed, -2.2, 2.2);
    //console.log(growSpeed);

    if (origin.y - 1.5 * radius <= 0 && origin.y - radius > 0) {
      growSpeed += 0.06;
    } else if (origin.y + 1.5 * radius >= windowHeight && origin.y + radius < windowHeight) {
      growSpeed -= 0.06;
    }

    if (origin.y - radius <= 0 || origin.y + radius >= windowHeight) {
      growSpeed = -1.5;
      growSpeed *= -1;
    }
  };

  this.move = function() {
    // radius = abs(60 * sin(angle));
    radius = abs(50 * sin(angle));
    angle += 0.0001;

    ploc.x = loc.x;
    ploc.y = loc.y;

    loc.x = random(origin.x - 2 * radius, origin.x + 2 * radius);
    loc.y = random(origin.y - 2 * radius, origin.y + 2 * radius);
  };

  this.display = function() {
    //noStroke();
    stroke(0, 0, 0, 50);
    strokeWeight(0.7);
    var redPoints = map(radius, 0, 50, 80, 235);
    var greenPoints = map(radius, 0, 50, 20, 20);
    var bluePoints = map(radius, 0, 50, 255, 235);
    // var redPoints = map(radius, 0, 50, 120, 255);
    // var greenPoints = map(radius, 0, 50, 15, 120);
    // var bluePoints = map(radius, 0, 50, 15, 120);
    fill(redPoints, greenPoints, bluePoints, 40);

    var divider = dist(loc.x, loc.y, origin.x, origin.y);
    var particleSize = map(divider, 0, radius, dropSize, 1);
    if (divider <= radius) {
      //rect(loc.x + random(-3, 3), loc.y + random(-3, 3), particleSize + random(-2, 2), particleSize + random(-2, 2));
      polygon(loc.x, loc.y, particleSize, int(random(3, 12)));
    }
  };
}

//function reference: https://processing.org/examples/regularpolygon.html
function polygon(x, y, r, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * r;
    var sy = y + sin(a) * r;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}