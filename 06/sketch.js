// reference:
// Bryan's concordance example - https://github.com/whoisbma/Code-2-SP16/blob/master/week-06-concordance/concordance/sketch.js
// 2 games - Solarmax2 and Gravity Ghost

var concordance = {};
var keys = [];

var player;
var stars = [];
var playerPos;
var starPos;

function setup() {
  createCanvas(windowWidth, windowHeight);

  var testData = "HEY, REMEMBER WHEN the FCC reassured us last year that it wasn’t going to lock down Wi-Fi routers? And everyone breathed a sigh of relief, because custom router firmware is actually a really good thing? Sure, it’s fun to improve your router by extending the range or making your network friendlier for guests. But open firmware is important for other reasons: it enables critical infrastructure, from emergency communications for disaster relief and building free community access points to beefing up personal security. Well, there goes that. Because even though the FCC said its new requirements were not intended to lock down router software or block the installation of open source firmware, at least one large manufacturer has reacted by doing just that. And more could follow. Way to go, FCC. Last month, Libre Planet—a free software community—raised the alarm that TP-Link, one of the largest router manufacturers, had begun locking down firmware in newly released routers. As proof, Libre Planet pointed to a transcript of a support conversation. In the chat, a TP-Link rep says that the lockdown—which blocks the installation of open source firmware—was a reaction to new FCC requirements. That’s a problem, because alternative router software packages like DD-WRT are hugely popular. These tools provide more sophisticated features and faster security patches than manufacturers offer.";
  var tokens = testData.split(/\W+/);

  for (var i = 0; i < tokens.length; i++) {
    var word = tokens[i];
    if (concordance[word] === undefined) {
      concordance[word] = 1;
      keys.push(word);
    } else {
      concordance[word]++;
    }
  }

  //console.log(concordance);
  //console.log(keys);

  keys.sort(function(a, b) {
    return (concordance[b] - concordance[a]);
  });

  for (i in keys) {
    if (keys.hasOwnProperty(i)) {
      console.log(keys[i] + " " + concordance[keys[i]]);
    }
  }

  for (var i = 0; i < 10; i++) {
    stars.push(new Star(random(0, windowWidth), random(0, windowHeight), 50, 1));
  }

  playerPos = createVector(windowWidth / 2, windowHeight / 2);
  player = new Player();
}

function draw() {
  var test = [];

  for (var i = 0; i < stars.length; i++) {
    test[i] = stars[i].move();
    stars[i].show();
    stars[i].collide();
  }
  
  player.move();
  player.show();
}

function Star(xPos, yPos, size, mode) {
  this.starPos = createVector(0, 0);
  this.starPos.x = xPos;
  this.starPos.y = yPos;
  this.starSize = size;
  this.starMode = mode;

  this.move = function() {
    return this.starPos;
  }
  this.show = function() {
    if (this.starMode == 0) {
      ellipse(this.starPos.x, this.starPos.y, this.starSize, this.starSize);
    } else if (this.starMode == 1) {
      ellipse(this.starPos.x, this.starPos.y, this.starSize, this.starSize);
      ellipse(this.starPos.x + 10, this.starPos.y, this.starSize / 4, this.starSize / 4);
    } else if (this.starMode == 2) {

    }
  }
  this.collide = function() {

  }

}

function Player() {

  this.move = function() {

  }
  this.show = function() {

  }
}