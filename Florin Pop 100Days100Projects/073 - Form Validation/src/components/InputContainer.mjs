import Component from '../core/Component.mjs';

export default class InputContainer extends Component {
  setup() {
    this.state = {
      state: undefined,
      reason: "",
    }
  }

  template() {
    const { id, label, placeholder } = this.props;
    const { state, reason } = this.state;
    return `
    <label for="${id}">${label}</label>
    <input type="text" class="${state ?? ""}" id="${id}" placeholder="${placeholder}" />
    ${state === "valid" ? '<i class="fa-solid fa-circle-check"></i>' : ""}
    ${state === "invalid" ? '<i class="fa-solid fa-circle-exclamation"></i>' : ""}
    ${reason ? `<small class="reason">${reason}</small>` : ""}
    `
  }

  validation() {
    const { checkFunction } = this.props;
    const reason = checkFunction(this.target.querySelector("input").value);
    const state = reason ? "invalid" : "valid";
    this.setState({ state, reason });
  }
}