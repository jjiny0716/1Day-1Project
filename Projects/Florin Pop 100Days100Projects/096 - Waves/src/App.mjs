import Component from './core/Component.mjs';
import WaveDots from './components/WaveDots.mjs';

export default class App extends Component {
  template() {  
    return `
    <h2 class="description">Click a dot</h2>
    <div class="wave-dots-container" data-component="WaveDots"></div>
    `;
  }

  generateChildComponent(target, name, key) {
    if (name === "WaveDots") {
      return new WaveDots(target, () => {
        return {
          rowCount: 15,
          columnCount: 15,
        }
      })
    }
  }
}