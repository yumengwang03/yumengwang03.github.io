    $('.filter-btn').each(function(idx, item) {
      item.onclick = filterFunction;
    });

    var activeFilters = []; //Dynamic array of activeFilters

    function filterFunction(clickEvent) {
      var clickedElement = clickEvent.srcElement,
        filterClass = clickedElement.id;

      if (filterClass == "all-filter") {
        //If see all is clicked, go through each item in .filter-button, and remove the active-filter; 
        $('.filter-btn').each(function(idx, item) {
          $(item).removeClass('active-filter');
        });
        //Empty the active-filters array and show all the photos; 
        activeFilters = [];
        $('.artist-div').each(function(idx, item) {
          $(item).fadeIn(500);
        });
      }

      //If any button other than see-all is clicked
      else if ($.inArray(filterClass, activeFilters) != -1) { //If button clicked is already highlighted
        ($(clickedElement)).removeClass('active-filter'); //Takes off highlight off button clicked
        activeFilters.splice($.inArray(filterClass, activeFilters), 1); //Removes only this button from activeFilters array
      } else { //If button clicked is not highlighted
        ($(clickedElement)).addClass('active-filter'); //Highlights button
        activeFilters.push(filterClass); //Pushes into array
      }


      if (activeFilters == 0) { //Happens when see-all is clicked or all highlighted buttons are de-clicked
        console.log("no active filters");
        $('.artist-div').each(function(idx, item) {
          $(item).fadeIn();
        });
        $('#all-filter').addClass('active-filter'); //Highlights the see-all button
      } else {
        $('#all-filter').removeClass('active-filter'); //Removes highlight off see-all button because it's started as an active-button upon loading

        console.log("Active filters are", activeFilters.toString());
        $('.artist-div').each(function(idx, item) { //Hides all photos, so old filters aren't saved along with the proper filters
          $(item).fadeOut(200);
        });
        $.each(activeFilters, function(idx, item) { //Only show the photos from the filters                    
          $('.' + item).fadeIn(500);
        });
      }
    }