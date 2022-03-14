export default class NewYearTimer {
  constructor(target) {
    this.target = target;
    this.now = new Date();
    this.nextYear = new Date(this.now.getFullYear() + 1, 0, 1);
    this.remainTime = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  active() {
    this.now = new Date();
    this.calculateRemainTime();
    this.render();
    setInterval(() => {
      this.now.setSeconds(this.now.getSeconds() + 1);
      this.calculateRemainTime();
      this.render();
    }, 1000);
  }

  calculateRemainTime() {
    let timeLeft = this.nextYear - this.now;
    this.remainTime.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    timeLeft %= 1000 * 60 * 60 * 24;
    this.remainTime.hours = Math.floor(timeLeft / (1000 * 60 * 60));
    timeLeft -= this.remainTime.hours * (1000 * 60 * 60);
    this.remainTime.minutes = Math.floor(timeLeft / (1000 * 60));
    timeLeft -= this.remainTime.minutes * (1000 * 60);
    this.remainTime.seconds = Math.floor(timeLeft / (1000));
  }

  render() {
    this.target.innerHTML = `
      <li class="days time-container">
        <p class="number">${this.remainTime.days}</p>
        <p class="unit">days</p>
      </li>
      <li class="hours time-container">
        <p class="number">${this.remainTime.hours}</p>
        <p class="unit">hours</p>
      </li>
      <li class="minutes time-container">
        <p class="number">${this.remainTime.minutes}</p>
        <p class="unit">minutes</p>
      </li>
      <li class="seconds time-container">
        <p class="number">${this.remainTime.seconds}</p>
        <p class="unit">seconds</p>
      </li>
    `

  }
}