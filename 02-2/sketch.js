var socket;

//excerpt from The Confiteor Of the Artist - Charles Baudelaire
var textA = "And now the profundity of the sky dismays me! its limpidity exasperates me. The insensibility of the sea, the immutability of the spectacle, revolt me. Ah, must one eternally suffer, for ever be a fugitive from Beauty? Nature, pitiless enchantress, ever-victorious rival, leave me! Tempt my desires and my pride no more. The contemplation of Beauty is a duel where the artist screams with terror before being vanquished.";

//excerpt from the new about gravitational waves - Washington Post, https://www.washingtonpost.com/news/speaking-of-science/wp/2016/02/11/cosmic-breakthrough-physicists-detect-gravitational-waves-from-violent-black-hole-merger/
var textB = "Scientists announced Thursday that they have succeeded in detecting gravitational waves from the violent merging of two black holes in deep space. The detection was hailed as a triumph for a controversial, exquisitely crafted, billion-dollar physics experiment and as confirmation of a key prediction of Albert Einstein's General Theory of Relativity.";

var babyText;

function setup() {
  socket = io.connect('http://localhost:8000');
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
  
  socket.on('toP5',
    function(data) {

      console.log(data);

    });
}