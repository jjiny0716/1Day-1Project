import Component from "../core/Component.mjs";
import InputContainer from './InputContainer.mjs';
import { isValidEmail } from "../utils/valueCheck.mjs";

export default class LoginForm extends Component {
  template() {
    return `
    <header class="header">
      <h1 class="title">Create Account</h1>
    </header>
    <form class="login-form">
      <fieldset class="inputs">
      <div class="input-container" data-component-name="usernameInputContainer" data-key="1"></div>
      <div class="input-container" data-component-name="emailInputContainer" data-key="2"></div>
      <div class="input-container" data-component-name="passwordInputContainer" data-key="3"></div>
      <div class="input-container" data-component-name="passwordCheckInputContainer" data-key="4"></div>
      </fieldset>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
    `;
  }

  generateChildComponent(name) {
    if (name === "usernameInputContainer") {
      return new InputContainer(document.querySelector(`[data-component-name="${name}"]`), () => {
        return {
          id: "username",
          label: "Username",
          placeholder: "jjiny",
          checkFunction: this.usernameCheck.bind(this),
        }
      });
    } else if (name === "emailInputContainer") {
      return new InputContainer(document.querySelector(`[data-component-name="${name}"]`), () => {
        return {
          id: "email",
          label: "Email",
          placeholder: "jjiny@jjiny.com",
          checkFunction: this.emailCheck.bind(this),
        }
      });
    } else if (name === "passwordInputContainer") {
      return new InputContainer(document.querySelector(`[data-component-name="${name}"]`), () => {
        return {
          id: "password",
          label: "Password",
          placeholder: "password",
          checkFunction: this.passwordCheck.bind(this),
        }
      });
    } else if (name === "passwordCheckInputContainer") {
      return new InputContainer(document.querySelector(`[data-component-name="${name}"]`), () => {
        return {
          id: "password-check",
          label: "Password check",
          placeholder: "password2",
          checkFunction: this.passwordCheckCheck.bind(this),
        }
      });
    }
  }

  setEvents() {
    this.addEventListener("submit", ".login-form", (e) => {
      e.preventDefault();
      Object.values(this.childComponents).forEach(input => {input.validation()});
    });
  }

  usernameCheck(str) {
    if (!str) return "Username cannot be blank";
    return "";
  }

  emailCheck(str) {
    if (!str) return "Email cannot be blank";
    if (!isValidEmail(str)) return "Not a valid email";
    return "";
  }

  passwordCheck(str) {
    if (!str) return "Password cannot be blank";
    return "";
  }

  passwordCheckCheck(str) {
    if (!str) return "Password Check cannot be blank";
    return "";
  }
}