(function () {
  // Use the new public key to initialize EmailJS
  emailjs.init("LLDKK_TdnvHwzZL_J");
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
    elements: generateElements(),
    skills: generateSkills(),
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

// this function generate all possible elements in random
const generateElements = () => {
  let spheres = []; // final results of spheres
  let sphere = Math.floor(Math.random() * 2) + 1; // returns a random integer from 1 to 2
  // 2 means single sphere same, other than 2 will go to else block
  if (sphere > 1) {
    sphere = Math.floor(Math.random() * 6) + 1; // returns a random integer from 1 to 6
    sphere = getSphere(sphere); // get single sphere
    // add this single sphere 6 times
    for (let i = 0; i < 6; i++) {
      spheres.push(sphere);
    }
  } else {
    // all sphere will differently random
    for (let i = 0; i < 6; i++) {
      sphere = getSphere(Math.floor(Math.random() * 6) + 1); // get single sphere
      spheres.push(sphere);
    }
  }
  return spheres;
};

// get randomly selected skills
const generateSkills = () => {
  let skills = [];
  let skill = "";
  let temp = "";
  let answer = Math.floor(Math.random() * 2) + 1; // returns a random integer from 1 to 2
  // greater than one means answer yes
  // do you have bad skills?
  if (answer > 1) {
    // yes
    let points = 1;
    let skill = Math.floor(Math.random() * 5) + 1; // returns a random integer from 1 to 5
    skill = getBadSkill(skill); // get single skill

    if (skill.charAt(0) === "T") {
      // if you got Technophobe, that means you got morer points to choose with good skills
      points += 2;
    } else {
      points++;
    }

    skills.push(skill); // only one bad skill is allowed

    for (; points > 0; points--) {
      if (points > 2) {
        // if you got Technophobe, you can have 2 more skills to get random
        skill = Math.floor(Math.random() * 13) + 1; // returns a random integer from 1 to 13
      } else {
        skill = Math.floor(Math.random() * 11) + 1; // returns a random integer from 1 to 11
      }

      skill = getGoodSkill(skill); // get single skill
      // check if its repeats
      if (temp === skill) {
        points++;
        continue;
      }

      if (skills.includes("Technophobe") && skill === "Constructor") {
        points++;
        continue;
      }

      if (skills.includes("Bureaucrat") && skill === "Merchant") {
        points++;
        continue;
      }

      if (skills.includes("Pacifist") && skill === "Conqueror") {
        points++;
        continue;
      }

      if (skills.includes("Anarchist") && skill === "Peace Keeper") {
        points++;
        continue;
      }

      if (skills.includes("Decadence") && skill === "Survivalist") {
        points++;
        continue;
      }

      skills.push(skill);
      if (skills.includes("Explorer") || skills.includes("Expander")) {
        points--;
      }

      temp = skill;
    }
  } else {
    // no
    skill = Math.floor(Math.random() * 11) + 1; // returns a random integer from 1 to 11
    skill = getGoodSkill(skill); // get single skill
    skills.push(skill);
  }
  return skills;
};

// get single sphere this function will be used with random function to get all spheres
const getSphere = (sphere) => {
  switch (sphere) {
    case 1:
      return "Fire";
    case 2:
      return "Life";
    case 3:
      return "Death";
    case 4:
      return "Water";
    case 5:
      return "Air";
    case 6:
      return "Earth";
  }
};

// get single good skill after getting random number
const getGoodSkill = (skill) => {
  switch (skill) {
    case 1:
      return "Summoner";
    case 2:
      return "Channeller";
    case 3:
      return "Casting Specialist";
    case 4:
      return "War Mage";
    case 5:
      return "Enchanter";
    case 6:
      return "Scholar";
    case 7:
      return "Constructor";
    case 8:
      return "Conqueror";
    case 9:
      return "Merchant";
    case 10:
      return "Survivalist";
    case 11:
      return "Peace Keeper";
    case 12:
      return "Expander";
    case 13:
      return "Explorer";
  }
};

// get single bad skill
const getBadSkill = (skill) => {
  switch (skill) {
    case 1:
      return "Decadence";
    case 2:
      return "Anarchist";
    case 3:
      return "Pacifist";
    case 4:
      return "Bureaucrat";
    case 5:
      return "Technophobe";
  }
};
