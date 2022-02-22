const toggleBtn = document.querySelector(".toggle-btn");
const links = document.querySelector(".links");

function handleToggleBtnClick(e) {
  console.log("!!");
  links.classList.toggle("hide"); 
}

toggleBtn.addEventListener("click", handleToggleBtnClick);