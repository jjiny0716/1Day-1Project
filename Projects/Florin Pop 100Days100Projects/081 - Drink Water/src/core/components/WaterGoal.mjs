import Component from '../Component.mjs';

export default class WaterGoal extends Component {
  template() {
    const { goal, water } = this.props;
    const remain = ((goal - water) / 1000).toFixed(2);
    const currentPercentage = (water / goal * 100).toFixed(1);
    return `
    <div class="remain${water === 0 ? ' empty' : ''}" style="height: ${100 - currentPercentage}%">
      <p class="remain-liter">${remain}L</p>
      <small class="small">Remained</small>
    </div>
    <div class="water" style="height: ${currentPercentage}%">
      <p class="current-percentage">${currentPercentage}%</p>
    </div>
    `
  }
}