//Set up data source
var gazooRef = firebase.database().ref('anouk-quote/');

function getItems() {

	var item_ul = document.getElementById("item-list"); //For some reason, if this line isn't inside the function, it won't work
	gazooRef.on("child_added", function(snapshot) {
		// var names = snapshot.val();
		// var ul = document.createElement("ul");

		//Create corresponding li tags to insert into the <ul> in the html file
		//Note: Since there's one var, it's creating a var for each line, so there are comma's instead of semi-colons at the end 
		//      of each line except the last, to not terminate the var

		// 
		var nameLi = document.createElement("li"),
			emailLi = document.createElement("li"),
			phoneLi = document.createElement("li"),
			companyLi = document.createElement("li"),
			jobTitleLi = document.createElement("li"),
			servicesLi = document.createElement("li"),
			talentLi = document.createElement("li"),
			questionsLi = document.createElement("li");

		//Get each value from the Object
		var name = snapshot.val().name,
			email = snapshot.val().email,
			phone = snapshot.val().phone,
			company = snapshot.val().company,
			jobTitle = snapshot.val().jobTitle,
			services = snapshot.val().services,
			talentAsk = snapshot.val().talentAsk,
			questions = snapshot.val().questions;

		//Creates text nodes for each value, because you need to have one of these so the <li> tag can append it. 

		var nameText = document.createTextNode("Name: " + name),
			emailText = document.createTextNode("Email: " + email),
			phoneText = document.createTextNode("Phone: " + phone),
			companyText = document.createTextNode("Company: " + company),
			jobTitleText = document.createTextNode("Job Title: " + jobTitle),
			servicesText = document.createTextNode("Services: " + services),
			talentText = document.createTextNode("Additional Talent Asks: " + talentAsk),
			questionsText = document.createTextNode("Questions: " + questions);


		//Before appendChild: companyLi  is "<li></li>"
		//After appendChild: companyLi is "<li>Company: Artsy</li>"
		nameLi.appendChild(nameText);
		emailLi.appendChild(emailText);
		phoneLi.appendChild(phoneText);
		companyLi.appendChild(companyText);
		jobTitleLi.appendChild(jobTitleText);
		servicesLi.appendChild(servicesText);
		talentLi.appendChild(talentText);
		questionsLi.appendChild(questionsText);


		//These appendChilds add the html line to the html file
		//Before appendChild: <ul id="item-list">
		// 
		// 						</ul>
		//After appendChild: <ul id="item-list">
		// 						<li>Company: Artsy</li>
		// 						<li>Email: whateverEmail</li>
		// 						...
		// 					</ul>

		item_ul.appendChild(nameLi);
		item_ul.appendChild(emailLi);
		item_ul.appendChild(phoneLi);
		item_ul.appendChild(companyLi);
		item_ul.appendChild(jobTitleLi);
		item_ul.appendChild(servicesLi);
		item_ul.appendChild(talentLi);
		item_ul.appendChild(questionsLi);

		//Added a break to separate each object
		item_ul.appendChild(document.createElement("br"));
	});
}
/*function addImages(){
	ref.on("child_added", function(snapshot) {
		var links = snapshot.val().mainImgUrl;
		var li = document.createElement("li");
		var img = document.createElement("img");
		var imgID = "draggable-img";
		img.setAttribute("src" , links);
		img.setAttribute("id", imgID);
		li.appendChild(img);
		all_ul.appendChild(li);
		// Draggable.create("#draggable-img", {
		// 	bounds: document.getElementById("all_link_list")
		// });
	});
}
*/