// This sketch used the RiTa library (Version 1.12; Howe 2015) to perform natural language processing of the text.

var txtAraw;
var txtA;

var txtBraw;
var txtB;

var nounA = {};
var verbA = {};
var adjA = {};
var advA = {};
var theA = {};

var babyText;

// a trick for loadStrings, according to http://shiffman.github.io/A2Z-F15/week2/notes.html
// "loadStrings" loads the string as a string array
// use "join" to put them back into a gian string
function preload() {
  txtAraw = loadStrings('data/baudelaire.txt'); //excerpt from The Confiteor Of the Artist - Charles Baudelaire
  txtBraw = loadStrings('data/gravitational.txt'); //excerpt from the news about gravitational waves - Washington Post, https://www.washingtonpost.com/news/speaking-of-science/wp/2016/02/11/cosmic-breakthrough-physicists-detect-gravitational-waves-from-violent-black-hole-merger/
}

function setup() {
  createCanvas(500, 500);
  textFont('times', 16);
  textAlign(LEFT);

  txtA = join(txtAraw, '\n');
  txtB = join(txtBraw, '\n');

}

function draw() {
  nounA = categorize(txtA).noun;
  verbA = categorize(txtA).verb;
  adjA = categorize(txtA).adj;
  advA = categorize(txtA).adv;
  theA = categorize(txtA).the;
  //console.log(nounA.length);

  inherit(nounA);

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
    //   pair[i] = pos[i] + "," + token[i];
    //   pairsub[i] = pair[i].substring(0, 2);

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

var counter = 0;

function inherit(property) {
  var recessive = [];
  var dominant = [];
  var characters;


  for (var i = 0; i < property.length; i++) {
    characters = property[0].split('');
    characters.sort();
    //console.log(characters);

    for (var j = 0; j < characters.length; j++) {

      if (characters[j] === characters[j - 1]) {
        //console.log(true);
        // if (dominant.match(property[0]) == null) {
        //   dominant.push(property[0]);
        // }
      } else {
        //console.log(false);
        // if (matchAll(recessive, property[0]) === property[0]) {
        //   recessive.push(property[0]);
        // }
        if (recessive.match(property[0]) !== property[0]) {
          recessive.push(property[0]);
        }
      }
    }
  }
  //console.log(matchAll(recessive, "hello"));
  console.log(recessive);


}