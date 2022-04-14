const rowCount = 20;
const columnCount = 20;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const blockWidth = Math.round(windowWidth / columnCount);
const blockHeight = Math.round(windowHeight / rowCount);
const container = document.querySelector(".container");
const animationTypeSelector = document.querySelector(".animation-type-select");
const blocks = [];
const animationTypes = {
  "random": {
    "topGenerator": () => {return Math.random() * windowHeight},
    "leftGenerator": () => {return Math.random() * windowWidth},
    "delayGenerator": () => {return Math.random() * 1000}
  },
  "fall":  {
    "topGenerator": () => {return -blockHeight},
    "leftGenerator": (r, c) => {return blockWidth * c},
    "delayGenerator": () => {return Math.random() * 1000}
  },
  "oval": {
    "topGenerator": () => {return windowHeight},
    "leftGenerator": () => {return windowWidth},
    "delayGenerator": (r, c) => {return (r + c) * 20}
  },
  "middle": {
    "topGenerator": () => {return windowHeight / 2},
    "leftGenerator": () => {return windowWidth / 2},
    "delayGenerator": (r, c) => {return (r * columnCount + c) * 30}
  },
  "circle": {
    "topGenerator": () => {return windowHeight / 2},
    "leftGenerator": () => {return windowWidth / 2},
    "delayGenerator": (r, c) => {return getDistance(rowCount / 2, columnCount / 2, r, c) * 100}
  },
};

// "": {
//   "topGenerator": () => {},
//   "leftGenerator": () => {},
//   "delayGenerator": () => {}
// },

function getDistance(x1, y1, x2, y2) {
  return Math.round(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
}

function createBlocks() {
  for (let r = 0; r < rowCount; r++) {
    const row = [];
    for (let c = 0; c < columnCount; c++) {
      const block = document.createElement("div");
      block.className = "block";
      block.style.width = `${blockWidth}px`;
      block.style.height = `${blockHeight}px`;
      const top = blockHeight * r;
      const left = blockWidth * c;
      block.style.backgroundPosition = `${-left}px ${-top}px`;
      block.style.top = `${top}px`;
      block.style.left = `${left}px`;
      container.appendChild(block);
      row.push(block);
    }
    blocks.push(row);
  }
}

function animation({topGenerator, leftGenerator, delayGenerator}) {
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      const block = blocks[r][c];
      setStartPositionsOfBlock(block, topGenerator(r, c), leftGenerator(r, c));
      setTimeout(() => {
        returnBlocksToOriginalPosition(block, 1000, delayGenerator(r, c));
      }, 0);
    }
  }
}

function setStartPositionsOfBlock(block, top, left) {
  const distanceY = top - block.style.top.replace("px", "");
  const distanceX = left - block.style.left.replace("px", "");
  block.style.transitionDuration = "0ms";
  block.style.transitionDelay = "0ms";
  block.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
}

function returnBlocksToOriginalPosition(block, duration, delay) {
  block.style.transitionDuration = `${duration}ms`;
  block.style.transitionDelay = `${delay}ms`;
  block.style.transform = `translate(0px, 0px)`;
}

function changeHandler(e) {
  animationTypes[e.target.value] && animation(animationTypes[e.target.value]);
}

createBlocks();
animation(animationTypes.random);
animationTypeSelector.addEventListener("change", changeHandler);
