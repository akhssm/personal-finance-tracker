// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcKq26Il4ItmCm3GvFvjS1CPkYSxIZzAY",
  authDomain: "personal-finance-tracker-7ec97.firebaseapp.com",
  projectId: "personal-finance-tracker-7ec97",
  storageBucket: "personal-finance-tracker-7ec97.firebasestorage.app",
  messagingSenderId: "961929010608",
  appId: "1:961929010608:web:0cef8a5ca02d44e04d8a75",
  measurementId: "G-FP1590FPHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db, doc, setDoc };