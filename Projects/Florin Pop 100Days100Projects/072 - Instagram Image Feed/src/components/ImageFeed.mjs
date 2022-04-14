import Component from '../core/Component.mjs';
import { unsplashImageClient } from '../clients/UnsplashImageClient.mjs';
import { sleep } from '../utils/sleep.mjs';

export default class ImageFeed extends Component {
  setup() {
    this.state = {
      images: [],
    }
    this.loadImages(18);
  }

  template() {
    const { images } = this.state;
    return `
    ${images.map(image => image ? `<img src="${image}" />` : "<div class='loading-image'></div>").join('')}
    `
  }

  setEvents() {
    window.addEventListener("scroll", (e) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const { images } = this.state;

        // if loading 
        // if (images.includes(null)) return;
        this.loadImages(9);
      }
    })
  }

  async loadImages(num) {
    const { images } = this.state;
    const startIndex = images.length;
    for (let i = 0 ; i < num ; i++) {
      // Add skeleton UI
      images.push(null);
    }
    this.setState({ images });
    for (let i = 0 ; i < num ; i++) {
      // loading simulation time
      // await sleep(Math.floor(Math.random() * 250) + 100);

      unsplashImageClient.fetchImage("https://source.unsplash.com/collection/1319040").then((image) => {
        const { images } = this.state;
        images[startIndex + i] = image;
        this.setState({ images });
      });
    }
  }
}