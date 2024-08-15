const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const jumpBtn = document.getElementById('jumpBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isGameOver = false;
let gameSpeed = 2; // Velocidad inicial del juego

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isGameOver) {
        jump();
    }
});

jumpBtn.addEventListener('click', jump);
restartBtn.addEventListener('click', startGame);

function jump() {
    if (!dino.classList.contains('jumping') && !isGameOver) {
        dino.classList.add('jumping');
        setTimeout(function() {
            dino.classList.remove('jumping');
        }, 600);
    }
}

function startGame() {
    cactus.style.animation = `moveCactus ${gameSpeed}s linear infinite`;
    score = 0;
    isGameOver = false;
    gameSpeed = 2;
    scoreDisplay.textContent = 'Puntuación: 0';
    cactus.style.right = '-60px'; // Resetea la posición del cactus
    incrementScore();
}

function incrementScore() {
    if (!isGameOver) {
        score++;
        scoreDisplay.textContent = 'Puntuación: ' + score;
        if (score % 500 === 0 && gameSpeed > 2) {
            gameSpeed -= 0.1;
            cactus.style.animation = `moveCactus ${gameSpeed}s linear infinite`;
        }
        setTimeout(incrementScore, 100);
    }
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.bottom > cactusRect.top &&
        dinoRect.top < cactusRect.bottom &&
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right
    ) {
        gameOver();
    }
}

function gameOver() {
    alert('¡Perdiste! Tu puntuación: ' + score);
    cactus.style.animation = 'none';
    isGameOver = true;
}

setInterval(checkCollision, 20);

startGame();
