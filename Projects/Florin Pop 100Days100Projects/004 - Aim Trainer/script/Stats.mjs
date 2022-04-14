import {msToReadableTime} from "./util.mjs";

export default class Stats {
  constructor(_target) {
    this.state = {
      "time": 0,
      "hits": 0,
      "missed": 0,
      "speed": 0,
    }
    this.target = _target;
  }

  setState(name, value) {
    this.state[name] = value;
    this.render();
  }

  render() {
    const accuracy = (this.state.hits * 100 / (this.state.missed + this.state.hits)).toFixed(1);
    this.target.innerHTML = `
      <span class="time">Time: <span class="stat-value">${msToReadableTime(this.state.time)}</span></span>
      <span class="hits">Hits: <span class="stat-value">${this.state.hits}</span></span>
      <span class="speed">Speed: <span class="stat-value">${this.state.speed} t/s</span></span>
      <span class="accuracy">Accuracy: <span class="stat-value">${isNaN(accuracy) ? "0.0" : accuracy}%</span></span>
    `
  }
}