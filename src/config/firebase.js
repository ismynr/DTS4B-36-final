// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrqNhapgJ1QtuhcIr-HONkuaOIgb-kF5s",
  authDomain: "mood-meter-b8308.firebaseapp.com",
  projectId: "mood-meter-b8308",
  storageBucket: "mood-meter-b8308.appspot.com",
  messagingSenderId: "962027896515",
  appId: "1:962027896515:web:a0fac5d078e044b218ac76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };