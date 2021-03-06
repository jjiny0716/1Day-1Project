import Component from '../core/Component.mjs';
import DadJokesClient from '../clients/DadJokesClient.mjs';

export default class DadJokes extends Component {
  setup() {
    this.dadJokesClient = new DadJokesClient(); 
    this.state = {
      joke: "",
    }
    this.loadJoke();
  }

  async loadJoke() {
    const { joke } = await this.dadJokesClient.getDadJoke();
    this.setState({ joke });
  }

  template() {
    const { joke } = this.state;
    return `
    <h1 class="title">ππππππππDon't laugh challengeπππππ€©π€ππ</h1>
    <p class="joke">${joke}</p>
    <button class="get-joke-btn">πGet Another Jokeπ</button>
    `
  }

  setEvents() {
    this.addEventListener("click", ".get-joke-btn", this.loadJoke.bind(this));
  }
}