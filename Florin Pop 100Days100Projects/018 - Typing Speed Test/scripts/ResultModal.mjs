import {LOCAL_STORAGE_LANGUAGE_KEY} from './constants.mjs';

export default class ResultModal {
  constructor() {
    this.container = document.querySelector(".result-modal-container");
    this.target = document.querySelector(".result-modal");
    this.languageCheckboxes = this.target.querySelector(".language-checkboxes");
    this.languageCheckboxes.addEventListener("input", this.changeSelectedLanguages.bind(this));
    this.wpmText = this.target.querySelector(".wpm .value");
    this.timeText = this.target.querySelector(".time .value");
    this.accuracyText = this.target.querySelector(".accuracy .value");
    this.replayBtn = this.target.querySelector(".replay-btn");
    this.languages = {
      "korean": true, 
      "english": true
    };
    this.restoreLanguageSetting();
  }

  isAllLanguageDisabled() {
    return [...Object.values(this.languages)].every(value => !value);
  }

  changeSelectedLanguages(e) {
    this.languages[e.target.name] = e.target.checked;
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, JSON.stringify(this.languages));
  }

  restoreLanguageSetting() {
    this.languages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY)) || this.languages;
    for (let key of Object.keys(this.languages)) {
      if (!this.languages[key]) this.languageCheckboxes.querySelector(`[name="${key}"]`).checked = false;
    }
  }

  setStats(wpmValue, timeValue, accuracyValue) {
    this.wpmText.textContent = wpmValue;
    this.timeText.textContent = timeValue;
    this.accuracyText.textContent =`${ accuracyValue.toFixed(1)}%`;
  }

  getLanguage() {
    return this.languages;
  }

  show() {
    this.container.classList.add("active");
  }

  hide() {
    this.container.classList.remove("active");
  }

  addReplayBtnClickEventListener(callback) {
    this.replayBtn.addEventListener("click", callback);
  }
}