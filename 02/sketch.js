// This sketch used the RiTa library (Version 1.12; Howe 2015) to perform natural language processing of the text.

var txtAraw;
var txtA;

var txtBraw;
var txtB;

var inputA, inputB, button;


// a trick for loadStrings, according to http://shiffman.github.io/A2Z-F15/week2/notes.html
// "loadStrings" loads the string as a string array
// use "join" to put them back into a gian string
function preload() {
  txtAraw = loadStrings('data/baudelaire.txt'); //excerpt from The Confiteor Of the Artist - Charles Baudelaire
  txtBraw = loadStrings('data/gravitational.txt'); //excerpt from the news about gravitational waves - Washington Post, https://www.washingtonpost.com/news/speaking-of-science/wp/2016/02/11/cosmic-breakthrough-physicists-detect-gravitational-waves-from-violent-black-hole-merger/
}

function setup() {
  createCanvas(windowWidth, windowHeight + 400);

  inputA = createInput();
  inputB = createInput();
  inputA.position(windowWidth / 4 - 140, 520);
  inputB.position(3 * windowWidth / 4 - 240, 520);
  inputA.size(360, 100);
  inputB.size(360, 100);

  button = createButton('Make a Baby');
  button.position(windowWidth/2-60, 550);
  button.size (100, 50);
  button.mousePressed(generate);

  txtA = join(txtAraw, '\n');
  txtB = join(txtBraw, '\n');
  
  // textFont('Courier', 16);
  // fill(50);
  // text()
}

var counter = 0; // to avoid drawing text for multiple times
function draw() {
  if (counter < 1) {

    textFont('Courier', 30);
    fill(255, 100, 180);
    text("Parent A", windowWidth / 4 - 150, 20, 500, 300);
    fill(90, 130, 255);
    text("Parent B", 3 * windowWidth / 4 - 250, 20, 500, 300);
    fill(255, 230, 100);
    text("Baby", windowWidth / 2 - 200, 520, 400, 200);


    fill(0);
    textFont('Courier', 16);
    text(txtA, windowWidth / 4 - 150, 100, 400, 300);
    text(txtB, 3 * windowWidth / 4 - 250, 100, 400, 300);

    // for verb conjugation
    // var args = {
    //   tense: RiTa.PAST_TENSE,
    //   number: RiTa.SINGULAR,
    //   person: RiTa.THIRD_PERSON
    // };

    var nounA = categorize(txtA).noun;
    var verbA = categorize(txtA).verb;
    var adjA = categorize(txtA).adj;
    var advA = categorize(txtA).adv;
    var theA = categorize(txtA).the;

    var nounB = categorize(txtB).noun;
    var verbB = categorize(txtB).verb;
    var adjB = categorize(txtB).adj;
    var advB = categorize(txtB).adv;
    var theB = categorize(txtB).the;
    //console.log(verbA);

    var babyNoun = inherit(nounA, nounB);
    var babyVerb = inherit(verbA, verbB);
    var babyAdj = inherit(adjA, adjB);
    var babyAdv = inherit(advA, advB);
    var babyThe = inherit(theA, theB);
    //console.log(babyNoun);

    var babyText = babyAssemble(babyNoun, babyVerb, babyAdj, babyAdv, babyThe);
    var fullBaby = join(babyText, " ");
    //console.log(fullBaby);
    text(fullBaby, windowWidth / 2 - 200, 600, 400, 200);

    counter++;
  }

}


