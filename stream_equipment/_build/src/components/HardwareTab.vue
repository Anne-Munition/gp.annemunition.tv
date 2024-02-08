<template>
  <v-window class="container">
    <canvas id="canvas1"></canvas>
    <canvas id="canvas2"></canvas>
  </v-window>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'

enum dir {
  'UP',
  'DOWN',
  'LEFT',
  'RIGHT'
}

const lines = [[
  {x: 50, y: 100},
  {x: 500, y: 100},
  {x: 500, y: 140},
  {x: 400, y: 140},
  {x: 400, y: 300},
]];

onMounted(() => {
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 48;
  lines.forEach(line => new Line(ctx, line))
})

class Line {
  readonly #ctx;
  readonly #line;
  constructor(ctx: CanvasRenderingContext2D, line: {x: number, y: number}[]) {
    this.#ctx = ctx;
    this.#line = line
    this.#drawLines();
  }
  #drawLines() {
    this.#ctx.strokeStyle = '#57ca30';
    this.#ctx.lineWidth = 4;
    this.#ctx.beginPath();
    this.#ctx.moveTo(this.#line[0].x, this.#line[0].y);
    for (let i = 1; i < this.#line.length; i++) {
      this.#ctx.lineTo(this.#line[i].x, this.#line[i].y);
    }
    this.#ctx.stroke();
  }
}

class Dots {
  #ctx
  #x
  #y
  readonly #startX
  readonly #startY
  readonly #dir
  readonly #speed
  #frame
  readonly #frames
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, direction: dir, frames = 30) {
    this.#ctx = ctx;
    this.#x = x;
    this.#y = y;
    this.#startX = x;
    this.#startY = y;
    this.#dir = direction;
    this.#speed = 1;
    this.#frame = 0;
    this.#frames = frames;
    this.#animate();
  }
  #draw() {
    //this.#ctx.clearRect(0, 0, 5000, 5000)
    this.#ctx.strokeStyle = '#ffffff'
    this.#ctx.lineWidth = 2;
    this.#ctx.beginPath();
    this.#ctx.arc(this.#x, this.#y,10, 0, 360);
    this.#ctx.stroke();
  }
  #animate() {
    this.#frame++
    this.#draw();
    switch (this.#dir) {
      case 0: { // UP
        this.#y -= this.#speed;
        if (this.#frame >= this.#frames) {
          this.#y = this.#startY;
          this.#frame = 0;
        }
        break;
      }
      case 1: { // DOWN
        this.#y += this.#speed;
        if (this.#frame >= this.#frames) {
          this.#y = this.#startY;
          this.#frame = 0;
        }
        break;
      }
      case 2: { // LEFT
        this.#x -= this.#speed;
        if (this.#frame >= this.#frames) {
          this.#x = this.#startX;
          this.#frame = 0;
        }
        break;
      }
      case 3: { // RIGHT
        this.#x += this.#speed;
        if (this.#frame >= this.#frames) {
          this.#x = this.#startX;
          this.#frame = 0;
        }
        break;
      }
    }
    requestAnimationFrame(this.#animate.bind(this));
  }
}
</script>

<style scoped>
.container {

}

canvas {
  border: 5px solid red;
  position: absolute;
  top: 40px;
  left: 0;
}
</style>
