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
    <h1 class="title">😁😀😄😆😍😎😋😉Don't laugh challenge😁😀😄😊🤩🤗😝😜</h1>
    <p class="joke">${joke}</p>
    <button class="get-joke-btn">😁Get Another Joke😎</button>
    `
  }

  setEvents() {
    this.addEventListener("click", ".get-joke-btn", this.loadJoke.bind(this));
  }
}