function categorize(txt) {
  var noun = [];
  var verb = [];
  var adj = [];
  var adv = [];
  var the = [];

  var token = RiTa.tokenize(txt);
  var pos = RiTa.getPosTags(txt);

  for (var i = 0; i < pos.length; i++) {
    // categorize tokens according to PENN part-of-speech list, https://rednoise.org/rita/reference/PennTags.html
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
  var pile = {
    noun: noun,
    verb: verb,
    adj: adj,
    adv: adv,
    the: the
  };
  return pile;
}

function inherit(propertyA, propertyB) {
  var babyGene = [];
  var babyLength;

  if (propertyA.length >= propertyB.length) {
    babyLength = propertyB.length;
  } else {
    babyLength = propertyA.length;
  }

  for (var i = 0; i < babyLength; i++) {
    var duplicatedNumA = check(propertyA[i]);
    var duplicatedNumB = check(propertyB[i]);
    //console.log(duplicatedNumA);

    if (duplicatedNumA > 1 && duplicatedNumB <= 1) {
      babyGene.push(propertyA[i]);
    } else if (duplicatedNumA > 1 && duplicatedNumB > 1) {
      babyGene.push(propertyA[i]);
    } else if (duplicatedNumA <= 1 && duplicatedNumB <= 1) {
      babyGene.push(propertyB[i]);
    } else if (duplicatedNumA <= 1 && duplicatedNumB > 1) {
      babyGene.push(propertyB[i]);
    }
  }

  return babyGene;
}

// reference this example: http://stackoverflow.com/questions/6176684/how-to-determine-if-a-string-contains-a-sequence-of-repeated-letters
function check(checkStr) {
  var duplicate = {}; //list of each letter's duplication 
  var result = 0;

  for (var i = checkStr.length; i >= 0; i--) {
    var letter = checkStr.charAt(i);
    if (letter in duplicate) {
      duplicate[letter] += 1;
    } else {
      duplicate[letter] = 1;
    }
  }
  for (letter in duplicate) {
    if (duplicate.hasOwnProperty(letter)) {
      if (duplicate[letter] > 1) {
        result = duplicate[letter];
      }
    }
  }
  return result;
}

function babyAssemble(bNoun, bVerb, bAdj, bAdv, bThe) {
  var babyText = [];
  for (var i = 0; i < bNoun.length / 2; i++) {
    babyText.push(bNoun[2 * i]);
    if (i < bAdv.length) {
      babyText.push(bAdv[i]);
    }
    if (i < bVerb.length) {
      babyText.push(bVerb[i]);
    }
    if (i < bThe.length) {
      babyText.push(bThe[i]);
    }
    if (i < bAdj.length) {
      babyText.push(bAdj[i]);
    }
    babyText.push(bNoun[2 * i + 1] + ".");
  }
  return babyText;
}

// another inherit fucntion to determine recessive and dominat genes
// function inherit(property) {
//   var recessive = [];
//   var dominant = [];

//   for (var i = 0; i < property.length; i++) {
//     var duplicatedNum = check(property[i]);
//     if (duplicatedNum > 1) {
//       dominant.push(property[i]);
//     } else {
//       recessive.push(property[i]);
//     }

//   }
//   var genes = {
//     dominant: dominant,
//     recessive: recessive
//   };
//   return genes;
// }

function generate() {
  var pnounA = categorize(inputA.value()).noun;
  var pverbA = categorize(inputA.value()).verb;
  var padjA = categorize(inputA.value()).adj;
  var padvA = categorize(inputA.value()).adv;
  var ptheA = categorize(inputA.value()).the;

  var pnounB = categorize(inputB.value()).noun;
  var pverbB = categorize(inputB.value()).verb;
  var padjB = categorize(inputB.value()).adj;
  var padvB = categorize(inputB.value()).adv;
  var ptheB = categorize(inputB.value()).the;
  //console.log(verbA);

  var babyNoun = inherit(pnounA, pnounB);
  var babyVerb = inherit(pverbA, pverbB);
  var babyAdj = inherit(padjA, padjB);
  var babyAdv = inherit(padvA, padvB);
  var babyThe = inherit(ptheA, ptheB);
  //console.log(babyNoun);

  var newBabyText = babyAssemble(babyNoun, babyVerb, babyAdj, babyAdv, babyThe);
  var newFullBaby = join(newBabyText, " ");
  //console.log(fullBaby);
  text(newFullBaby, windowWidth / 2 - 200, 760, 400, 200);

}