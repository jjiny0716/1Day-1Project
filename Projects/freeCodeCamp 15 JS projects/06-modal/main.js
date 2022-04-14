const modalOpenBtn = document.querySelector(".modal-open-btn");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const modalContainer = document.querySelector(".modal-container");

modalOpenBtn.addEventListener("click", () => modalContainer.classList.add("active"));
modalCloseBtn.addEventListener("click", () => modalContainer.classList.remove("active"));