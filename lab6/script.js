const NUMBER_OF_CELLS = 25;
let currentLevel = 0;
let gameState = [];
let moves = 0;
let gameGrid;
let lastClickedCell = -1;
let gameTimer = 0;
let timerInterval = null;
let gameStarted = false;
let previousLevel = -1;

document.addEventListener("DOMContentLoaded", () => {
  initGame();
});
function initGame() {
  gameGrid = document.querySelector(".grid");
  createGrid();
  setupControlButtons();
  newGame();
}
async function newGame() {
  try {
    const response = await fetch("./levels.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const levels = await response.json();

    if (levels.length === 0) {
      console.error("JSON файл не містить рівнів");
      return;
    }
    let randomLevelIndex;
    if (levels.length > 1) {
      do {
        randomLevelIndex = Math.floor(Math.random() * levels.length);
      } while (randomLevelIndex === previousLevel);
    } else {
      randomLevelIndex = Math.floor(Math.random() * levels.length);
    }

    previousLevel = randomLevelIndex;
    currentLevelData = levels[randomLevelIndex];
    currentLevel = randomLevelIndex;

    console.log(
      `Завантажено випадковий рівень: ${randomLevelIndex + 1}`,
      currentLevelData
    );

    const levelButtons = document.querySelectorAll(".level-btn");
    levelButtons.forEach((btn, index) => {
      btn.classList.remove("active");
      if (index === randomLevelIndex) {
        btn.classList.add("active");
      }
    });
    resetGame();
  } catch (error) {
    console.error("Помилка завантаження нового рівня:", error);
  }
}
function createGrid() {
  gameGrid.innerHTML = "";
  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("click", () => handleCellClick(i));
    gameGrid.appendChild(cell);
  }
}
function setupControlButtons() {
  document.querySelector(".reset").addEventListener("click", resetGame);
  document.querySelector(".new-game").addEventListener("click", newGame);
  document.querySelector(".close-btn").addEventListener("click", closeVictory);
}

function resetGame() {
  if (!currentLevelData) {
    console.error("Немає даних рівня для скидання");
    return;
  }
  gameState = currentLevelData.state.map((row) => [...row]);
  moves = 0;
  lastClickedCell = -1;
  gameStarted = false;
  stopTimer();
  resetTimer();
  updateDisplay();
  document.querySelector("#min-moves").textContent = currentLevelData.minMoves;
}

function updateDisplay() {
  const cells = document.querySelectorAll(".cell");
  gameState.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = cells[rowIndex * 5 + colIndex];
      if (cell === 1) {
        cellElement.classList.add("on");
      } else {
        cellElement.classList.remove("on");
      }
    });
  });

  document.getElementById("moves").textContent = moves;
}

function handleCellClick(index) {
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  if (lastClickedCell === index && moves > 0) {
    toggleLigths(index, false);
    lastClickedCell = -1;
  } else {
    toggleLigths(index, true);
    lastClickedCell = index;
  }

  updateDisplay();

  if (checkVictory()) {
    stopTimer();
    setTimeout(showVictory, 200);
  }
}

function toggleLigths(index, countMove = true) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const row = Math.floor(index / 5);
  const col = index % 5;

  gameState[row][col] = 1 - gameState[row][col];

  directions.forEach(([dr, dc]) => {
    const newRow = row + dr;
    const newCol = col + dc;
    if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
      gameState[newRow][newCol] = 1 - gameState[newRow][newCol];
    }
  });

  if (countMove) {
    moves++;
  } else {
    moves--;
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    gameTimer++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  gameTimer = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  document.getElementById("timer").textContent = formatTime(gameTimer);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function checkVictory() {
  return gameState.every((row) => row.every((cell) => cell === 0));
}

function showVictory() {
  const victoryMessage = document.getElementById("victory-message");
  const victoryText = document.getElementById("victory-text");
  const minMoves = currentLevelData.minMoves;

  const timeText = formatTime(gameTimer);
  let message = `Ви вирішили головоломку за ${moves} кроків та ${timeText}!`;

  if (moves === minMoves) {
    message += "<br>🏆 Ідеальний результат!";
  } else if (moves <= minMoves + 2) {
    message += "<br>⭐ Чудовий результат!";
  } else {
    message += `<br>Мінімум було ${minMoves} кроків. Спробуйте ще раз!`;
  }

  victoryText.innerHTML = message;
  victoryMessage.classList.add("show");
}

function closeVictory() {
  document.getElementById("victory-message").classList.remove("show");
  resetGame();
}
