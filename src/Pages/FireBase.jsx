import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH6yUverTijpoGEb8j6MfbuGSfzEokorQ",
  authDomain: "backendtest-31c25.firebaseapp.com",
  databaseURL: "https://backendtest-31c25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "backendtest-31c25",
  storageBucket: "https://backendtest-31c25-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "134495509010",
  appId: "1:134495509010:web:def90534b86e682d2756cb",
  measurementId: "G-Z2FJEELRYN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication instance
const googleProvider = new GoogleAuthProvider(); // Google Auth provider
const db = getFirestore(app);
const rtdb = getDatabase(app);

// Export auth and provider
export { auth, googleProvider, db, rtdb };