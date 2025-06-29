import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbrNDKoNY6Me7YHkEMlA_6pwHb8FUDObE",
  authDomain: "todo-list-1287e.firebaseapp.com",
  projectId: "todo-list-1287e",
  storageBucket: "todo-list-1287e.firebasestorage.app",
  messagingSenderId: "342717339820",
  appId: "1:342717339820:web:8e337335de29231e44a709"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("googleSignIn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
