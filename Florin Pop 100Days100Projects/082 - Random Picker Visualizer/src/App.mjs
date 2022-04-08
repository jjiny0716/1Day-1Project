import Component from './core/Component.mjs';
import RandomPicker from './components/RandomPicker.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="random-picker" data-component-name="RandomPicker" data-key="1"></div>
    `
  }

  generateChildComponent(name) {
    if (name === "RandomPicker") {
      return new RandomPicker(this.target.querySelector(".random-picker"));
    }
  }
}