import { addDoc, app, collection, db, doc, getDoc, getDocs } from "../firebase.js";


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
          <button>edit</button>
          <button>delete</button>
        </div>
      </div> `
                    BlogsContainer.innerHTML += renderUi;
                }
            }else{
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
                  <button>edit</button>
                  <button>delete</button>
                </div>
              </div> `
                    BlogsContainer.innerHTML += renderUi;
            }        
        })

    } catch (error) {
        console.log(error)
    }
}






window.showBlogs = showBlogs
window.postBlog = postBlog 