$(function () {
  const game = document.getElementById("myCanvas");
  const ctx = game.getContext("2d");

  //rect
  //   ctx.beginPath();
  //   ctx.rect(20, 40, 50, 50);
  //   ctx.fileStyle = "#FF0000";
  //   ctx.fill();
  //   ctx.closePath();

  //   //ball
  //   ctx.beginPath();
  //   ctx.arc(240, 130, 20, 0, Math.PI * 2, false);
  //   ctx.fileStyle = "green";
  //   ctx.fill();
  //   ctx.closePath();

  //   //strok ball
  //   ctx.beginPath();
  //   ctx.rect(160, 10, 100, 40);
  //   ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
  //   ctx.stroke();
  //   ctx.closePath();

  let x = game.width / 2;
  let y = game.height - 20;
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (game.width - paddleWidth) / 2;
  let dx = 1;
  let dy = -1;
  const ballRadius = 5;
  let rightp = false;
  let leftp = false;

  var brickRowCount = 3;
  var brickColumnCount = 3;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;

  var score = 0;
  var lives = 3;

  var bricks = [];
  var brickcolor = ["", "#46bffc", "#16a2e7", "#0095DD"];
  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 3 };
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, game.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status > 0) {
          var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = brickcolor[bricks[c][r].status];
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r];
        if (b.status > 0) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status -= 1;
            score++;
            if (score == brickColumnCount * brickRowCount * 3) {
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
  }
  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, game.width - 65, 20);
  }
  function draw() {
    //drawing code
    //원 지우기
    ctx.clearRect(0, 0, game.width, game.height);
    drawPaddle();
    drawBall();
    drawScore();
    drawLives();
    collisionDetection();
    drawBricks();
    if (rightp) {
      paddleX += 7;
    } else if (leftp) {
      paddleX -= 7;
    }

    if (x + dx > game.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > game.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dx += 0.1;
        dy += 0.1;
        dy = -dy;
      } else {
        lives--;
        if (lives == 0) {
          document.location.reload();
        } else {
          x = game.width / 2;
          y = game.height - 30;
          dx = 2;
          dy = -2;
          paddleX = (game.width - paddleWidth) / 2;
        }
      }
    }
    if (rightp && paddleX < game.width - paddleWidth) {
      paddleX += 7;
    } else if (leftp && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  // function mouseMoveHandler(e) {
  //   const relateiveX = e.pageX - game.offsetLeft;
  //   if (relateiveX > 0 && relateiveX < game.width) {
  //     paddleX = relateiveX - paddleWidth / 2;
  //   }
  // }
  // document.addEventListener(`mousemove`, mouseMoveHandler, false);
  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightp = true;
    } else if (e.keyCode == 37) {
      leftp = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightp = false;
    } else if (e.keyCode == 37) {
      leftp = false;
    }
  }

  draw();
});
