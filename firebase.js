  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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


export{
    app,
}