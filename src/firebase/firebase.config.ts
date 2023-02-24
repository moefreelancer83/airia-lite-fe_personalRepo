// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh-lovvfAbbjiKroJasjOAPYz1AQn63a8",
  authDomain: "mint-unlimited.firebaseapp.com",
  projectId: "mint-unlimited",
  storageBucket: "mint-unlimited.appspot.com",
  messagingSenderId: "974619576625",
  appId: "1:974619576625:web:67a418198455c02a4ac810",
  measurementId: "G-F9VPSCCHQW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const db = getFirestore();

export const listInstance = collection(database, "nfts");