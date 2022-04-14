import Component from '../core/Component.mjs';

export default class Slider extends Component {
  setup() {
    this.state = { showingImageIndex: 0 };
  }

  template() {
    const { images } = this.props;
    const { showingImageIndex } = this.state; 
    return `
    ${images.map((image, index) => {
      return `
      <div class="slide${showingImageIndex === index ? " show" : ""}">
        <img src=${image}>
      </div>
      `
    }).join('')}
    `
  }

  afterMount() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(this.showNextImage.bind(this), 2000);
  }

  showNextImage() {
    const { images } = this.props;
    const { showingImageIndex } = this.state;
    this.setState({ showingImageIndex: (showingImageIndex + 1) % images.length });
  }

}