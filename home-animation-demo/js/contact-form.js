$(document).ready(function() {
  // SEND USER DATA TO FIREBASE
  $('#email-submission-form').on('submit', function(event) {
    // var timestamp = Number(new Date());
    // var storageRef = firebase.storage().ref(timestamp.toString());
    event.preventDefault();
    var formType = "contact form";
    var email = $('#contact-email').val();
    console.log(email);
    document.getElementById('email-submission').style.display = 'none';
    document.getElementById('contact_thankyou_message').style.display = 'block';
    // storageRef.put(file_data);    
    firebase.database().ref('contact-page-email-submission').push({
      email
    });  
    // SEND FORM TO CONNECT@WALLPLAY
        $.ajax({
          url: "https://formspree.io/connect@wallplay.com", 
          method: "POST",
          data: {formType: formType, email: email, _subject: "New Contact Signup!"},
          dataType: "json"
      });    

  // SUBSCRIBE USER TO MAILCHIMP

    $.ajax({
      url: '/inc/subscribe.php',
      type: 'POST',
      data: $('#email-submission-form').serialize(),
      success: function(msg) {
        console.log(msg);
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
