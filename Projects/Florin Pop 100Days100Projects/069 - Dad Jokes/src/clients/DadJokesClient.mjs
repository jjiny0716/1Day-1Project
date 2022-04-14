export default class DadJokesClient {
  #url;
  constructor() {
    this.#url = "https://icanhazdadjoke.com/";
  }

  async getDadJoke() {
    try {
      const response = await fetch(this.#url, {
        headers: {
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch {
      alert("Error!");
    }
    return { joke: "Where is my dad..." };
  }
}
