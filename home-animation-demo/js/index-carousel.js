    $(document).ready(function() {
      $('.owl-carousel').owlCarousel();
    });

    var talent = $("#talent-carousel");
    var space = $("#space-carousel");
    var press = $("#press-carousel");

    talent.owlCarousel({
      autoplay: true,
      autoplayTimeout: 3000,
      loop: true,
      items: 1
    });

    space.owlCarousel({
      autoplay: true,
      autoplayTimeout: 3000,
      loop: true,
      items: 1
    });

    press.owlCarousel({
      autoplay: true,
      autoplayTimeout: 8000,
      loop: true,
      items: 1
    });