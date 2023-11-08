// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrTppxei3ReJrIJLwythjjstOgS6DPO2A",
  authDomain: "chatapplication-23.firebaseapp.com",
  projectId: "chatapplication-23",
  storageBucket: "chatapplication-23.appspot.com",
  messagingSenderId: "464781616769",
  appId: "1:464781616769:web:64434bdfa223f0f77b0f80",
  measurementId: "G-NQ74BLE7YK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);