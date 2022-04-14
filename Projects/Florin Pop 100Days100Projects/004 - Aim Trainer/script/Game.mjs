import Canvas from "./Canvas.mjs";
import Target from "./Target.mjs";
import Stats from "./Stats.mjs";
import Hearts from "./Hearts.mjs";

export default class Game {
  constructor() {
    // game header
    this.stats = new Stats(document.querySelector(".stats"));
    this.hearts = new Hearts(document.querySelector(".life"));
    this.stats.render();
    this.hearts.render();
    this.statsData = {
      "time": 0,
      "hits": 0,
      "missed": 0,
      "speed": 0,
    }
    this.heartCount = 3;

    // game
    this.isGameEnd = false;
    this.targets = [];  
    this.targetAddDelay = 1000;
    this.minTargetAddDelay = 250;
    this.canvas = new Canvas();
    this.canvas.setup();
    this.ctx = this.canvas.getCtx();
    this.canvas.addClickListener(this.shot.bind(this));
    this.intervals = [];
  }

  start() {
    setTimeout(() => {this.addTarget()}, this.targetAddDelay);
    this.intervals.push(setInterval(() => {this.updateTargetAddDelay()}, 1000))
    this.intervals.push(setInterval(() => {this.updateTime()}, 100));
    this.intervals.push(setInterval(() => {this.frame()}, 10));
  }

  addTarget() {
    const x = Math.floor(Math.random() * 980) + 10;
    const y = Math.floor(Math.random() * 580) + 10;
    this.targets.push(new Target([x, y], this.ctx));
    if (!this.isGameEnd) setTimeout(() => {this.addTarget()}, this.targetAddDelay);
  }

  updateTargetAddDelay() {
    if (this.minTargetAddDelay < this.targetAddDelay) this.targetAddDelay *= 197 / 200;
    else this.targetAddDelay = this.minTargetAddDelay;
    this.statsData.speed = (1000 / this.targetAddDelay).toFixed(2);
    this.stats.setState("speed", this.statsData.speed);
  }

  frame() {
    this.canvas.clearBackground();
    this.updateTargets();
    this.drawTargets();
  }

  updateTargets() {
    for (let i = 0 ; i < this.targets.length ; i++) {
      this.targets[i].update();
      if (this.targets[i].state === "dead") {
        this.targets.splice(i, 1);
        this.heartCount--;
        this.hearts.setState("heartCount", this.heartCount)
        if (this.heartCount <= 0) this.stop();
      }
    }
  }
  drawTargets() {
    for (let target of this.targets) {
      target.draw();
    }
  }

  shot(e) {
    if (this.removeShottedTarget(e.offsetX, e.offsetY)) {
      this.statsData.hits++;
      this.stats.setState("hits", this.statsData.hits);
    } 
    else {
      this.statsData.missed++;
      this.stats.setState("missed", this.statsData.missed);
    }
  }
  
  removeShottedTarget(x, y) {
    for (let i = 0 ; i < this.targets.length ; i++) {
      const target = this.targets[i];
      const distance = Math.sqrt((target.pos[0] - x) * (target.pos[0] - x) + (target.pos[1] - y) * (target.pos[1] - y))
      if (distance < target.radius) {
        this.targets.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  updateTime() {
    this.statsData.time += 100;
    this.stats.setState("time", this.statsData.time);
  }

  stop() {
    this.isGameEnd = true;
    this.intervals.forEach(interval => clearInterval(interval));
    this.canvas.removeClickListener(this.shot.bind(this));
  }

}