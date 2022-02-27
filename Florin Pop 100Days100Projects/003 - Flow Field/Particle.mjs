"use strict";

export default class Particle {
  constructor(_pos, _vel, _acc, _color, _ctx, _radius = 3, _maxSpeed = 2) {
    this.pos = _pos;
    // prevPos
    this.vel = _vel;
    this.acc = _acc;
    this.color = _color;
    this.ctx = _ctx;
    this.radius = _radius;
    this.maxSpeed = _maxSpeed;
    this.afterimages = [];
  }

  getForceByField(field, fieldSize) {
    const y = Math.floor(this.pos[1] / fieldSize);
    const x = Math.floor(this.pos[0] / fieldSize);
    this.acc[0] += field[y][x][0];
    this.acc[1] += field[y][x][1];
  }

  update() {
    this.updateAfterimages();
    this.vel[0] += this.acc[0];
    this.vel[1] += this.acc[1];

    // 정규화
    const size = Math.sqrt(Math.pow(this.vel[0] + this.acc[0], 2) + Math.pow(this.vel[1] + this.acc[1], 2)) ;
    if (size > this.maxSpeed) {
      this.vel[0] /= size * this.maxSpeed;
      this.vel[1] /= size * this.maxSpeed;
    }
    
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.pos[0] < 0 || this.pos[1] < 0 || this.pos[0] >= window.innerWidth || this.pos[1] >= window.innerHeight) {
      this.pos = [Math.floor(Math.random() * window.innerWidth), Math.floor(Math.random() * window.innerHeight)];
      this.vel = [0, 0];
      this.acc = [0, 0];
    }
  }

  updateAfterimages() {
    for (let i = 0; i < this.afterimages.length ; i++) {
      this.afterimages[i].transparency -= 2;
      this.afterimages[i].size -= 2;
      if (this.afterimages[i].transparency <= 0) this.afterimages.splice(i, 1);
    }
    this.afterimages.push({
      "x": this.pos[0],
      "y": this.pos[1],
      "transparency": 100,
      "size": 100
    })
  }

  draw() {
    this.drawAfterimages();
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawAfterimages() {
    for (let afterimage of this.afterimages) {
      this.ctx.strokeStyle = `rgba(${255},${255},${255},${afterimage.transparency / 100})`;
      this.ctx.fillStyle = `rgba(${255},${255},${255},${afterimage.transparency / 100})`;
      this.ctx.beginPath();
      this.ctx.arc(afterimage.x, afterimage.y, this.radius * (afterimage.size / 100), 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.fillStyle = this.color;
    }
  }
}
