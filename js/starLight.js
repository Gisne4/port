document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector(".star-canvas");
  const ctx = canvas.getContext("2d");
  let circles = [];

  function canvasBackGround() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gradients = ctx.createRadialGradient(
      canvas.width / 2,
      0 - canvas.height / 3,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width
    );

    gradients.addColorStop(0, "rgba(192, 187, 212, 0.445)");
    gradients.addColorStop(0.3, "rgba(1, 1, 3, 0.719)");
    gradients.addColorStop(1, "rgba(9, 9, 32, 0.719)");

    ctx.fillStyle = gradients;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function createCircle() {
    circles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random(),
      opacity: 0,
      fadeSpeed: 0.01 + Math.random() * 0.01,
      growthSpeed: 0.01 + Math.random() * 0.01,
      maxRadius: Math.random() * 7,
      state: "growing",
      xDirection: Math.random() * 2 - 1,
      yDirection: Math.random() * 2 - 1,
      speed: 0.1 + Math.random() * 0.1,
    });
  }

  function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasBackGround();
    circles.forEach((circle, index) => {
      if (circle.state === "growing") {
        if (circle.opacity < 1) {
          circle.opacity += circle.fadeSpeed;
        }
        if (circle.radius < circle.maxRadius) {
          circle.radius += circle.growthSpeed;
        } else {
          circle.radius = circle.maxRadius;
          circle.state = "fading";
        }
      } else if (circle.state === "fading") {
        circle.opacity -= circle.fadeSpeed;
        if (circle.opacity <= 0) {
          circles.splice(index, 1);
          return;
        }
      }

      circle.x += circle.xDirection * circle.speed;
      circle.y += circle.yDirection * circle.speed;

      if (
        circle.x + circle.radius > canvas.width ||
        circle.x - circle.radius < 0
      ) {
        circle.xDirection *= -1;
      }
      if (
        circle.y + circle.radius > canvas.height ||
        circle.y - circle.radius < 0
      ) {
        circle.yDirection *= -1;
      }

      const gradient = ctx.createRadialGradient(
        circle.x,
        circle.y,
        0,
        circle.x,
        circle.y,
        circle.radius
      );
      gradient.addColorStop(0, `rgba(255,255,255,${circle.opacity * 0.8})`);
      gradient.addColorStop(1, `rgba(255,255,255,0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function animate() {
    if (circles.length < 80) {
      createCircle();
    }
    drawCircles();
    requestAnimationFrame(animate);
  }

  canvasBackGround();
  animate();

  window.addEventListener("resize", () => {
    canvasBackGround();
  });
});
