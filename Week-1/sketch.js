var bullet;

var avatar;

var enemy;

var bulletList = [];

var drawing = false;

// var playerPos;
// var eLoc;

// var safeDist;
var playerPos;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerPos = createVector(100,100);

  //bullet = new Bullet();

  // avatar = new Avatar();
  // enemy = new Enemy();

  for (var i = 0; i < 160; i++) {
    bulletList.push(new Bullet());
  }
}

function draw() {
  
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(playerPos.x, playerPos.y, 106, 106);
  
  //fill(255, 0,0);
 // ellipse(playerPos.x, playerPos.y, 100,100);
  playerPos.x += 2;
  
 // background(255, 255, 255, 20);

  //enemy.display();
  // avatar.show();
  // enemy.show();
  // safeDist = dist(playerPos.x, playerPos.y, eLoc.x, eLoc.y);

  //enemy.move();

  //weapon();
  // bullet.display();
  // bullet.move();
  //var second = second();
  //console.log(second);
  for (var q = 0; q < bulletList.length; q++) {
    bulletList[q].display();
    //bulletList[q].move();
    // console.log("move");

  }
  //console.log(safeDist);

}

// function mousePressed() {
//   for (var p = 0; p < bulletList.length; p++) {
//     //bulletList[p].display();
//     //console.log(bulletList.length);
//     //bulletList[p].move();
//   }
//   drawing = true;
//   // drawDuration = 0;
//   // drawDuration = second();
//   // console.log(second);
// }

function Bullet() {
  var loc = createVector(0, 0);
  var vel = createVector(10, 10);
  var sizeB = random(8, 14);
  var origin = createVector(0, 0);

  this.display = function() {
    noStroke();
    fill(random(20, 160), 20, 255, 40);

    var radius = 25;
    origin.x = mouseX;
    origin.y = mouseY;


    loc.x = random(origin.x - 2 * radius, origin.x + 2 * radius);
    loc.y = random(origin.y - 2 * radius, origin.y + 2 * radius);
    loc.add(vel);
    //console.log(vel);

    var divider = dist(loc.x, loc.y, origin.x, origin.y);

    var particleSize = map(divider, 0, radius, sizeB, 1);

    if (divider <= radius) {
      // loc.x += 200;
      ellipse(loc.x, loc.y, particleSize, particleSize);

      // console.log(loc);
    }

  }

  this.move = function() {
    vel.x += 10;
    vel.y += 10;

    //loc.add(vel);
    //console.log(vel);
  }

  this.collide = function() {

  }

  this.reset = function() {

  }
}

function weapon() {
  for (var i = 0; i < 80; i++) {
    bulletList.push(new Bullet());
    bulletList[i].display();
  }
  // for (var q = 0; q < bulletList.length; q++) {
  //   bulletList[q].display();
  //   //bulletList[q].move();
  //   // console.log("move");
  // }

}

// function Enemy(mode) {
//   //eLoc = createVector(0, 0);
//   //var eLocX = eLoc.x;
//   //var eLocY = eLoc.y;
//   var eVel = createVector(0, 0);
//   var eSize = 50;

//   this.show = function() {
//     //eVel = (2, 2);
//     if (safeDist > 100) {
//       //eVel = (5, 5);
//       eLoc.x = lerp(eLoc.x, playerPos.x, .1);
//       eLoc.y = lerp(eLoc.y, playerPos.y, .1);
//       console.log(eLoc);
//     } else {
//       //eVel = (0,0);
//     }
//     //}

//     //this.display = function() {
//     eLoc = createVector(600, 300);
//     noStroke();
//     fill(20, 255, 95);
//     ellipse(eLoc.x, eLoc.y, eSize, eSize);
//   }
// }



// function Avatar() {
//   this.show = function() {
//     playerPos = createVector(0.05 * mouseX + 0.95 * pmouseX, 0.05 * mouseY + 0.95 * pmouseY);
//     //var playerPosX = playerPos.x;
//     //var playerPosY = playerPos.y;
//     var playerSize = 100;
//     noStroke();
//     fill(105, 20, 255);
//     ellipse(playerPos.x, playerPos.y, playerSize, playerSize);
//   }
// }