class UnsplashImageClient {
  #fetchCount;
  constructor() {
    this.#fetchCount = 0;
  }

  async fetchImage(url, width, height) {
    const sig = this.#fetchCount++;
    const imageURL = await fetch(`${url}/${width}x${height}/?sig=${sig}`)
      .then((response) => {
        if (!response.ok) throw new Error("Cannot fetch image from unsplach.com");
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      })
      .catch((e) => {
        console.error(e.message);
        return "";
      });
    return imageURL;
  }
}

export const unsplashImageClient = new UnsplashImageClient();
