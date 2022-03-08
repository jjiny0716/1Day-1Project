const board = document.querySelector(".board");
const ROW_SIZE = 25;
const HOVER_AREA_NUMBER = ROW_SIZE ** 2;
const COLOR_HOVER_AREA = "#1d1d1d";
const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];

function settingBoard(rowSize) {
  board.style.gridTemplateColumns = `repeat(${rowSize}, auto)`;
}

function createHoverArea(n) {
  for (let i = 0; i < n; i++) {
    const hoverArea = document.createElement("div");
    hoverArea.classList.add("hover-area");
    board.appendChild(hoverArea);
  }
}

function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function handleMouseOver(e) {
  if (!e.target.classList.contains("hover-area")) return;
  turnOnRandomLight(e.target);
}

function turnOnRandomLight(target) {
  const color = colors[random(0, 5)];
  target.style.backgroundColor = color;
  target.style.boxShadow = `0 0 10px ${color}`;
}

function handleMouseOut(e) {
  if (!e.target.classList.contains("hover-area")) return;
  turnOffLight(e.target);
}

function turnOffLight(target) {
  target.style.backgroundColor = COLOR_HOVER_AREA;
  target.style.boxShadow = "none";
}

settingBoard(ROW_SIZE);
createHoverArea(HOVER_AREA_NUMBER);
board.addEventListener("mouseover", handleMouseOver);
board.addEventListener("mouseout", handleMouseOut);
