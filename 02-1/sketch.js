// var socket;

//excerpt from The Confiteor Of the Artist - Charles Baudelaire
var textA;

//excerpt from the new about gravitational waves - Washington Post, https://www.washingtonpost.com/news/speaking-of-science/wp/2016/02/11/cosmic-breakthrough-physicists-detect-gravitational-waves-from-violent-black-hole-merger/
var textB;

var babyText;

function preload() {
  textA = loadStrings('data/baudelaire.txt');
  textB = loadStrings('data/gravitational.txt');
}

function setup() {
  
}

function draw() {
  var textAsplit = split(textA, " ");
  var textBsplit = split(textB, " ");
  //console.log(textBsplit.length);
  
  for (var i = 0; i < textAsplit.length; i++ ) {
    if (textAsplit[i] == "am" || textAsplit[i] == "is" || textAsplit[i] == "are") {
      
    }
  }
  
  for (var i = 0; i < textAsplit.length; i++ ) {
    
  }
  

}