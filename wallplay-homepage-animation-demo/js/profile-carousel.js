$(document).ready(function() {

    $("#splash-overlay-profile-text").delay(2000).fadeOut("slow");

    // Init Owl Carousel
            var top = $("#top");
            var bottom = $("#bottom")
            top.owlCarousel({
            autoplay:true,
            autoplayTimeout:7000,
            loop: true,
            items: 1
            });
            bottom.owlCarousel({
            autoplay: true,
            margin: 10,
            loop: false,
            items: 3
        });
});
      
    lightbox.option({
      'positionFromTop': 200,
      'albumLabel': ''
    });      