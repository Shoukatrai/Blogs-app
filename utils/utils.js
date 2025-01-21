const authCheck = ()=>{
const user = localStorage.getItem("user")
if(user === null){
    window.location.replace("../login/login.html")
}

}

export{
    authCheck
} 