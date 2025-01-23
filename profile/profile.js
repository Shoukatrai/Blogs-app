import { db, doc, updateDoc } from "../firebase.js"

let firstName = document.querySelector("#firstName")
let lastName = document.querySelector("#lastName")
let phoneNumber = document.querySelector("#phoneNumber")
let email = document.querySelector("#email")



const showProfileDetail = () => {
    console.log("profile");
    const user = localStorage.getItem("user")
    const userData = JSON.parse(user)


    firstName.placeholder = userData.firstName
    lastName.placeholder = userData.lastName
    phoneNumber.placeholder = userData.phoneNumber
    email.placeholder = userData.email
}

let editEle;
const saveBtn = document.querySelector(".saveBtn");
const editDetail = (element) => {
    editEle = element
    console.log("edit")
    let placeholderValue = editEle.parentNode.children[1].placeholder
    console.log(placeholderValue)
    editEle.parentNode.children[1].disabled = false
    saveBtn.style.display = "block"
    editEle.parentNode.children[1].value = editEle.parentNode.children[1].placeholder
}


const saveDetailChanges = async () => {
    try {
        console.log(editEle.parentNode.children[1].value)
        editEle.parentNode.children[1].placeholder = editEle.parentNode.children[1].value
        editEle.parentNode.children[1].disabled = true;
        const user = localStorage.getItem("user")
        const userData = JSON.parse(user)
        const uid = userData.uid
        console.log(uid)
        console.log(userData.uid)

        console.log(firstName.placeholder)
        console.log(lastName.placeholder)
        console.log(phoneNumber.placeholder)
        console.log(email.placeholder)
        const userObj = {
            firstName: firstName.placeholder,
            lastName: lastName.placeholder,
            phoneNumber: phoneNumber.placeholder,
            email: email.placeholder,
            uid: uid
        }
        console.log(userObj)
        localStorage.clear()
        localStorage.setItem("user", JSON.stringify(userObj))
        const userRef = doc(db, "users", uid)
        const userA = await updateDoc(userRef, userObj)
        alert("Changes Saved!")
         saveBtn.style.display = "none"
        showProfileDetail()
    } catch (error) {
        console.log(error)
        alert(error.code)
    }

}


const logOut = ()=>{
    console.log("logout")
    localStorage.removeItem("user")
    alert("Logout Successful!")
    window.location.replace("../login/login.html")
}



window.logOut = logOut
window.saveDetailChanges = saveDetailChanges
window.editDetail = editDetail
window.showProfileDetail = showProfileDetail