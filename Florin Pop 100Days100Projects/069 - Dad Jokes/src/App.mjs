import Component from './core/Component.mjs';
import DadJokes from './components/DadJokes.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="dad-jokes-container" data-component-name="DadJokes" data-key="1"></div>
    `
  }

  generateChildComponent(name) {
    if (name === "DadJokes") {
      return new DadJokes(document.querySelector(".dad-jokes-container"));
    }
  }
}