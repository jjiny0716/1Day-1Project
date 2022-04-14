import Component from "./core/Component.mjs";
import GoToMillionaire from "./components/GoToMillionaire.mjs";
import Millionaire from "./components/Millionaire.mjs";

export default class App extends Component {
  setup() {
    this.state = {
      clickCount: 0,
      completed: false,
    };
  }

  template() {
    const { completed } = this.state;
    return `
    ${
      completed
        ? `<div class="millionaire" data-component-name="Millionaire" data-key="2"></div>`
        : `<div class="gotoMillionaire" data-component-name="GoToMillionaire" data-key="1"></div>`
    }
    `;
  }

  generateChildComponent(name) {
    if (name === "GoToMillionaire") {
      return new GoToMillionaire(this.target.querySelector(".gotoMillionaire"), () => {
        const { clickCount } = this.state;
        return {
          clickCount,
          addClickCount: this.addClickCount.bind(this),
        };
      });
    }
    if (name === "Millionaire") {
      return new Millionaire(this.target.querySelector(".millionaire"), () => {});
    }
  }

  addClickCount() {
    let { clickCount, completed } = this.state;
    clickCount++;
    if (clickCount >= 5) completed = true;
    this.setState({ clickCount, completed });
  }
}
