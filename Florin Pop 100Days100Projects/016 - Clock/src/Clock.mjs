export default class Clock {
  constructor(target) {
    this.target = target;
    this.clock = this.target.querySelector(".clock");
    this.hourHand = this.clock.querySelector(".hour-hand");
    this.minuteHand = this.clock.querySelector(".minute-hand");
    this.secondHand = this.clock.querySelector(".second-hand");
    this.timeText = this.target.querySelector(".timeText");
    this.dateText = this.target.querySelector(".dateText");
    this.date = null;
    this.timerId = null;
    this.active();
  }

  active() {
    if (this.timerId) return;
    this.date = new Date();
    this.setClock();
    this.setTime();
    this.setDate();
    this.timerId = setInterval(() => {
      this.date = new Date();
      this.setClock();
      this.setTime();
      this.setDate();
    }, 1000);
  }

  setClock() {
    this.hourHand.style.transform = `rotate(${this.getAngle(12, this.date.getHours() + (this.date.getMinutes() / 60))}deg)`;
    this.minuteHand.style.transform = `rotate(${this.getAngle(60, this.date.getMinutes())}deg)`;
    this.secondHand.style.transform = `rotate(${this.getAngle(60, this.date.getSeconds())}deg)`;
  }

  getAngle(max, value) {
    return (value / max) * 360;
  }

  setTime() {
    const hour = this.date.getHours();
    const minute = this.date.getMinutes();
    this.timeText.textContent = `${hour}:${`${minute}`.padStart(2, '0')}`;
  }

  setDate() {
    const formatter = new Intl.DateTimeFormat('en-us', {weekday: 'long', month: 'short', day: 'numeric'});
    const [weekday, month, day] = formatter.format(this.date).split(' ');
    this.dateText.innerHTML = `
      ${weekday} ${month} <span class="circle">${day}</span>
    `
  }
}
