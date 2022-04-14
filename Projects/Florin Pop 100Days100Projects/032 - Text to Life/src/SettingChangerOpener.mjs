export default class SettingChangerOpener {
  constructor(target) {
    this.target = target;
  }

  addClickEventListener(handler) {
    this.target.addEventListener("click", handler);
  }

  show() {
    this.target.style.display = "block";
  }

  hide() {
    this.target.style.display = "none";
  }
}