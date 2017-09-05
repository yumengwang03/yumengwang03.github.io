// JS FOR PROJECT PAGES

  $(document).ready(function(){
// MAKES STICKY 'X'  	
    $(".sticker").sticky({topSpacing: 20});

// FADES ARROW AND COLLABORATOR SECTION ONSCROLL

  $(window).scroll(function(){
    $(".down_arrow").css("opacity", 1 - $(window).scrollTop() / 250);
    $("#subline-section").css("opacity", 1 - $(window).scrollTop() / 250);
    });
});