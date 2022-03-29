import Component from "./core/Component.mjs";
import Slider from './components/Slider.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="slider"></div>
    `
  }

  afterMount() {
    this.loadImages("https://source.unsplash.com/collection/1319040", 5).then(images => {
      new Slider(document.querySelector(".slider"), { images })
    });
  }

  async fetchImage(url, images) {
    return fetch(url)
    .then((response) => response.blob())
    .then(blob => {
      images.push(URL.createObjectURL(blob));
    });
  }
  
  async loadImages(unsplashCollectionURL, count) {
    const images = [];
    const requests = [];
    for (let i = 0; i < count ; i++) {
      requests.push(this.fetchImage(`${unsplashCollectionURL}?${i}`, images));
    }
    await Promise.all(requests);
    return images;
  }
}


