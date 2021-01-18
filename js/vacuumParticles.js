const image = new Image();
image.crossOrigin = "Anonymous";
image.src = "../img/Courts_tumblr_banner.png"

image.addEventListener("load", () => {
  console.log("Image loaded")

  const canvas = document.getElementById("canvasVacuum");
  const ctx = canvas.getContext("2d");
  const ratio = image.height / image.width;
  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.width * ratio;

  let particlesArray = [];
  const detail = 2;

  let mouse = {
    x: null,
    y: null,
    radius: 200
  }

  canvas.addEventListener("mousemove", function (e) {
    var rect = e.target.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  })

  canvas.addEventListener("mouseleave", function (e) {
    mouse.x = null;
    mouse.y = null;
  })

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  try {
    localStorage.setItem("image", canvas.toDataURL("image/png"));
  }
  catch (err) {
    console.log("Error: " + err);
  }

  let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  class Particle {
    constructor(x, y, brightness, red, green, blue) {
      this.baseX = x;
      this.baseY = y;
      this.x = x;
      this.y = y;
      this.brightness = brightness;
      this.baseColor = {
        red: red,
        green: green,
        blue: blue
      }
      this.color = {
        red: red,
        green: green,
        blue: blue
      }
      this.size = 1;
      this.weight = 2.55 - this.brightness / 100;
    }

    update() {
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        const forceX = dx / dist;
        const forceY = dy / dist;

        let force = (mouse.radius - dist) / dist;
        if (force > 1) force = 1;

        let dirX = forceX * force * this.weight;
        let dirY = forceY * force * this.weight;


        if (dist < mouse.radius + this.size) {
          this.color = {
            red: this.baseColor.red - Math.exp(force),
            green: this.baseColor.green - Math.exp(force),
            blue: this.baseColor.blue - Math.exp(force)
          }

          this.x += dirX;
          this.y += dirY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / (10 * this.weight);
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / (10 * this.weight);
          }
        }

      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / (10 * this.weight);
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / (10 * this.weight);
        }

        this.color = {
          red: this.baseColor.red,
          green: this.baseColor.green,
          blue: this.baseColor.blue
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init(){
    particlesArray = [];
    for (let x = 0; x < canvas.width; x += detail) {
      let row = [];
      for (let y = 0; y < canvas.height; y += detail) {
        const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
        const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
        const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
        const brightness = calculateBrightness(red, green, blue);

        if (brightness > 10)
          particlesArray.push(new Particle(x, y, brightness, red, green, blue));
      }
    }
  }
  
  function animate() {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;
    for (const particle of particlesArray) {
      particle.update();
      particle.draw();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();

  function calculateBrightness(red, green, blue) {
    return Math.sqrt(
      (red * red) * 0.299 +
      (green * green) * 0.587 +
      (blue * blue) * 0.114
    );
  }

  window.addEventListener("resize", function (e) {
    console.log("Resize");
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.width * ratio;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
  })


}, false)