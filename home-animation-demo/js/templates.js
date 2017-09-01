//THIS FILE CONTAINS TEMPLATE LITERALS USED X-SITE

//THIS SECTION CONTAINS TEMPLATES FOR FORMS X-SITE
//LOGIN FORM  
$("#login-form-parent").html(`
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
      <button style="background: transparent; border: solid 0px black; position: absolute; right: 25px; margin-top: 25px;" id="login-close-btn"><img src="/assets/hamburger-close.svg" id="login-x-out"></button>
    </div>
  </form>
`);
// REQUEST ACCESS FORM
$("#access-modal").html(`
<div class="col-1-1 body-text modal-form">
      <span class="close-btn"><img src="/assets/hamburger-close-small.svg"></span>
      <form class="form col-1-1" id="access-form">
        <div class="sub-section-tagline top-bottom-31">
          <h2>Do you have a desire to work with creatives who are creating culture instead of fabricating it? Are you interested in helping actualize experiential projects? Do you have the ability to get budgets approved?</h2>
          <h2 class="top-31">If you answer yes to all of the above, request access below:</h2>
        </div>
        <input type="hidden" name="origin" id="origin" value="http://www.wallplay.com">
        <div class="row">
          <label for="access-name">*Full Name:</label>
        </div>
        <div class="row">
          <input type="text" required name="access-name" id="access-name" class="flex-1">
        </div>

        <div class="row">
          <label for="access-email">*Email:</label>
        </div>
        <div class="row">
          <input type="access-email" required name="access-email" id="access-email" class="flex-1">
        </div>

        <div class="row">
          <label for="access-company">*Company:</label>
        </div>
        <div class="row">
          <input type="access-company" required name="access-company" id="access-company" class="flex-1">
        </div>

        <div class="row">
          <label for="access-job-title">*Job Title:</label>
        </div>
        <div class="row">
          <input type="access-job-title" required name="access-job-title" id="access-job-title" class="flex-1">
        </div>

        <div class="row">
          <label for="access-number">Number (optional):</label>
        </div>
        <div class="row">
          <input type="access-number" name="access-number" id="access-number" class="flex-1">
        </div>

        <h2 class="top-31">Please note: There is a brief screening process for value system alignment. We care about you and our creatives having a fantastic experience! Our corporate membership is currently tailored per partnership. </h2>

        <input type="submit" name="submit" value="submit" class="flex-1">
      </form>
      <!-- Customise the Thankyou Message People See when they submit the form: -->
      <div class="sub-section-tagline" style="display:none;" id="access_thankyou_message">
        <h2>Thank you for your interest in becoming a member! One of our founders will be contacting you shortly. </h2>
      </div>
    </div>
`)

//COLLABORATE FORM
$("#collaborate-modal").html(`
<div class="col-1-1 body-text modal-form">
      <span class="close-btn"><img src="/assets/hamburger-close-small.svg"></span>
      <form class="form col-1-1" id="collaborate-form">
        <div class="sub-section-tagline top-bottom-31">
          <h2>We love interesting technologies, artists, designers, curators, spaces and brands. Meaningful work stems from great collaborations. Let’s see what we can do together. </h2>
        </div>
        <input type="hidden" name="origin" id="origin" value="http://www.wallplay.com">
        <div class="row">
          <label for="name">*Full Name:</label>
        </div>
        <div class="row">
          <input type="text" required name="name" id="name" class="flex-1">
        </div>

        <div class="row">
          <label for="name">*Email:</label>
        </div>
        <div class="row">
          <input type="email" required name="email" id="email" class="flex-1">
        </div>

        <div class="row">
          <label for="media-forms">*What form(s) of media do you work in? (be specific): </label>
        </div>
        <div class="row">
          <input type="text" name="media-forms" id="media-forms" class="flex-1">
        </div>

        <div class="row">
          <label for="website">Website:</label>
        </div>
        <div class="row">
          <input type="text" name="website" id="website" class="flex-1">
        </div>

        <div class="row">
          <label for="social-links">Social media links: </label>
        </div>
        <div class="row">
          <input type="text" name="social-links" id="social-links" class="flex-1">
        </div>

        <div class="row">
          <label for="video-links">Video links: </label>
        </div>
        <div class="row">
          <input type="text" name="video-links" id="video-links" class="flex-1">
        </div>

        <div class="row">
          <label for="press-links">Press links: </label>
        </div>
        <div class="row">
          <input type="text" name="press-links" id="press-links" class="flex-1">
        </div>

        <div class="row">
          <label for="project-pair">Do you have a project you would like to pair with a brand or an artist? If so, tell us about it: </label>
        </div>
        <div class="row">
          <input type="text" name="project-pair" id="project-pair" class="flex-1">
        </div>

        <div class="row">
          <label for="interest-work">What brands or types of artists are you interested in collaborating with?: </label>
        </div>
        <div class="row">
          <input type="text" name="interest-work" id="interest-work" class="flex-1">
        </div>

        <div class="row">
          <label for="technologies">What technologies are you interested in exploring for collaborations?:</label>
        </div>
        <div class="row">
          <input type="text" name="technologies" id="technologies" class="flex-1">
        </div>

        <div class="row">
          <label for="tell-us">Anything else you want to tell us?</label>
        </div>
        <div class="row">
          <input type="text" name="tell-us" id="tell-us" class="flex-1">
        </div>

        <input type="submit" name="submit" value="submit" class="flex-1">
      </form>
      <!-- Customise the Thankyou Message People See when they submit the form: -->
      <div class="sub-section-tagline" style="display:none;" id="thankyou_message">
        <h2>Thanks for contacting us! We will get back to you soon!</h2>
      </div>
    </div>
`)

