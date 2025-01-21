import { db, getDocs, collection } from "../firebase.js"

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

        blogs.forEach((blog) => {
            if (uid === blog.data().uid) {
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