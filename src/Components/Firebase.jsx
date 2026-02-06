// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs7dGicTd1h6Jk-2ld34o8ues6kTpUSYA",
  authDomain: "amrita-10953.firebaseapp.com",
  projectId: "amrita-10953",
  storageBucket: "amrita-10953.firebasestorage.app",
  messagingSenderId: "848028877695",
  appId: "1:848028877695:web:d5fccf98102c6fd33ad04a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app).analytics;