import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
        apiKey: "AIzaSyCgwXWYK3bea3ZrhQ62FgeDso1NYvGH_d8",
        authDomain: "delbar-gustav.firebaseapp.com",
        projectId: "delbar-gustav",
        storageBucket: "delbar-gustav.firebasestorage.app",
        messagingSenderId: "558804041859",
        appId: "1:558804041859:web:3804a588c49c086697dbb6"
    };
  
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
