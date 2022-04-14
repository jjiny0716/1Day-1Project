const CONTAINER_DEFAULT_SIZE = 500;
const BOX_ROW_COUNT = 4;
const magicBtn = document.querySelector(".magic-btn");
const boxContainer = document.querySelector(".box-container");

function toggleBoxContainer() {
  boxContainer.classList.toggle("expand");
}

function makeBoxes() {
  const n = BOX_ROW_COUNT;
  const boxSize = CONTAINER_DEFAULT_SIZE / n;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const box = document.createElement("div");
      box.className = "box";
      box.style.width = `${boxSize}px`;
      box.style.height = `${boxSize}px`;
      box.style.backgroundPosition = `${-boxSize * x}px ${-boxSize * y}px`;

      boxContainer.appendChild(box);
    }
  }
}

makeBoxes();
magicBtn.addEventListener("click", toggleBoxContainer);