const image = new Image();
image.crossOrigin = "Anonymous";
// image.src = "https://pbs.twimg.com/media/EoG3_f-XMAYpDVe.jpg";
image.src = "data:image/jpeg;base64,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";

image.addEventListener("load", () => {
  console.log("Image loaded")

  const canvas = document.getElementById("canvasRain");
  const ctx = canvas.getContext("2d");
  const ratio = image.height / image.width;
  canvas.height = canvas.getBoundingClientRect().height;
  canvas.width = canvas.height / ratio;

  const numberOfParticles = 12000;
  let particlesArray = [];
  const detail = 1;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  try {
    localStorage.setItem("image", canvas.toDataURL("image/png"));
  }
  catch (err) {
    console.log("Error: " + err);
  }

  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let imMap = []
  for (let x = 0; x < canvas.width; x += detail) {
    let row = [];
    for (let y = 0; y < canvas.height; y += detail) {
      const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
      const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
      const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
      const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
      const brightness = calculateBrightness(red, green, blue) / 100;

      row.push({
        red: red,
        green: green,
        blue: blue,
        color: color,
        brightness: brightness
      })
    }
    imMap.push(row);
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.base = Math.random() * detail + 0.5;
      this.size = this.base;
      this.speed = 0;
      this.velocity = Math.random() * Math.random();
    }

    update() {
      if (getMapPos(this.x, this.y) != undefined)
        this.speed = getMapPos(this.x, this.y).brightness;

      this.y += (2.55 - this.speed) + this.velocity;

      if (this.y >= canvas.height || this.y <= 0 || this.x >= canvas.width || this.x <= 0) {
        this.x = Math.random() * canvas.width;
        this.y = 0;
      }
    }

    draw() {
      ctx.beginPath();
      let red;
      let green;
      let blue;
      if (getMapPos(this.x, this.y) != undefined) {
        red = getMapPos(this.x, this.y).red;
        green = getMapPos(this.x, this.y).green;
        blue = getMapPos(this.x, this.y).blue;
      }
      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      if (this.size <= 0)
        this.size = this.base;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const init = () => {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  init();


  const animate = () => {
    ctx.globalAlpha = 0.02;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.2;
    for (const particle of particlesArray) {
      particle.update();
      ctx.globalAlpha = particle.speed * 0.5
      particle.draw();
    }

    requestAnimationFrame(animate);
  }

  animate();


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