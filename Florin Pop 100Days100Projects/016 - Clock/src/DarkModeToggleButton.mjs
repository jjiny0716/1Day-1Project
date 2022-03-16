export default class DarkModeToggleButton {
  constructor(target) {
    this.target = target;
    this.target.addEventListener("click", this.toggleDarkMode.bind(this));
  }

  toggleDarkMode() {
    const root = document.documentElement;
    if (root.getAttribute("color-theme") === "light") {
      root.setAttribute("color-theme", "dark");
      this.target.textContent = "Dark mode";
    }
    else {
      root.setAttribute("color-theme", "light");
      this.target.textContent = "Light mode";
    }
  }
}
