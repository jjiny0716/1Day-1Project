const nav = document.querySelector(".nav");
const navToggleBtn = document.querySelector(".toggle-btn");

function toggleNav() {
  nav.classList.toggle("active");
}

navToggleBtn.addEventListener("click", toggleNav);