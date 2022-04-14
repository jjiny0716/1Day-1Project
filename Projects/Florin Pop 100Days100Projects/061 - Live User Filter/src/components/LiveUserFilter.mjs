import Component from "../core/Component.mjs";
import RandomUserClient from "../clients/RandomUserClient.mjs";
import UserFilter from "./UserFilter.mjs";
import Users from "./Users.mjs";

export default class LiveUserFilter extends Component {
  setup() {
    this.state = {
      filterStr: "",
      users: null,
    };
    this.loadUsers(50);
  }

  template() {
    return `
    <header class="user-filter" data-component-name="UserFilter" data-key="1"></header>
    <main class="users" data-component-name="Items" data-key="2"></main>
    `;
  }

  generateChildComponent(name) {
    const { setFilterStr } = this;
    if (name === "UserFilter") {
      return new UserFilter(this.target.querySelector(".user-filter"), () => {
        return {
          setFilterStr: setFilterStr.bind(this),
        };
      });
    } else if (name === "Items") {
      return new Users(this.target.querySelector(".users"), () => {
        return {
          filteredUsers: this.getFilteredUsers(),
        };
      });
    }
  }

  async loadUsers(userNumber) {
    const randomUserClient = new RandomUserClient();
    const users = await randomUserClient.request({
      results: userNumber,
      inc: ["name", "location", "picture"],
      // nat: "gb, fr, us, br, es, dk",
    });

    this.setState({ users });
  }

  setFilterStr(str) {
    this.setState({ filterStr: str.toLowerCase() });
  }

  getFilteredUsers() {
    const { filterStr, users } = this.state;
    if (!users) return [];

    const filteredUsers = users.reduce((arr, user) => {
      const { name, location } = user;
      if (`${name.first} ${name.last}`.toLowerCase().includes(filterStr) || `${location.city}, ${location.country}`.toLowerCase().includes(filterStr))
        arr.push(user);
      return arr;
    }, []);

    return filteredUsers;
  }
}