// INTERN FORM
$("#intern-modal-bg").html(`
<div class="col-1-1 body-text modal-form">
        <span class="close-btn"><img src="/assets/hamburger-close-small.svg"></span>
        <form class="form col-1-1" id="intern-form">
          <div class="sub-section-tagline top-bottom-31">
            <h2>Our internship program is far from normal. Get hands-on experience, become a part of our team and make lasting professional relationships. We love creative thinkers who want an out-of-the-box experience.</h2>  
            <h2 class="top-31">Rolling Submission, apply below: </h2>
          </div>
          <input type="hidden" name="origin" id="origin" value="space.html">
          <input type="hidden" id="subject" name="_subject" value="New Intern Form!" />
          <div class="row">
            <label for="intern-name">*Full Name:</label>
          </div>
          <div class="row">
            <input type="text" required name="intern-name" id="intern-name" class="flex-1">
          </div>

          <div class="row">
            <label for="name">*Email:</label>
          </div>
          <div class="row">
            <input type="email" required name="intern-email" id="intern-email" class="flex-1">
          </div>

          <div class="row">
            <label for="phone-number">Phone Number:</label>
          </div>
          <div class="row">
            <input type="text" name="intern-phone-number" id="intern-phone-number" class="flex-1">
          </div>

          <div class="row">
            <label for="education">Education:</label>
          </div>
          <div class="row">
            <input type="text" name="education" id="education" class="flex-1">
          </div>

          <div class="row">
            <label for="availability">What days are you available to intern?:</label>
          </div>
          <div class="row">
            <input type="text" name="availability" id="availability" class="flex-1">
          </div>

          <div class="row">
            <label for="commit-time">Can you commit to 3-6 months?:</label>
          </div>
          <div class="row">
            <input type="text" name="commit-time" id="commit-time" class="flex-1">
          </div>

          <div class="row">
            <label for="where-based">Are you based in New York City?: </label>
          </div>
          <div class="row">
            <input type="text" name="where-based" id="where-based" class="flex-1">
          </div>

          <div class="row">
            <label for="field-of-interest">What is your area of study or field of interest?:</label>
          </div>
          <div class="row">
            <input type="text" name="field-of-interest" id="field-of-interest" class="flex-1">
          </div>

          <div class="row">
            <label for="strengths">What are your strengths?:</label>
          </div>
          <div class="row">
            <input type="text" name="strengths" id="strengths" class="flex-1">
          </div>

          <div class="row">
            <label for="experience-gain">What experience do you hope to gain with your internship at wallplay?:</label>
          </div>
          <div class="row">
            <input type="text" name="experience-gain" id="experience-gain" class="flex-1">
          </div>

          <div class="row">
            <label for="five-year-vision">Where do you see yourself in 5 years?:</label>
          </div>
          <div class="row">
            <input type="text" name="five-year-vision" id="five-year-vision" class="flex-1">
          </div>

          <div class="row">
            <label for="hear-of-wallplay">How did you hear of Wallplay?:</label>
          </div>
          <div class="row">
            <input type="text" name="hear-of-wallplay" id="hear-of-wallplay" class="flex-1">
          </div>

          <div class="row">
            <label for="experience-in-startup">Have you interned or worked for a start-up before?</label>
          </div>
          <div class="row">
            <input type="text" name="experience-in-startup" id="experience-in-startup" class="flex-1">
          </div>

          <div class="row">
            <label for="ideal-workplace">Describe your ideal working environment:</label>
          </div>
          <div class="row">
            <input type="text" name="ideal-workplace" id="ideal-workplace" class="flex-1">
          </div>          

          <div class="row">
            <label for="intern-social-links">Social links:</label>
          </div>
          <div class="row">
            <input type="text" name="intern-social-links" id="intern-social-links" class="flex-1">
          </div>

          <div class="row">
            <label for="intern-tell-us">Anything special you think we should know? (do you have a blog, creative projects you worked on etc):</label>
          </div>
          <div class="row">
            <input type="text" name="intern-tell-us" id="intern-tell-us" class="flex-1">
          </div>

          <div class="upload-btn-wrapper" style="margin-top:20px;">
            <button class="border-btn" id="intern-upload-resume">upload your resume</button>
            <input type="file" name="resume-upload" id="resume-upload" accept="application/pdf"><span id="file-uploaded-check">Thanks - we got it!</span>
          </div><br>

          <input type="submit" name="submit" value="submit" class="flex-1">
        </form>
        <!-- Customise the Thankyou Message People See when they submit the form: -->
        <div class="sub-section-tagline" style="display:none;" id="intern_thankyou_message">
          <h2>Thank you for submitting. You’ll hear back from us within 1-2 weeks. If you have any questions email <a href="mailto:connect@wallplay.com?Subject=Contact%20" target="_top" style="color: #FF9F36; text-decoration: none;">connect@wallplay.com</a> to expedite the process. 
          </h2>
        </div>
      </div>
`)