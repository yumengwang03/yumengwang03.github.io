$(document).ready(function() {
  // SEND USER DATA TO FIREBASE
  $('#subfooter-email-form').on('submit', function(event) {
    // var timestamp = Number(new Date());
    // var storageRef = firebase.storage().ref(timestamp.toString());
    event.preventDefault();
    var formType = "subfooter form";
    var email = $('#contact-email').val();
    var origin = $('#origin').val();
    console.log(email + origin);
    document.getElementById('subfooter-submission').style.display = 'none';
    document.getElementById('subfooter_thankyou_message').style.display = 'block';
    // storageRef.put(file_data);    
    var pushedRef = firebase.database().ref('subfooter-email-submission').push({
      email, origin});

    // SEND FORM TO CONNECT@WALLPLAY
        $.ajax({
          url: "https://formspree.io/connect@wallplay.com", 
          method: "POST",
          data: {formType: formType, origin: origin, email: email},
          dataType: "json"
      });    
  
    // SUBSCRIBE USER TO MAILCHIMP
    $.ajax({
      url: '/inc/subscribe.php',
      type: 'POST',
      data: $('#subfooter-email-form').serialize(),
      success: function(msg) {
        var message = $.parseJSON(msg),
            result = '';
        if (message.status === 'subscribed') {
          result = 'Success!';
          console.log("THE RESULT IS " + result);
        } else {
          result = 'ERROR: ' + message.detail;
        }
      }
    });
    return false;
  });
});