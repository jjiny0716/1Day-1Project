import Component from "../core/Component.mjs";
import UnsplashImageClient from "../clients/UnsplashImageClient.mjs";

export default class CardContainer extends Component {
  setup() {
    const { imageCount } = this.props;
    this.state = {
      images: new Array(imageCount).fill(""),
      selected: 0,
    };
    this.loadImages(imageCount);
  }

  template() {
    const { images, selected } = this.state;
    return `
    ${images
      .map((image, index) =>
        image
          ? `<div class="card${selected === index ? " active" : ""}" style="background-image: url(${image})"></div>`
          : `<div class="card${selected === index ? " active" : ""} loading"></div>`
      )
      .join("")}
    `;
  }

  setEvents() {
    this.addEventListener("click", ".card-container", this.changeSelectedImage.bind(this));
  }

  loadImages(imageCount) {
    const unsplashImageClient = new UnsplashImageClient();
    for (let i = 0; i < imageCount; i++) {
      unsplashImageClient.fetchImage("https://source.unsplash.com/collection/1319040").then((image) => {
        const { images } = this.state;
        images[i] = image;
        this.setState({ images });
      });
    }
  }

  changeSelectedImage(e) {
    const target = e.target.closest(".card");
    if (!target) return;
    const cards = [...this.target.querySelectorAll(".card")];
    this.setState({ selected: cards.indexOf(target) });
  }
}
