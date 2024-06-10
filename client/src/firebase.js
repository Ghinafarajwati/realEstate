// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPIKEY,        
  authDomain: "mern-devprojects.firebaseapp.com",
  projectId: "mern-devprojects",
  storageBucket: "mern-devprojects.appspot.com",
  messagingSenderId: "956024559751",
  appId: "1:956024559751:web:847d0cd6b3b60cb2450022"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// WAJIB DI EXPORT