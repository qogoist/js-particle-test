const image = new Image();
image.crossOrigin = "Anonymous";
image.src = "https://pbs.twimg.com/media/EoG3_f-XMAYpDVe.jpg";

image.addEventListener("load", () => {
  console.log("Image loaded")

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;

  let particlesArray = [];
  const detail = 10;
  let mouseX = null;
  let mouseY = null;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  try {
    localStorage.setItem("image", canvas.toDataURL("image/png"));
  }
  catch (err) {
    console.log("Error: " + err);
  }

  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // let imMap = []
  // for (let x = 0; x < canvas.width; x += detail) {
  //   let row = [];
  //   for (let y = 0; y < canvas.height; y += detail) {
  //     const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
  //     const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
  //     const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
  //     const color = `rgb(${red}, ${green}, ${blue})`;
  //     const brightness = calculateBrightness(red, green, blue) / 100;

  //     row.push({
  //       red: red,
  //       green: green,
  //       blue: blue,
  //       color: color,
  //       brightness: brightness
  //     })
  //   }
  //   imMap.push(row);
  // }

  class Particle {
    constructor(x, y, color, brightness) {
      this.baseX = x;
      this.baseY = y;
      this.x = x;
      this.y = y;
      this.color = color;
      this.brightness = brightness;
      this.size = detail;
      this.velocity = Math.random() * 5;
    }

    update() {
      if (mouseX != null && mouseY != null) {
        const xDist = mouseX - this.x;
        const yDist = mouseY - this.y;
        const dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        const xNorm = xDist / dist;
        const yNorm = yDist / dist;

        if (dist < 100) {
          this.x = this.baseX - xNorm * 10;
          this.y = this.baseY - yNorm * 10;
        } else {
          this.x = this.baseX;
          this.y = this.baseY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const init = () => {
    for (let x = 0; x < canvas.width; x += detail) {
      let row = [];
      for (let y = 0; y < canvas.height; y += detail) {
        const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
        const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
        const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
        const color = `rgb(${red}, ${green}, ${blue})`;
        const brightness = calculateBrightness(red, green, blue);

        if (brightness > 10)
          particlesArray.push(new Particle(x, y, color, brightness));
      }
    }
  }
  init();


  const animate = () => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;
    for (const particle of particlesArray) {
      particle.update();
      particle.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();


  canvas.addEventListener("mousemove", function (e) {
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    // console.log(mouseX + "; " + mouseY);

    // for (const particle of particlesArray) {
    //   const xDist = mouseX - particle.x;
    //   const yDist = mouseY - particle.y;
    //   const dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    //   const xNorm = xDist / dist;
    //   const yNorm = yDist / dist;

    //   if (dist < 100) {
    //     particle.x -= xNorm * 20;
    //     particle.y -= yNorm * 20;
    //   }
    // }
  })


  function calculateBrightness(red, green, blue) {
    return Math.sqrt(
      (red * red) * 0.299 +
      (green * green) * 0.587 +
      (blue * blue) * 0.114
    );
  }

  function getMapPos(x, y) {
    if (imMap[Math.floor(x / detail)] && imMap[Math.floor(x / detail)][Math.floor(y / detail)])
      return imMap[Math.floor(x / detail)][Math.floor(y / detail)];
    else
      return undefined;
  }


}, false)