import Component from "./core/Component.mjs"
import Steps from './components/Steps.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="steps-container" data-component-name="Steps" data-key="1"></div>
    `;
  }

  generateChildComponent(name) {
    if (name === "Steps") {
      return new Steps(document.querySelector(".steps-container"), () => {
        return {
          maxStep: 6,
        }
      }); 
    }
  }
}