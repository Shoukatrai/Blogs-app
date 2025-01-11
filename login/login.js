import { app, auth, signInWithEmailAndPassword } from "../firebase.js";

//getting elements
const email = document.querySelector("#email")
const password= document.querySelector("#password")


const loginHandler =async ()=>{
    try {
        await signInWithEmailAndPassword(auth , email.value , password.value)
        window.location.href = "../Dashboard/dash.html"
    } catch (error) {
        alert(error.code)
    }
} 

window.loginHandler = loginHandler