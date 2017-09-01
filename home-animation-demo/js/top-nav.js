// THIS FILE SETS ALL JAVASCRIPT BEHAVIOR IN THE TOP NAV BAR
// THIS INCLUDES: OPENING 'collaborate' and 'burger' BTN
// SENDING THE RESULTS OF A 'collaborate' FORM TO FIREBASE

// OPENS THE COLLABORATE FORM

  $("#nav-wrap").html(`
<div class="animated-gradient" id="login-nav-container">
  <a href="" id="toggle-login-btn">ground login</a> <span style="font-family: practice_black; color: #FF9F36;">|</span>
  <a href="" id="request-access-btn">request access</a>
 </div>
 <div class="col-1-4 main-logo">
  <a href="http://www.wallplay.com"><img src="/assets/wallplay_main_logo.svg" alt="Wallplay Logo"></a>
 </div>
 <div class="col-3-4" id="top-right-nav-bar">
  <div id="main-nav">
    <ul>
      <li><a href="http://www.wallplay.com/talent.html">talent</a></li>
      <li><a href="http://www.wallplay.com/tech.html">tech</a></li>
      <li><a href="http://www.wallplay.com/space.html">space</a></li>
      <button class="border-btn" id="nav-collaborate-btn">collaborate</button>
      <button id="nav-burger-btn"><img src="/assets/hamburger-open.svg" id="hamburger-img"></button>
    </ul>
  </div>
</div>

  <script>
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $("#nav-burger-btn").css('margin-top', '25px');
    } //FIXES STRANGE BURGER MARGIN ISSUE - FIND ROOT OF ISSUE 
  </script>

<div id="login-form-container" class="closed-login wrap">
  <div id="login-form-parent">
  <form>
  <div id="login-form-email">
    <p>Email</p>
    <input type="email" name="login-email" id="login-email">
   </div>
   <div id="login-form-password">
    <p>Password</p>
    <input type="password" name="login-password" id="login-password">
   </div>
   <div style="margin-top: 40px;"><button id="login-btn" class="border-btn">login</button></div>
   <div style="padding-left: 20px; margin-top: 40px; margin-right: 100px;">
     <button style="background: transparent; border: solid 0px black; position: absolute; right: 35px; margin-top: 20px;" id="login-close-btn"><img src="/assets/hamburger-close.svg" id="login-x-out"></button>
   </div>
  </form>
  </div>
</div>

<div class="col-1-1 side-nav-container" id="side-nav-container" style="font-size: 35px; top: 119px;">
  <hr class="wide-left-line mobile-nav-hr">
  <div class="link-container-mobile">
    <a href="http://www.wallplay.com/talent.html" style="padding-top: 15px;">talent</a>
  </div>
  <hr class="wide-left-line mobile-nav-hr">
  <div class="link-container-mobile">
    <a href="http://www.wallplay.com/tech.html" style="padding-top: 15px;">tech</a>
  </div>
  <hr class="wide-left-line mobile-nav-hr">
  <div class="link-container-mobile">
    <a href="http://www.wallplay.com/space.html" style="padding-top: 15px;">space</a>
  </div>
  <hr class="wide-left-line">
  <div class="link-container">
    <a href="http://www.wallplay.com/about.html" style="padding-top: 15px;">about</a>
  </div>
  <hr class="wide-left-line">
  <div class="link-container">
    <a href="http://www.wallplay.com/team.html" style="padding-top: 15px;">team</a>
  </div>
  <hr class="wide-left-line">
  <div class="link-container">
    <a href="http://www.wallplay.com/press.html" style="padding-top: 15px;">press</a>
  </div>
  <hr class="wide-left-line">
  <div class="link-container">
    <a href="http://www.wallplay.com/contact.html" style="padding-top: 15px;">contact</a>
  </div>
  <hr class="wide-left-line">
  <div class="link-container">
    <a href="http://www.wallplay.com/our-work.html">case studies</a>
  </div>
</div>
`);

