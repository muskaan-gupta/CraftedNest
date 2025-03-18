import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// connection from firebase to the app
const firebaseConfig = {
  apiKey: Process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: Provcess.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Provcess.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Provcess.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Provcess.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Provcess.env.NEXT_PUBLIC_FIREBASE_APP,
  measurementId: Provcess.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
export { app, auth };
