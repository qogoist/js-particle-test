/**
 * 
 * @param {string} selector - selector by which to find the canvas
 * @returns The context of the canvas;
 */
function createCanvas(selector) {
  const canvas = document.querySelector(selector);
  resizeCanvas(canvas);
  window.addEventListener("resize", () => resizeCanvas(canvas))

  const ctx = canvas.getContext("2d");

  return ctx
}

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
function resizeCanvas(canvas) {
  const {width, height} = canvas.parentElement.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;
}

export {createCanvas}