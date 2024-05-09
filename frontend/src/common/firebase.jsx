import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup, sendEmailVerification  } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBQE-4bSfl3-k0RQ4vdbjr-5jPVJGGi19Y",
  authDomain: "sinh-vien-5tot.firebaseapp.com",
  projectId: "sinh-vien-5tot",
  storageBucket: "sinh-vien-5tot.appspot.com",
  messagingSenderId: "792819545406",
  appId: "1:792819545406:web:4855edf1813cb1a6ca686f"
};
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

const auth = getAuth()

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err);
    })
    return user
}
sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });