import Component from '../core/Component.mjs';

export default class Hearts extends Component {
  template() {
    const { heartCount } = this.props;
    return `
    <div class="heart ${heartCount < 1 ? `used` : ``}"><i class="fa-solid fa-heart"></i></div>
    <div class="heart ${heartCount < 2 ? `used` : ``}"><i class="fa-solid fa-heart"></i></div>
    <div class="heart ${heartCount < 3 ? `used` : ``}"><i class="fa-solid fa-heart"></i></div>
    `
  }
}