"use strict";

export default class Canvas {
  constructor() {
    this.BACKGROUND_COLOR = "#f6f6f6";
    this.TARGET_COLOR = "#222";
    this.WIDTH = 1000;
    this.HEIGHT = 600;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.callback = null;
  }

  setup() {
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
    this.clearBackground();
    
    this.ctx.fillStyle = this.TARGET_COLOR;
    this.ctx.strokeStyle = this.TARGET_COLOR;
  }

  clearBackground() {
    this.ctx.fillStyle = this.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx.fillStyle = this.TARGET_COLOR;
  }

  getCtx() {
    return this.ctx;
  }

  addClickListener(callback) {
    this.callback = callback;
    this.canvas.addEventListener("click", callback);
  }

  removeClickListener() {
    this.canvas.removeEventListener("click", this.callback);
  }

}
