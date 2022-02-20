const colorValue = document.querySelector(".color-value");
const colorChangeBtn = document.querySelector(".color-change-btn");
const main = document.querySelector(".main");
let selectedColor = "#F1f5f8";

function randomNumber(min, max) {
  return Math.floor(min + (Math.random() * (max - min + 1)));
}

function changeBackgroundColor() {
  const r = randomNumber(0, 255).toString(16).padStart(2, "0");
  const g = randomNumber(0, 255).toString(16).padStart(2, "0");
  const b = randomNumber(0, 255).toString(16).padStart(2, "0");
  console.log(r, g, b);
  selectedColor = `#${r}${g}${b}`
  main.style.backgroundColor = selectedColor;
  colorValue.textContent = selectedColor;
}

colorChangeBtn.addEventListener("click", changeBackgroundColor);

main.style.backgroundColor = selectedColor;
colorValue.textContent = selectedColor;