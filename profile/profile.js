const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const phoneNumber= document.querySelector("#phoneNumber")
const email = document.querySelector("#email")


const editDetail = (element)=>{
    const editPrompt = prompt("Enter edit Value")
    console.log(editPrompt)
    element.parentNode.children[1].placeholder = editPrompt
}


window.editDetail = editDetail 