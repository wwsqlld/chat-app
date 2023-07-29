import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAiPk4_EqHmIG5zgQTZdRa8GFrbVRIABow",
  authDomain: "chatapp-1ef41.firebaseapp.com",
  projectId: "chatapp-1ef41",
  storageBucket: "chatapp-1ef41.appspot.com",
  messagingSenderId: "1096140224055",
  appId: "1:1096140224055:web:cb2b5537e46cb820d5b1b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);