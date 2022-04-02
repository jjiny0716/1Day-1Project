import Component from '../core/Component.mjs';

export default class UserFilter extends Component {
  template() {
    return `
    <h2 class="title">Live user filter</h2>
    <p class="desc">Search by name and/or location</p>
    <input class="filterInput" type="text" placeholder="Search" />
    `;
  }

  setEvents() {
    const { setFilterStr } = this.props;
    this.addEventListener("input", ".filterInput", (e) => {
      setFilterStr(e.target.value);
    });
  }
}