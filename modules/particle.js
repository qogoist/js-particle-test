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
}

export default Particle;