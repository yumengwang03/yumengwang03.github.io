var blocks = [];
var column, row;
var blockPos;
var blockSize;


var test;

function setup() {
  noCanvas();
  column = 10;
  row = 6;
  blockPos = createVector(0, 0);
  blockSize = 40;

  test = "Quantum cryptography was proposed first by Stephen Wiesner, then at Columbia University in New York, who, in the early 1970s, introduced the concept of quantum conjugate coding. His seminal paper titled Conjugate Coding was rejected by";

  //after dropping the text
  //console.log(textProcess(test));
  createBlock();
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
  var sylList = textProcess(test);
  // var testL = floor(sylList.length/column);
  // console.log(testL);

  //converting the 1d array of syllables to 2d array to match the blocks
  for (var i = 0; i < column; i++) {
    sylBlocks[i] = [];
    sylOccupied[i] = [];
    sylBlocks[i].push(sylList / row);
    for (var j = 0; j < row; j++) {
      sylBlocks[i][j] = sylList[j % row + i * row];
      if (sylBlocks[i][j] == undefined) {
        sylBlocks[i][j] = 0;
      }
      //complex words (more than 3 syllables) will create the path in createBlock()
      if (sylBlocks[i][j] >= 3) {
        sylOccupied[i][j] = false;
      } else {
        sylOccupied[i][j] = true;
      }
    }
  }

  //console.log(sylBlocks);
  // console.log(sylList);
  // console.log(sylOccupied);
  return {
    sylBlocks,
    sylOccupied
  };

}

function createBlock() {
  var sylArray = drawSyl().sylBlocks;
  console.log(sylArray);
  for (var i = 0; i < column; i++) {
    blocks[i] = [];
    for (var j = 0; j < row; j++) {
      blocks[i][j] = createDiv(sylArray[i][j]);
      blocks[i][j].style('height', blockSize + 'px');
      blocks[i][j].style('width', blockSize + 'px');
      blockPos.x = blockSize * i;
      blockPos.y = blockSize * j;
      blocks[i][j].position(blockPos.x, blockPos.y);
      blocks[i][j].style('border', 'solid 1px');
    }
  }
  blocks[2][3].style('background-color', 'pink');
}

function player() {

}