$("#user-menu-container").html(`
<div id="user-menu" style="background-color: white;">
          <ul>
            <li><img src="/assets/profile_img.png" height="150" width="150"></li>

            <li>
              <hr class="user-menu"><a href="">my profile</a>
              <hr class="user-menu">
            </li>
            <li>
              <a href=""><img src="/assets/avatar.png" height="32" width="32" style="margin-left: -20px;"></a>
            </li>
            <li>
              <hr class="user-menu"><a href="">wishlist</a>
              <hr class="user-menu">
            </li>
            <li>
              <a href=""><img src="/assets/heart.png" height="32" width="32" style="margin-left: -40px;"></a>
            </li>
            <li>
              <hr class="user-menu"><a href="" id="logout-btn">logout</a>
              <hr class="user-menu">
            </li>
            <li><img src="/assets/logout.png" height="32" width="32" style="margin-left: -40px;"></li>
            <li><button class="border-btn"><a href="">support</a></button></li>
          </ul>
        </div>
`);
$(document).ready(function() {

    // $('#nav-container').hover(function(){ 
    //     mouse_is_inside=true; 
    //     console.log("HOVER INSIDE NAV");
    // }, function(){ 
    //     mouse_is_inside=false; 
    //     console.log("HOVER OUTSIDE NAV");
    // });

    // $("body").mouseup(function(){ 
    //     if(! mouse_is_inside) {
    //       $(".side-nav-container").css('width', '0vw');
    //       $("#nav-burger-btn").removeClass("open-nav");
    //       document.getElementById("hamburger-img").src = "/assets/hamburger-open.svg";
    //       console.log("CLICK OUTSIDE NAV");
    //     } else {
    //         $("#nav-burger-btn").addClass("open-nav");
    //         console.log("CLICK INSIDE NAV");
    //     }
    // });
 
    //OPENS THE SIDENAV FROM BURGER
  $("#nav-burger-btn").click(function() {
    if ($(this).hasClass("open-nav")) {
      $(".side-nav-container").css('width', '0vw');
      document.getElementById("hamburger-img").src = "/assets/hamburger-open.svg";
      $("#nav-burger-btn").removeClass("open-nav");
      console.log("THE NAV BTN SHOULD CLOSE THE NAV");
    } else {
      $('.side-nav-container').animate({width: '260px'}, 50);
      document.getElementById("hamburger-img").src = "/assets/hamburger-close.svg";
      $("#nav-burger-btn").addClass("open-nav");
      var className = $('#nav-burger-btn').attr('class');
      console.log("THE NAV BTN SHOULD OPEN THE NAV");
      console.log("THE NAV BURGER HAS THE CLASS: " + className);
    }
  });
    
    // OPENS THE COLLABORATE FORM
  $("#nav-collaborate-btn").click(function() {
    $("#collaborate-modal").slideToggle("fast");
    //close on "close-btn" click
    $(".close-btn").click(function() {
      $("#collaborate-modal").css('display', 'none');
      $("#nav-collaborate-btn").removeClass("open-form-nav");
    });
  });

  // SENDS THE COLLABORATE FORM RESULTS TO FIREBASE
  $('#collaborate-form').on('submit', function(event) {
    event.preventDefault();
    var formType = "collaborate form";
    var name = $('#name').val();
    var email = $('#email').val();
    var mediaForms = $('#media-forms').val();
    var website = $('#website').val();
    var socialLinks = $('#social-links').val();
    var videoLinks = $('#video-links').val();
    var pressLinks = $('#press-links').val();
    var projectPair = $('#project-pair').val();
    var interestWork = $('#interest-work').val();
    var technologies = $('#technologies').val();
    var tellUs = $('#tell-us').val();
    document.getElementById('collaborate-form').style.display = 'none';
    document.getElementById('thankyou_message').style.display = 'block';
    firebase.database().ref('collaborateForm').push({
      origin,
      name,
      email,
      mediaForms,
      website,
      socialLinks,
      videoLinks,
      pressLinks,
      projectPair,
      interestWork,
      technologies,
      tellUs
    });
    // SEND FORM TO CONNECT@WALLPLAY
        $.ajax({
          url: "https://formspree.io/connect@wallplay.com", 
          method: "POST",
          data: {formType: formType, name: name, email: email, mediaForms: mediaForms,
                  website: website, socialLinks: socialLinks, videoLinks:videoLinks,
                  pressLinks: pressLinks, projectPair: projectPair, interestWork: interestWork,
                  technologies: technologies, tellUs: tellUs, _subject: "New Collaborate Form!"},
          dataType: "json"
      });
  });

// TOGGLES THE LOGIN FORM  
    $( "#toggle-login-btn" ).click(function() {
        event.preventDefault();
        if ($("#login-form-container").hasClass("closed-login")) {
          $('#login-form-container').slideToggle("fast");
          $("#login-form-container").removeClass("closed-login");
          document.getElementById('login-email').value='';
          document.getElementById('login-password').value='';
        } else {
          $('#login-form-container').slideToggle("fast");
          $("#login-form-container").addClass("closed-login");
        }
    });

// TOGGLES THE REQUEST ACCESS FORM
    $( "#request-access-btn" ).click(function() {
      event.preventDefault();
      $("#access-modal").slideToggle("fast");
     //close on "close-btn" click
    $(".close-btn").click(function() {
      $("#access-modal").css('display', 'none');
      $("#request-access-btn").removeClass("open-form-nav");
    });
  });

$('#access-form').on('submit', function(event) {
    event.preventDefault();
    var formType = "access form";
    var name = $('#access-name').val();
    var email = $('#access-email').val();
    var company = $('#access-company').val();
    var jobTitle = $('#access-job-title').val();
    var number = $('#access-number').val();
    document.getElementById('access-form').style.display = 'none';
    document.getElementById('access_thankyou_message').style.display = 'block';
    firebase.database().ref('accessForm').push({
      origin,
      name,
      email,
      company,
      jobTitle,
      number
    });
    // SEND FORM TO CONNECT@WALLPLAY
        $.ajax({
          url: "https://formspree.io/connect@wallplay.com", 
          method: "POST",
          data: {formType: formType, name: name, email: email, company: company,
                  jobTitle: jobTitle, number: number, _subject: "New Access Form!"},
          dataType: "json"
      });
  });
});

    // CLOSES THE LOGIN FORM
    $('#login-x-out').click(function() {
          event.preventDefault();
        if ($("#login-form-container").hasClass("closed-login")) {          
          console.log("WHATEVER");
          $("#login-form-container").removeClass("closed-login");
          $('#login-form-container').slideToggle("fast");                       
        } else {
          $('#login-form-container').slideToggle("fast");   

        }          
        
    });

  // TOGGLES THE PROFILE MENU    
    $( "#user-nav-img-btn" ).click(function() {
        if ($("#user-menu-container").hasClass("closed-user-menu")) {
          $('#user-menu-container').slideToggle("fast");
          $("#user-menu-container").removeClass("closed-user-menu");
        } else {
        $('#user-menu-container').slideToggle("fast");
        $("#user-menu-container").addClass("closed-user-menu");
        }
    });

