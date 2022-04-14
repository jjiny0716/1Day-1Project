const btnContainer = document.querySelector(".btn-container");
const rejectBtn = document.querySelector(".reject-btn");

function changeButtonPosition() {
  btnContainer.classList.toggle("reverse");
}

rejectBtn.addEventListener("mouseover", changeButtonPosition);