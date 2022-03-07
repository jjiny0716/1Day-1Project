import {random} from './utils.mjs';

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
    if ([...Object.values(this.language)].every(value => !value)) index = 0;
    else {
      while (!this.language[this.textData[index].type.toLowerCase()]) {
        index = random(0, this.textData.length);
      }
    }
    this.textArea.innerHTML = this.transformWords(this.textData[index].text);
  }

  transformWords(text) {
    this.words = text.split(' ');
    return this.words.map((word) => `<span class="word">${word}</span>`).join(' ');
  }

  isCorrectWord(inputWord) {
    if (this.words[this.wordIndex] === inputWord.slice(0, inputWord.length - 1)) return true;
    return false;
  }

  moveToNextWord() {
    this.removeTextUnderline(this.wordIndex);
    this.wordIndex += 1;
    if (!this.isFinished()) this.setTextUnderline(this.wordIndex);
  }

  matchWord(inputWord) {
    if (this.words[this.wordIndex] !== inputWord) this.setTextRedBackground(this.wordIndex);
    else this.setTextGreen(this.wordIndex);
  }

  setTextUnderline(index) {
    const wordNode = this.textArea.children[index];
    wordNode.classList.add("underline");
  }

  removeTextUnderline(index) {
    const wordNode = this.textArea.children[index];
    wordNode.classList.remove("underline");
  }

  setTextGreen(index) {
    const wordNode = this.textArea.children[index];
    wordNode.classList.remove("red-background");
    wordNode.classList.add("green");
  }

  setTextRedBackground(index) {
    const wordNode = this.textArea.children[index];
    wordNode.classList.remove("green");
    wordNode.classList.add("red-background");
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