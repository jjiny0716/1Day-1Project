export default class UnsplashImageClient {
  #fetchCount;
  constructor() {
    this.#fetchCount = 0;
  }

  async fetchImage(url) {
    const imageURL = fetch(`${url}/3840x2160/?sig=${this.#fetchCount++}`)
    .then((response) => response.blob())
    .then(blob => {
      return URL.createObjectURL(blob);
    });
    return imageURL;
  }
}
