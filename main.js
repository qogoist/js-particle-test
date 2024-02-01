import Particle from "./modules/particle.js";
import Renderer from "./modules/renderer.js";

const renderer = new Renderer("#canvas");
renderer.init(update);

function update() {
  console.log("Frame");
}

// Start render loop
// let previousTime = 0;
// requestAnimationFrame(frame);

// function frame(currentTime) {
//   const delta = (currentTime - previousTime) / 1000;
//   previousTime = currentTime;

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // Start Actual Rendering Code


//   requestAnimationFrame(frame);
// }