import { db, getDocs, collection , doc , getDoc , updateDoc , deleteDoc} from "../firebase.js"
const form = document.querySelector(".form");
const showBlogs = async () => {
    try {
        const BlogsContainer = document.querySelector(".Blogs-container")
        BlogsContainer.innerHTML = "";
        console.log(BlogsContainer)

        const user = localStorage.getItem("user")
        const userObj = JSON.parse(user)
        const uid = userObj.uid
        console.log(uid)

        const blogs = await getDocs(collection(db, "blogs"));
        console.log(blogs)

        blogs.forEach((doc) => {
            console.log(doc.id)
            const blog = doc.data()
            // console.log(blog.id)
            if (uid === blog.uid) {
                const renderUi = ` <div class="blog-container">
        <div class="head">
            <h3>${blog.inputText}</h3>
        </div>
        <div class="content">
            ${blog.blogText}
            ${blog.uid}
            ${blog.isPrivate}
        </div>
        <div class="footer">
          <button onclick = "editBlog('${doc.id}')">edit</button>
          <button onclick = "deleteBlog('${doc.id}')">delete</button>
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


let blogId;
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
       
    } catch (error) {
        console.log(error)
        alert(error.code)
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
        alert(error.code)
    }
}


const deleteHandler = (refId)=>{
    console.log(refId)
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
        alert(error.code)
    }
}


window.deleteHandler = deleteHandler
window.editBlog = editBlog
window.showBlogs = showBlogs
window.saveEditBlog= saveEditBlog
window.deleteBlog= deleteBlog
