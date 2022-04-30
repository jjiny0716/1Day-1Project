import Component from '../core/Component.mjs';

import SelectCard from "./SelectCard.js"

export default class ThisOrThat extends Component {
  template() {
    return `
    <div class="select-card-container" data-component="SelectCard" data-key="0"></div>
    <div class="select-card-container" data-component="SelectCard" data-key="1"></div>
    <div class="or">
      <span>OR</span>
    </div>
    `;
  }

  generateChildComponent(target, name, key) {
    if (name === "SelectCard") {
      return new SelectCard(target, () => {
        const { twoCats, selectCat } = this.props;
        return {
          cat: twoCats[key],
          selectCat,
        }
      });
    }
  }
}