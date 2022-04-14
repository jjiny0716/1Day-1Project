import Component from './core/Component.mjs';
import LoadingBlurScreen from './components/LoadingBlurScreen.mjs';

export default class App extends Component {
  setup() {
    this.state = {
      isLoading: true,
      loadingPercentage: 0,
    }
    this.loading();
  }

  template() {
    const { isLoading } = this.state;
    return `
    ${isLoading ? `<div class="loading-blur-screen" data-component="LoadingBlurScreen"></div>` : ""}
    `
  }

  generateChildComponent(target, name) {
    if (name === "LoadingBlurScreen") {
      return new LoadingBlurScreen(target, () => {
        const { loadingPercentage } = this.state;
        return {
          loadingPercentage,
        }
      });
    }
  }

  async loading() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let i = 1 ; i <= 100 ; i++) {
      await sleep(50);
      const { loadingPercentage } = this.state;
      this.setState({ loadingPercentage: loadingPercentage + 1 });
    }
    this.setState({ isLoading: false });
  }
}