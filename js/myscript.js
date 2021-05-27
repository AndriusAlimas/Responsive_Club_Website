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
