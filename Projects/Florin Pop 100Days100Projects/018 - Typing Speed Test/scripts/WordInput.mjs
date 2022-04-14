export default class WordInput {
  constructor() {
    this.target = document.querySelector(".word-input");
  }

  setInputEventListener(callback) {
    this.target.addEventListener("input", callback);
  }

  focus() {
    this.target.focus();
  }

  clear() {
    this.target.value = "";
  }

  disable() {
    this.target.setAttribute("readonly", "");
  }

  active() {
    this.target.removeAttribute("readonly");
  }
}