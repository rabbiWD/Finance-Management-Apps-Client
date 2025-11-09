// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKEAX8dv942oEHRkcyxaToqvDE9nEt9G0",
  authDomain: "financial-management-app-669cc.firebaseapp.com",
  projectId: "financial-management-app-669cc",
  storageBucket: "financial-management-app-669cc.firebasestorage.app",
  messagingSenderId: "666739603634",
  appId: "1:666739603634:web:332d110c288d1ccf53b1ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);