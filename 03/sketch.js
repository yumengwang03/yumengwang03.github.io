//reference: Bryan's week-3 16-string-input

//questions
//1. how to clear textarea on click
//2. seems like the first element in outputTxt array (first word in whirlpool) doesn't get removed? 

var whirlpool = [];
var start;
var order;
var time;
var limit;

var textInput;
var outputTxt = [];

var button;
var waterImg;
var pouringWater;

function setup() {
  noCanvas();

  start = false;
  time = 0;
  limit = 46;
  order = 0;

  pouringWater = createImg("assets/water.png");
  pouringWater.position(0.499 * windowWidth, 0.31 * windowWidth);
  pouringWater.size(0.0417 * windowWidth, 0.083 * windowWidth);
  pouringWater.hide();

  waterImg = createImg("assets/water-system.png");
  waterImg.position(0.0278* windowWidth, 0,0139*windowWidth);
  waterImg.size(0.576 * windowWidth, 0.507 * windowWidth);

  textInput = createElement('textarea', "Copy your text (preferably longer than 50 words) into the water tank and open the faucet.");
  textInput.size(0.222 * windowWidth, 0.153 * windowWidth);
  textInput.position(0.097 * windowWidth, 0.097 * windowWidth);
  textInput.mousePressed(addTitle);
  textInput.style('background', '#e6eef6');
  textInput.style('border', '1px dotted #cfcfcf');
  textInput.style('font-family', 'Avenir');
  textInput.style('font-size', '14px');
  textInput.style('outline', 'none');
  textInput.style('resize', 'none');


  textInput.input(processText);

  button = createButton('open');
  button.mousePressed(buttonPressed);
  button.position(0.422 * windowWidth, 0.356 * windowWidth);
  button.size(0.04 * windowWidth, 0.02 * windowWidth);
  button.style('font-size', '16px');
  button.style('background', '#b4b4b4');
  button.style('border', 'none');
  button.style('outline', 'none');
  button.style('font-family', 'Avenir');
  button.style('color', 'white');
}

function draw() {
  if (start) {
    if (millis() > time + 1000) {
      addWater();
      time = millis();
    }

    for (var i = 0; i < whirlpool.length; i++) {
      whirlpool[i].update();
      whirlpool[i].display();
      console.log(whirlpool.length);

      if (whirlpool.length > limit) {
        whirlpool[0].water.remove();
        whirlpool.splice(0, 1);
        
      }
    }
  }
  
  
  //console.log(start);
  //console.log(outputTxt);
}

function addWater() {
  if (whirlpool.length <= limit) {
    var newWater = new Water(outputTxt[order]);
    whirlpool.push(newWater);
    order++;
  }
}

function Water(word) {
  this.angle = 1.7 * PI;
  this.s = 300;
  this.loc = createVector(0, 0);
  this.col;

  this.water = createP(word);
  this.water.class('waterUnit');

  this.update = function() {
    this.loc.x = this.s * sin(this.angle) + 0.7 * windowWidth;
    this.loc.y = this.s * cos(this.angle) + windowHeight / 2 - 50;
    this.angle += 0.01;
    this.s -= 0.1;

    this.colR = map(this.s, 300, 50, 180, 70);
    this.colG = map(this.s, 300, 50, 230, 110);
    this.colB = map(this.s, 300, 50, 250, 190);
    this.col = color(this.colR, this.colG, this.colB);
  };

  this.display = function() {
    this.water.style('color', this.col);
    this.water.style('font-family', 'Avenir');
    this.water.style('font-weight', 'bold');
    this.water.position(this.loc.x, this.loc.y);
  };
}

function processText() {
  var baseTxt = this.value();
  var noun = [];
  var verb = [];
  var adj = [];
  var adv = [];
  var the = [];

  var token = RiTa.tokenize(baseTxt);
  var pos = RiTa.getPosTags(baseTxt);

  for (var i = 0; i < pos.length; i++) {
    if (pos[i] == "nn" || pos[i] == "pr") {
      noun.push(token[i]);

    } else if (pos[i].substring(0, 2) == "jj") {
      adj.push(token[i]);
    } else if (pos[i].substring(0, 2) == "vb") {
      verb.push(token[i]);
    } else if (pos[i].substring(0, 2) == "rb") {
      adv.push(token[i]);
    } else if (pos[i].substring(0, 2) == "dt") {
      the.push(token[i]);
    }
  }

  for (var i = 0; i < noun.length; i++) {
    outputTxt.push(noun[floor(random(i))]);
    if (i < adv.length) {
      outputTxt.push(adv[floor(random(i))]);
    }
    if (i < verb.length) {
      outputTxt.push(verb[floor(random(i))]);
    }
    if (i < the.length) {
      outputTxt.push(the[floor(random(i))]);
    }
    if (i < adj.length) {
      outputTxt.push(adj[floor(random(i))]);
    }
    outputTxt.push(noun[floor(random(i))]);
  }
  //console.log(outputTxt);

}

function buttonPressed() {
  for (var i = 0; i < outputTxt.length; i++) {
    if (outputTxt[i] != undefined) {
      start = true;
      pouringWater.show();
    }
  }
  //console.log(this.value);
}

function addTitle() {
  //console.log("lala");
  var title = createElement('h1', 'liquid words');
  title.position(windowWidth - 250, 0);
  title.style('font-family', 'Avenir');
  title.style('color', '#7494ff');
  this.html(' ');
}