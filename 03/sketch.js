//reference: Bryan's week-3 16-string-input

var whirlpool = [];
var start;
var order;
var time;
var limit;

var textInput;
var outcome;

var token = [];
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
  pouringWater.position(720, 465);
  pouringWater.size(60, 120);
  pouringWater.hide();

  waterImg = createImg("assets/water-system.png");
  waterImg.position(40, 20);

  textInput = createElement('textarea', 'Copy your text into the water tank and open the faucet.');
  textInput.size(320, 220);
  textInput.position(140, 140);
  textInput.style('background', '#e6eef6');
  textInput.style('border', '1px dotted #cfcfcf');
  textInput.style('font-family', 'Avenir');
  textInput.style('font-size', '14px');
  textInput.style('outline', 'none');
  textInput.style('resize', 'none');

  outcome = createP("");
  textInput.input(processText);

  button = createButton('open');
  button.mousePressed(buttonPressed);
  button.position(615, 520);
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

      if (whirlpool.length > limit) {
        whirlpool.splice(0, 1);
        whirlpool[0].water.remove();
      }
    }
  }
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
    this.loc.x = this.s * sin(this.angle) + 990;
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

  token = RiTa.tokenize(baseTxt);
  var pos = RiTa.getPosTags(baseTxt);

  console.log(token);

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

  outputTxt = token;
  for (var i = 0; i < noun.length; i++) {
    //outputTxt.push()
    // outputTxt.push(noun[random(2 * i)]);
    // if (i < adv.length) {
    //   outputTxt.push(adv[random(i)]);
    // }
    // if (i < verb.length) {
    //   outputTxt.push(verb[random(i)]);
    // }
    // if (i < the.length) {
    //   outputTxt.push(the[random(i)]);
    // }
    // if (i < adj.length) {
    //   outputTxt.push(adj[random(i)]);
    // }
    // outputTxt.push(noun[random(2 * i + 1)] + ".");
  }
  //console.log(outputTxt);


}

function buttonPressed() {
  start = true;
  pouringWater.show();
}