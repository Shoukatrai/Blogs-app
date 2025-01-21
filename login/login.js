import { auth, db, doc, getDoc, signInWithEmailAndPassword } from "../firebase.js"

const loginCheck = () => {
    console.log("loginCheck")
    const user = localStorage.getItem("user")
    if (user) {
        window.location.replace("../Dashboard/dash.html")
    }
}

const loginHandler = async () => {
    try {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const userAuth = await signInWithEmailAndPassword(auth, email, password)
        const uid = userAuth.user.uid
        console.log(uid)

        const docRef = doc(db, "users", uid)
        const snap = await getDoc(docRef)
        const userData = snap.data()

        localStorage.setItem("user", JSON.stringify(userData))
        alert("Login Successful")
        window.location.replace("../Dashboard/dash.html")
    } catch (error) {
        console.log(error)
    }
}


window.loginCheck = loginCheck
window.loginHandler = loginHandler