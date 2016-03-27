// It's a Big Wor(l)d

// reference:
// Bryan's concordance example - https://github.com/whoisbma/Code-2-SP16/blob/master/week-06-concordance/concordance/sketch.js
// tf-idf - http://www.cnblogs.com/biyeymyhjob/archive/2012/07/17/2595249.html

// Top 10 most frequently used words from your input article will be filtered to create the stars/planets in the "Big Wor(l)d",
// through if-idf compared with other 5 prepared documents (the more documents, the more accurate).
// Each star/planet has a different size and gravity, relative to its if-idf value. 
// Move the spaceship across the "Big Wor(l)d" to reach the other side without crushing on any stars/planets

var worldSize;
var player;
var stars = [];
var start;
var lose;
var win;
var index;
var order;

var data = [];
var dataKeys = [];
var inputKeys;
var inputFrequency;
var textInput;
var button;
var intro;
//var randomStart = [];

function preload() {
  data[1] = loadStrings('data/data1.txt');
  data[2] = loadStrings('data/data2.txt');
  data[3] = loadStrings('data/data3.txt');
  data[4] = loadStrings('data/data4.txt');
  data[5] = loadStrings('data/data5.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  worldSize = 10;
  index = 0;
  order = 0;

  textInput = createElement('textarea', "Copy an article here!");
  textInput.size(windowWidth * 0.6, 360);
  textInput.position(windowWidth * 0.2, 100);
  textInput.style('resize', 'none');
  textInput.style('border', 'dotted #3df 1px');
  textInput.style('font-family', 'Arial');
  textInput.style('font-size', '1em');
  textInput.style('color', '#3df');
  textInput.style('outline', 'none');
  textInput.mousePressed(function() {
    this.html('')
  });

  button = createButton('START');
  button.size(windowWidth * 0.05, 40);
  button.position(windowWidth * 0.45, 500);
  button.style('font-family', 'Arial Black');
  button.style('font-size', '1em');
  button.style('border-radius', '10px');
  button.style('border', 'white');
  button.style('background-color', '#3fb');
  button.style('color', 'white');
  button.style('outline', 'none');
  button.mousePressed(buttonPressed);

  var text1 = join(data[1], '\n');
  var text2 = join(data[2], '\n');
  var text3 = join(data[3], '\n');
  var text4 = join(data[4], '\n');
  var text5 = join(data[5], '\n');

  dataKeys[1] = textAnalyze(text1).keys;
  dataKeys[2] = textAnalyze(text2).keys;
  dataKeys[3] = textAnalyze(text3).keys;
  dataKeys[4] = textAnalyze(text4).keys;
  dataKeys[5] = textAnalyze(text5).keys;
  start = false;
  lose = false;
  win = false;
  //randomStart[0] = createVector(random(windowWidth / 2 - 100, windowWidth / 2 + 100), random(windowHeight / 2 - 100, windowHeight / 2 + 100));
}

function buttonPressed() {
  var textIn = textInput.value();
  start = true;
  inputKeys = textAnalyze(textIn).keys;
  inputFrequency = get_tf_idf(inputKeys, textIn);
  player = new Player(0, windowHeight / 2);
  textInput.remove();
  button.remove();
}

// concordance
function textAnalyze(text) {
  var concordance = {};
  var keys = [];
  var tokens = text.split(/\W+/);
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
  keys.sort(function(a, b) {
    return (concordance[b] - concordance[a]);
  });
  return {
    keys,
    concordance,
    tokens
  };
}

// calculate how many documents contain each word, for calculating idf later
function wordInDoc(keys) {
  keys.sort();
  var allKeys = [];
  var duplicated = {};
  var concordance0 = {};
  allKeys = dataKeys[1].concat(dataKeys[2]);
  allKeys = allKeys.concat(dataKeys[3]);
  allKeys = allKeys.concat(dataKeys[4]);
  allKeys = allKeys.concat(dataKeys[5]);
  allKeys = allKeys.concat(inputKeys);

  for (var i = 0; i < allKeys.length; i++) {
    if (allKeys[i] in duplicated) {
      duplicated[allKeys[i]] += 1;
    } else {
      duplicated[allKeys[i]] = 1;
    }
    for (var j = 0; j < keys.length; j++) {
      if (allKeys[i] === keys[j]) {
        concordance0[keys[j]] = duplicated[allKeys[i]];
      }
    }
  }
  //console.log(Object.keys(concordance0).length);
  return concordance0;
}

// calculate tf-idf value of each word, return an array of tf-idf values of every word in the given document
function get_tf_idf(keys, text) {
  var all_tf_idf = [];
  var _wordInDocs = wordInDoc(keys);
  var _concordance = textAnalyze(text).concordance;
  var _tokens = textAnalyze(text).tokens;
  var topWords = {};
  for (var i in keys) {
    if (keys.hasOwnProperty(i)) {
      all_tf_idf[i] = tf_idf(_concordance[keys[i]], _tokens.length, 6, _wordInDocs[keys[i]]);
      console.log(keys[i] + " " + all_tf_idf[i]);
      topWords[keys[i]] = all_tf_idf[i];
    }
  }
  keys.sort(function(a, b) {
    return topWords[b] - topWords[a];
  });
  keys.length = worldSize;
  return keys;
}

// the formula to calculate tf-idf
function tf_idf(word, totalWords, totalDocs, wordDocs) {
  var tf = word / totalWords;
  var idf = Math.log(totalDocs / wordDocs);
  var tf_idf = tf * idf;
  return tf_idf;
}

function draw() {
  background(255);
  smooth();
  // var randomPos = (Math.round(Math.random()) * 2 - 1) * random(150, 250);
  // if (randomStart.length <= worldSize - 1) {
  //   var startPoint = createVector(randomStart[order].x + randomPos, randomStart[order].y + randomPos);
  //   if (startPoint.x >= 150 && startPoint.x <= windowWidth - 150 && startPoint.y >= 50 && startPoint.y <= windowHeight - 50) {
  //     randomStart.push(startPoint);
  //     order++;
  //   }
  // }
  //console.log(randomStart);

  if (start) {
    stroke(0, 0, 0, 120);
    strokeWeight(1);
    noFill();
    rect(0, 0, 20, windowHeight);
    rect(windowWidth - 20, 0, 20, windowHeight);

    if (stars.length < worldSize) {
      from = color(0, 170, 255, 80);
      to = color(0, 255, 212, 80);
      var starColor = lerpColor(from, to, random(0.4, 1));
      var newStar = new Star(inputFrequency[index], random(200, windowWidth - 200), random(150, windowHeight - 150), floor(random(0, 4)), starColor)
      index++;
      stars.push(newStar);
    }
    for (var i = 0; i < stars.length; i++) {
      stars[i].move();
      stars[i].show();
    }
    player.move();
    player.control();
    player.show();
  }
  if (lose) {
    window.open("http://www.theguardian.com/teacher-network/2012/aug/16/a-level-student-success-failure");
    window.open("http://qideas.org/articles/the-value-of-failure/");
    window.open("http://ww2.kqed.org/mindshift/2015/08/12/what-do-students-lose-by-being-perfect-valuable-failure/");
    location.reload();
  }
  if (win) {
    window.open("http://giphy.com/gifs/l4KhQo2MESJkc6QbS/html5");
    location.reload();
  }
}

function Star(displayWord, xPos, yPos, mode, starColor) {
  this.starPos = createVector(0, 0);
  this.starPos.x = xPos;
  this.starPos.y = yPos;
  this.starSize = 10 * (10 - index + 1);
  this.planetPos = createVector(0, 0);
  this.planetPos.x = this.starPos.x;
  this.planetPos.y = this.starPos.y;
  this.angle = 0;
  this.angle0 = 0;

  this.move = function() {
    if (mode == 0) {
      this.s = this.starSize / 80;
      this.starPos.x += this.s * sin(this.angle);
      this.starPos.y += this.s * cos(this.angle);
      this.angle += 0.01;
    } else if (mode == 1) {
      this.s = this.starSize / 50;
      this.starPos.x += this.s / 2 * sin(this.angle);
      this.starPos.y += this.s * cos(this.angle);
      this.angle += 0.03;
    } else if (mode == 2) {
      this.s = this.starSize / 30;
      this.starPos.x += this.s * sin(this.angle);
      this.starPos.y += this.s / 3 * cos(this.angle);
      this.angle += 0.05;
    } else if (mode == 3) {
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
    noStroke(0);
    fill(starColor);
    if (mode == 0 || mode == 1 || mode == 2) {
      ellipse(this.starPos.x, this.starPos.y, this.starSize, this.starSize);
    } else if (mode == 3) {
      ellipse(this.starPos.x, this.starPos.y, this.starSize, this.starSize);
      ellipse(this.planetPos.x - 5 * this.starSize / 4, this.planetPos.y, this.starSize / 4, this.starSize / 4);
    }

    fill(0, 170, 255, 180);
    textFont("Arial Black");
    textSize(this.starSize / 3);
    textAlign(CENTER);
    text(displayWord, this.starPos.x, this.starPos.y + this.starSize / 10);
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
      } else if (this.distances[i] <= this._starSize[i] / 2 + this.playerSize / 2 - 3) {
        //console.log("lost");
        lose = true;
      }
      if (this.playerPos.x >= windowWidth - this.playerSize / 2) {
        this.playerPos.x = windowWidth - this.playerSize / 2;
        win = true;
        //console.log("won");
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
    stroke(0, 0, 0, 120);
    strokeWeight(2);
    noFill();
    polygon(this.playerPos.x, this.playerPos.y, this.playerSize / 2, 5);
  }
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