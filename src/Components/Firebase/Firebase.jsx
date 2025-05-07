// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGv__U4tAk90PzYELU1BkOc53TaPU2UE4",
  authDomain: "edubell-248e9.firebaseapp.com",
  projectId: "edubell-248e9",
  storageBucket: "edubell-248e9.appspot.com",
  messagingSenderId: "353284686108",
  appId: "1:353284686108:web:36d2d99caebdd070f23ad9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);


