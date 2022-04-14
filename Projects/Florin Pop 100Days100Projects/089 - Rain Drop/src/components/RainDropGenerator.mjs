import Component from "../core/Component.mjs";

export default class RainDropGenerator extends Component {
  setup() {
    this.state = {
      rainDrops: [],
    };
    this.startRain();
  }

  template() {
    const { rainDrops } = this.state;
    return `
    ${rainDrops.map(
      ({ x, y, scaleValue, opacity }) =>
        `<div class="rain-drop" style="top: ${y}px; left: ${x}px; transform: scale(${scaleValue}); opacity: ${opacity};"></div>`
    )}
    `;
  }

  startRain() {
    this.addRainDropIntervalID = setInterval(this.addRainDrop.bind(this), 100);
    // this.rainDropsUpdateIntervalID = setInterval(this.updateRainDrops.bind(this), 16);
    this.rainDropsUpdateIntervalID = this.startUpdateRainDrops();
  }

  stopRain() {
    clearInterval(this.addRainDropIntervalID);
    learInterval(this.rainDropsUpdateIntervalID);
    this.setState({ rainDrops: [] });
  }

  addRainDrop() {
    const { rainDrops } = this.state;
    const { width: targetWidth, height: targetHeight } = this.target.getBoundingClientRect();
    rainDrops.push(new RainDrop(targetWidth * Math.random(), targetHeight * Math.random()));
    this.setState({ rainDrops });
  }

  startUpdateRainDrops() {
    let { rainDrops } = this.state;
    rainDrops.forEach((rainDrop) => {
      rainDrop.progress += 0.5;
      rainDrop.scaleValue = 1 + (rainDrop.progress / 100) * 4;
      rainDrop.opacity = 1 - rainDrop.progress / 100;
    });
    rainDrops = rainDrops.filter((rainDrop) => rainDrop.progress < 100);
    this.setState({ rainDrops });
    this.rainDropsUpdateIntervalID = requestAnimationFrame(this.startUpdateRainDrops.bind(this));
  }
}

class RainDrop {
  constructor(x, y) {
    this.y = y;
    this.x = x;
    this.progress = 0;
    this.scaleValue = 1;
    this.opacity = 1;
  }
}
