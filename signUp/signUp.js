import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../firebase.js"


const loginCheck = () => {
    console.log("loginCheck")
    const user = localStorage.getItem("user")
    if (user) {
        window.location.replace("../Dashboard/dash.html")
    }
}


const signUpHandler = async () => {
    try {
        const email = document.querySelector("#email").value;
        const pasword = document.querySelector("#pasword").value;
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const phoneNumber = document.querySelector("#phoneNumber").value;
        console.log(email)
        
        if(!firstName ||!lastName || !PaymentAddress || !email || !pasword){
            alert("Fill the required fields!")
            return
        }

        const newUser = await createUserWithEmailAndPassword(auth , email , pasword)
        console.log(newUser)
        const uid = newUser.user.uid
        console.log(uid)
        localStorage.setItem("uid" , uid)
        const userData ={
            firstName,
            lastName,
            phoneNumber,
            email,
            pasword,
            uid  
        }
        console.log(userData)
        await setDoc(doc(db , "users" , uid) , userData)
         
        console.log(newUser)
        alert("Account created successfully!")
        
        
        window.location.assign("../login/login.html")
    } catch (error) {
        console.log(error)
    }

}

window.loginCheck = loginCheck 
window.signUpHandler = signUpHandler 