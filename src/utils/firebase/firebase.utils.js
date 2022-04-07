import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA6dqqrw8-GjuTSZanz1J52teJkp5uWjxs",
  authDomain: "ecommerceshop-113d0.firebaseapp.com",
  projectId: "ecommerceshop-113d0",
  storageBucket: "ecommerceshop-113d0.appspot.com",
  messagingSenderId: "425457569653",
  appId: "1:425457569653:web:b65513b338923199320d3c",
  measurementId: "G-VFCPHTDBW2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createAt });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};
