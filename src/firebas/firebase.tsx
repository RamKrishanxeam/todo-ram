// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnP8QK_i4Y3VsTUPNp72ogBDuEe_l66Ds",
  authDomain: "todo-ram.firebaseapp.com",
  projectId: "todo-ram",
  storageBucket: "todo-ram.firebasestorage.app",
  messagingSenderId: "810831661860",
  appId: "1:810831661860:web:3324858465672d5e96c1b1",
  measurementId: "G-QYBY9RFVHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
