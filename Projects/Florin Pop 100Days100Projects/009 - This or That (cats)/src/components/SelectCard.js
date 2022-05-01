import Component from "../core/Component.mjs";

export default class SelectCard extends Component {
  template() {
    const { cat } = this.props;
    const { url, name } = cat ?? {};
    return `
    <div class="img-container">
      ${cat ? `<img src="${url}" alt="${name}"/>` : `<div class="loading-animation-background"></div>`}
    </div>
    ${cat ? `<p class="name">${name}</p>` : `<div class="loading-animation-background text"></div>`}
    <button class="select-button" ${cat ? "" : "disabled"}>${"This"}</button>
    `;
  }

  setEvents() {
    this.addEventListener("click", ".select-button", () => {
      const { cat, selectCat } = this.props;
      selectCat(cat);
    });
  }
}
