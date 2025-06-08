import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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

    /*
    // Save username → email mapping in Realtime Database
    await set(ref(db, 'usernames/' + username), {
      uid: user.uid,
      email: email
    });
    */

    console.log("Registered successfully!");
  } catch (error) {
    console.error("Registration error:", error.message);
  }
}

async function login(username, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, username + "@gmail.com", password);
    const user = userCredential.user;
    console.log("Login successful:", user.uid);

    //What happens after logging in:
    alert("logged in!")
    setCookie("loggedIn", true)
    setCookie("username", username)
    window.location.href = 'test.html';

  } catch (error) {
    console.error("Login error:", error.message);
    alert("Wrong username or password, Please try again.");
  }
}

window.register = register;
window.login = login;
