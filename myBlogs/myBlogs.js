import { app, collection, db, doc, getDocs, query, where } from "../firebase.js";

//getting elements
const Blogs  = document.querySelector(".Blogs");




const authCheck = ()=>{
    const uid = localStorage.getItem("uid")
    if(!uid){
        window.location.href = "../login/login.html"
    }
}



const showBlogsHandler = async()=>{
    console.log("shdshbds")
    try {
        const uid = localStorage.getItem("uid")
        const blogCollection = collection(db , "blogs");
        const q = query(blogCollection , where("uid" , "==" , uid));
        const snapsot = await getDocs(q);
        console.log(snapsot)
        snapsot.forEach((doc)=>{
            console.log(doc.data())
            const UI = `<div class="blog-container">
            <div class="head">
                <h3> ${doc.data().title} </h3>
                <div class="dropdown">
                    <button class="dropbtn">
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                    <div class="dropdown-content">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                </div>

            <div class="content">
                ${doc.data().text}
            </div>
       </div> `
       Blogs.innerHTML += UI;
        })
    } catch (error) {
        console.log(error)
        alert(error.code)
    }
}

const logOut = ()=>{
    let uid = localStorage.getItem("uid")
    uid = ""
    localStorage.setItem("uid" , uid)
    alert("Log out Successful");
    window.location.href = "../login/login.html"
}

 
window.logOut = logOut
window.showBlogsHandler = showBlogsHandler 
window.authCheck = authCheck