export default class Stats {
  constructor(_target) {
    this.state = {
      "heartCount": 3
    }
    this.target = _target;
  }

  setState(name, value) {
    this.state[name] = value;
    this.render();
  }

  render() {
    this.target.innerHTML = `
    <div class="heart ${this.state.heartCount < 1 ? `used` : ``}"><i class="fa-solid fa-heart"></i></div>
    <div class="heart ${this.state.heartCount < 2 ? `used` : ``}"><i class="fa-solid fa-heart"></i></div>
    <div class="heart ${this.state.heartCount < 3 ? `used` : ``}"><i class="fa-solid fa-heart"></i></div>
    `
  }
}