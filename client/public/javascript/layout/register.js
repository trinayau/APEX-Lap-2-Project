let myInput = document.getElementById("password");
let form = document.querySelector("form");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");

// When the user clicks on the input field, show the requirements box
myInput.onfocus = function () {
  document.getElementById("requirements").style.display = "block";
};

// When the user clicks outside of the input field, hide the requirements box
myInput.onblur = function () {
  document.getElementById("requirements").style.display = "none";
};

// When the user starts to type something inside the input field
myInput.onkeyup = function () {
  // Check codename has at least 1 lowercase letter using regex, [a-z] checks for lowercase letters and global flag checks everywhere in the string
  let lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Check codename has at least 1 capital letter using regex [A-Z] specifies capital letters with /g global flag to check everywhere in the string
  let upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Check numbers using regex, positive lookahead(?=) asserts that {2} matches (.*\d) first capture group two times, . matches any character (except for line terminators) * matches the previous token between zero and unlimited times, as many times as possible, giving back as needed (greedy) \d matches a digit (equivalent to [0-9])
  let numbers = /(?=(.*\d){2})/;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Check codename's length using .length
  if (myInput.value.length > 5) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};

//Function to validate length of codename string
function checkLength() {
  let myInput = document.getElementById("codename-input").value;
  if (myInput.length > 5) {
    return true;
  } else {
    return false;
  }
}

//Function to validate that codename string has at least 1 uppercase and 1 lowercase letter
function checkCases() {
  let myInput = document.getElementById("codename-input").value;
  let upperAndLowerCases = /(?=[A-Z]*.*[a-z])(?=[a-z]*.*[A-Z])[a-zA-Z]/;
  if (upperAndLowerCases.test(myInput)) {
    return true;
  } else {
    return false;
  }
}

//Function to validate codename string contains
function checkNumbers() {
  let myInput = document.getElementById("codename-input").value;
  let numbers = /^(?=(.*\d){2})/;
  if (numbers.test(myInput)) {
    return true;
  } else {
    return false;
  }
}

function validate(event) {
  event.preventDefault();
  checkLength();
  checkCases();
  checkNumbers();
  if (checkLength() && checkCases() && checkNumbers() === true) {
    alert("Thanks, your codename has been accepted!");
  } else {
    alert("Please try again after fulfilling the requirements");
  }
}

form.addEventListener("submit", validate);
