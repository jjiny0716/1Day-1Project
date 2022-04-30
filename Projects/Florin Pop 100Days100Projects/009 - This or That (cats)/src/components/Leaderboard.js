import Component from '../core/Component.mjs';

import LeaderboardItem from './LeaderboardItem.js';

export default class Leaderboard extends Component {
  template() {
    const { leaderboardData } = this.props;

    return `
    <h2 class="leaderboard-title">Leaderboard - Top 10</h2>
    ${leaderboardData.slice(0, 10).map((_, i) => `<div class="leaderboard-item-container" data-component="LeaderboardItem" data-key="${i}"></div>`).join('')}
    `;
  }

  generateChildComponent(target, name, key) {
    switch(name) {
      case "LeaderboardItem": 
        return new LeaderboardItem(target, () => {
          const { leaderboardData } = this.props;
          return {
            item: leaderboardData[key],
          }
        })
    }
  }
}