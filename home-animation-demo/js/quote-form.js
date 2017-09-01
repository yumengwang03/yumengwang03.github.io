//THIS FILE IS IN CHARGE OF OPENING THE QUOTE FORM
//AND SENDING THE DATA TO FIREBASE

$(document).ready(function() {
  //SPACE QUOTE FORM POP UP
  $(".space-quote-btn").click(function() {
    var spaceName = this.id;
    $("#space-name").val(spaceName);
    $("#quote-modal").slideToggle("fast");
      });
    //close on "close-btn" click
    $(".close-btn").click(function() {
      $("#quote-modal").css('display', 'none');
    });

  //QUOTE FORM POP UP
  $("#quote-btn").click(function() {
    $("#quote-modal").slideToggle("fast");
    //close on "close-btn" click
    $(".close-btn").click(function() {
      $("#quote-modal").css('display', 'none');
    });
  });

  // GETS EVERY 'CHECKED' SERVICE
  function getCheckedServices() {
    var services = document.getElementsByClassName('services-wanted');
    var servicesLength = services.length;
    var servicesWanted = [];

    for (i = 0; i < servicesLength; i++) {
      if (services[i].checked === true) {
        servicesWanted.push(services[i].value);
      }
    }
    return servicesWanted;
  }

  $('#talent-quote-form').on('submit', function(event) {
    event.preventDefault();
    var formType = "talent quote form";
    var talentName = $('#talent-name').val();
    var name = $('#qf-name').val();
    var email = $('#qf-email').val();
    var phone = $('#phone').val();
    var company = $('#company').val();
    var jobTitle = $('#job-title').val();
    var services = getCheckedServices();
    var talentAsk = $('#talent-ask').val();
    var questions = $('#questions').val();
    document.getElementById('talent-quote-form').style.display = 'none';
    document.getElementById('quote_thankyou_message').style.display = 'block';
    firebase.database().ref(talentName).push({
      name,
      email,
      phone,
      company,
      jobTitle,
      services,
      talentAsk,
      questions
    });

    // SEND FORM TO CONNECT@WALLPLAY
        $.ajax({
          url: "https://formspree.io/connect@wallplay.com", 
          method: "POST",
          data: {formType: formType, talentName: talentName, name: name,
                  email: email, phone: phone, company: company,
                  jobTitle: jobTitle, services: services, talentAsk: talentAsk,
                  questions: questions, _subject: "New Talent Quote Form!"},
          dataType: "json"
      });    
  });
  
  $('#space-quote-form').on('submit', function(event) {
    event.preventDefault();
    var formType = "space quote form";
    var spaceName = $('#space-name').val();
    var name = $('#qf-name').val();
    var email = $('#qf-email').val();
    var phone = $('#phone').val();
    var date = $('#date').val();
    var eventType = $('#event-type').val();
    var guestAmount = $('#guest-amount').val();
    var planStage = $('#plan-stage').val();
    var services = getCheckedServices();
    var barCater = $('#bar-cater').val();
    var whitewall = $('#white-wall').val();
    var modifySpace = $('#modify-space').val();
    var bookTalent = $('#book-talent').val();
    var location = $('#qf-location').val();

    console.log(spaceName, name, email, phone, date, eventType, guestAmount,
      planStage, services, barCater, whitewall, modifySpace,
      bookTalent, location);
    document.getElementById('space-quote-form').style.display = 'none';
    document.getElementById('quote_thankyou_message').style.display = 'block';
    firebase.database().ref(spaceName).push({
      name,
      email,
      phone,
      date,
      eventType,
      guestAmount,
      planStage,
      services,
      barCater,
      whitewall,
      modifySpace,
      bookTalent,
      location
    });
        // SEND FORM TO CONNECT@WALLPLAY
        $.ajax({
          url: "https://formspree.io/connect@wallplay.com", 
          method: "POST",
          data: {formType: formType, spaceName: spaceName, name: name,
                  email: email, phone: phone, date: date, eventType: eventType,
                  guestAmount: guestAmount, planStage: planStage, services:services,
                  barCater: barCater, whitewall: whitewall, modifySpace: modifySpace,
                  bookTalent: bookTalent, location: location, _subject: "New Space Quote Form!"},
          dataType: "json"
      });    
  });
});