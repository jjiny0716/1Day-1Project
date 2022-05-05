import Component from "../Component.js";

export default class FAQ extends Component {
  setup() {
    this.state = {
      active: false,
    }
  }

  template() {
    const { active } = this.state;
    const { title, content } = this.props;

    return `
    <div class="faq-container ${active ? "active" : ""}">
      <h3 class="title">${title}</h3>
      ${active ? `<p class="content">${content}</p>` : ""}
      <button class="faq-toggle-button">${active ? `<i class="fa-solid fa-angle-down"></i>` : `<i class="fa-solid fa-circle-xmark"></i>`}</button>
    </div>
    `;
  }

  setEvents() {
    this.addEventListener("click", ".faq-toggle-button", (e) => {
      console.log(e);
      const { active } = this.state;
      this.setState({ active: !active });
    });
  }
}
