(function () {
  emailjs.init("user_cqlFQGPQ83gcI8oKnBtvB"); // initialize emailjs
})();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("start");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// FUNCTIONS

// send email function
const sendEmail = () => {
  // get email
  var email = document.getElementById("email").value;

  // template object that will be used when we send email
  var templateParams = {
    to_email: email,
    race: generateRace(),
    time: getTimeStamp(),
  };
  // check if its valid email, if yes send information to provided email
  if (validateEmail(email)) {
    emailjs.send("gmail", "template_ix5scsg", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert(
          "Please check your " +
            email +
            "email, all instruction send successfully!"
        );
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
    alert("Sending ... Wait couple seconds then press OK");
  } // end if
}; // end sendEmail function

// this function check regex if has valid pattern for emails
const validateEmail = (email) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
};

// get current Date and time function
const getTimeStamp = () => {
  let currentdate = new Date();
  let fullYear = currentdate.toISOString().slice(0, 10);

  let datetime =
    fullYear +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  return datetime;
};

// this function will generate random race
const generateRace = () => {
  let number = Math.floor(Math.random() * 29) + 1; // returns a random integer from 1 to 29

  let race = "";
  switch (number) {
    case 1:
    case 18:
      race = "Archons";
      break;

    case 2:
    case 20:
      race = "Dwarves";
      break;

    case 3:
    case 21:
      race = "Elves";
      break;

    case 4:
    case 24:
      race = "Halflings";
      break;

    case 5:
    case 25:
      race = "Draconians";
      break;

    case 6:
    case 29:
      race = "Frostling";
      break;

    case 7:
    case 19:
      race = "Humans";
      break;

    case 8:
    case 26:
      race = "Tigrans";
      break;

    case 9:
    case 23:
      race = "Dark Elves";
      break;

    case 10:
    case 22:
      race = "Goblins";
      break;

    case 11:
    case 16:
      race = "Orcs";
      break;

    case 12:
      race = "Undead";
      break;

    case 13:
    case 17:
      race = "Syrons";
      break;

    case 14:
    case 28:
      race = "Nomands";
      break;

    case 15:
    case 27:
      race = "Shadow Demons";
      break;
  }
  return race;
};
