// This sketch used the RiTa library (Version 1.12; Howe 2015) to perform natural language processing of the text.
// Reference: 2d array in Tetris http://www.javascripter.net/faq/twodimensional.htm

// Bug to fix - do not click GO button more than once

var blocks = [];
var column, row;
var blockPos, blockSize;
var player;
var button, title, manual;
var textInput, textOrigin;
var start, moved;
var flash;

function setup() {
  noCanvas();
  column = 18;
  row = 8;
  blockPos = createVector(0, 0);
  blockSize = 60;
  moved = false;
  start = false;
  flash = false;

  //put this in a css file ahhhhhh 
  title = createDiv('syllablocks');
  title.size(windowWidth, 80);
  title.style('background-color', '#FFEA00');
  title.style('color', 'white');
  title.style('font-family', 'monospace');
  title.style('font-size', '5em');
  title.style('text-align', 'right');

  manual = createDiv('Manual');
  manual.position(0, 0);
  manual.size(80, 26);
  manual.style('background-color', 'white');
  manual.style('font-family', 'monospace');
  manual.style('font-size', '1.5em');
  manual.style('text-align', 'center');
  manual.style('border-radius', '8px');
  manual.style('border', 'solid 2px #2D09E2');
  manual.style('color', '#2D09E2');
  manual.mouseOver(openManual);
  manual.mouseOut(closeManual);

  // manual.parent('#manualPage');

  textInput = createElement('textarea', "Copy your text here (preferably longer than 150 words) to generate your game!");
  textInput.size(blockSize * column - 6, 100);
  textInput.position((windowWidth - blockSize * column) / 2, blockSize * row + 120);
  textInput.style('resize', 'none');
  textInput.style('border', 'dotted #2D09E2 2px');
  textInput.style('font-family', 'monospace');
  textInput.style('font-size', '1.5em');
  textInput.style('color', '#2D09E2');
  textInput.style('outline', 'none');
  textInput.mousePressed(clearText);

  button = createButton('GO');
  button.size(60, 40);
  button.position(windowWidth / 2 - 30, blockSize * row + 240);
  button.style('font-family', 'monospace');
  button.style('font-size', '2em');
  button.style('border-radius', '10px');
  button.style('border', '#2D09E2');
  button.style('background-color', '#FFEA00');
  button.style('color', 'white');
  button.style('outline', 'none');
  button.mousePressed(buttonPressed);
}

function buttonPressed() {
  textOrigin = textInput.value();
  createBlock();
  start = true;
  player = new Player();
  player.display();
  player.analyze();
}

function draw() {
  if (start) {
    player.update();
    if (moved) {
      player.jump();
      moved = false;
    }
    player.display();

    if (flash) {
      player.win();
      title.html('winning');
    }
  }
}

function textProcess(text) {
  var removePunct = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, '');
  var delimiters = ' ';
  var tokens = splitTokens(removePunct, ' ');
  var stresses = [];
  var syllableList = [];
  var syllables = [];

  for (var i = 0; i < tokens.length; i++) {
    stresses.push(RiTa.getStresses(tokens[i]));
    syllableList.push(stresses[i].split('/'));
    syllables.push(syllableList[i].length);
  }

  return syllables;
}

function drawSyl() {
  var sylBlocks = [];
  var sylOccupied = [];
  var sylList = textProcess(textOrigin);

  //converting the 1d array of syllables to 2d array to match the blocks
  for (var i = 0; i < column; i++) {
    sylBlocks[i] = [];
    sylOccupied[i] = [];
    sylBlocks[i].push(sylList / row);
    for (var j = 0; j < row; j++) {
      sylBlocks[i][j] = sylList[j % row + i * row];
      if (sylBlocks[i][j] == undefined) {
        sylBlocks[i][j] = 1;
      }
      //complex words (more than 2 syllables in this case) will create the blank area in createBlock()
      if (sylBlocks[i][j] >= 2) {
        sylOccupied[i][j] = false;
      } else {
        sylOccupied[i][j] = true;
      }
    }
  }

  // function checkNeighbours(x, y) {
  //   if (!sylOccupied[y][x] && sylOccupied[y - 1][x] != sylOccupied[y][x]) {
  //     sylOccupied[y - 1][x] = true;
  //     console.log(sylOccupied[y - 1][x]);
  //     return sylOccupied;
  //   } else {
  //     console.log("check next");
  //     checkNeighbours(x, y - 1);
  //   }
  // }
  return {
    sylBlocks,
    sylOccupied
  };
}

