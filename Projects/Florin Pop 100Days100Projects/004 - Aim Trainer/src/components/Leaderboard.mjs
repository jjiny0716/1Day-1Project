import Component from "../core/Component.mjs";
import {msToReadableTime} from "../utils/time.mjs";

export default class Leaderboard extends Component {
  template() {
    const { data } = this.props;
    return `
    <div class="leaderboard">
      <h3 class="leaderboard-title">Top 3 records</h3>
      <ul class="records">
        ${data.length === 0 ? `<p>No data!</p>` : ''}
        ${data.map(({ time, hits, missed }, index) => {
          const accuracy = (hits * 100 / (missed + hits)).toFixed(1) 
          return `
          <li class="record">
            <span class="rank">${index + 1}</span>
            Time: <span class="rank-stat-value">${msToReadableTime(time)}</span> Hits: <span class="rank-stat-value">${hits}</span> Accuracy: <span class="rank-stat-value">${isNaN(accuracy) ? "0.0" : accuracy}%</span>
          </li>`;
        }).join('')}
      </ul>
    </div>
    `;
  }
}
