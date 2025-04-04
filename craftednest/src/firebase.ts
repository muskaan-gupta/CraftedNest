// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcuqa03P9oDJC6EyuMMuokcPjS0HeNlrQ",
  authDomain: "fir-auth-c2d1d.firebaseapp.com",
  projectId: "fir-auth-c2d1d",
  storageBucket: "fir-auth-c2d1d.firebasestorage.app",
  messagingSenderId: "55950237615",
  appId: "1:55950237615:web:e96982988210b01316195a",
  measurementId: "G-1GNV40XG20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth,}; // Initialize Firebase Authentication and get a reference to the service
