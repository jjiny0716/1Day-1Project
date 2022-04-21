import Component from '../core/Component.mjs';
import {msToReadableTime} from "../utils/time.mjs";

export default class Stats extends Component {
  template() {
    const { time, hits, missed, speed } = this.props.stats;
    const accuracy = (hits * 100 / (missed + hits)).toFixed(1);
    return `
      <span class="time">Time: <span class="stat-value">${msToReadableTime(time)}</span></span>
      <span class="hits">Hits: <span class="stat-value">${hits}</span></span>
      <span class="speed">Speed: <span class="stat-value">${speed} t/s</span></span>
      <span class="accuracy">Accuracy: <span class="stat-value">${isNaN(accuracy) ? "0.0" : accuracy}%</span></span>
    `
  }
}