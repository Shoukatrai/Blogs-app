const logOut = ()=>{
    console.log("logOut")
    let uid = localStorage.getItem("uid")
    uid = ""
    localStorage.setItem("uid" , uid)
    alert("Log out successful!")
    window.location.href = "../login/login.html"

}

window.logOut = logOut