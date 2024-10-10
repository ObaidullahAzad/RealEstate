// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-a7d81.firebaseapp.com",
  projectId: "realestate-a7d81",
  storageBucket: "realestate-a7d81.appspot.com",
  messagingSenderId: "511635075414",
  appId: "1:511635075414:web:ae8c6c34b00a86f50e26f7",
  measurementId: "G-M2CW0WK3E8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
