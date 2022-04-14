import Component from "./core/Component.mjs";
import CardContainer from "./components/CardContainer.mjs";

export default class App extends Component {
  template() {
    return `
    <div class="card-container" data-component-name="CardContainer" data-key="1"></>
    `;
  }

  generateChildComponent(name) {
    if (name === "CardContainer") {
      return new CardContainer(this.target.querySelector(".card-container"), () => {
        return {
          imageCount: 5,
        };
      });
    }
  }
}

