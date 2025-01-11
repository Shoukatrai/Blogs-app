const dropbtn = document.querySelector(".dropbtn");
const dropdownContent= document.querySelector(".dropdown-content");

const showSideMenu = ()=>{
    console.log(dropbtn)
    console.log(dropdownContent)
    dropdownContent.style.display = "block"
}



window.showSideMenu = showSideMenu 