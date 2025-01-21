import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

//auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

//firestotre database
import { getFirestore, doc, setDoc, getDoc, getDocs, addDoc, collection, deleteDoc , updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuBvIdsuIzy3q5Ni34A3Hqh5292b5aXf8",
    authDomain: "blogs-app-8a228.firebaseapp.com",
    projectId: "blogs-app-8a228",
    storageBucket: "blogs-app-8a228.firebasestorage.app",
    messagingSenderId: "854316630713",
    appId: "1:854316630713:web:62ebd93378b0b7cf1c1168"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    app,
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    doc, setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    updateDoc
}