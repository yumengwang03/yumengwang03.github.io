// reference:
// Bryan's concordance example - https://github.com/whoisbma/Code-2-SP16/blob/master/week-06-concordance/concordance/sketch.js
// 2 games - Solarmax2 and Gravity Ghost



var worldSize;
var player;
var stars = [];
var start;
var lose;
var win;

var testData;

function setup() {
  createCanvas(windowWidth, windowHeight);
  worldSize = 10;

  testData1 = "HEY, REMEMBER WHEN the FCC reassured us last year that it wasn’t going to lock down Wi-Fi routers? And everyone breathed a sigh of relief, because custom router firmware is actually a really good thing? Sure, it’s fun to improve your router by extending the range or making your network friendlier for guests. But open firmware is important for other reasons: it enables critical infrastructure, from emergency communications for disaster relief and building free community access points to beefing up personal security. Well, there goes that. Because even though the FCC said its new requirements were not intended to lock down router software or block the installation of open source firmware, at least one large manufacturer has reacted by doing just that. And more could follow. Way to go, FCC. Last month, Libre Planet—a free software community—raised the alarm that TP-Link, one of the largest router manufacturers, had begun locking down firmware in newly released routers. As proof, Libre Planet pointed to a transcript of a support conversation. In the chat, a TP-Link rep says that the lockdown—which blocks the installation of open source firmware—was a reaction to new FCC requirements. That’s a problem, because alternative router software packages like DD-WRT are hugely popular. These tools provide more sophisticated features and faster security patches than manufacturers offer.";
  testData2 = "We are a hybrid research group, working at the intersection of technology, culture and education. We build user-focused tools, public space interventions and forward-looking prototypes in the service of understanding and humanizing complex data systems. Currently, we’re helping to protect elephant populations in Africa, creating a space for St. Louis residents to examine the lived geographies of their city, engaging citizen scientists to connect joint pain with weather conditions, and examining the reach of one of the world's largest social networks. In the past you may have caught us explaining viral predictivity with the poop emoji, visualizing the resonance of Einstein's theory of general relativity, publishing a journal, performing MoMA's 120,000 object collections database, mapping ambulances in rural India, visualizing the history of space travel in NASA's own words, empowering individuals to reverse engineer ad targeting.";
  // var text1 = textAnalyze(testData1);
  // var text2 = textAnalyze(testData2);

  textCompare();

  for (var i = 0; i < worldSize; i++) {
    stars.push(new Star(random(150, windowWidth - 150), random(150, windowHeight - 150), floor(random(20, 100)), floor(random(0, 4))));
  }
  player = new Player(0, windowHeight / 2);

  start = false;
  lose = false;
  win = false;
}

function textAnalyze(text) {
  var concordance = {};
  var keys = [];

  var tokens = text.split(/\W+/);
  // var topWords = {};
  // var topConcordance = [];
  var cResult = {};

  for (var i = 0; i < tokens.length; i++) {
    var word = tokens[i];
    if (concordance[word] === undefined) {
      concordance[word] = 1;
      keys.push(word);
    } else {
      concordance[word]++;
    }
  }

  // console.log(concordance);
  // console.log(keys);

  keys.sort(function(a, b) {
    return (concordance[b] - concordance[a]);
  });

  for (var i in keys) {
    if (keys.hasOwnProperty(i)) {
      //console.log(keys[i] + " " + concordance[keys[i]]);
      // if (topConcordance.length < worldSize) {
      //   topConcordance.push(concordance[keys[i]]);
      // }
      // topWords[keys[i]] = concordance[keys[i]];

      var _tf_idf = tf_idf(concordance[keys[i]], tokens.length, 2, 2);
      //console.log(keys[i] + ' ' + _tf_idf);


      cResult[keys[i]] = concordance[keys[i]];
    }
  }
  // console.log(topConcordance);
  // console.log(Object.keys(topWords).length);
  return keys;
}

function tf_idf(word, totalWords, totalDocs, wordDocs) {
  var tf = word / totalWords;
  var idf = Math.log(totalDocs / (wordDocs + 1));
  var tf_idf = tf * idf;

  return tf_idf;
}

function textCompare() {
  var keys1 = textAnalyze(testData1);
  var keys2 = textAnalyze(testData2);
  //console.log(keys1);

  for (var i in keys1) {
    if (keys1.hasOwnProperty(i)) {
      for (var j in keys2) {
        if (keys2.hasOwnProperty(j)) {
          if (keys1[i] == keys2[j]) {
            console.log(keys1[i] + " " + true);
          } else {
            console.log(false);
          }
        }
      }
      //console.log(keys1[i]);
    }
  }
}




// function checkWords() {
//   if()
// }

function draw() {
  background(255);
  smooth();

  for (var i = 0; i < stars.length; i++) {
    stars[i].move();
    stars[i].show();
    //stars[i].collide();
  }

  player.move();
  player.control();
  player.show();
}

