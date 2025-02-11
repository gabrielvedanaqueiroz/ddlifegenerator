//firebase database
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLYkSMMgO8Ajnu-73ze85aIW1jCK2YDNw",
  authDomain: "ddlifegenerator.firebaseapp.com",
  projectId: "ddlifegenerator",
  storageBucket: "ddlifegenerator.firebasestorage.app",
  messagingSenderId: "860025912610",
  appId: "1:860025912610:web:a0970aafd43089f00a397b"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {db}; 

