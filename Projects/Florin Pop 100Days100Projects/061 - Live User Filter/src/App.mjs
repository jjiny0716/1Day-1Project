import Component from './core/Component.mjs';
import LiveUserFilter from './components/LiveUserFilter.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="live-user-filter" data-component-name="LiveUserFilter" data-key="1"></div>
    `;
  }

  generateChildComponent(name) {
    if (name === "LiveUserFilter") {
      return new LiveUserFilter(this.target.querySelector(".live-user-filter"), () => {});
    }
  }
}