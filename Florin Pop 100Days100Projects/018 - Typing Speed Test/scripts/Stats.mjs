export default class Stats {
  constructor() {
    this.wpmText = document.querySelector(".wpm .value");
    this.timeText = document.querySelector(".time .value");
    this.accuracyText = document.querySelector(".accuracy .value");
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
}