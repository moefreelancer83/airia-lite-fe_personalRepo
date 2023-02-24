// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2a5xTH-GI3H8m0baJGRgNhixPft8HwSE",
  authDomain: "airia-lite.firebaseapp.com",
  databaseURL: "https://airia-lite-default-rtdb.firebaseio.com",
  projectId: "airia-lite",
  storageBucket: "airia-lite.appspot.com",
  messagingSenderId: "223930858737",
  appId: "1:223930858737:web:b161f93ecaebf6001f7d50",
  measurementId: "G-GMQWCNGN9X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const db = getFirestore();

export const listInstance = collection(database, "nfts");