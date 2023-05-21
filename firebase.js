// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhzhSJRuLuYqmHKircusXq6mziJha7nj8",
  authDomain: "igiapp2.firebaseapp.com",
  projectId: "igiapp2",
  storageBucket: "igiapp2.appspot.com",
  messagingSenderId: "666374193845",
  appId: "1:666374193845:web:954d82218110a6ab9f74fc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
