import Stats from './Stats.mjs';
import ProgressBar from './ProgressBar.mjs';
import TextAreaManager from './TextAreaManager.mjs';
import WordInput from './WordInput.mjs';
import ResultModal from './ResultModal.mjs';

export default class Game {
  constructor() {
    this.stats = new Stats();
    this.progressBar = new ProgressBar();
    this.textAreaManager = new TextAreaManager();
    this.wordInput = new WordInput();
    this.resultModal = new ResultModal();
    this.resultModal.addReplayBtnClickEventListener(this.start.bind(this));
    this.wordInput.setInputEventListener(this.handleInput.bind(this));
    this.gameContainer = document.querySelector(".game-container");
    this.firstKeyInputFunc = this.onFirstKeyInput.bind(this);
    this.elapsedTime = 0; // second
    this.timerId = null;
    this.successCount = 0;
    this.isReplay = false;
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
    if (this.isReplay) this.initForReplay();
    this.gameContainer.classList.remove("invisible");
    this.textAreaManager.settingRandomText();
    this.textAreaManager.setTextUnderline(0);
    this.gameContainer.addEventListener("keydown", this.firstKeyInputFunc);
    this.wordInput.focus();
  }

  initForReplay() {
    this.elapsedTime = 0; // second
    this.timerId = null;
    this.successCount = 0;
    this.stats.clear();
    this.progressBar.setProgressValue(0);
    this.setLanguage(this.resultModal.getLanguage());
    this.textAreaManager.init();
    this.wordInput.active();
    this.resultModal.hide();
  }

  onFirstKeyInput(e) {
    this.timerId = setInterval(this.updateElapsedTime.bind(this), 1000);
    this.gameContainer.removeEventListener("keydown", this.firstKeyInputFunc);
  }

  updateElapsedTime() {
    this.elapsedTime++;
    this.stats.setTimeValue(this.elapsedTime);
    this.stats.setWpmValue(Math.floor((this.successCount / this.elapsedTime) * 60));
  }

  handleInput(e) {
    if (e.data === ' ') {
      if (this.textAreaManager.isCorrectWord(e.target.value)) this.successCount++;
      this.textAreaManager.moveToNextWord(e.target.value);
      this.wordInput.clear();
      this.stats.setWpmValue(Math.floor((this.successCount / this.elapsedTime) * 60));
      this.stats.setAccuracyValue(this.successCount / this.textAreaManager.getCurrentWordIndex() * 100);
      this.progressBar.setProgressValue(Math.floor((this.textAreaManager.getCurrentWordIndex() / this.textAreaManager.getWordsSize()) * 100));
      if (this.textAreaManager.isFinished()) this.stop();
    } 
    else this.textAreaManager.matchWord(e.target.value);
  }

  stop() {
    if (this.timerId) clearInterval(this.timerId);
    this.wordInput.disable();
    this.resultModal.setStats(Math.floor((this.successCount / this.elapsedTime) * 60), this.elapsedTime, this.successCount / this.textAreaManager.getCurrentWordIndex() * 100);
    this.resultModal.show();
    this.isReplay = true;
  }
}
