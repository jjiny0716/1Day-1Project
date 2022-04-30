import Component from "../core/Component.mjs";

export default class LeaderboardItem extends Component {
  template() {
    const { item } = this.props;
    const { place, url, name, count } = item;
    return `
    <div class="place">${place <= 3 ? `<i class="fa-solid fa-medal place${place}"></i>` : place}</div>
    <img src="${url}" alt="${name}" />
    <p class="name">${name}</p>
    <p class="count">${count}</p>`;
  }
}
