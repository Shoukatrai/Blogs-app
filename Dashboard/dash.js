import { app, auth, collection, db, doc, getDocs, setDoc, addDoc, deleteDoc } from "../firebase.js";

//getting elements
const tilteInput = document.querySelector("#tilteInput")
const BlogText = document.querySelector("#BlogText")
const checkbox = document.querySelector("#checkbox")
const Blogs = document.querySelector(".Blogs")


const authCheck = () => {
    const userId = localStorage.getItem("uid")
    if (!userId) {
        window.location.href = "../login/login.html"
    }
}



const showBlogs = async () => {
    try {
        Blogs.innerHTML = "";
        const uid = localStorage.getItem("uid");
        const snapsot = await getDocs(collection(db, "blogs"))
        snapsot.forEach((doc) => {
            console.log(doc.data().isPrivate)
            if (doc.data().isPrivate) {
                if (doc.data().uid === uid) {
                    const UI = `<div class="blog-container">
        <div class="head">
            <h3> ${doc.data().title} </h3>
        <div class="content">
            ${doc.data().text}
            
        </div>
        <div class="footer">
          <button onclick = "editBlog()">edit</button>
          <button onclick = "deleteBlog()">delete</button>
        </div>
   </div>  `

                    Blogs.innerHTML += UI

                }
            } else {
                const UI = `<div class="blog-container">
        <div class="head">
            <h3> ${doc.data().title} </h3>
        <div class="content">
            ${doc.data().text}
            
        </div>
        <div class="footer">
          <button id = "editBtn" onclick = "editBlog()">edit</button>
          <button id = "deletBtn"  onclick = "deleteBlog()">delete</button>
        </div>
   </div> `

                Blogs.innerHTML += UI
                const editBtn = document.getElementById("editBtn")
                const deletBtn = document.getElementById("deletBtn")

                editBtn.style.pointerEvents = "none"
                deletBtn.style.pointerEvents = "none"
                console.log(editBtn)
                console.log(deletBtn)
            }

        })
    } catch (error) {
        alert(error.code)
    }
}

const blogsHandler = async () => {
    try {
        const uid = localStorage.getItem("uid")
        console.log(uid)
        await addDoc(collection(db, "blogs"), {
            title: tilteInput.value,
            text: BlogText.value,
            isPrivate: checkbox.checked,
            uid: uid
        })
        alert("blog created successfully!")
        showBlogs()
    } catch (error) {
        console.log(error)
        alert(error.code)
    }
}


const deleteBlog = async () => {
    const uid = localStorage.getItem("uid")
    await deleteDoc()
    console.log(uid)
    console.log("delete")
}


const editBlog = () => {
    const uid = localStorage.getItem("uid")
    console.log(uid)
    console.log('edit')
}

const logOut = () => {
    let uid = localStorage.getItem("uid")
    uid = ""
    localStorage.setItem("uid", uid)
    window.location.replace("../login/login.html")
}

window.logOut = logOut

window.showBlogs = showBlogs
window.blogsHandler = blogsHandler
window.authCheck = authCheck
window.editBlog = editBlog
window.deleteBlog = deleteBlog