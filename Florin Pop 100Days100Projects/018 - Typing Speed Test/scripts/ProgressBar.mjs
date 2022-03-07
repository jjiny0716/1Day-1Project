export default class ProgressBar {
  constructor() {
    this.target = document.querySelector(".progress");
  }

  setProgressValue(value) {
    this.target.value = value;
  }
}