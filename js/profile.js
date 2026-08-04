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
    //window.location.href = 'index.html';
}

if (getCookie("loggedIn") != "true") {
    //window.location.href = 'index.html';
}



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
        loadNotif("normal", "You can't send a message to yourself.")
    }
    else if (rcvr == "" || msg == "") {
        loadNotif("red", "Please fill all fields.")
    }
    else if (usrWantsEnc && encKey.value == "") {
        loadNotif("normal", "Encryption key can't be empty.")
    }
    else{
        if (usrWantsEnc) {
            msg = enc(msg);
        }
        sendMsg(rcvr, msg, date, time, usrWantsEnc)
    }
}

function isMobile() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

if (isMobile()) {
  document.getElementById("everything").style.visibility = "collapse"
  document.getElementById("tempPhone").style.visibility = "visible"
}



function deleteMsg(msgID) {
    c0=0
}

function loadMS(rcvr, msg, t1me, msgID, enced) {
    const referenceDiv = document.getElementById("ms");

    const newDiv = document.createElement('div');
    newDiv.className = 'parent';
    if (!enced) {
        newDiv.innerHTML = `
        <div class="info">
            <div class="couple">
                <p class="title2">Sent to:</p>
                <p class="following">${rcvr}</p>
            </div>
            <div class="couple">
                <p class="title2">Time:</p>
                <p class="following">${t1me}</p>
            </div>
            <button class="danger" onclick="deleteMsg(${msgID})">Unsend</button>
        </div>
        <div class="messageHolder">
            <p class="title3">Message:</p>
            <p class="messageText" id="message${msgID}">${msg}</p>
        </div>
        `;
    }
    else{
        newDiv.innerHTML = `
        <div class="info">
            <div class="couple">
                <p class="title2">Sent to:</p>
                <p class="following">${rcvr}</p>
            </div>
            <div class="couple">
                <p class="title2">Time:</p>
                <p class="following">${t1me}</p>
            </div>
            <button class="danger" onclick="deleteMsg(${msgID})">Unsend</button>
            </div>
        <div class="messageHolder">
            <p class="title3">Message:</p>
            <p class="messageText" id="message${msgID}">${msg}</p>
        </div>
        <p class="title3" style="color: white; margin: 30px;">This message was encrypted.</p>
        <div style="display: flex;">
            <input id="keyToDec${msgID}" type="text" placeholder="Encryption key">
            <button class="danger" onclick="dec('${msgID}', document.getElementById('keyToDec${msgID}').value)">Decrypt</button>
        </div>
        <div class="messageHolder">
            <p class="messageText" id="decOutput${msgID}">Output</p>
        </div>
        `;

    }
    referenceDiv.insertAdjacentElement('afterend', newDiv);
}

function loadMR(sender, msg, t1me, msgID, enced) {
    const referenceDiv = document.getElementById("mr");

    const newDiv = document.createElement('div');
    newDiv.className = 'parent';
    if (!enced) {
        newDiv.innerHTML = `
        <div class="info">
            <div class="couple">
                <p class="title2">Sent from:</p>
                <p class="following">${sender}</p>
            </div>
            <div class="couple">
                <p class="title2">Time:</p>
                <p class="following">${t1me}</p>
            </div>
            <button class="danger" onclick="deleteMsg(${msgID})">Delete</button>
        </div>
        <div class="messageHolder">
            <p class="title3">Message:</p>
            <p class="messageText" id="message${msgID}">${msg}</p>
        </div>
        `;
    }
    else{
        newDiv.innerHTML = `
            <div class="info">
                <div class="couple">
                    <p class="title2">Sent from:</p>
                    <p class="following">${sender}</p>
                </div>
                <div class="couple">
                    <p class="title2">Time:</p>
                    <p class="following">${t1me}</p>
                </div>
                <button class="danger" onclick="deleteMsg(${msgID})">Delete</button>
                </div>
            <div class="messageHolder">
                <p class="title3">Message:</p>
                <p class="messageText" id="message${msgID}">${msg}</p>
            </div>
            <p class="title3" style="color: white; margin: 30px;">This message was encrypted.</p>
            <div style="display: flex;">
                <input id="keyToDec${msgID}" type="text" placeholder="Encryption key">
                <button class="danger" onclick="dec('${msgID}', document.getElementById('keyToDec${msgID}').value)">Decrypt</button>
            </div>
            <div class="messageHolder">
                <p class="messageText" id="decOutput${msgID}">Output</p>
            </div>
        `;
    }
    referenceDiv.insertAdjacentElement('afterend', newDiv);
}


window.loadMS = loadMS;
window.loadMR = loadMR;
