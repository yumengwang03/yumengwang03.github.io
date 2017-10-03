// THIS FILE CONFIGURES WHICH DIV IS TO SHOW IN 
// ARTIST/SPACE PROFILES BASED ON SIDEBAR SELECTION 

setActiveButton = function(divName) {
  $('.show-div-button').each(function(index, item) {
    var id = item.id,
      buttonNameToMatch = divName + '-div-button';

    if (id == buttonNameToMatch) {
      $(item).addClass('active');
    } else {
      $(item).removeClass('active');
    }
  });
};

toggleDivVisibility = function(divName) {
  $('.show-div-element').each(function(index, item) {
    var id = item.id,
      divNameToMatch = divName + '-view';
    if (id == divNameToMatch) {
      $(item).show();
    } else {
      $(item).hide();
    }
  });
};

showDivByDivName = function(divName) {
  setActiveButton(divName);
  toggleDivVisibility(divName);
};