// FIREBASE LOGIN HANDLING

      var loginEmail = document.getElementById('login-email');
      var loginPass = document.getElementById('login-password');
      var loginBtn = document.getElementById('login-btn');      

        loginBtn.addEventListener('click', e => {
          // get email & pass
          var email = loginEmail.value;
          var pass = loginPass.value;
          var auth = firebase.auth();
          // SIGN IN
          var promise = auth.signInWithEmailAndPassword(email, pass);
          //
          event.preventDefault(loginBtn);
          console.log("SIGNING IN");
          // IF ERROR, SHOW IN ALERT          
          promise.catch(e => alert("Oh no! Looks like there's a problem: \n\n" + e.message + "\n\n"));
        });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log("USER SIGNED IN " + firebaseUser);
        $('#login-form-container').css('display', 'none');
        $('#login-nav-container').css('display', 'none');
        $('#login-nav-container').removeClass('animated-gradient');
        $('#nav-collaborate-btn').css('display', 'none');
        $('#login-nav-container').css('background', 'transparent');
        $('#login-form-container').css('border', '0px');
        $('.animated-gradient').css('display', 'none');        
        $('#nav-burger-btn').css('display', 'none');
        $('#nav-wrap').css('height', '90px');
        $('#user-nav').css('display', 'block');
        $('.side-nav-container').css('display', 'none');        

        // GET USER PROFILE
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        uid = user.uid;

        // SET USERNAME IN NAV BAR
        var navUsername = document.getElementById('nav-username');                
        navUsername.innerHTML = email;
      } else {
        console.log('not logged in');
      }
    });


// FIREBASE LOGOUT HANDLING
  var logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', e => {     
    firebase.auth().signOut();
    console.log("SIGNING OUT");
  });