import Component from '../core/Component.mjs';

export default class Users extends Component {
  template() {
    const { filteredUsers } = this.props;
    return `
    <ul class="user-list">
      ${filteredUsers.map(({picture, name, location}) => `
      <li class="user">
        <img class="avatar" src="${picture.large}" alt="${name.first}" />
        <div class="user-info">
          <h4 class="name">${name.first} ${name.last}</h4>
          <p class="location">${location.city}, ${location.country}</p>
        </div>
      </li>
      `).join('')}
    </ul>
    `
  }
}