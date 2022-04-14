import Component from './core/Component.mjs';
import ImageFeed from './components/ImageFeed.mjs';

export default class App extends Component {
  template() {
    return `
    <h1 class="title">Instagram Image Feed + Infinite Scroll</h1>
    <p class="description">(It's also respnsive 😉)</p>
    <div class="image-feed" data-component-name="ImageFeed" data-key="1"></div>
    `
  }

  generateChildComponent(name) {
    if (name === "ImageFeed") {
      return new ImageFeed(this.target.querySelector(".image-feed"));
    }
  }
}