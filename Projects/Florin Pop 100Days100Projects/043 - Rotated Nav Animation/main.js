const container = document.querySelector(".container");
const rotateToggleBtn = document.querySelector(".rotate-toggle-btn");


function toggleContainerRotated() {
  container.classList.toggle("rotated");
}

rotateToggleBtn.addEventListener("click", toggleContainerRotated);