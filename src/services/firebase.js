// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfVLYBJKzLwrTtcp1Fy9BIRrAuzDYxNvE",
  authDomain: "caudalambiental.firebaseapp.com",
  projectId: "caudalambiental",
  storageBucket: "caudalambiental.appspot.com",
  messagingSenderId: "898829493517",
  appId: "1:898829493517:web:0ae031bceb16a2351f3c44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }