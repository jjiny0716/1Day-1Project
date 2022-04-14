import Component from "../core/Component.mjs";
import { numberToNumberHTML } from '../util/block.mjs';

export default class BlockNumber extends Component {
  template() {
    const { number } = this.props;
    return `
    ${numberToNumberHTML(Number(number))}
    `;
  }
}

