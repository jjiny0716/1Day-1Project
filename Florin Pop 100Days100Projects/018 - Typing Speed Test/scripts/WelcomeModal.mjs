export default class WelcomeModal {
  constructor() {
    this.target = document.querySelector(".welcome-modal");
    this.languageCheckboxes = document.querySelector(".language-checkboxes");
    this.startBtn = document.querySelector(".start-btn");
    this.languages = {
      "korean": true, 
      "english": true
    };
    this.languageCheckboxes.addEventListener("input", this.changeSelectedLanguages.bind(this));
  }

  changeSelectedLanguages(e) {
    this.languages[e.target.name] = e.target.checked;
  }

  show() {
    this.target.classList.remove("invisible");
  }

  hide() {
    this.target.classList.add("invisible");
  }

  getLanguage() {
    return this.languages;
  }

  addStartGameBtnClickEventListener(callback) {
    this.startBtn.addEventListener("click", callback);
  }
}