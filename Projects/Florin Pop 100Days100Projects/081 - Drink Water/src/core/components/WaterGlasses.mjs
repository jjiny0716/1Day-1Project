import Component from '../Component.mjs';

export default class WaterGlasses extends Component {
  template() {
    const { numOfGlasses, progress, glassSize } = this.props;
    const isFilledArr = Array.from({length: numOfGlasses}, (v, i) => i < progress);
    return `
    ${isFilledArr.map(isFilled => `
    <button class="cup${isFilled ? ' filled' : ''}">
      <p>${glassSize}<br />ml</p>
    </button>
    `).join('')}
    `
  }

  setEvents() {
    const { toggleCups } = this.props;
    this.addEventListener("click", ".cup", (e) => {
      const target = e.target.closest(".cup");
      const selectedIdx = [...this.target.querySelectorAll(".cup")].findIndex((cup) => cup === target);
      toggleCups(selectedIdx);
    });
  }
}
