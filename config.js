// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// here I setup auth const that uses FireBase Authantication 
const auth = getAuth()

const gProvider = new GoogleAuthProvider();
const storage = getStorage();

export default db;
export {auth, gProvider, storage};
