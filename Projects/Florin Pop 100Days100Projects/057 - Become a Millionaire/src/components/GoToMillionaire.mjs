import Component from '../core/Component.mjs';

export default class GoToMillionaire extends Component {
  template() {
    const { clickCount } = this.props;
    return `
    <h1 class="title">💲 Do you want to become a millionaire? 💲</h1>
    <p class="description">Click this 👇 button <strong>5</strong> times.</p>
    <button class="become-millionaire-btn">Click me</button>
    <p class="count-information">Clicked <strong class="count">${clickCount}</strong> times</p>
    `;
  }

  setEvents() {
    const { addClickCount } = this.props
    this.addEventListener("click", ".become-millionaire-btn", addClickCount);
  }
}