var usr = document.getElementById("usr");
var rcvr1 = document.getElementById("rcvr");
var msg1 = document.getElementById("msg");
var n = 0
if (getCookie("username") != "null") {
    usr.innerHTML = getCookie("username");
    fetchReceivedMessages()
    fetchSentMessages()
}
else{
    window.location.href = 'index.html';
}

//load message
/*
const referenceDiv = document.getElementById("ms");

const newDiv = document.createElement('div');
newDiv.className = 'parent';
newDiv.innerHTML = `
<div class="info">
    <div class="couple">
        <p class="title">Sent to:</p>
        <p class="following" id="rcvr">None</p>
    </div>
    <div class="couple">
        <p class="title">Time:</p>
        <p class="following" id="time">None</p>
    </div>
</div>
<div class="messageHolder">
    <p class="title">Message:</p>
    <p class="messageText" id="message">imagine some text here</p>
</div>
`;

referenceDiv.insertAdjacentElement('afterend', newDiv);
*/

function logOut() {
    setCookie("loggedIn", "false")
    deleteCookie("username")
    window.location.href = 'index.html';
}

async function prepMsg(){
    var rcvr = rcvr1.value.toLowerCase()
    var msg = msg1.value
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    if (getCookie("username") == rcvr) {
        alert("You can't send a message to yourself.")
    }
    else if(rcvr == "" || msg == "") {
        alert("Please fill all fields.")
    }
    else{
        sendMsg(rcvr, msg, date, time)
    }
}

function isMobile() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

if (isMobile()) {
  document.getElementById("everything").style.visibility = "collapse"
  document.getElementById("tempPhone").style.visibility = "visible"
}

if (getCookie("loggedIn") != "true") {
    window.location.href = 'index.html';
}


function deleteMsg(msgID) {
    c0=0
}

function loadMS(rcvr, t1me, msg, msgID) {
    const referenceDiv = document.getElementById("ms");

    const newDiv = document.createElement('div');
    newDiv.className = 'parent';
    newDiv.innerHTML = `
    <div class="info">
        <div class="couple">
            <p class="title2">Sent to:</p>
            <p class="following" id="rcvr">${rcvr}</p>
        </div>
        <div class="couple">
            <p class="title2">Time:</p>
            <p class="following" id="time">${msg}</p>
        </div>
        <button class="danger" onclick="deleteMsg(${msgID})">Unsend</button>
    </div>
    <div class="messageHolder">
        <p class="title3">Message:</p>
        <p class="messageText" id="message">${t1me}</p>
    </div>
    `;

    referenceDiv.insertAdjacentElement('afterend', newDiv);
}

function loadMR(sender, t1me, msg, msgID) {
    const referenceDiv = document.getElementById("mr");

    const newDiv = document.createElement('div');
    newDiv.className = 'parent';
    newDiv.innerHTML = `
    <div class="info">
        <div class="couple">
            <p class="title2">Sent from:</p>
            <p class="following" id="rcvr">${sender}</p>
        </div>
        <div class="couple">
            <p class="title2">Time:</p>
            <p class="following" id="time">${msg}</p>
        </div>
        <button class="danger" onclick="deleteMsg(${msgID})">Delete</button>
    </div>
    <div class="messageHolder">
        <p class="title3">Message:</p>
        <p class="messageText" id="message">${t1me}</p>
    </div>
    `;

    referenceDiv.insertAdjacentElement('afterend', newDiv);
}


window.loadMS = loadMS;
window.loadMR = loadMR;