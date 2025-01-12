import { db, doc, getDoc, setDoc } from "../firebase.js"

const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const phoneNumber= document.querySelector("#phoneNumber")
const email = document.querySelector("#email")

const  authCheck = ()=>{
    const uid = localStorage.getItem("uid")
    if(!uid){
        window.location.href = "../login/login.html"
    }
}

const showDetail =async ()=>{
    try {
        const uid= localStorage.getItem("uid")
        const userDetail = await getDoc(doc(db , "users" , uid))
        console.log(userDetail.data())
        firstName.placeholder = userDetail.data().firstName
        lastName.placeholder = userDetail.data().lastName
        phoneNumber.placeholder = userDetail.data().phoneNumber
        email.placeholder = userDetail.data().email
    } catch (error) {
        alert(error.code)
    }
}


const editDetail =async (element)=>{
    const uid = localStorage.getItem("uid")
    const editPrompt = prompt("Enter edit Value")
    console.log(editPrompt)
    element.parentNode.children[1].placeholder = editPrompt 
    
    try {
        let userDetail = await setDoc(doc(db , "users" , uid),{
            firstName: firstName.placeholder,
            lastName:lastName.placeholder,
            phoneNumber:phoneNumber.placeholder,
            email:email.placeholder
        })
        userDetail = await getDoc(doc(db , "users" , uid))           
        showDetail()
        alert("Updated successfully!")
        console.log(userDetail)
    } catch (error) {
        alert(error.message)
    }

}


 
window.showDetail= showDetail
window.authCheck= authCheck
window.editDetail = editDetail 