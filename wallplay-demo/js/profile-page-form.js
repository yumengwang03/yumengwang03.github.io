// THIS FILE SETS ALL JAVASCRIPT BEHAVIOR IN THE TOP NAV BAR
// THIS INCLUDES: OPENING 'collaborate' and 'burger' BTN
// SENDING THE RESULTS OF A 'collaborate' FORM TO FIREBASE

// OPENS THE COLLABORATE FORM
$(document).ready(function() {
    //SHOW MODAL BY DEFAULT
    $('.modal-bg').css('display', 'block');

    // GETS EVERY 'CHECKED' SERVICE
  function getCheckedServices() {
    var services = document.getElementsByClassName('services-offered');
    var servicesLength = services.length;
    var servicesWanted = [];

    for (i = 0; i < servicesLength; i++) {
      if (services[i].checked === true) {
        servicesWanted.push(services[i].value);
      }
    }
    return servicesWanted;
  }
  
  // SENDS THE PROFILE FORM RESULTS TO FIREBASE
  $('#profile-page-form').on('submit', function(event) {
    event.preventDefault();
    var formType = "profile page form";
    var origin = $('#origin').val();
    var imageLink = $('#img-folder-link').val();
    var name = $('#name').val();
    var email = $('#email').val();
    var mediaSentence = $('#media-sentence').val();
    var servicesOffered = getCheckedServices();
    var otherServices = $('#other-services').val();
    var artisticMediumPara = $('#artistic-medium-para').val();
    var bio = $("#bio").val();
    var pressLinks = $('#press-links').val();
    var socialLinks = $('#social-links').val();
    //PROJECT 1 INFO
    var projectOneName = $('#project-one-name').val();
    var projectOneDate = $('#project-one-date-location').val();
    var projectOneDescription = $('#project-one-description').val();
    var projectOneCollab = $('#project-one-collaborators').val();
    var projectOneVideos = $('#project-one-video-links').val();
    var projectOnePress = $('#project-one-press-links').val();
    //PROJECT 2 INFO
    var projectTwoName = $('#project-two-name').val();
    var projectTwoDate = $('#project-two-date-location').val();
    var projectTwoDescription = $('#project-two-description').val();
    var projectTwoCollab = $('#project-two-collaborators').val();
    var projectTwoVideos = $('#project-two-video-links').val();
    var projectTwoPress = $('#project-two-press-links').val();
    //PROJECT 3 INFO
    var projectThreeName = $('#project-three-name').val();
    var projectThreeDate = $('#project-three-date-location').val();
    var projectThreeDescription = $('#project-three-description').val();
    var projectThreeCollab = $('#project-three-collaborators').val();
    var projectThreeVideos = $('#project-three-video-links').val();
    var projectThreePress = $('#project-three-press-links').val();

    //SECTION FOUR (OPTIONAL INPUTS)
    var projectRates = $('#project-rates').val();
    var yearGoals = $('#year-goals').val();
    var artistVision = $('#project-rates').val();
    var letUsKnow = $('#let-us-know').val();
    document.getElementById('collaborate-modal').style.display = 'none';
    document.getElementById('thankyou_message').style.display = 'block';
    firebase.database().ref('addProfileForm').push({
      origin,
      imageLink,
      name,
      email,
      mediaSentence,
      servicesOffered,
      otherServices,
      artisticMediumPara,
      bio,
      pressLinks,
      socialLinks,
      projectOneName,
      projectOneDate,
      projectOneDescription,
      projectOneCollab,
      projectOneVideos,
      projectOnePress,
      projectTwoName,
      projectTwoDate,
      projectTwoDescription,
      projectTwoCollab,
      projectTwoVideos,
      projectTwoPress,
      projectThreeName,
      projectThreeDate,
      projectThreeDescription,
      projectThreeCollab,
      projectThreeVideos,
      projectThreePress,
      projectRates,
      yearGoals,
      artistVision,
      letUsKnow
    });
    // SEND FORM TO CONNECT@WALLPLAY
        $.ajax({
          url: "https://formspree.io/support@wallplay.com", 
          method: "POST",
          data: {formType: formType, origin: origin, imageLink:imageLink, name: name, email: email,
                  mediaSentence: mediaSentence, servicesOffered: servicesOffered, otherServices: otherServices,
                  artisticMediumPara: artisticMediumPara, bio: bio, pressLinks: pressLinks,
                  socialLinks: socialLinks, projectOneName: projectOneName,
                  projectOneDate: projectOneDate, projectOneDescription: projectOneDescription,
                  projectOneCollab: projectOneCollab, projectOneVideos:projectOneVideos,
                  projectOnePress:projectOnePress, projectTwoName: projectTwoName,
                  projectTwoDate: projectTwoDate, projectTwoDescription: projectTwoDescription,
                  projectTwoCollab: projectTwoCollab, projectTwoVideos:projectTwoVideos,
                  projectTwoPress:projectTwoPress, projectThreeName: projectThreeName,
                  projectThreeDate: projectThreeDate, projectThreeDescription: projectThreeDescription,
                  projectThreeCollab: projectThreeCollab, projectThreeVideos:projectThreeVideos,
                  projectThreePress:projectThreePress, projectRates: projectRates, yearGoals: yearGoals,
                  artistVision: artistVision, letUsKnow: letUsKnow},                  
          dataType: "json"
      });
        // SHOW MSG ON PAGE THEN NAV TO HOMEPAGE
        setTimeout(function(){
             window.location = "http://wallplay.com";
        },1000);
  });
});