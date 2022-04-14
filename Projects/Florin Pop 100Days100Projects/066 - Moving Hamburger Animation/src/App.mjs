import Component from './core/Component.mjs';
import MenuBar from './components/MenuBar.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="menu-bar" data-component-name="MenuBar" data-key="1"></div>
    `
  }

  generateChildComponent(name) {
    if (name === "MenuBar") {
      return new MenuBar(document.querySelector(".menu-bar"));
    }
  }
}