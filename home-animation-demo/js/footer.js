$(document).ready(function() {
  //THIS OPENS THE INTERN FORM
  $("#form-intern-btn").click(function() {
    $("#intern-modal-bg").slideToggle("fast");
    //close on "close-btn" click
    $(".close-btn").click(function() {
      $("#intern-modal-bg").css('display', 'none');
    });
  });

  $("#resume-upload").change(function(e) {
    $("#intern-upload-resume").css('display', 'none');
    $("#file-uploaded-check").css('display', 'block');
  }); 

  $( "#footer-team-link" ).click(function() {
    location.href='http://wallplay.com/team.html';
  });

    $( "#footer-press-link" ).click(function() {
    location.href='http://wallplay.com/press.html';
  });  
  // THIS SETS UP THE INTERNFORM STORAGE REFERENCE FOR RESUMES
  const internFormDBRef = firebase.database().ref('internForm');
        internFolderRef = storageRef.child('internForm');        
  
  // SENDS THE COLLABORATE FORM RESULTS TO FIREBASE
  $('#intern-form').on('submit', function(event) {
    event.preventDefault();
    var formType = "intern form";
        name = $('#intern-name').val();
        email = $('#intern-email').val();
        phoneNumber = $('#intern-phone-number').val();
        education = $('#education').val();
        availability = $('#availability').val();
        commitTime = $('#commit-time').val();
        whereBased = $('#where-based').val();
        fieldInterest = $('#field-of-interest').val();
        strengths = $('#strengths').val();
        experience = $('#experience-gain').val();
        fiveYearVision = $('#five-year-vision').val();
        hearWallplay = $('#hear-of-wallplay').val();
        startupExperience = $('#experience-in-startup').val();
        idealWorkplace = $('#ideal-workplace').val();
        socialLinks = $('#intern-social-links').val();
        tellUs = $('#intern-tell-us').val();

        internFormDBRef.child(name).update({
          name,
          email,
          phoneNumber,
          education,
          availability,
          commitTime,
          whereBased,
          fieldInterest,
          strengths,
          experience,
          fiveYearVision,
          hearWallplay,
          startupExperience,
          idealWorkplace,
          socialLinks,
          tellUs
        });
        
        // SETS UP THE APPLICANTS STORAGE FOLDER
        applicantFolderRef = internFolderRef.child(name);
        // GETS THE FILE & FILENAME OF THE UPLOADED RESUME
        resumeFile = document.getElementById('resume-upload').files[0];
        selectedResumeFile = document.getElementById('resume-upload').files[0].name;
        console.log("FILE NAME IS " + selectedResumeFile);
        console.log("GOT RESUME FILE " + resumeFile + "selectedResumeFile " + selectedResumeFile);
        // SETS UP THE RESUME LINK
        resumeRefLink = applicantFolderRef.child(selectedResumeFile);
				console.log("RESUME REFERENCE LINK " + resumeRefLink);
        // ADD RESUME TO STORAGE, THEN GET DOWLOAD URL & PUSH TO DB
        resumeRefLink.put(resumeFile).then(function(snapshot) {
        console.log("UPLOADED INTERN RESUME");
        resumeRefLink.getDownloadURL().then(function(url){
          internFormDBRef.child(name).update({
            resumeFile: url
          });
          console.log("WHAT IMST THE " + url);
        });
      });

      document.getElementById('intern-form').style.display = 'none';
      document.getElementById('intern_thankyou_message').style.display = 'block';
    // SEND FORM TO CONNECT@WALLPLAY
        $.ajax({
          url: "https://formspree.io/connect@wallplay.com", 
          method: "POST",
          data: {formType: formType, name: name, email: email, phoneNumber: phoneNumber,
                  education: education, availability: availability, commitTime:commitTime,
                  whereBased: whereBased, fieldInterest: fieldInterest, strengths: strengths,
                  experience: experience, fiveYearVision: fiveYearVision, hearWallplay: hearWallplay,
              	  startupExperience: startupExperience, idealWorkplace: idealWorkplace,
              	  socialLinks: socialLinks, tellUs: tellUs, resumeFile: url, _subject: "New Intern Form!"},
          dataType: "json"
      });
	});
});