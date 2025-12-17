const vampire = document.getElementById("vampire");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");

let score = 0;
let isJumping = false;
let gameOver = false;

// Pulo com espaço
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (!isJumping && !gameOver) jump();
  }
});

// Pulo com clique
document.addEventListener("click", () => {
  if (!isJumping && !gameOver) jump();
});

function jump() {
  isJumping = true;
  vampire.classList.add("jump");

  setTimeout(() => {
    vampire.classList.remove("jump");
    isJumping = false;
  }, 600);
}

// Loop do jogo
setInterval(() => {
  if (gameOver) return;

  const vampireBottom = parseInt(
    window.getComputedStyle(vampire).getPropertyValue("bottom")
  );

  const obstacleLeft = obstacle.offsetLeft;

  // Colisão
  if (
    obstacleLeft < 130 &&
    obstacleLeft > 50 &&
    vampireBottom < 55
  ) {
    endGame();
  }

  score++;
  scoreText.textContent = `Pontuação: ${score}`;
}, 120);

// Game Over
function endGame() {
  gameOver = true;

  const obstacleLeft = obstacle.offsetLeft;
  obstacle.style.animation = "none";
  obstacle.style.left = obstacleLeft + "px";

  scoreText.innerHTML = `
     <strong>Game Over</strong><br>
    Pontuação final: ${score}<br><br>
    <small>Clique para reiniciar</small>
  `;

  document.addEventListener("click", () => location.reload(), { once: true });
}
