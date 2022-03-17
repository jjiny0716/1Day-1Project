export default class SettingChanger {
  constructor(target) {
    this.target = target;
    this.closeBtn = target.querySelector(".exit-setting-btn");
    this.closeBtn.addEventListener("click", this.hide.bind(this));
  }

  show() {
    this.target.style.display = "flex";
  }

  hide(e) {
    e && e.preventDefault();
    this.target.style.display = "none";
  }

  addSubmitEventListener(handler) {
    this.target.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(e);
    }); 
  }
}