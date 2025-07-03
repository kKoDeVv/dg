import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCgwXWYK3bea3ZrhQ62FgeDso1NYvGH_d8",
  authDomain: "delbar-gustav.firebaseapp.com",
  projectId: "delbar-gustav",
  storageBucket: "delbar-gustav.firebasestorage.app",
  messagingSenderId: "558804041859",
  appId: "1:558804041859:web:3804a588c49c086697dbb6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

async function register(username, password) {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, username + "@gmail.com", String(password));
    const user = userCredential.user;
    await push(ref(db, 'users/'), {
      Username: username,
    });

    console.log("Registered successfully!");
    alert("Account Created!");
    setCookie("loggedIn", "true")
    setCookie("username", username)
    window.location.href = 'profile.html';
  } catch (error) {
    console.error("Registration error:", error.message);
    if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        alert("Username already used.")
    }
    else{
        alert("Couldn't create account.")
    }
  }
}

async function login(username, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, username + "@gmail.com", String(password));
    const user = userCredential.user;
    console.log("Login successful:", user.uid);

    //What happens after logging in:
    alert("logged in!")
    setCookie("loggedIn", "true")
    setCookie("username", username)
    window.location.href = 'profile.html';

  } catch (error) {
    console.error("Login error:", error.message);
    alert("Wrong username or password, Please try again.");
  }
}

async function checkIfUserExists(rcvr) {
  try {
    const snapshot = await get(child(ref(db), 'users'));
    const users = snapshot.val();

    if (!users) {
      console.log(`No users exist in database`);
      return false;
    }

    for (const userId in users) {
      if (users[userId].Username === rcvr) {
        console.log(`Username "${rcvr}" exists.`);
        return true;
      }
    }

    console.log(`Username "${rcvr}" does not exist.`);
    return false;
  } catch (error) {
    console.error("Error checking username:", error);
    return false;
  }
}

async function sendMsg(rcvr, msg, date, time) {
  if (await checkIfUserExists(rcvr)) {
    alert("Message sent!")
    loadMS(rcvr, msg, time)
    await push(ref(db, 'sent/' + getCookie("username")), {
      Receiver: rcvr,
      Message: msg,
      Time: time,
      Date: date,
    });
    await push(ref(db, 'received/' + rcvr), {
      Sender: getCookie("username"),
      Message: msg,
      Time: time,
      Date: date,
    });

  }
  else{
    alert("Username not found.")
  }
}

async function countUserMessages() {
    const db = getDatabase();
    const username = getCookie("username");
    const userMessagesRef = ref(db, 'messages/' + username);

    try {
        const snapshot = await get(userMessagesRef);
        if (!snapshot.exists()) return 0;

        const messagesCount = snapshot.val();
        return Object.keys(messagesCount).length;
    } catch (error) {
        console.error("Error counting messages:", error);
        return 0;
    }
}

async function fetchReceivedMessages() {
    document.getElementById("mrHolder").innerHTML =`
            <p class="title" id="mr">Messages Received:</p>
            <img src="pics/refresh.webp" width="60px" onclick="fetchReceivedMessages()">
    `
    const db = getDatabase();
    const username = getCookie("username");
    const userMessagesRef = ref(db, 'received/' + username);

    try {
        const snapshot = await get(userMessagesRef);
        if (!snapshot.exists()) {
            return;
        }

        const messages = snapshot.val();

        Object.entries(messages).forEach(([id, data]) => {
            loadMR(data.Sender, data.Message, data.Time, id)
            // console.log(`ID: ${id}`);
            // console.log(`Date: ${data.Date}`);
            // console.log(`Message: ${data.Message}`);
            // console.log(`Sender: ${data.Sender}`);
            // console.log(`Time: ${data.Time}`);
            // console.log("-------------");
        });

    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}


async function fetchSentMessages() {
    const db = getDatabase();
    const username = getCookie("username");
    const userMessagesRef = ref(db, 'sent/' + username);

    try {
        const snapshot = await get(userMessagesRef);
        if (!snapshot.exists()) {
            return;
        }

        const messages = snapshot.val();

        Object.entries(messages).forEach(([id, data]) => {
            loadMS(data.Receiver, data.Message, data.Time)
            // console.log(`ID: ${id}`);
            // console.log(`Date: ${data.Date}`);
            // console.log(`Message: ${data.Message}`);
            // console.log(`Sender: ${data.Sender}`);
            // console.log(`Time: ${data.Time}`);
            // console.log("-------------");
        });

    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

window.register = register;
window.login = login;
window.checkIfUserExists = checkIfUserExists;
window.sendMsg = sendMsg;
window.countUserMessages = countUserMessages;
window.fetchReceivedMessages = fetchReceivedMessages;
window.fetchSentMessages = fetchSentMessages;
