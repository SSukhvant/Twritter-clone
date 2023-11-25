// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB2nl4kSVap6JPtu6KyIZ-w33d2Agbv1EQ",
    authDomain: "twitter-clone-261ad.firebaseapp.com",
    projectId: "twitter-clone-261ad",
    storageBucket: "twitter-clone-261ad.appspot.com",
    messagingSenderId: "222183945419",
    appId: "1:222183945419:web:a032dd89987c43578c974e"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };