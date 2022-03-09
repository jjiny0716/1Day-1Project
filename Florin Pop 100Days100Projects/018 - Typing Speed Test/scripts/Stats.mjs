export default class Stats {
  constructor() {
    this.target = document.querySelector(".game-container .stats");
    this.wpmText = this.target.querySelector(".wpm .value");
    this.timeText = this.target.querySelector(".time .value");
    this.accuracyText = this.target.querySelector(".accuracy .value");
  }

  setWpmValue(value) {
    this.wpmText.textContent = value;
  }

  setTimeValue(value) {
    this.timeText.textContent = value;
  }

  setAccuracyValue(value) {
    this.accuracyText.textContent =`${ value.toFixed(1)}%`;
  }

  clear() {
    this.wpmText.textContent = this.timeText.textContent = this.accuracyText.textContent = 0;
  }
}