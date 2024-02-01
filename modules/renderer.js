/**
 * Class for a renderer Wrapping a 2d Canvas Rendering Context.
 */
class Renderer {
  /**@type {HTMLCanvasElement} */
  canvas;
  /**@type {CanvasRenderingContext2D} */
  ctx;
  /**@type {(deltaTime: number) => void} */
  update;
  /**@private @type {number} */
  #previousTime;

  /**
   * 
   * @param {string} selector FW0FB8Z88
   */
  constructor(selector) {
    this.canvas =  document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * Initializes the Render Cycle.40004
   * @param {(deltaTime: number) => void} update 
   */
  init(update) {
    this.resize();
    window.addEventListener("resize", this.resize);

    this.update = update;

    this.#previousTime = 0;
    requestAnimationFrame(this.frame())
  }

  frame(currentTime) {
    const deltaTime = (currentTime - this.#previousTime) / 1000;
    this.update();
    this.render();

    requestAnimationFrame(this.frame());
  }

  render() {}


  resize() {
    const {width, height} = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = width;
    this.canvas.height = height;
  }
}

export default Renderer;