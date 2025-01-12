import { app, auth ,collection,db , doc ,getDocs, setDoc , addDoc } from "../firebase.js";

//getting elements
const tilteInput = document.querySelector("#tilteInput")
const BlogText= document.querySelector("#BlogText")
const checkbox= document.querySelector("#checkbox")
const Blogs = document.querySelector(".Blogs")


const authCheck = ()=>{
    const userId = localStorage.getItem("uid")
    if(!userId){
        window.location.href = "../login/login.html"
    }
}

const showBlogs =async ()=>{
    try {
        Blogs.innerHTML = "";
        const uid = localStorage.getItem("uid");
        const snapsot = await getDocs(collection(db , "blogs"))
        snapsot.forEach((doc)=>{
            console.log(doc.data().isPrivate)
            if(doc.data().isPrivate){
                if(doc.data().uid ===uid){
                    const UI = `<div class="blog-container">
                        <div class="head">
                        <h3>${doc.data().title}</h3>
                        <div class="dropdown">
                        <button class="dropbtn" onclick="showSideMenu()">
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
                <span>${doc.data().isPrivate} </span>
            <div class="content">
            ${doc.data().text}
            </div>
       </div> 
    `
    
    Blogs.innerHTML +=UI
                }
            }else{
                const UI = `<div class="blog-container">
                        <div class="head">
                        <h3>${doc.data().title}</h3>
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
                <span>${doc.data().isPrivate} </span>
            <div class="content">
            ${doc.data().text}
            </div>
       </div> 
    `
    
    Blogs.innerHTML +=UI
            }
            
        })  
    } catch (error) {
        alert(error.code)
    } 
}

const blogsHandler =async ()=>{
    try {
        const uid = localStorage.getItem("uid")
        console.log(uid)
        await addDoc(collection(db, "blogs"),{
            title: tilteInput.value,
            text: BlogText.value,
            isPrivate: checkbox.checked,
            uid:uid
        })
        alert("blog created successfully!")
        showBlogs()
    } catch (error) {
        console.log(error)
        alert(error.code)
    }
}






const logOut = ()=>{
    let uid = localStorage.getItem("uid")
    uid = ""
    localStorage.setItem("uid" , uid)
    window.location.replace("../login/login.html")
}

window.logOut = logOut

window.showBlogs   = showBlogs  
window.blogsHandler  = blogsHandler 
window.authCheck = authCheck