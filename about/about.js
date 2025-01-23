
const logOut = ()=>{
    console.log("logout")
    localStorage.removeItem("user")
    alert("Logout Successful!")
    window.location.replace("../login/login.html")
}



window.logOut = logOut