//draw the blocks only if they contain a single syllable words, otherwise leave them blank
function createBlock() {
  var sylArray = drawSyl().sylBlocks;
  var OccupiedArray = drawSyl().sylOccupied;
  for (var i = 0; i < column; i++) {
    blocks[i] = [];
    for (var j = 0; j < row; j++) {
      if (OccupiedArray[i][j]) {
        blocks[i][j] = createDiv(sylArray[i][j]);
        blocks[i][j].style('height', blockSize + 'px');
        blocks[i][j].style('width', blockSize + 'px');
        blockPos.x = blockSize * i + (windowWidth - blockSize * column) / 2;
        blockPos.y = blockSize * j + 100;
        blocks[i][j].position(blockPos.x, blockPos.y);
        blocks[i][j].style('background', 'pink');
        blocks[i][j].style('font-family', 'Monospace');
        blocks[i][j].style('font-size', '4em');
        blocks[i][j].style('text-align', 'center');
      }
    }
  }
}

//Sorry this part of the code is a bit messy

//the object Player
function Player() {
  //question: when I use "this.", the var doesn't pass to this.sylAnalyze function
  var pathOccupied = drawSyl().sylOccupied;
  this.startPoint = [];
  this.input = createElement('textarea', 'one');
  var distance = [];
  var inputSyl;
  var matching = false;
  var letter = 'e';

  //styling the player
  this.input.style('border', 'none');
  this.input.style('color', 'white');
  this.input.style('background', '#2D09E2');
  this.input.style('resize', 'none');
  this.input.style('font-family', 'monospace');
  this.input.style('font-size', '1.5em');
  this.input.style('text-align', 'center');

  //randomly choose an empty block at the bottom row to start
  for (var i = 0; i < column; i++) {
    if (!pathOccupied[i][row - 1]) {
      this.startPoint.push(i);
    }
  }
  var playerPos = createVector(this.startPoint[Math.floor(Math.random() * this.startPoint.length)] * blockSize + (windowWidth - blockSize * column) / 2, (row - 1) * blockSize + 100);

  //find all the blocks that are empty
  this.analyze = function() {
    this.empty = [];
    for (var i = 0; i < column; i++) {
      for (var j = 0; j < row; j++) {
        if (!pathOccupied[i][j]) {
          this.empty.push([i, j]);
        }
      }
    }
    distance.push(40);
    for (var i = 0; i < this.empty.length; i++) {
      if (playerPos.x == this.empty[i][0] * blockSize + (windowWidth - blockSize * column) / 2) {
        distance.push(this.empty[i][1] * blockSize + 100);
      }
    }
    //console.log(distance);
  }

  //check the number of syllables the input has and if the first letter of it matches with the last letter of the previous input
  this.sylAnalyze = function() {
    this.inputText = this.value();
    if (this.inputText.charAt(0) == letter) {
      matching = true;
    }
    this.inputStresses = RiTa.getStresses(this.inputText).split('/');
    inputSyl = this.inputStresses.length;
    this.lastChar = this.inputText.length - 1;
    letter = this.inputText.charAt(this.lastChar);
    //console.log(letter);

  }

  //check if we can jump
  this.update = function() {
    this.input.changed(this.moving);
    this.input.changed(this.sylAnalyze);
    //couldn't get this to work...
    //this.input.mousePressed(this.displayNext);
  }

  //make sure to only jump one step at a time
  this.moving = function() {
    moved = true;
  }

  //caculate the next step to jump
  this.jump = function() {
    //console.log(matching);
    this.lastIndex = distance.length - 1;
    var distUnit = (playerPos.y - distance[this.lastIndex - 1]) / blockSize;
    if (playerPos.y >= distance[this.lastIndex] && distUnit == inputSyl && matching) {
      playerPos.y = distance[this.lastIndex - 1];
      distance.splice(this.lastIndex, 1);
    }
    //console.log(distance);
    if (distance.length == 1) {
      console.log("success!");
      flash = true;
    }
  }

  this.display = function() {
    this.input.size(blockSize - 4, blockSize - 4);
    this.input.position(playerPos.x, playerPos.y);
  }

  this.win = function() {
    this.input.position(random(playerPos.x - 5, playerPos.x + 5), random(playerPos.y - 5, playerPos.y + 5));
  }
}

function clearText() {
  this.html(' ');
}

function openManual() {
  manual.size(170, 640);
  this.style('font-size', '1em');
  this.style('text-align', 'left');
  //should put this in a preloaded string
  this.html('1.Copy any text to the text box below and click GO. The game setting will be generated from your text.<br>2.You are the blue box at the bottom trying to climb to the top.<br>3.Each step is one syllable. Type the word with the right amount of syllables in the blue box to move. You can only move between the empty space one step at a time and GO UP (for now).<br>4.To cross the barriers, type a word with corresponding numbers of syllables. For example, if there are 2 blocks in front of you, you are 3 steps away from the next blank space. You should type a word with 3 syllables.<br>5.Every word has to start with the last letter of the previous word in order to move. The game automatically starts with the word "one". So the next word has to start with "e".');
}

function closeManual() {
  manual.size(80, 26);
  this.style('font-size', '1.5em');
  this.style('text-align', 'center');
  this.html('Manual');
}