"use strict";
import { Perlin } from './Perlin.mjs';
import Particle from "./Particle.mjs";
//"rgba(255, 255, 255, 0.1)";
const BACKGROUND_COLOR = "#000000";
const PARTICLE_COLOR = "#ffffff"
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const NUMBER_OF_PARTICLES = 100;
const FIELD_SIZE = 20;
const particles = [];
const field = [];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function setup() {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = PARTICLE_COLOR;
  ctx.strokeStyle = PARTICLE_COLOR;

  createParticles();
  createFields();
}

function createParticles() {
  for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
    const pos = [Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)];
    // const vel = [Math.random() - 0.5, Math.random() - 0.5];
    // const acc = [Math.random() / 100, Math.random() / 100];
    const vel = [0, 0];
    const acc = [0, 0];
    particles.push(new Particle(pos, vel, acc, PARTICLE_COLOR, ctx));
  }
}

function createFields() {
  const perlin = new Perlin(Math.random());
  const rowCount = Math.ceil(HEIGHT / FIELD_SIZE);
  const colCount = Math.ceil(WIDTH / FIELD_SIZE)
  for (let y = 0 ; y < rowCount ; y++) {
    const row = [];
    for (let x = 0 ; x < colCount ; x++) {
      const value = perlin.noise(x / colCount, y / rowCount, 0);
      const angle = value * 2 * Math.PI;
      row.push([Math.cos(angle) / 25, Math.sin(angle) / 25]);
    }
    field.push(row);
  }
}

function clearBackground() {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = PARTICLE_COLOR;
}

function updateAllParticle() {
  for (let particle of particles) {
    particle.getForceByField(field, FIELD_SIZE);
    particle.update();
  }
}

function drawAllParticle() {
  for (let particle of particles) {
    particle.draw();
  }
}

function startRender() {
  requestAnimationFrame(render);
}

function render() {
  clearBackground();
  updateAllParticle();
  drawAllParticle();
  requestAnimationFrame(render);
}

setup();
startRender();
