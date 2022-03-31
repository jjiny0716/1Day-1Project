import Component from '../core/Component.mjs';

export default class Millionaire extends Component {
  setup() {
    this.state = {
      billCount: 0, 
    }
  }

  template() {
    const { billCount } = this.state;
    return `
    <h1 class="congrats">😋Congratulations!😋<br />You are a millionaire now!</h1>
    ${`<i class="fa-solid fa-money-bill-wave"></i>`.repeat(billCount)}
    `
  }

  afterMount() {
    const maxBillCount = this.getMaxBillCount(22, 18);
    this.intervalId = setInterval(() => {
      let { billCount } = this.state;
      billCount++;
      this.setState({ billCount });
      if (billCount > maxBillCount) clearInterval(this.intervalId);
    }, 50);
  }

  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  getMaxBillCount(billWidth, billHeight) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return Math.floor(width / billWidth) * Math.floor(height / billHeight);
  }
}