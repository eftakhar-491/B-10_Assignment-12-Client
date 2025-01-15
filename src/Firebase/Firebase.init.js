// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0x-tbXRb-K7DLoVmP2qLidsK0z-Vp8F0",
  authDomain: "scholar-sphere-system.firebaseapp.com",
  projectId: "scholar-sphere-system",
  storageBucket: "scholar-sphere-system.firebasestorage.app",
  messagingSenderId: "679225402049",
  appId: "1:679225402049:web:e5d290266ff02cb5ddea40",
  measurementId: "G-N21Z9PMHW0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
