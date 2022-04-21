import Component from '../core/Component.mjs';

export default class WelcomeModal extends Component {
  template() {
    return `
    <h2>Welcome to Aim Trainer.</h2>
    <button class="start-btn">Start!</button>
    `;
  }

  setEvents() {
    const { gameStart } = this.props;
    this.addEventListener("click", ".start-btn", gameStart);
  }
}