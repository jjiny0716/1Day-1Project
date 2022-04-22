import Component from '../core/Component.mjs';
import Stats from './Stats.mjs';
import Hearts from './Hearts.mjs'
import GameScreen from '../gameClass/GameScreen.mjs';
import Target from '../gameClass/Target.mjs';

import { GAME_INITIAL_TARGET_ADD_DELAY, GAME_MINIMUM_TARGET_ADD_DELAY } from '../constants/gameConstants.mjs';
import { CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_BACKGROUND_COLOR, CANVAS_TARGET_COLOR } from '../constants/canvasConstants.mjs';
import { getDistance } from '../utils/getDistance.mjs';

export default class Game extends Component {
  setup() {
    this.state = {
      stats: {
        time: 0,
        hits: 0,
        missed: 0,
        speed: 0,
      },
      heartCount: 3,
    }
  }

  template() {
    return `
    <div class="game">
      <header class="game-header">
        <div class="stats" data-component="Stats"></div>
        <div class="life" data-component="Hearts"></div>
      </header>
      <canvas width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" id="game-canvas"></canvas>
    </div>
    `
  }

  generateChildComponent(target, name) {
    if (name === "Stats") {
      return new Stats(target, () => {
        const { stats } = this.state;
        return {  
          stats,
        }
      })
    }
    else if (name === "Hearts") {
      return new Hearts(target, () => {
        const { heartCount } = this.state;
        return {  
          heartCount,
        }
      })
    }
  }

  afterMount() {
    // game
    this.isGameEnd = false;
    this.targets = [];  
    this.targetAddDelay = GAME_INITIAL_TARGET_ADD_DELAY;
    this.minTargetAddDelay = GAME_MINIMUM_TARGET_ADD_DELAY;
    this.gameScreen = new GameScreen(this.target.querySelector("#game-canvas"), {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: CANVAS_BACKGROUND_COLOR,
      targetColor: CANVAS_TARGET_COLOR,
    });
    this.ctx = this.gameScreen.getCtx();
    this.gameScreen.addClickListener(this.shot.bind(this));
    this.intervals = [];
    this.animationID = 0;

    this.start();
  }

  start() {
    setTimeout(() => {this.addTarget()}, this.targetAddDelay);
    this.intervals.push(setInterval(() => {this.updateTargetAddDelay()}, 1000))
    this.intervals.push(setInterval(() => {this.updateTime()}, 100));
    this.intervals.push(setInterval(() => {this.updateTargets()}, 10));
    this.animationID = requestAnimationFrame(() => {this.frame()});
  }

  addTarget() {
    const x = Math.floor(Math.random() * (CANVAS_WIDTH - 20)) + 10;
    const y = Math.floor(Math.random() * (CANVAS_HEIGHT - 20)) + 10;
    this.targets.push(new Target([x, y], this.ctx));
    if (!this.isGameEnd) setTimeout(() => {this.addTarget()}, this.targetAddDelay);
  }

  updateTargetAddDelay() {
    const { stats } = this.state;
    if (this.minTargetAddDelay < this.targetAddDelay) this.targetAddDelay *= 197 / 200;
    else this.targetAddDelay = this.minTargetAddDelay;
    stats.speed = (1000 / this.targetAddDelay).toFixed(2);
    this.setState({ stats });
  }

  frame() {
    this.gameScreen.clearBackground();
    this.drawTargets();
    this.animationID = requestAnimationFrame(() => {this.frame()});
  }

  updateTargets() {
    for (let i = 0 ; i < this.targets.length ; i++) {
      this.targets[i].update();
      if (this.targets[i].state === "dead") {
        this.targets.splice(i, 1);

        // update life
        let { heartCount } = this.state;
        heartCount--;
        this.setState({ heartCount });
        if (heartCount <= 0) this.stop();
      }
    }
  }

  drawTargets() {
    for (let target of this.targets) {
      target.draw();
    }
  }

  shot(e) {
    const { stats } = this.state;
    if (this.removeShottedTarget(e.offsetX, e.offsetY)) {
      stats.hits++;
    } 
    else {
      stats.missed++;
    }
    this.setState({ stats });
  }
  
  removeShottedTarget(x, y) {
    for (let i = 0 ; i < this.targets.length ; i++) {
      const target = this.targets[i];
      const distance = getDistance(target.pos[0], target.pos[1], x, y);
      if (distance < target.radius) {
        this.targets.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  updateTime() {
    const { stats } = this.state; 
    stats.time += 100;
    this.setState({ stats });
  }

  stop() {
    const { showResult } = this.props;
    const { stats } = this.state;
    this.isGameEnd = true;
    this.intervals.forEach(interval => clearInterval(interval));
    this.gameScreen.removeAllEventListener();
    cancelAnimationFrame(this.animationID);
    showResult(stats);
  }
}
