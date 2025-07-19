// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAq-Dp_v-yv_foTBEaQy8p-2IVtbLgchcI",
  authDomain: "restoran-pak-d--web.firebaseapp.com",
  projectId: "restoran-pak-d--web",
  storageBucket: "restoran-pak-d--web.firebasestorage.app",
  messagingSenderId: "653261498197",
  appId: "1:653261498197:web:2cf7001510f506e3ebb1dc",
  measurementId: "G-G4FK962BFX",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
