export class Ball {
  constructor(stageWidth, stageHeight, radius, speed, fillStyle='#fdd700') {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;
    this.fillStyle = fillStyle;

    const diameter = this.radius * 2;
    this.x = diameter + Math.random() * (stageWidth - 2 * diameter);
    this.y = diameter + Math.random() * (stageHeight - 2 * diameter);
  }

  draw(ctx, stageWidth, stageHeight, block=null) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);
    if (block) {
      this.bounceBlock(block);
    }

    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    }
    if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  bounceBlock(block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min == min1) {
        this.vx *= -1;
        this.x += this.vx;
      }
      if (min == min2) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }
}
