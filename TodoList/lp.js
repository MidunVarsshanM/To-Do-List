import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmUGgH1G2W2gh1wLAh9VpAxHyjzMCaJHg",
  authDomain: "todo-list-3b851.firebaseapp.com",
  projectId: "todo-list-3b851",
  storageBucket: "todo-list-3b851.firebasestorage.app",
  messagingSenderId: "959736358268",
  appId: "1:959736358268:web:de7740a4a6465d32c2b0f9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("googleSignInBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Signed in:", result.user.displayName);
      window.location.href = "hp.html";
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    });
});
