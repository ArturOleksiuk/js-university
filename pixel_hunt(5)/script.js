const difficulties = [
    { value: 'easy', label: 'Легко', timeLimit: 3000, cubeSize: 40 },
    { value: 'medium', label: 'Середньо', timeLimit: 2000, cubeSize: 30 },
    { value: 'hard', label: 'Важко', timeLimit: 1000, cubeSize: 20 }
];

let timeoutId;
let timerInterval;
let score = 0;
let currentTimeLimit = 3000;
let currentCubeSize = 40;
let timerValue = 0;
let isGameRunning = false;

const gameArea = document.getElementById('gameArea');
const cube = document.getElementById('cube');
const difficultySelect = document.getElementById('difficulty');
const timerDisplay = document.getElementById('timerDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');
const colorPicker = document.getElementById('colorPicker');

difficulties.forEach(difficulty => {
    const option = document.createElement('option');
    option.value = difficulty.value;
    option.textContent = difficulty.label;
    difficultySelect.appendChild(option);
});

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', startGame);

cube.addEventListener('click', () => {
    if (!isGameRunning) return;
    
    clearTimeout(timeoutId);
    score++;
    updateScore();
    spawnCube();
    
    cube.style.transform = 'scale(0.8)';
    setTimeout(() => {
        cube.style.transform = 'scale(1)';
    }, 100);
});

window.addEventListener('resize', () => {
    if (isGameRunning) {
        positionCubeRandomly();
    }
});

function startGame() {
    score = 0;
    timerValue = 0;
    updateScore();
    updateTimer();

    const selectedDifficulty = difficultySelect.value;
    const foundDifficulty = difficulties.find(x => x.value === selectedDifficulty);
    
    currentTimeLimit = foundDifficulty ? foundDifficulty.timeLimit : 3000;
    currentCubeSize = foundDifficulty ? foundDifficulty.cubeSize : 40;
    
    cube.style.width = `${currentCubeSize}px`;
    cube.style.height = `${currentCubeSize}px`;
    
    isGameRunning = true;
    cube.style.display = 'block';
    gameOverScreen.classList.remove('visible');

    if (selectedDifficulty === 'easy') {
        gameArea.style.backgroundColor = '#e8f4f8';
    } else if (selectedDifficulty === 'medium') {
        gameArea.style.backgroundColor = '#e8f0e8';
    } else {
        gameArea.style.backgroundColor = '#f8e8e8';
    }
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timerValue += 0.1;
        updateTimer();
    }, 100);
    
    spawnCube();
}

function spawnCube() {
    clearTimeout(timeoutId);
    
    positionCubeRandomly();
    
    cube.style.backgroundColor = colorPicker.value;
    
    timeoutId = setTimeout(() => {
        gameOver();
    }, currentTimeLimit);
}

function positionCubeRandomly() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    
    const randomX = Math.floor(Math.random() * (areaWidth - currentCubeSize));
    const randomY = Math.floor(Math.random() * (areaHeight - currentCubeSize));
    
    cube.style.left = randomX + 'px';
    cube.style.top = randomY + 'px';
}

function updateScore() {
    scoreDisplay.innerHTML = `<span class="icon">🎯</span> Рахунок: ${score}`;
}

function updateTimer() {
    timerDisplay.innerHTML = `<span class="icon">⏱️</span> Час: ${timerValue.toFixed(1)}с`;
}

function gameOver() {
    isGameRunning = false;
    clearInterval(timerInterval);
    clearTimeout(timeoutId);
    
    cube.style.display = 'none';
    finalScore.textContent = `Твій рахунок: ${score}`;
    gameOverScreen.classList.add('visible');
}
