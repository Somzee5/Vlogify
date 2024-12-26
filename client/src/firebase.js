// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vlogify-9944.firebaseapp.com",
  projectId: "vlogify-9944",
  storageBucket: "vlogify-9944.firebasestorage.app",
  messagingSenderId: "968815319948",
  appId: "1:968815319948:web:94c3a5c8553382f00814a9",
  measurementId: "G-2BLS4KXFV6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);