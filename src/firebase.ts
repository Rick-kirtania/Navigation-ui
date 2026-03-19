import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlNQ3MMSmMMhXndPuX5a1QfxpifM1-J-U",
  authDomain: "navigation-system-fdaba.firebaseapp.com",
  projectId: "navigation-system-fdaba",
  storageBucket: "navigation-system-fdaba.firebasestorage.app",
  messagingSenderId: "714763755052",
  appId: "1:714763755052:web:cc1db4d2f4fda79f5afb89",
  measurementId: "G-PLS315HCX7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);