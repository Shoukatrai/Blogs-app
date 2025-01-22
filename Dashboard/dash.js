import { addDoc, app, collection, db, doc, getDoc, getDocs, deleteDoc, updateDoc } from "../firebase.js";


const postBlog = async () => {
    try {

        const inputText = document.querySelector("#inputText").value
        const blogText = document.querySelector("#text").value
        const isPrivate = document.querySelector("#isPrivate").checked
        const user = localStorage.getItem("user")
        const userObj = JSON.parse(user)
        const uid = userObj.uid
        const userBlog = await addDoc(collection(db, "blogs"), {
            inputText,
            blogText,
            isPrivate,
            uid
        })
        alert("Blog posted Successfully!")
        showBlogs()
    } catch (error) {
        console.log(error)
    }
}

let blogId;
const showBlogs = async () => {
    try {
        const BlogsContainer = document.querySelector(".Blogs-container")
        BlogsContainer.innerHTML = "";

        const user = localStorage.getItem("user")
        const userObj = JSON.parse(user)
        const uid = userObj.uid

        console.log(BlogsContainer)
        const blogs = await getDocs(collection(db, "blogs"));
        console.log(blogs)
        blogs.forEach((blog) => {
            // console.log(blog.id)
            blogId = blog.id;


            let isPrivate = blog.data().isPrivate;
            if (isPrivate) {
                if (blog.data().uid === uid) {
                    const renderUi = ` <div class="blog-container">
        <div class="head">
            <h3>${blog.data().inputText}</h3>
        </div>
        <div class="content">
            ${blog.data().blogText}
            ${blog.data().uid}
            ${blog.data().isPrivate}
        </div>
        <div class="footer">
          <button onclick = "editBlog('${blogId}')">edit</button>
          <button onclick = "deleteBlog('${blogId}')">delete</button>
        </div>
      </div> `
                    BlogsContainer.innerHTML += renderUi;
                }
            } else {
                const renderUi = ` <div class="blog-container">
                <div class="head">
                    <h3>${blog.data().inputText}</h3>
                </div>
                <div class="content">
                    ${blog.data().blogText}
                    ${blog.data().uid}
                    ${blog.data().isPrivate}
                </div>
                <div class="footer">
                  <button onclick = "editBlog('${blogId}')">edit</button>
                  <button onclick = "deleteBlog('${blogId}')">delete</button>
                </div>
              </div> `
                BlogsContainer.innerHTML += renderUi;
            }
        })

    } catch (error) {
        console.log(error)
    }
}


const editTitle = document.querySelector("#editTitle")
const editBlogText = document.querySelector("#editBlogText")
const privateCheck = document.querySelector("#private")
const form = document.querySelector(".form")


const editBlog = async (id) => {
    try {
        blogId = id

        const user = localStorage.getItem("user")
        const userObj = JSON.parse(user)
        const uid = userObj.uid

        const docRef = doc(db, "blogs", blogId)
        const snap = await getDoc(docRef)
        const userData = snap.data()
        console.log(userData)
        console.log(userData.inputText)
        console.log(userData.blogText)
        console.log(userData.isPrivate)
        console.log(userData.uid)

        console.log(blogId)
        if (userData.uid === uid){
            form.style.display = "block"
            editTitle.value = userData.inputText;
            editBlogText.value = userData.blogText;
        }else{
            alert("Only author can update the blog!")
        }
       



        //setting the value to form


    } catch (error) {
        console.log(error)
    }
}



const saveEditBlog = async () => {
    try {
        console.log("save blog")
        const user = localStorage.getItem("user")
        const userData = JSON.parse(user)
        console.log(userData.uid)
        const blogObj = {
            inputText: editTitle.value,
            blogText: editBlogText.value,
            isPrivate: privateCheck.checked,
            uid: userData.uid
        }
        const blogRef = doc(db, "blogs", blogId);
        await updateDoc(blogRef, blogObj);
        form.style.display = "none"
        alert("Blog updated!");
        showBlogs()
    } catch (error) {
        console.log(error)
    }
}

const deleteBlog = async (blogId) => {
    try {
        const user = localStorage.getItem("user")
        const userObj = JSON.parse(user)
        const uid = userObj.uid

        const docRef = doc(db, "blogs", blogId)
        const snap = await getDoc(docRef)
        const userData = snap.data()
        console.log(userData)
        console.log(userData.inputText)
        console.log(userData.blogText)
        console.log(userData.isPrivate)
        console.log(userData.uid)
        if(uid === userData.uid){
            await deleteDoc(doc(db, "blogs", blogId))
            alert("Blog Deleted!")
            showBlogs()
        }else{
            alert("Only Author can delete the Blog!")
        }
    } catch (error) {
        console.log(error)
    }
}


const logOut = ()=>{
    console.log("logout")
    localStorage.removeItem("user")
    alert("Logout Successful!")
    window.location.replace("../login/login.html")
}

window.logOut = logOut
window.saveEditBlog = saveEditBlog
window.deleteBlog = deleteBlog
window.editBlog = editBlog
window.showBlogs = showBlogs
window.postBlog = postBlog 