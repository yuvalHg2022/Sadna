// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrMVYclzkPbdjUxApDcMP5SIW2mYJgoPk",
  authDomain: "igiapp-88187.firebaseapp.com",
  projectId: "igiapp-88187",
  storageBucket: "igiapp-88187.appspot.com",
  messagingSenderId: "392600003604",
  appId: "1:392600003604:web:57bb519b92eee1dc85b301",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