function Star(xPos, yPos, size, mode) {
  this.starPos = createVector(0, 0);
  this.starPos.x = xPos;
  this.starPos.y = yPos;
  this.starSize = size;
  this.starMode = mode;

  this.planetPos = createVector(0, 0);
  this.planetPos.x = this.starPos.x;
  this.planetPos.y = this.starPos.y;

  this.angle = 0;
  this.angle0 = 0;


  this.move = function() {
    if (this.starMode == 0) {
      this.s = this.starSize / 80;
      this.starPos.x += this.s * sin(this.angle);
      this.starPos.y += this.s * cos(this.angle);
      this.angle += 0.01;
    } else if (this.starMode == 1) {
      this.s = this.starSize / 60;
      this.starPos.y += this.s * cos(this.angle);
      this.angle += 0.02;
    } else if (this.starMode == 2) {
      this.s = this.starSize / 60;
      this.starPos.x += this.s * sin(this.angle);
      this.angle += 0.03;
    } else if (this.starMode == 3) {
      this.s = this.starSize / 120;
      this.starPos.x += this.s * sin(this.angle);
      this.starPos.y += this.s * cos(this.angle);
      this.planetPos.x += this.s * sin(this.angle) + this.starSize / 20 * sin(this.angle0);
      this.planetPos.y += this.s * cos(this.angle) + this.starSize / 20 * cos(this.angle0);
      this.angle += 0.01;
      this.angle0 += 0.04;
    }
  }
  this.show = function() {
    stroke(0);
    fill(255);
    if (this.starMode == 0 || this.starMode == 1 || this.starMode == 2) {
      ellipse(this.starPos.x, this.starPos.y, this.starSize, this.starSize);
    } else if (this.starMode == 3) {
      ellipse(this.starPos.x, this.starPos.y, this.starSize, this.starSize);
      ellipse(this.planetPos.x - 5 * this.starSize / 4, this.planetPos.y, this.starSize / 4, this.starSize / 4);
    }
  }

  this.passedVal = function() {
    return {
      pos: this.starPos,
      mass: this.starSize
    };
  }

}

function Player(posX, posY) {
  this.playerPos = createVector(0, 0);
  this.playerPos.x = posX;
  this.playerPos.y = posY;
  this.playerSize = 30;
  this._starPos = [];
  this._starSize = [];
  this.distances = [];

  this.m = 10000; //player position realtive to star mass/size 
  this.d = 100000; //player position realtive to star position
  this.amt = [];

  // question: why can't I write it this way to sort the numbers?
  // this.distances.sort(function(a, b) {
  //   return this.distances[a] - this.distances[b];
  // });
  //console.log(this.distances);

  this.move = function() {
    for (var i = 0; i < stars.length; i++) {
      this._starPos[i] = stars[i].passedVal().pos;
      this._starSize[i] = stars[i].passedVal().mass;
      this.distances[i] = floor(dist(this.playerPos.x, this.playerPos.y, this._starPos[i].x, this._starPos[i].y));
      this.amt[i] = this.distances[i] / this.d + this._starSize[i] / this.m;

      // gravitational attraction from the stars
      if (this.distances[i] <= 200 && this.distances[i] > this._starSize[i] / 2 + this.playerSize / 2) {
        this.playerPos.x = lerp(this.playerPos.x, this._starPos[i].x, this.amt[i]);
        this.playerPos.y = lerp(this.playerPos.y, this._starPos[i].y, this.amt[i]);
      } else if (this.distances[i] <= this._starSize[i] / 2 + this.playerSize / 2) {
        console.log("lost");
        lose = true;
      }
      if (this.playerPos.x >= windowWidth - this.playerSize / 2) {
        this.playerPos.x = windowWidth - this.playerSize / 2;
        win = true;
        console.log("won");
      } else if (this.playerPos.x <= this.playerSize / 2) {
        this.playerPos.x = this.playerSize / 2;
      } else if (this.playerPos.y >= windowHeight - this.playerSize / 2) {
        this.playerPos.y = windowHeight - this.playerSize / 2;
      } else if (this.playerPos.y <= this.playerSize / 2) {
        this.playerPos.y = this.playerSize / 2;
      }
    }
  }

  this.control = function keyTyped() {
    if (key === 'a') {
      this.playerPos.x -= 5;
    } else if (key === 'd') {
      this.playerPos.x += 5;
    } else if (key === 'w') {
      this.playerPos.y -= 5;
    } else if (key === 's') {
      this.playerPos.y += 5;
    }
  }

  this.show = function() {
    noStroke();
    fill(255, 0, 0);
    ellipse(this.playerPos.x, this.playerPos.y, this.playerSize, this.playerSize);
  }
}