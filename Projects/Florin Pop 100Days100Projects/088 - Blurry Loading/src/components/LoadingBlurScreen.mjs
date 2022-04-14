import Component from '../core/Component.mjs';

export default class LoadingBlurScreen extends Component {
  template() {
    const { loadingPercentage } = this.props;
    return `
    <div class="blur-background" style="backdrop-filter: blur(${(100 - loadingPercentage) * 0.4}px)"></div>
    <p class="percentage" style="opacity: ${1 - loadingPercentage / 100}">${loadingPercentage}%</p>
    `;
  }
}