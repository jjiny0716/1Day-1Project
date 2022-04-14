import Component from './core/Component.mjs';
import Card from './components/Card.mjs';

export default class App extends Component {
  template() {
    return `
    <h1 class="title">CSS only direction aware hover effect</h1>
    <div class="card-container">
      <div class="card" data-component-name="Card" data-key="1"></div>
      <div class="card" data-component-name="Card" data-key="2"></div>
      <div class="card" data-component-name="Card" data-key="3"></div>
      <div class="card" data-component-name="Card" data-key="4"></div>
    </div>
    `
  }

  generateChildComponent(name, key) {
    if (name === "Card") {
      return new Card(this.target.querySelector(`[data-key="${key}"]`), () => {}); 
    }
  }
}