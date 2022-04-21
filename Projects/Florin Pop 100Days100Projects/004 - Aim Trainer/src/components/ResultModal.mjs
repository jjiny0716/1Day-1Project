import Component from '../core/Component.mjs';
import Stats from './Stats.mjs';

export default class ResultModal extends Component {
  template() {
    return `
    <div class="stats" data-component="Stats"></div>
    <button class="restart-btn">Restart!</button>
    `;
  }

  generateChildComponent(target, name) {
    const { gameResult } = this.props;
    if (name === "Stats") {
      return new Stats(target, () => {
        return {
          stats: gameResult,
        }
      });
    }
  }

  setEvents() {
    const { gameStart } = this.props;
    this.addEventListener("click", ".restart-btn", gameStart);
  }
}