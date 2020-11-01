export class Block {
  constructor(width, height, x, y) {
    if (!x && !y) {
      this._setStageWidthHeight(width, height);
    }
    else {
      this.width = width;
      this.height= height;
      this.x = x;
      this.y = y;
      this.maxX = width + x;
      this.maxY = height + y;
    }
  }

  draw(ctx, stageWidth, stageHeight) {
    if (stageWidth && stageHeight) {
      this._setStageWidthHeight(stageWidth, stageHeight);
    }
    this._draw(ctx);
  }

  _draw(ctx) {
    const xGap = 80;
    const yGap = 60;

    // front
    ctx.fillStyle = '#ff384e';
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();

    // under
    ctx.fillStyle = '#190f3a';
    ctx.beginPath();
    ctx.moveTo(this.maxX, this.maxY);
    ctx.lineTo(this.maxX - xGap, this.maxY + yGap);
    ctx.lineTo(this.x - xGap, this.maxY + yGap);
    ctx.lineTo(this.x, this.maxY);
    ctx.fill();

    // left side
    ctx.fillStyle = '#9d0919';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - xGap, this.y + yGap);
    ctx.lineTo(this.x - xGap, this.maxY + yGap);
    ctx.lineTo(this.x, this.maxY);
    ctx.fill();
  }

  _setStageWidthHeight(stageWidth, stageHeight) {
    this.width = stageWidth / 3;
    this.height = 30;
    this.x = stageWidth / 2 - (this.width / 1.5);
    this.y = stageHeight / 2;
    this.maxX = this.width + this.x;
    this.maxY = this.height + this.y;
  }
}
