
const inTabButton = document.getElementById('inTab');
const upTabButton = document.getElementById('upTab');
const inButton = document.getElementById('inButton');
const upButton = document.getElementById('upButton');

const usr = document.getElementById('inUsername');
const pw = document.getElementById('inPassword');
const pwc = document.getElementById('inPasswordCheck');
const checkDiv = document.getElementById('checkDiv');
const checkBox = document.getElementById('showPw');
var isShowPassword = 0;

var username = "";
var password = "";


function inTabF(){
    inTabButton.className = "tabActive";
    upTabButton.className = "tab";
    inButton.style.display = "flex";
    upButton.style.display = "none";
    pwc.style.display = "none";
}
function upTabF(){
    inTabButton.className = "tab";
    upTabButton.className = "tabActive";
    inButton.style.display = "none";
    upButton.style.display = "flex";
    pwc.style.display = "flex";
}




function containsNonAlphanumeric(str) {
  return /[^a-zA-Z0-9]/.test(str);
}

function signIn() {
    username = usr.value.toLowerCase();
    password = pw.value;
    if (password.length < 6 || containsNonAlphanumeric(username) || username == ""){
        alert("Wrong username or password, Please try again.");
    }
    else{
        login(username, password)
    }
}


function signUp() {
    username = usr.value.toLowerCase();
    password = pw.value;
    passwordCheck = pwc.value
    if (containsNonAlphanumeric(username)) {
        alert("Can't create account, Username can only contain letters and numbers.")
    }
    else if (password != passwordCheck){
        alert("Can't create account, Passwords don't match.")
    }
    else if (password.length < 6) {
        alert("Can't create account, Password is too short. (6 characters or more)")
    }
    else if (username == "" && password == "") {
        alert("Can't create account, Username and passowrd can't be empty.");
    }
    else if (username == "") {
        alert("Can't create account, Username can't be empty.");
    }
    else if (password == "") {
        alert("Can't create account, Password can't be empty.");
    }
    else {
        register(username, password)
    }
}

function showPassword() {
    isShowPassword += 1;
    if (isShowPassword%2==0) {
        //hide
        pw.type = "password";
        pwc.type = "password";
        checkBox.checked = false;
    }
    else{
        //show
        pw.type = "text";
        pwc.type = "text";
        checkBox.checked = true;
    }
}

function isMobile() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

if (isMobile()) {
  document.getElementById("everything").style.visibility = "collapse"
  document.getElementById("tempPhone").style.visibility = "visible"
}

if (getCookie("loggedIn") == "true") {
    window.location.href = 'profile.html';
}