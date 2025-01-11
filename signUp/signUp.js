import { app, auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../firebase.js";

//getting elemenst
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const firstName = document.querySelector("#firstName")
const lastName= document.querySelector("#lastName")
const phoneNumber = document.querySelector("#phoneNumber")



const signUpHandler = async ()=>{
    try {
        const user = await createUserWithEmailAndPassword(auth , email.value , password.value)
        const uid = user.user.uid
        console.log(uid) 
        const data = await setDoc(doc(db , "users" ,uid),{
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
        })
        window.location.href = "../login/login.html"
    } catch (error) {
        alert(error.code)
    }
}

window.signUpHandler = signUpHandler 