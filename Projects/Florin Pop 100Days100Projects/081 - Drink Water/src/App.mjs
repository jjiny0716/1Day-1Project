import Component from "./core/Component.mjs";
import DrinkWater from './core/components/DrinkWater.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="drink-water" data-component-name="DrinkWater" data-key="1"></div>
    `;
  }

  generateChildComponent(name) {
    if (name === "DrinkWater") {
      return new DrinkWater(document.querySelector(".drink-water"), () => {
        return {
          goal: 2000,
          numOfGlasses: 8,
        }
      });
    }
  }
}
