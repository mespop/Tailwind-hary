// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0fivzFupY2CbzFpYyQyG8kaN9QgtU_y4",
  authDomain: "pedroproj3.firebaseapp.com",
  projectId: "pedroproj3",
  storageBucket: "pedroproj3.appspot.com",
  messagingSenderId: "710425410212",
  appId: "1:710425410212:web:8349518335160c7dbe4431"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db =  getFirestore(app);