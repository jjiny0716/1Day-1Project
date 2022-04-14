import Component from "./core/Component.mjs"
import LoginForm from './components/LoginForm.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="login-container" data-component-name="LoginForm" data-key="1"></div>
    `;
  }

  generateChildComponent(name) {
    if (name === "LoginForm") {
      return new LoginForm(document.querySelector(".login-container"));
    }
  }
}