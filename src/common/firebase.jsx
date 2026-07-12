// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-KiqGyTCp4QwKth_mZim9LJ5vwRhLa4k",
  authDomain: "techorbit-blog.firebaseapp.com",
  projectId: "techorbit-blog",
  storageBucket: "techorbit-blog.firebasestorage.app",
  messagingSenderId: "411971182596",
  appId: "1:411971182596:web:85a8999f77ea73cd671551"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();