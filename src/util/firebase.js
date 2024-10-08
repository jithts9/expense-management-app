// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5aWTYocLtIpWhzCSflC7WvfzBS94HiS8",
  authDomain: "expense-management-ecd77.firebaseapp.com",
  projectId: "expense-management-ecd77",
  storageBucket: "expense-management-ecd77.appspot.com",
  messagingSenderId: "217932594513",
  appId: "1:217932594513:web:e24a223e76c5b911756770",
  measurementId: "G-FNK7HQYMWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();