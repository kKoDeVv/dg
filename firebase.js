import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
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
    const userCredential = await createUserWithEmailAndPassword(auth, username + "@gmail.com", password);
    const user = userCredential.user;

    console.log("Registered successfully!");
    alert("Account Created!");
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
    const userCredential = await signInWithEmailAndPassword(auth, username + "@gmail.com", password);
    const user = userCredential.user;
    console.log("Login successful:", user.uid);

    //What happens after logging in:
    alert("logged in!")
    setCookie("loggedIn", "true")
    setCookie("username", username)
    window.location.href = 'test.html';

  } catch (error) {
    console.error("Login error:", error.message);
    alert("Wrong username or password, Please try again.");
  }
}

async function checkIfUserExists(username) {
  try {
    const auth = getAuth();
    const methods = await fetchSignInMethodsForEmail(auth, username + "@gmail.com");
    return methods.length > 0; // Returns true if email exists
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
}

async function sendMsg(rcvr, msg) {
    await set(ref(db, 'sent/' + getCookie("username")), {
      Receiver: rcvr,
      Message: msg
    });
    await set(ref(db, 'received/' + rcvr), {
      Sender: getCookie("username"),
      Message: msg
    });
}

window.register = register;
window.login = login;
window.checkIfUserExists = checkIfUserExists;
window.sendMsg = sendMsg;
