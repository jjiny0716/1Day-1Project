import Component from "./core/Component.mjs";
import WelcomeModal from "./components/WelcomeModal.mjs";
import Game from "./components/Game.mjs";
import ResultModal from "./components/ResultModal.mjs";
import Leaderboard from "./components/Leaderboard.mjs";

import { appState } from "./constants/appState.mjs";
import { leaderboardStore } from './store/LeaderboardStore.mjs';

export default class App extends Component {
  setup() {
    this.state = {
      currentAppState: appState.MAIN,
      gameResult: {
        time: 0,
        hits: 0,
        missed: 0,
        speed: 0,
      },
      leaderboardData: leaderboardStore.getLeaderboardData() ?? [],
    };
  }

  template() {
    const { currentAppState } = this.state;
    return `
    <header class="header">
      <h1 class="title">Aim Trainer</h1>
    </header>
    <main class="main">
      ${currentAppState === appState.MAIN ? `<div class="welcome-modal" data-component="WelcomeModal"></div>` : ""}
      ${currentAppState === appState.GAME ? `<div class="game" data-component="Game"></div>` : ""}
      ${currentAppState === appState.RESULT ? `<div class="result-modal" data-component="ResultModal"></div>` : ""}
    </main>
    <div class="leaderboard" data-component="Leaderboard"></div>
    `;
  }

  generateChildComponent(target, name) {
    const { gameStart, showResult } = this;
    const { gameResult } = this.state;
    if (name === "WelcomeModal") {
      return new WelcomeModal(target, () => {
        return {
          gameStart: gameStart.bind(this),
        };
      });
    } else if (name === "Game") {
      return new Game(target, () => {
        return {
          showResult: showResult.bind(this),
        };
      });
    } else if (name === "ResultModal") {
      return new ResultModal(target, () => {
        return {
          gameResult,
          gameStart: gameStart.bind(this),
        };
      });
    } else if (name === "Leaderboard") {
      const { leaderboardData } = this.state;
      return new Leaderboard(target, () => {
        return {
          data: leaderboardData,
        };
      });
    }
  }

  gameStart() {
    this.setState({ currentAppState: appState.GAME });
  }

  showResult(result) {
    this.setState({
      currentAppState: appState.RESULT,
      gameResult: result,
    });
    this.updateLeaderboardData(result);
  }

  updateLeaderboardData(data) {
    console.log(data);
    const { time, hits, missed } = data;
    const { leaderboardData } = this.state;
    const newData = {
      time,
      hits,
      missed,
    };
    leaderboardData.push(newData);
    leaderboardData.sort((a, b) => (a.time === b.time ? b.hits / b.missed - a.hits / a.missed : b.time - a.time));
    if (leaderboardData.length > 3) leaderboardData.pop();
    console.log(leaderboardData);
    this.setState({ leaderboardData });
    leaderboardStore.storeLeaderboardData(leaderboardData);
  }
}
