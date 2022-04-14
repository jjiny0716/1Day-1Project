const countText = document.querySelector(".count");
const controls = document.querySelector(".controls");
let count = 0;

function increase() {
  count++;
}

function decrease() {
  count--;
}

function reset() {
  count = 0;
}

function updateCountText() {
  countText.textContent = count;
  if (count < 0) countText.style.color = "red";
  else if (count > 0) countText.style.color = "green";
  else countText.style.color = "black";
}

function handleControlClick(e) {
  if (e.target.classList.contains("decrease")) {
    decrease();
  }
  else if (e.target.classList.contains("reset")) {
    reset();
  }
  else if (e.target.classList.contains("increase")) {
    increase();
  }
  updateCountText();
}

controls.addEventListener("click", handleControlClick);

