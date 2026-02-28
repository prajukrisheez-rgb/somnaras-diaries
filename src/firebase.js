// ============================================================
//  firebase.js  —  Somnara's Diaries
//  STEP: Replace every value below with your own Firebase config
//  Get it from: Firebase Console → Project Settings → Your Apps
// ============================================================

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvi8Op90ooIv3Z4pWontj8BwKvvT8TcIg",
  authDomain: "somnaras-diaries.firebaseapp.com",
  projectId: "somnaras-diaries",
  storageBucket: "somnaras-diaries.firebasestorage.app",
  messagingSenderId: "409604513559",
  appId: "1:409604513559:web:059ab8e27c07fd6062e152",
  measurementId: "G-0624P896SM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
