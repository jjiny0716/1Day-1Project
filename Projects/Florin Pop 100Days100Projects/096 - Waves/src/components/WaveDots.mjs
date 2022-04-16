import Component from '../core/Component.mjs';
import { sleep } from "../utils/sleep.mjs"

export default class WaveDots extends Component {
  setup() {
    this.setTargetStyle();
  }

  template() {
    const { rowCount, columnCount } = this.props;
    return `
    ${'<div class="dot"></div>'.repeat(rowCount * columnCount)}
    `;
  }

  setEvents() {
    this.addEventListener("click", ".dot", (e) => {
      if (!e.target.classList.contains("dot")) return;
      this.waveDots(e.target);
    })
  }

  afterMount() {
    const { rowCount, columnCount } = this.props;
    this.dotsGrid = Array.from({length: rowCount}, () => Array.from({length: columnCount}));
    this.target.querySelectorAll(".dot").forEach((dot, i) => {
      const y = Math.floor(i / columnCount);
      const x = i % columnCount;
      this.dotsGrid[y][x] = dot;
    });
  }

  waveDots(target) {
    const { columnCount } = this.props;
      const dotIndex = [...this.target.querySelectorAll(".dot")].findIndex((dot) => target === dot);
      const y = Math.floor(dotIndex / columnCount);
      const x = dotIndex % columnCount;
      this.wave(y, x);
  }

  async wave(y, x) {
    if (y < 0 || x < 0 || y >= this.dotsGrid.length || x >= this.dotsGrid[0].length || this.dotsGrid[y][x].classList.contains("grow")) return;
    this.dotsGrid[y][x].classList.add("grow");
    await sleep(100);
    this.wave(y, x + 1);
    this.wave(y + 1, x);
    this.wave(y, x - 1);
    this.wave(y - 1, x);
    await sleep(100);
    this.dotsGrid[y][x].classList.remove("grow");
  }

  setTargetStyle() {
    const { columnCount } = this.props;
    this.target.style = `grid-template-columns: repeat(${columnCount}, auto);`;
  }
}