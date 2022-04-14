import Component from '../core/Component.mjs';

export default class Card extends Component {
  template() {
    return `
    <div class="inner-card">Top</div>
    <div class="inner-card">Right</div>
    <div class="inner-card">Bottom</div>
    <div class="inner-card">Left</div>
    `
  }
}