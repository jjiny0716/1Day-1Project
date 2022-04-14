const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const colorValue = document.querySelector(".color-value");
const colorChangeBtn = document.querySelector(".color-change-btn");
const main = document.querySelector(".main");
let selectedColor = "#F1f5f8";

function randomNumber(min, max) {
  return Math.floor(min + (Math.random() * (max - min + 1)));
}

function changeBackgroundColor() {
  selectedColor = colors[randomNumber(0, 3)];
  main.style.backgroundColor = selectedColor;
  colorValue.textContent = selectedColor;
}

colorChangeBtn.addEventListener("click", changeBackgroundColor);

main.style.backgroundColor = selectedColor;
colorValue.textContent = selectedColor;