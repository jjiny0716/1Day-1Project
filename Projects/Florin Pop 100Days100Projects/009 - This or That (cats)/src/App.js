import Component from "./core/Component.mjs";
import theCatAPIClient from "./client/TheCatAPIClient.js";

import ThisOrThat from "./components/ThisOrThat.js";
import Leaderboard from "./components/Leaderboard.js";

export default class App extends Component {
  setup() {
    this.state = {
      leaderboardData: [],
      twoCats: [],
    };
  }

  template() {
    return `
    <h1 class="title">Which one is your favorite?</h1>
    <div class="this-or-that-container" data-component="ThisOrThat"></div>
    <div class="leaderboard-container" data-component="Leaderboard"></div>
    `;
  }

  generateChildComponent(target, name) {
    const { selectCat } = this;
    switch (name) {
      case "ThisOrThat":
        return new ThisOrThat(target, () => {
          const { twoCats } = this.state;
          return {
            twoCats,
            selectCat: selectCat.bind(this),
          };
        });
      case "Leaderboard":
        return new Leaderboard(target, () => {
          const { leaderboardData } = this.state;
          return {
            leaderboardData,
          };
        });
    }
  }

  afterMount() {
    this.loadTwoCatData();
  }

  async loadTwoCatData() {
    // for loading animation
    this.setState({
      twoCats: [],
    });

    const twoCatsData = await theCatAPIClient.getRandomTwoCats();
    this.setState({
      twoCats: twoCatsData,
    });
  }

  selectCat(cat) {
    this.addCatToLeaderboardData(cat);
    this.loadTwoCatData();
  }

  addCatToLeaderboardData(cat) {
    const { leaderboardData } = this.state;
    let newLeaderboardData = [...leaderboardData];

    // add new item
    const targetItem = newLeaderboardData.find((item) => item.name === cat.name);
    if (targetItem) {
      targetItem.count++;
    } else {
      newLeaderboardData.push({ ...cat, count: 1 });
    }

    // sort items
    newLeaderboardData = newLeaderboardData
      .sort((a, b) => b.count - a.count)
      .map((item, i) => {
        return { ...item, place: i + 1 };
      });

    this.setState({
      leaderboardData: newLeaderboardData,
    });
  }
}
