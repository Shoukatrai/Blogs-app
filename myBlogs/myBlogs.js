const dropbtn = document.querySelector(".dropbtn");
const dropdownContent= document.querySelector(".dropdown-content");

const showSideMenu = ()=>{
    console.log(dropbtn)
    console.log(dropdownContent)
    dropdownContent.style.display = "block"
}


const hideSideMenu = ()=>{
    console.log(dropbtn)
    console.log(dropdownContent)
    dropdownContent.style.display = "none"
}

window.showSideMenu = showSideMenu 
window.hideSideMenu= hideSideMenu 