// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWCI_iAhToKlizT0bg0-nCCtkuJ_0J_0s",
  authDomain: "capstone-8fb94.firebaseapp.com",
  projectId: "capstone-8fb94",
  storageBucket: "capstone-8fb94.appspot.com",
  messagingSenderId: "251199154757",
  appId: "1:251199154757:web:0b61bb62cd1ff0bcf1112c",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
