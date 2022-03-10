const rowCount = 20;
const columnCount = 20;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const panelWidth = Math.round(windowWidth / columnCount);
const panelHeight = Math.round(windowHeight / rowCount);
const container = document.querySelector(".container");
const animationSelectionSelector = document.querySelector(".animation-type-select");
const animations = {
  "random": random,
  "fall": fall,
  "oval": oval,
  "middle": middle
}

function random() {
  for (let r = 0 ; r < rowCount ; r++) {
    for (let c = 0 ; c < columnCount ; c++) {
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      const top = panelHeight * r;
      const left = panelWidth * c;
      panel.style.top = `${Math.random() * windowHeight}px`;
      panel.style.left = `${Math.random() * windowWidth}px`;
      panel.style.backgroundPosition = `${-left}px ${-top}px`;
      panel.style.transitionDelay = `${Math.random() * 1000}ms`;
      container.appendChild(panel);
      setTimeout(() => {
        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
      }, 1000);
    }
  }
}

function fall() {
  for (let r = 0 ; r < rowCount ; r++) {
    for (let c = 0 ; c < columnCount ; c++) {
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      const top = panelHeight * r;
      const left = panelWidth * c;
      panel.style.top = `${-panelHeight}px`;
      panel.style.left = `${left}px`;
      panel.style.backgroundPosition = `${-left}px ${-top}px`;
      panel.style.transitionDelay = `${Math.random() * 1000}ms`;
      container.appendChild(panel);
      setTimeout(() => {
        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
      }, 500);
    }
  }
}

function oval() {
  for (let r = 0 ; r < rowCount ; r++) {
    for (let c = 0 ; c < columnCount ; c++) {
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      const top = panelHeight * r;
      const left = panelWidth * c;
      panel.style.top = `${windowHeight}px`;
      panel.style.left = `${windowWidth}px`;
      panel.style.backgroundPosition = `${-left}px ${-top}px`;
      panel.style.transitionDelay = `${(r + c) * 20}ms`;
      container.appendChild(panel);
      setTimeout(() => {
        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
      }, 100);
    }
  }
}

function middle() {
  for (let r = 0 ; r < rowCount ; r++) {
    for (let c = 0 ; c < columnCount ; c++) {
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      const top = panelHeight * r;
      const left = panelWidth * c;
      panel.style.top = `${windowHeight / 2}px`;
      panel.style.left = `${windowWidth / 2}px`;
      panel.style.backgroundPosition = `${-left}px ${-top}px`;
      panel.style.transitionDelay = `${(r * columnCount + c) * 30}ms`;
      container.appendChild(panel);
      setTimeout(() => {
        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
      }, 500);
    }
  }
}

function clearContainer() {
  container.innerHTML = "";
}

function changeHandler(e) {
  clearContainer();
  animations[e.target.value]();
}

random();
animationSelectionSelector.addEventListener("change", changeHandler);


