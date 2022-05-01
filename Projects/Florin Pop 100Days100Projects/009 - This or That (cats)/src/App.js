import Component from "./core/Component.mjs";
import theCatAPIClient from "./client/TheCatAPIClient.js";

import ThisOrThat from "./components/ThisOrThat.js";
import Leaderboard from "./components/Leaderboard.js";

import { addCatToRanking, getCatRanking } from "./utils/firebase.js";

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

  async afterMount() {
    this.loadTwoCatData();
    this.loadLeaderboardData();
  }

  async loadLeaderboardData() {
    const leaderboardData = await getCatRanking();
    this.setState({ leaderboardData });
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
    this.addCatAndUpdateLeaderboard(cat);
    this.loadTwoCatData();
  }

  async addCatAndUpdateLeaderboard(cat) {
    const newLeaderboardData = await addCatToRanking(cat);
    this.setState({
      leaderboardData: newLeaderboardData,
    });
  }
}
