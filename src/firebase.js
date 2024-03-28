// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5oR5aI7x_B-LUR2I8zExmeyGOWUeazTM",
  authDomain: "document-app-f65c9.firebaseapp.com",
  projectId: "document-app-f65c9",
  storageBucket: "document-app-f65c9.appspot.com",
  messagingSenderId: "945464988326",
  appId: "1:945464988326:web:3cb3683434bb541f89da67",
  measurementId: "G-C2HFMJT070"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const datas = getFirestore(app)