export default class ThemeToggleBtn {
  constructor(target) {
    this.target = target;
    this.render();
    this.setEvents();
  }

  render() {
    this.target.innerHTML = `
    <i class="fa-solid fa-moon"></i>
    <i class="fa-solid fa-sun"></i>
    <div class="circle"></div>
    `;
  }

  setEvents() {
    this.target.addEventListener("click", (e) => {
      const btn = e.target.closest(".theme-toggle-btn");
      if (!btn) return;

      const root = document.documentElement;
      if (root.getAttribute("color-theme") === "light") {
        root.setAttribute("color-theme", "dark");
        btn.classList.add("dark");
        btn.classList.remove("light");
      } else {
        root.setAttribute("color-theme", "light");
        btn.classList.add("light");
        btn.classList.remove("dark");
      }
    });
  }
}
