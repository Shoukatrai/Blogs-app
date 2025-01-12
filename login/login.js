import { app, auth, signInWithEmailAndPassword } from "../firebase.js";

//getting elements
const email = document.querySelector("#email")
const password= document.querySelector("#password")


const authCheck = ()=>{
    const uid = localStorage.getItem("uid")
    if(uid){
        window.location.href = "../Dashboard/dash.html"
    }
}

const loginHandler =async ()=>{
    try {
        const user =  await signInWithEmailAndPassword(auth , email.value , password.value)
        const uid = user.user.uid
        console.log(uid)
        localStorage.setItem("uid" , uid)
        window.location.href = "../Dashboard/dash.html"
    } catch (error) {
        alert(error.code)
    }
} 

window.authCheck = authCheck 
window.loginHandler = loginHandler