class Particle {
  /**
   * 
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @param {number} radius - radius 
   * @param {{r: number, g: number, b: number}} color - color
   */
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

/**
 * Draw the particle to the canvas
 * @param {CanvasRenderingContext2D} ctx 
 */
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.color.r} ${this.color.g} ${this.color.b})`;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default Particle;