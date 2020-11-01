import {
  Ball
} from './material/ball.js';

import {
  Block
} from './material/block.js';


class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.beforeTime = (new Date()).getTime();
    this.tick = 0;

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.ball = new Ball(this.stageWidth, this.stageHeight, 40, 5)
    this.block = new Block(this.stageWidth, this.stageHeight);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.calculateFrame();
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.block.draw(this.ctx, this.stageWidth, this.stageHeight);
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
  }

  /*
  FPS test
  almost 60 frames per second
  */
  calculateFrame() {
    const nowTime = (new Date()).getTime();
    this.tick += 1;
    if (nowTime - this.beforeTime >= 1000) {
      console.log(`fps: ${this.tick}`);
      this.tick = 0;
      this.beforeTime = nowTime;
    }
  }
};

window.onload = () => {
  new App();
};
