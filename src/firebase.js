import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUQgGBzuJFeLjffPjhtKOpYhBzWkJ3Um4",
  authDomain: "clone-7eed7.firebaseapp.com",
  projectId: "clone-7eed7",
  storageBucket: "clone-7eed7.appspot.com",
  messagingSenderId: "20824593159",
  appId: "1:20824593159:web:569781d33c9f9b4f1ceba2",
  measurementId: "G-HF4877L5SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };
