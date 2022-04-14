import Component from "../core/Component.mjs";
import BlockNumber from "./BlockNumber.mjs";

export default class Clock extends Component {
  setup() {
    const { curDate } = this.props;
    this.state = {
      hour: curDate.getHours(),
      minute: curDate.getMinutes(),
      second: curDate.getSeconds(),
    };
  }
  template() {
    return `
    <div class="panel hour">
      <div class="number"></div>
      <div class="number"></div>
    </div>
    <div class="panel minute">
      <div class="number"></div>
      <div class="number"></div>
    </div>
    <div class="panel second">
      <div class="number"></div>
      <div class="number"></div>
    </div>
    `;
  }

  afterMount() {
    const { hour, minute, second } = this.state;
    const timeString = hour.toString().padStart(2, "0") + minute.toString().padStart(2, "0") + second.toString().padStart(2, "0");
    const numbers = document.querySelectorAll(".number");
    for (let i = 0; i < 6; i++) {
      new BlockNumber(numbers[i], { number: timeString[i] });
    }

    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const curDate = new Date();
      const hour = curDate.getHours();
      const minute = curDate.getMinutes();
      const second = curDate.getSeconds();
      this.setState({ hour, minute, second });
    }, 1000);
  }

  // updateTime({ hour, minute, second }) {
  //   second++;
  //   if (second >= 60) {
  //     minute++;
  //     second = 0;
  //   }
  //   if (minute >= 60) {
  //     hour++;
  //     minute = 0;
  //   }
  //   if (hour >= 24) hour = 0;
  //   return { hour, minute, second };
  // }
}
