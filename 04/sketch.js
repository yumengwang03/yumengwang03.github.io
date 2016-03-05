var blocks = [];
var column, row;
var blockPos;
var blockSize;
var player;
var moveU, moveD, moveL, moveR;
var moved;
var button1;


var test;

function setup() {
  noCanvas();
  column = 12;
  row = 8;
  blockPos = createVector(0, 0);
  blockSize = 60;
  moveU = false;
  moveD = false;
  moveL = false;
  moveR = false;
  moved = false;

  test = "Quantum cryptography was proposed first by Stephen Wiesner, then at Columbia University in New York, who, in the early 1970s, introduced the concept of quantum conjugate coding. His seminal paper titled Conjugate Coding was rejected by IEEE Information Theory Society, but was eventually published in 1983 in SIGACT News (15:1 pp. 78–88, 1983). In this paper he showed how to store or transmit two messages by encoding them in two conjugate observables, such as linear and circular polarization of light, so that either, but not both, of which may be received and decoded. He illustrated his idea with a design of unforgeable bank notes. In 1984, building upon this work, Charles H. Bennett, of the IBM's Thomas J. Watson Research Center, and Gilles Brassard, of the Université de Montréal, proposed a method for secure communication based on Wiesner’s conjugate observables, which is now called BB84. In 1991 Artur Ekert developed a different approach to quantum key distribution based on peculiar quantum correlations known as quantum entanglement.";


  //after dropping the text
  //console.log(textProcess(test));
  createBlock();

  player = new Player();
  //player.move();
  player.display();
  player.analyze();

  // button1 = createButton('move');
  // button1.position(600, 50);
  // button1.mousePressed(buttonPressed);
  //buttonPressed();


}

// function buttonPressed() {
//   player.move();
//   player.display();
// }

function draw() {
  player.update();
  //player.analyze();
  if (moved) {
    player.jump();
    moved = false;
  }
  
  player.display();
  
}

// function keyPressed() {
//   if (keyCode === UP_ARROW) {
//     moveU = true;
//     moveD = false;
//     moveL = false;
//     moveR = false;
//   } else if (keyCode === DOWN_ARROW) {
//     moveD = true;
//     moveU = false;
//     moveL = false;
//     moveR = false;
//   } else if (keyCode === LEFT_ARROW) {
//     moveL = true;
//     moveD = false;
//     moveU = false;
//     moveR = false;
//   } else if (keyCode === RIGHT_ARROW) {
//     moveR = true;
//     moveD = false;
//     moveL = false;
//     moveU = false;
//   }
//   //player.move();
//   // moveU = false;
//   //   moveD = false;
//   //   moveL = false;
//   //   moveR = false;
//   //player.display();
// }

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
        sylBlocks[i][j] = 1;
      }
      //complex words (more than 3 syllables) will create the path in createBlock()
      if (sylBlocks[i][j] >= 3) {
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



function createBlock() {
  var sylArray = drawSyl().sylBlocks;
  var OccupiedArray = drawSyl().sylOccupied;
  //console.log(sylArray);
  for (var i = 0; i < column; i++) {
    blocks[i] = [];
    for (var j = 0; j < row; j++) {
      if (OccupiedArray[i][j]) {
        blocks[i][j] = createDiv(sylArray[i][j]);
        //blocks[i+1][j] = createDiv(sylArray[i+1][j]);
        blocks[i][j].style('height', blockSize + 'px');
        blocks[i][j].style('width', blockSize + 'px');
        blockPos.x = blockSize * i;
        blockPos.y = blockSize * j;
        blocks[i][j].position(blockPos.x, blockPos.y);
        blocks[i][j].style('background', 'pink');
        blocks[i][j].style('font-family', 'Monospace');
        blocks[i][j].style('font-size', '4em');
        blocks[i][j].style('text-align', 'center');
        //blocks[i][j].style('vertical-align', 'middle');
      }
    }
  }
}

function Player() {
  //question: when I use this., the var doesn't pass to this.analyze function
  var pathOccupied = drawSyl().sylOccupied;
  this.startPoint = [];
  this.input = createElement('textarea', 'la');
  var distance = [];

  //randomly choose an empty block at the bottom row to start
  for (var i = 0; i < column; i++) {
    if (!pathOccupied[i][row - 1]) {
      this.startPoint.push(i);
    }
  }
  var playerPos = createVector(this.startPoint[Math.floor(Math.random() * this.startPoint.length)] * blockSize, (row - 1) * blockSize);
  //console.log(this.playerPos);

  this.update = function() {
    //console.log(moveU);
    this.input.mousePressed(this.moving);
    console.log(moved);
    //this.analyze();
    if (moveU) {
      console.log("go up");
      //console.log(this.pathOccupied);
    }
  }
  
  this.moving = function() {
    moved = true;
  }

  this.analyze = function() {
    this.empty = [];
    
    //console.log(this.value());
    for (var i = 0; i < column; i++) {
      for (var j = 0; j < row; j++) {
        if (!pathOccupied[i][j]) {
          this.empty.push([i, j]);
        }
      }
    }
    //console.log(playerPos);
    for (var i = 0; i < this.empty.length; i++) {
      // if (playerPos.x == this.empty[i][0] * blockSize && playerPos.y != this.empty[i][1] * blockSize) {
      if (playerPos.x == this.empty[i][0] * blockSize) {
        distance.push(this.empty[i][1] * blockSize);

      }
    }
    //console.log(distance);
  }

  this.jump = function() {
    var lastIndex = distance.length - 1;
    //console.log(distance.length);
    if (playerPos.y >= distance[lastIndex]) {
      playerPos.y = distance[lastIndex - 1];
      //this.distance[lastIndex].remove();
      distance.splice(lastIndex, 1);
      //distance[lastIndex-1].remove();
    }
    //this.distance.slice(this.distance.length-2, 1);
    //playerPos.y = 20;
    console.log(distance);
    console.log(playerPos.y);

  }

  this.display = function() {
    this.input.size(blockSize - 6, blockSize - 6);
    this.input.position(playerPos.x, playerPos.y);
  }

}