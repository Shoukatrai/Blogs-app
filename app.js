import { app, auth } from "./firebase.js";


const authCheck = ()=>{
    const userId = localStorage.getItem("uid")
    if(userId){
        window.location.href = "./Dashboard/dash.html"
    }
}
console.log(app , auth)
window.authCheck = authCheck 