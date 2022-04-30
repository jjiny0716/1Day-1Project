const THE_CAT_API_ENDPOINT = "https://api.thecatapi.com/v1"

class TheCatAPIClient {
  constructor() {
    this.breeds = null;
  }

  async loadBreeds() {
    const response = await fetch(`${THE_CAT_API_ENDPOINT}/breeds`);
    this.breeds = (await response.json()).map(({ id, name, image }) => {
      return {
        id,
        name,
        image,
      };
    });
    console.log("Loaded all breeds", this.breeds);
  }

  async getRandomCat() {
    const { breedID } = this.getRandomCategory();
    const response = await fetch(`${THE_CAT_API_ENDPOINT}/images/search?breed_id=${breedID}`);
    const { breeds: { name }, id, url } = await response.json();
    return {
      name,
      id,
      url,
    }
  }

  async getCatByID(breedID) {
    const response = await fetch(`${THE_CAT_API_ENDPOINT}/images/search?breed_id=${breedID}`);
    const { breeds, id, url } = (await response.json())[0];
    return {
      name: breeds[0].name,
      id,
      url,
    }
  }

  async getRandomTwoCats() {
    const { id: id1 } = await this.getRandomCategory();
    const { id: id2 } = await this.getRandomCategory(id1);

    const res = await Promise.all([this.getCatByID(id1), this.getCatByID(id2)]);
    return res.flat();
  }

  async getRandomCategory(exceptBreedId = -1) {
    if (this.breeds === null) await this.loadBreeds();

    const n = this.breeds.length;
    const i = ~~(Math.random() * n);

    if (exceptBreedId === this.breeds[i].id) return this.getRandomCategory(exceptBreedId);
    return this.breeds[i];
  }
}

const theCatAPIClient = new TheCatAPIClient();
export default theCatAPIClient;
