var conceptJSON;
var conceptIn;
var button;
var yumeng;

var dialogue1;
var dialogue2;
var links = [];

var baseURI = "https://watson-api-explorer.mybluemix.net/concept-insights/api/v2/graphs/wikipedia/en-20120601/related_concepts?concepts=%20%5B%22%2Fgraphs%2Fwikipedia%2Fen-20120601%2Fconcepts%2F";
//var conceptQuery = "Neuromancer";
var keyword = "";
var level = "%22%5D&level=2";
var limit = "&limit=10";

//var test = "https://watson-api-explorer.mybluemix.net/concept-insights/api/v2/graphs/wikipedia/en-20120601/related_concepts?concepts=%20%5B%22%2Fgraphs%2Fwikipedia%2Fen-20120601%2Fconcepts%2FBoston_Dynamics%22%5D&level=0&limit=10";

function setup() {
  noCanvas();

  yumeng = createImg('assets/me.png');
  yumeng.style('margin-left', '28%');
  yumeng.style('margin-right', 'auto');

  conceptIn = createElement('textarea', "Put key words here");
  conceptIn.size(windowWidth * 0.2, 40);
  conceptIn.position(windowWidth * 0.5, 300);
  conceptIn.style('resize', 'none');
  conceptIn.style('border', 'dotted #FFD500 2px');
  conceptIn.style('font-family', 'Arial');
  conceptIn.style('font-size', '1em');
  conceptIn.style('color', '#FFD500');
  conceptIn.style('outline', 'none');
  conceptIn.mousePressed(function() {
    this.html('');
  });

  button = createButton('START');
  button.size(windowWidth * 0.05, 40);
  button.position(windowWidth * 0.58, 370);
  button.style('font-family', 'Arial Black');
  button.style('font-size', '1em');
  button.style('border-radius', '5px');
  button.style('border', 'white');
  button.style('background-color', '#3374FF');
  button.style('color', 'white');
  button.style('outline', 'none');
  button.mousePressed(buttonPressed);
}

function getConcept() {
  // createA("https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=" + test.concepts[0].concept.id);
  dialogue2 = createElement('h3', "Interesting! You might also want to check these out!");
  dialogue2.style('text-align', 'center');
  dialogue2.style('color', '#A7A7A7');

  for (var i = 0; i < conceptJSON.concepts.length; i++) {
    var relatedWords = conceptJSON.concepts[i].concept.id.split("/");
    var index = relatedWords.length - 1;
    var related = relatedWords[index];
    console.log(related);
    var display = related.replace(/_/g, " ");
    links[i] = createA("https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=" + display, display);
    createElement('br');
    links[i].style('text-decoration', 'none');
    links[i].style('font-family', 'Avenir');
    links[i].style('margin-left', '40%');
    links[i].style('margin-top', '10px');
    links[i].style('margin-bottom', '10px');
    links[i].style('color', '#FFD500');
  }
}

function buttonPressed() {
  input = conceptIn.value();
  keyword = input.charAt(0).toUpperCase() + input.slice(1);
  keyword = keyword.replace(/ /g, "_");
  var conceptURI = baseURI + keyword + level + limit;
  conceptJSON = loadJSON(conceptURI, getConcept);
  dialogue1 = createElement('h3', "Hmm, let me think... (be patient)");
  dialogue1.style('text-align', 'center');
  dialogue1.style('color', '#A7A7A7');
}
