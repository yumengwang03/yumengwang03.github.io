// a button tetris game that can write poems

// reference: Bryan's example 13-OOP-plus-DOM 
// https://github.com/whoisbma/Code-2-SP16/tree/master/week-03-OOP-DOM/13-OOP-plus-DOM

var block = [];

var buttonTags = [];

// to limit the number of buttons per row
var gameWidth;
// the number of words that go to each line
var poemL;

var newBorn;

// var occupied = [];


function setup() {
  //noCanvas();
  // to create a canvas to draw the grid in the background
  poemL = 14;
  gameWidth = (poemL - 3) * 50;
  createCanvas(poemL * 50, windowHeight);
  newBorn = false;
  for (var i = 0; i < 1; i++) {
    block[i] = new ButtonBlock();
  }
  // // a 2d boolean array to check if the space is occupied 
  // for (var p = 0; p < gameWidth/50; p++) {
  //   for (var q = 0; q < 6; q++) {
  //     occupied[p, q] = false;
  //   }
  // }
}

function draw() {
  gridCheck();
  for (var i = 0; i < block.length; i++) {
    block[i].move();
  }
  if (newBorn) {
    var newB = new ButtonBlock();
    block.push(newB);
  }
}

function mousePressed() {
  // var newB = new ButtonBlock();
  // block.push(newB);
}


function ButtonBlock() {
  this.buttons = [];
  for (var i = 0; i < 1; i++) {
    this.buttons[i] = new ButtonPattern(floor(random(1, 8)));
  }

  this.move = function() {
    if (this.buttons[0] != undefined) {
      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
        this.buttons[i].display();
        this.buttons[i].stop();
        this.buttons[i].occupy();
      }
    }
  }
}


