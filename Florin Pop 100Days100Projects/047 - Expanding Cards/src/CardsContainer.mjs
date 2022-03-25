export default class CardsContainer {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvents();
  }

  setup() {
    this.state = { selected: 0 }
  }

  render() {
    const { images } = this.props;
    const { selected } = this.state;
    this.target.innerHTML = `
    <div class="cards-container">
      ${images.map((image, index) => `<div class="${["card", selected === index && "active"].join(' ')}" : ""}" style="background-image: url(${image})"></div>`).join('')}
    </div>
    `
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  setEvents() {
    this.target.addEventListener("click", this.changeSelectedImage.bind(this)); 
  }

  changeSelectedImage(e) {
    const target = e.target.closest(".card");
    if (!target) return;
    const cards = [...this.target.querySelectorAll(".card")];
    this.setState({ selected: cards.indexOf(target) });
    // cards.forEach(card => card.classList.remove("active"));
    // target.classList.add("active");
  }
}