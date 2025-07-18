import { auth, db, provider } from './firebaseConfig.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Login function
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save user info to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }, { merge: true });

    alert(`Welcome ${user.displayName}!`);
    // Redirect to logged-in page
    window.location.href = "../shelfPage.html";
  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Login failed. Check the console.");
  }
}
