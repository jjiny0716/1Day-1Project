import { random } from "./utils.mjs";

export default class TextAreaManager {
  constructor() {
    this.textData = null;
    this.language = null;
    this.textArea = document.querySelector(".text-area");
    this.words = null;
    this.wordIndex = 0;
  }

  setTextData(textData) {
    this.textData = textData;
  }

  setLanguage(language) {
    this.language = language;
  }

  settingRandomText() {
    let index = random(0, this.textData.length);
    if ([...Object.values(this.language)].every((value) => !value)) index = 0;
    else {
      while (!this.language[this.textData[index].type.toLowerCase()]) {
        index = random(0, this.textData.length);
      }
    }
    this.textArea.innerHTML = this.transformWords(this.textData[index].text);
  }

  transformWords(text) {
    this.words = text.split(" ");
    return this.words.map((word) => `<span class="word">${word.split("").map((char) => `<span class="char">${char}</span>`).join('')}</span>`).join(" ");
  }

  isCorrectWord(inputWord) {
    if (this.words[this.wordIndex] === inputWord.slice(0, inputWord.length - 1)) return true;
    return false;
  }

  moveToNextWord(inputWord) {
    this.commit(inputWord.slice(0, inputWord.length - 1));
    this.removeTextUnderline(this.wordIndex);
    this.wordIndex += 1;
    if (!this.isFinished()) this.setTextUnderline(this.wordIndex);
  }

  commit(inputWord) {
    const isSameWord = this.words[this.wordIndex] === inputWord;
    for (let i = 0 ; i < this.words[this.wordIndex].length ; i++) {
      isSameWord ? this.setCharGreen(this.wordIndex, i) : this.setCharRed(this.wordIndex, i);
    }
  }

  matchWord(inputWord) {
    for (let i = 0 ; i < this.words[this.wordIndex].length ; i++) {
      if (inputWord[i] === undefined) this.removeCharEffect(this.wordIndex, i);
      else if (this.words[this.wordIndex][i] !== inputWord[i]) this.setCharRedBackground(this.wordIndex, i);
      else this.setCharGreen(this.wordIndex, i);
    }
  }

  setTextUnderline(index) {
    const wordNode = this.textArea.children[index];
    wordNode.classList.add("underline");
  }

  removeTextUnderline(index) {
    const wordNode = this.textArea.children[index];
    wordNode.classList.remove("underline");
  }

  setCharGreen(wordIndex, charIndex) {
    const charNode = this.textArea.children[wordIndex].children[charIndex];
    this.removeCharEffect(wordIndex, charIndex);
    charNode.classList.add("green");
  }

  setCharRed(wordIndex, charIndex) {
    const charNode = this.textArea.children[wordIndex].children[charIndex];
    this.removeCharEffect(wordIndex, charIndex);
    charNode.classList.add("red");
  }

  setCharRedBackground(wordIndex, charIndex) {
    const charNode = this.textArea.children[wordIndex].children[charIndex];
    this.removeCharEffect(wordIndex, charIndex);
    charNode.classList.add("red-background");
  }

  removeCharEffect(wordIndex, charIndex) {
    const charNode = this.textArea.children[wordIndex].children[charIndex];
    charNode.className = "char";
  }

  isFinished() {
    if (this.wordIndex === this.words.length) return true;
    return false;
  }

  getWordsSize() {
    return this.words.length;
  }

  getCurrentWordIndex() {
    return this.wordIndex;
  }
}
