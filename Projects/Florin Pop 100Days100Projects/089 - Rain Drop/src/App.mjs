import Component from "./core/Component.mjs";
import RainDropGenerator from './components/RainDropGenerator.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="rain-drop-container" data-component="RainDropGenerator"></div>
    `;
  }

  generateChildComponent(target, name) {
    if (name === "RainDropGenerator") {
      return new RainDropGenerator(target);
    }
  }
}
