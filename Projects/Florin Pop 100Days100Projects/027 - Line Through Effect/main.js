const sentence = document.querySelector(".sentence");

function maketextContentToLetters(target) {
  target.innerHTML = target.textContent.split('').map(letter => `<span class="letter">${letter}</span>`).join('');
}

function setRandomZIndexOfLetters(target) {
  for (let letter of target.children) {
    letter.style.zIndex = Math.random() < 0.5 ? 0 : 2;
  }
}

maketextContentToLetters(sentence);
setRandomZIndexOfLetters(sentence);