function ButtonPattern(pattern) {
  this.size = createVector(50, 50);
  this.origin = createVector(floor(random(0, floor(gameWidth / this.size.x))) * this.size.x, 0);
  this.vel = 2;

  // Tetris blocks based on 4 units
  this.b4 = [];
  for (var i = 0; i < 4; i++) {
    this.b4[i] = createButton("Tetris");
  }

  //orgin is always the position of bottom left corner
  // pattern 1
  // ####
  this.p1_1 = createVector(this.origin.x + this.size.x, this.origin.y);
  this.p1_2 = createVector(this.origin.x + 2 * this.size.x, this.origin.y);
  this.p1_3 = createVector(this.origin.x + 3 * this.size.x, this.origin.y);
  this.p1 = [this.origin, this.p1_1, this.p1_2, this.p1_3];

  // pattern 2
  // #
  // ###
  this.p2_1 = createVector(this.origin.x, this.origin.y - this.size.y);
  this.p2_2 = createVector(this.origin.x + this.size.x, this.origin.y);
  this.p2_3 = createVector(this.origin.x + 2 * this.size.x, this.origin.y);
  this.p2 = [this.origin, this.p2_1, this.p2_2, this.p2_3];

  // pattern 3
  //   #
  // ###
  this.p3_1 = createVector(this.origin.x + this.size.x, this.origin.y);
  this.p3_2 = createVector(this.origin.x + this.size.x, this.origin.y - this.size.y);
  this.p3_3 = createVector(this.origin.x + 2 * this.size.x, this.origin.y);
  this.p3 = [this.origin, this.p3_1, this.p3_2, this.p3_3];

  // pattern 4
  // ##
  // ##
  this.p4_1 = createVector(this.origin.x, this.origin.y - this.size.y);
  this.p4_2 = createVector(this.origin.x + this.size.x, this.origin.y - this.size.y);
  this.p4_3 = createVector(this.origin.x + this.size.x, this.origin.y);
  this.p4 = [this.origin, this.p4_1, this.p4_2, this.p4_3];

  // pattern 5
  //  ##
  // ##
  this.p5_1 = createVector(this.origin.x + this.size.x, this.origin.y - this.size.y);
  this.p5_2 = createVector(this.origin.x + this.size.x, this.origin.y);
  this.p5_3 = createVector(this.origin.x + 2 * this.size.x, this.origin.y - this.size.y);
  this.p5 = [this.origin, this.p5_1, this.p5_2, this.p5_3];

  // pattern 6
  //  #
  // ###
  this.p6_1 = createVector(this.origin.x + this.size.x, this.origin.y - this.size.y);
  this.p6_2 = createVector(this.origin.x + this.size.x, this.origin.y);
  this.p6_3 = createVector(this.origin.x + 2 * this.size.x, this.origin.y);
  this.p6 = [this.origin, this.p6_1, this.p6_2, this.p6_3];

  // pattern 7
  // ##
  //  ##
  this.p7_1 = createVector(this.origin.x - this.size.x, this.origin.y - this.size.y);
  this.p7_2 = createVector(this.origin.x, this.origin.y - this.size.y);
  this.p7_3 = createVector(this.origin.x + this.size.x, this.origin.y);
  this.p7 = [this.origin, this.p7_1, this.p7_2, this.p7_3];

  this.display = function() {
    newBorn = false;
    for (var i = 0; i < this.b4.length; i++) {
      this.b4[i].size(this.size.x, this.size.y);
      switch (pattern) {
        case 1:
          this.b4[i].position(this.p1[i].x, this.p1[i].y);
          break;
        case 2:
          this.b4[i].position(this.p2[i].x, this.p2[i].y);
          break;
        case 3:
          this.b4[i].position(this.p3[i].x, this.p3[i].y);
          break;
        case 4:
          this.b4[i].position(this.p4[i].x, this.p4[i].y);
          break;
        case 5:
          this.b4[i].position(this.p5[i].x, this.p5[i].y);
          break;
        case 6:
          this.b4[i].position(this.p6[i].x, this.p6[i].y);
          break;
        case 7:
          this.b4[i].position(this.p7[i].x, this.p7[i].y);
          break;
        default:
          console.log("try a different pattern");
      }
    }
  };

  this.update = function() {
    for (var i = 0; i < this.b4.length; i++) {
      // this.p5[i].y += this.vel;
      switch (pattern) {
        case 1:
          this.p1[i].y += this.vel;
          break;
        case 2:
          this.p2[i].y += this.vel;
          break;
        case 3:
          this.p3[i].y += this.vel;
          break;
        case 4:
          this.p4[i].y += this.vel;
          break;
        case 5:
          this.p5[i].y += this.vel;
          break;
        case 6:
          this.p6[i].y += this.vel;
          break;
        case 7:
          this.p7[i].y += this.vel;
          break;
        default:
          console.log("error");
      }
    }
  };

  this.stop = function() {
    if (this.origin.y >= windowHeight - this.size.y) {
      this.vel = 0
      newBorn = true;
    }
  };

  this.occupy = function() {
    for (var p = 0; p < poemL; p++) {
      for (var q = 0; q < 5; q++) {
        //occupied[p, q] = false;
        checkW = this.size.x * p;
        checkH = windowHeight - this.size.y * (q + 1);
        rect(checkW, checkH, this.size.x, this.size.y);

        //check each pattern
        //this.p1 = [this.origin, this.p1_1, this.p1_2, this.p1_3];
        for (var m = 0; m < this.p1.length; m++) {
          if (this.p1[m].y >= checkH - this.size.y && this.p1[m].x <= checkW + this.size.x && this.p1[m].x > checkW + 3 * this.size.x) {
            occupied[p, q] = true;

            //this.vel = 0;
          }

          // if (occupied[p, q + 1]) {
          //   //console.log("occupied");
          //   //this.vel = 0;
          // }
        }
        //console.log(occupied);
      }
    }
  };
}

function gridCheck() {
  // detect collision
  var occupied = [];
  // a 2d boolean array to check if the space is occupied 
  for (var p = 0; p < 5; p++) {
    occupied[p] = [];
    for (var q = 0; q < poemL; q++) {
      occupied[p][q] = false;
      //console.log(occupied);
    }
  }
}