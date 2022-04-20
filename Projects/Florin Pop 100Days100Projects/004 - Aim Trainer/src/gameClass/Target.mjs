export default class Target {
  constructor(pos, ctx) {
    this.pos = pos;
    this.radius = 0;
    this.maxRadius = 30;
    this.state = "grow";
    this.ctx = ctx;
  }

  update() {
    if (this.radius >= this.maxRadius) this.state = "shrink";
    if (this.state === "grow") this.radius += 0.15;
    else if (this.state === "shrink") this.radius -= 0.15;
    if (this.radius <= 0 && this.state === "shrink") this.state = "dead";
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }
}
