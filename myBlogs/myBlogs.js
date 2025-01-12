import { app, collection, db, doc, getDocs, query, where } from "../firebase.js";


const dropbtn = document.querySelector(".dropbtn");
const dropdownContent= document.querySelector(".dropdown-content");

const showSideMenu = ()=>{
    console.log(dropbtn)
    console.log(dropdownContent)
    dropdownContent.style.display = "block"
}

const authCheck = ()=>{
    const uid = localStorage.getItem("uid")
    if(!uid){
        window.location.href = "../login/login.html"
    }
}



// const showBlogsHandler = async()=>{
//     try {
//         const userData = await 
//     } catch (error) {
//         console.log(error)
//         alert(error.code)
//     }
// }


window.showSideMenu = showSideMenu 
// window.showBlogsHandler= showBlogsHandler 

window.authCheck = authCheck