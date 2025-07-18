import { loginWithGoogle } from './auth.js';

// Attach click event to login button
const loginBtn = document.getElementById('google-login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', loginWithGoogle);
}
