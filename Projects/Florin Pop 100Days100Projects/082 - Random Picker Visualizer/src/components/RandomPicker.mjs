import Component from '../core/Component.mjs';
import { sleep } from '../utils/sleep.mjs';

export default class RandomPicker extends Component {
  setup() {
    this.state = {
      choices: [],
      selected: -1,
    };
  }

  template() {
    const { choices, selected } = this.state;
    return `
    <p class="description">
      Enter all of the choices divided by a comma (',').<br />
      Press enter when you're done.
    </p>
    <textarea class="choice-input" name="choice-input" cols="30" rows="5"></textarea>
    <div class="choice-container">
      ${choices.map((choice, i) => `<span class="choice${selected === i ? ' selected' : ''}">${choice}</span>`).join('')}
    </div>
    `
  }

  setEvents() {
    this.addEventListener("input", ".choice-input", (e) => {
      this.setState({ choices: e.target.value.split(',').filter(choice => choice), selected: -1 });
    });
    this.addEventListener("keydown", ".choice-input", (e) => {
      if (e.key !== "Enter") return;
      this.selectWithVisualization();
      setTimeout((e) => e.target.value = "", 0, e);
    });
  }

  async selectWithVisualization() {
    const { choices } = this.state;
    const n = choices.length;
    for (let i = 0 ; i < 40 ; i++) {
      await sleep(100);
      this.setState({ selected: Math.floor(Math.random() * n) });
    }
  }
}