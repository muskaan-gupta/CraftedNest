import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// connection from firebase to the app
const firebaseConfig = {
  apiKey: Process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: Process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Process.env.NEXT_PUBLIC_FIREBASE_APP,
  measurementId: Process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { app, auth, googleProvider };
