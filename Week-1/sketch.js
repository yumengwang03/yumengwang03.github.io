var inkDrop;
var inkDropList = [];

var angle; //for changing the radius and color smoothly

// //reference: P5.js-Examples-Live Input
// var input;
// var analyzer;
// var volume;


function setup() {
  createCanvas(windowWidth, windowHeight);

  angle = 0;

  for (var i = 0; i < 160; i++) {
    inkDropList.push(new InkDrop());
  }

  // mic = new p5.AudioIn();
  // mic.start();
}

function draw() {
  //background(255);
  for (var j = 0; j < inkDropList.length; j++) {
    inkDropList[j].display();
  }
  //volume = mic.getLevel();

}

function mousePressed() {
  background(255);
}

function InkDrop() {
  var loc = createVector(30, 30);
  var dropSize = random(8, 14);
  var origin = createVector(30, 30);

  this.display = function() {
    noStroke();
    //fill(random(20, 160), 20, 255, 40);
    //var radius = 50;
    var radius = abs(60 * sin(angle));
    var redPoints = map(radius, 0, 50, 80, 235);
    var greenPoints = map(radius, 0, 50, 20, 20);
    var bluePoints = map(radius, 0, 50, 255, 235);
    angle += 0.0001;
    fill(redPoints, greenPoints, bluePoints, 40);
    //console.log(radius);
    //origin.x = mouseX;
    origin.x = mouseX;
    origin.y = mouseY;

    loc.x = random(origin.x - 2 * radius, origin.x + 2 * radius);
    loc.y = random(origin.y - 2 * radius, origin.y + 2 * radius);

    var divider = dist(loc.x, loc.y, origin.x, origin.y);

    var particleSize = map(divider, 0, radius, dropSize, 1);

    if (divider <= radius) {
      //ellipse(loc.x, loc.y, particleSize, particleSize);
      rect(loc.x + random(-3, 3), loc.y + random(-3, 3), particleSize + random(-2, 2), particleSize + random(-2, 2));
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