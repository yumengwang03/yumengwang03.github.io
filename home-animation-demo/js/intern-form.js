// //THIS FILE IS IN CHARGE OF OPENING THE INTERN FORM

// $(document).ready(function() {
//   $("#form-intern-btn").click(function() {
//     $("#intern-modal-bg").slideToggle("fast");
//     console.log('INTERN FORM SHOULD BE SHOWING UP');
//     //close on "close-btn" click
//     $(".close-btn").click(function() {
//       $("#intern-modal-bg").css('display', 'none');
//     });
//   });

//   // SENDS THE COLLABORATE FORM RESULTS TO FIREBASE
//   $('#intern-form').on('submit', function(event) {
//     event.preventDefault();
//     var formType = "intern form";
//     var origin = $('#origin').val();
//     var subject = $('#subject').val();
//     var name = $('#intern-name').val();
//     var email = $('#intern-email').val();
//     var phoneNumber = $('#intern-phone-number').val();
//     var education = $('#education').val();
//     var availability = $('#availability').val();
//     var commitTime = $('#commit-time').val();
//     var whereBased = $('#where-based').val();
//     var fieldInterest = $('#field-of-interest').val();
//     var strengths = $('#strengths').val();
//     var experience = $('#experience-gain').val();
//     var fiveYearVision = $('#five-year-vision').val();
//     var hearWallplay = $('#hear-of-wallplay').val();
//     var startupExperience = $('#experience-in-startup').val();
//     var idealWorkplace = $('#ideal-workplace').val();
//     var socialLinks = $('#intern-social-links').val();
//     var tellUs = $('#intern-tell-us').val();
//     document.getElementById('intern-form').style.display = 'none';
//     document.getElementById('intern_thankyou_message').style.display = 'block';
//     firebase.database().ref('internForm').push({
//       origin,
//       name,
//       subject,
//       email,
//       phoneNumber,
//       education,
//       availability,
//       commitTime,
//       whereBased,
//       fieldInterest,
//       strengths,
//       experience,
//       fiveYearVision,
//       hearWallplay,
//       startupExperience,
//       idealWorkplace,
//       socialLinks,
//       tellUs
//     });
//     // SEND FORM TO CONNECT@WALLPLAY
//         $.ajax({
//           url: "https://formspree.io/connect@wallplay.com", 
//           method: "POST",
//           data: {formType: formType, origin: origin, subject: subject, name: name, email: email, phoneNumber: phoneNumber,
//                   education: education, availability: availability, commitTime:commitTime,
//                   whereBased: whereBased, fieldInterest: fieldInterest, strengths: strengths,
//                   experience: experience, fiveYearVision: fiveYearVision, hearWallplay: hearWallplay,
//               	  startupExperience: startupExperience, idealWorkplace: idealWorkplace,
//               	  socialLinks: socialLinks, tellUs},
//           dataType: "json"
//       });
// 	});
// });

