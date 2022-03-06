const welcomeModal = document.querySelector(".welcome-modal");
const startBtn = document.querySelector(".start-btn");
const testerContainer = document.querySelector(".tester-container");
const wpm = document.querySelector(".wpm .value");
const time = document.querySelector(".time .value");
const progressBar = document.querySelector(".progress");
const text = document.querySelector(".text");
const wordInput = document.querySelector(".word-input");
let words = null;
let wordIndex = 0;
let successCount = 0;
let elapsedTime = 0; // second
let texts = null;
let timerId = null;

function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function loadTextData() {
  return fetch("./texts.JSON");
}

function startGame() {
  // 데이터 로딩 안되면 return
  if (texts === null) return;

  welcomeModal.classList.add("invisible");
  testerContainer.classList.remove("invisible");
  text.innerHTML = transformWords(texts[random(0, texts.length)].text);
  game();
}

function transformWords(text) {
  words = text.split(' ');
  return words.map(word => `<span class="word">${word}</span>`).join(' ');
}

function game() {
  timerId = setInterval(updateElapsedTime, 1000);
  text.children[wordIndex].classList.add("underline");
}

function updateElapsedTime() {
  elapsedTime++;
  time.textContent = elapsedTime;
  updateWpm();
}

function handleInput(e) {
  if (e.data === ' ') {
    nextWord(e.target.value);
    if (wordIndex === words.length) gameEnd();
  }
  else matchWord(e.target.value);
}

function nextWord(str) {
  if (text.children[wordIndex].textContent === str.slice(0, str.length - 1)) successCount++;
  text.children[wordIndex].classList.remove("underline");
  wordIndex += 1;
  if (!(wordIndex >= words.length)) text.children[wordIndex].classList.add("underline");
  wordInput.value = "";
  updateWpm();
  updateProgressBar();
}

function updateWpm() {
  wpm.textContent = Math.floor(successCount / elapsedTime * 60);
}

function updateProgressBar() {
  progressBar.value = Math.floor(wordIndex / words.length * 100);
}

function gameEnd() {
  if (timerId) clearInterval(timerId);
  wordInput.setAttribute("readonly", "");
}

function matchWord(str) {
  const currentWordNode = text.children[wordIndex];
  if (currentWordNode.textContent !== str) {
    currentWordNode.classList.remove("green");
    currentWordNode.classList.add("red-background");
  }
  else {
    currentWordNode.classList.remove("red-background");
    currentWordNode.classList.add("green");
  }
}

loadTextData()
  .then(response => response.json())
  .then(json => texts = json)
  .then(() => console.log(texts));

startBtn.addEventListener("click", startGame);
wordInput.addEventListener("input", handleInput);

