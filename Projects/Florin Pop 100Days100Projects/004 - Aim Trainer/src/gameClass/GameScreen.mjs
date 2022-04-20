export default class GameScreen {
  constructor(canvas, option) {
    const { width, height, targetColor } = option;
    this.option = option;
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d", { alpha: false });
    this.ctx.fillStyle = targetColor;
    this.ctx.strokeStyle = targetColor;
    this.clearBackground();
    this.attatchedListeners = new Map();
  }

  clearBackground() {
    const { width, height, backgroundColor, targetColor } = this.option;
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.fillStyle = targetColor;
  }

  getCtx() {
    return this.ctx;
  }

  addClickListener(callback) {
    this.canvas.addEventListener("click", callback);
    this.attatchedListeners.set(callback, "click");
  }

  removeAllEventListener() {
    for (let [callback, type] of this.attatchedListeners.entries()) {
      this.canvas.removeEventListener(type, callback);
    }
  }
}
