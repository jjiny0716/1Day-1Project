import Component from '../core/Component.mjs';

export default class MenuBar extends Component {
  setup() {
    this.state = {
      direction: "left",
      xDiff: 0,
    }
  }

  template() {
    const { direction, xDiff } = this.state;
    return `
    <button class="menu left">
      <div class="bar"></div>
      <div class="bar short"></div>
      <div class="bar"></div>
      <div class="bar short"></div>
      <div class="bar"></div>
    </button>
    <div class="menu center">
      <div class="bar"></div>
      <div class="bar short"></div>
      <div class="bar"></div>
      <div class="bar short"></div>
      <div class="bar"></div>
    </div>
    <div class="menu right">
      <div class="bar"></div>
      <div class="bar short"></div>
      <div class="bar"></div>
      <div class="bar short"></div>
      <div class="bar"></div>
    </div>
    <div class="menu ${direction} active" style="transform: translateX(${xDiff}px)">
      <div class="bar"></div>
      <div class="bar short"></div>
      <div class="bar"></div>
      <div class="bar short"></div>
      <div class="bar"></div>
    </div>
    `
  }

  setEvents() {
    const initialX = this.target.querySelector(".left").getBoundingClientRect().x;
    this.addEventListener("click", ".menu", (e) => {
      const target = e.target.closest(".menu");
      if (target.classList.contains("active")) return;
      
      const direction = target.classList[1];
      const xDiff = target.getBoundingClientRect().x - initialX;
      this.setState({ direction, xDiff });
    })
  }
}