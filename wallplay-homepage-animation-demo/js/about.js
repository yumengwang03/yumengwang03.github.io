// // JS FOR ABOUT PAGES

  $(document).ready(function(){

// FADES ARROW AND COLLABORATOR SECTION ONSCROLL

  $(window).scroll(function(){
    $("#about-down_arrow").css("opacity", 1 - $(window).scrollTop() / 250);
    });
});