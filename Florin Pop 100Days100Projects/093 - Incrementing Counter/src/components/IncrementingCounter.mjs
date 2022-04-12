import Component from '../core/Component.mjs';

export default class IncrementingCounter extends Component {
  setup() {
    this.state = {
      count: 0,
    }
    this.increment();
  }

  template() { 
    const { count } = this.state;
    return `
    <p class="count">${count}</p>
    `
  }

  increment() {
    const tickTime = 20;
    const { maxCount, duration } = this.props;
    const totalAnimationCount = Math.round(duration / tickTime);
    const intervalId = setInterval(() => {
      let { count } = this.state;
      count += maxCount / totalAnimationCount;
      if (count >= maxCount) {
        count = maxCount;
        clearInterval(intervalId);
      }
      this.setState({ count });
    }, tickTime);
  }
}