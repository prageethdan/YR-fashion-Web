import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsFlFR1BBdlh6_0gvhiJ8um5sd8jq6P2c",
  authDomain: "yr-challenge.firebaseapp.com",
  projectId: "yr-challenge",
  storageBucket: "yr-challenge.appspot.com",
  messagingSenderId: "337951647741",
  appId: "1:337951647741:web:f56dbd1801c36ff411db94",
  measurementId: "G-14TQ9M5HCL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
