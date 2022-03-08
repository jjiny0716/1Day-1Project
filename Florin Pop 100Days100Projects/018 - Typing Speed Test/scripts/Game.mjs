import Stats from './Stats.mjs';
import ProgressBar from './ProgressBar.mjs';
import TextAreaManager from './TextAreaManager.mjs';
import WordInput from './WordInput.mjs';

export default class Game {
  constructor() {
    this.stats = new Stats();
    this.progressBar = new ProgressBar();
    this.textAreaManager = new TextAreaManager();
    this.wordInput = new WordInput();
    this.wordInput.setInputEventListener(this.handleInput.bind(this));
    this.gameContainer = document.querySelector(".game-container");
    this.successCount = 0;
    this.elapsedTime = 0; // second
    this.timerId = null;
  }

  setTextData(textData) {
    this.textAreaManager.setTextData(textData);
  }

  setLanguage(language) {
    this.textAreaManager.setLanguage(language);
  }

  isReady() {
    if (this.textAreaManager.textData) return true;
    return false;
  }

  start() {
    this.gameContainer.classList.remove("invisible");
    this.textAreaManager.settingRandomText();
    this.textAreaManager.setTextUnderline(0);
    this.game();
  }

  game() {
    this.timerId = setInterval(this.updateElapsedTime.bind(this), 1000);
  }

  updateElapsedTime() {
    this.elapsedTime++;
    this.stats.setTimeValue(this.elapsedTime);
    this.stats.setWpmValue(Math.floor((this.successCount / this.elapsedTime) * 60));
  }

  handleInput(e) {
    if (e.data === ' ') {
      if (this.textAreaManager.isCorrectWord(e.target.value)) this.successCount++;
      this.textAreaManager.moveToNextWord();
      this.wordInput.clear();
      this.stats.setWpmValue(Math.floor((this.successCount / this.elapsedTime) * 60));
      this.stats.setAccuracyValue(this.successCount / this.textAreaManager.getCurrentWordIndex() * 100);
      this.progressBar.setProgressValue(Math.floor((this.textAreaManager.getCurrentWordIndex() / this.textAreaManager.getWordsSize()) * 100));
      if (this.textAreaManager.isFinished()) this.gameEnd();
    } 
    else this.textAreaManager.matchWord(e.target.value);
  }

  gameEnd() {
    if (this.timerId) clearInterval(this.timerId);
    this.wordInput.disable();
  }
}