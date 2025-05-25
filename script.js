"use strict";
const funnySavePhrases = [
  "Та він з магнітом у рукавицях!",
  "Воротар каже: не сьогодні!",
  "Це не сейв — це кіно!",
  "Знову він... дай вже гол забити!",
  "Цей сейв заслуговує Оскара!",
  "Хоч щось у цій грі стабільне — сейви.",
  "М'яч зник. А, він у руках воротаря.",
  "Як він це зробив?!",
];
const funnyPraises = [
  "Та ти, певно, родич Мессі!",
  "Воротар ще досі шукає м’яч у траві!",
  "Ворота трималися, але ти — не пожалів!",
  "Сусіди аплодують стоячи!",
  "Воротар плаче в кутку…"
];


const keeperPositions = [
  {
    src: "./goalkeeper/top-left.png",
    width: 220,
    height: 290,
    offsetX: 200,
    offsetY: 290,
  },
  {
    src: "./goalkeeper/top-center.png",
    width: 220,
    height: 360,
    offsetX: 300,
    offsetY: 220,
  },
  {
    src: "./goalkeeper/top-right.png",
    width: 220,
    height: 200,
    offsetX: 370,
    offsetY: 330,
  },
  {
    src: "./goalkeeper/middle-left.png",
    width: 220,
    height: 350,
    offsetX: 190,
    offsetY: 220,
  },
  {
    src: "./goalkeeper/middle-center.png",
    width: 220,
    height: 340,
    offsetX: 360,
    offsetY: 220,
  },
  {
    src: "./goalkeeper/middle-right.png",
    width: 220,
    height: 400,
    offsetX: 370,
    offsetY: 180,
  },
  {
    src: "./goalkeeper/bottom-left.png",
    width: 220,
    height: 330,
    offsetX: 170,
    offsetY: 220,
  },
  {
    src: "./goalkeeper/bottom-center.png",
    width: 220,
    height: 330,
    offsetX: 300,
    offsetY: 210,
  },
  {
    src: "./goalkeeper/bottom-right.png",
    width: 220,
    height: 330,
    offsetX: 400,
    offsetY: 220,
  },
];
const ballPositions = {
  1: { left: "215px", bottom: "475px" },
  2: { left: "375px", bottom: "475px" },
  3: { left: "535px", bottom: "475px" },
  4: { left: "215px", bottom: "400px" },
  5: { left: "375px", bottom: "400px" },
  6: { left: "535px", bottom: "400px" },
  7: { left: "215px", bottom: "320px" },
  8: { left: "375px", bottom: "320px" },
  9: { left: "535px", bottom: "320px" },
};
document.addEventListener("DOMContentLoaded", function () {
  let scoreCount = 0;
  let shotTimer;
  let shotTimeLeft = 5;
  let isShotAllowed = false;
  let isPaused = false;
  let difficulty = "normal";

  const score = document.getElementById("score");
  const message = document.getElementById("message");
  const ball = document.getElementById("ball");
  const goalkeeper = document.getElementById("goalkeeper");

  const difficultySelect = document.getElementById("difficulty");
  difficultySelect.addEventListener("change", function () {
    difficulty = this.value;
  });
  //buttons
  document.getElementById("startGame").addEventListener("click", function () {
    this.style.display = "none";
    document.getElementById("pauseGame").style.display = "inline-block";
    document.getElementById("endGame").style.display = "inline-block";
    message.textContent = "Виберіть секцію для удару!";
    startShotTimer();
  });
  document.getElementById("endGame").addEventListener("click", function () {
    clearInterval(shotTimer);
    scoreCount = 0;
    score.textContent = "Голи: 0";
    isShotAllowed = false;
    disableSectionHover();

    document.getElementById("shotTimer").textContent = "Час на удар: -";
    message.textContent =
      "Гру завершено. Натисніть 'Почати гру' щоб почати знову.";

    this.style.display = "none";
    document.getElementById("pauseGame").style.display = "none";
    document.getElementById("startGame").style.display = "inline-block";

    resetRound();
  });

  document.getElementById("pauseGame").addEventListener("click", function () {
    if (!isPaused) {
      clearInterval(shotTimer);
      isPaused = true;
      isShotAllowed = false;
      disableSectionHover();
      this.textContent = "Продовжити";
      message.textContent = "Пауза. Натисніть 'Продовжити' щоб грати далі.";
    } else {
      isPaused = false;
      isShotAllowed = true;
      enableSectionHover();
      this.textContent = "Пауза";
      message.textContent = "Виберіть секцію для удару!";
      resumeShotTimer();
    }
  });

  //

  setupSectionClicks();

  function shootBall(targetSection) {
    const position = ballPositions[targetSection];
    ball.style.left = position.left;
    ball.style.bottom = position.bottom;

    let keeperTarget;
    if (difficulty === "easy") {
      keeperTarget =
        Math.random() < 0.15
          ? targetSection
          : Math.floor(Math.random() * 9) + 1;
    } else if (difficulty === "normal") {
      keeperTarget =
        Math.random() < 0.25
          ? targetSection
          : Math.floor(Math.random() * 9) + 1;
    } else if (difficulty === "hard") {
      keeperTarget =
        Math.random() < 0.35
          ? targetSection
          : Math.floor(Math.random() * 9) + 1;
    }
    if (targetSection === keeperTarget) {
      ball.style.zIndex = "1";
    } else {
      ball.style.zIndex = "0";
    }

    drawKeeper(keeperTarget);

    setTimeout(() => {
      if (targetSection === keeperTarget) {
        message.textContent =
          funnySavePhrases[Math.floor(Math.random() * funnySavePhrases.length)];
        document.getElementById("pauseGame").style.display = "none";
        document.getElementById("endGame").style.display = "none";
        document.getElementById("startGame").style.display = "inline-block";
        setTimeout(() => {
          resetGame();
          disableSectionHover();
        }, 3000);
      } else {
        scoreCount++;
        score.textContent = `Голи: ${scoreCount}`;
        resetRound();
        startShotTimer();
        message.textContent = funnyPraises[Math.floor(Math.random() * funnyPraises.length)];
      }
    }, 1000);
  }

  function resetRound() {
    ball.style.left = "375px";
    ball.style.bottom = "100px";
    goalkeeper.style.left = "290px";
    goalkeeper.style.bottom = "220px";
    goalkeeper.style.height = "380px";
    goalkeeper.style.width = "220px";
    goalkeeper.style.background =
      "url(./goalkeeper/default.png) no-repeat center";
    goalkeeper.style.backgroundSize = "cover";

    document.getElementById("shotTimer").textContent = "Час на удар: -";

    isShotAllowed = false;
  }

  function setupSectionClicks() {
    for (let i = 1; i <= 9; i++) {
      document
        .getElementById(`section${i}`)
        .addEventListener("click", function () {
          if (!isShotAllowed) return;

          clearInterval(shotTimer);
          shootBall(i);
          isShotAllowed = false;
        });
    }
  }

  function drawKeeper(keeperTarget) {
    goalkeeper.style.background = `url('${
      keeperPositions[keeperTarget - 1].src
    }') no-repeat center`;
    goalkeeper.style.backgroundSize = "cover";
    goalkeeper.style.width = `${keeperPositions[keeperTarget - 1].width}px`;
    goalkeeper.style.height = `${keeperPositions[keeperTarget - 1].height}px`;
    goalkeeper.style.bottom = `${keeperPositions[keeperTarget - 1].offsetY}px`;
    goalkeeper.style.left = `${keeperPositions[keeperTarget - 1].offsetX}px`;
  }

  function resetGame() {
    scoreCount = 0;
    score.textContent = "Голи: 0";
    resetRound();
    message.textContent = "Натисніть кнопку, щоб почати гру!";
  }

  function resumeShotTimer() {
    const shotTimerElement = document.getElementById("shotTimer");
    shotTimerElement.textContent = `Час на удар: ${shotTimeLeft}`;

    shotTimer = setInterval(() => {
      if (isPaused) return;
      shotTimeLeft--;
      shotTimerElement.textContent = `Час на удар: ${shotTimeLeft}`;
      if (shotTimeLeft === 3) {
        document.getElementById("shotTimer").classList.add("critical");
      }
      if (shotTimeLeft <= 0) {
        clearInterval(shotTimer);
        message.textContent = "Час вичерпано! Виконуємо випадковий удар...";
        const randomSection = Math.floor(Math.random() * 9) + 1;
        shootBall(randomSection);
        isShotAllowed = false;
      }
    }, 1000);
  }

  function startShotTimer() {
    if (isShotAllowed) return;
    message.textContent = "Виберіть секцію для удару!";
    isShotAllowed = true;
    isPaused = false;
    enableSectionHover();
    document.getElementById("shotTimer").classList.remove("critical");
    shotTimeLeft = 5;
    resumeShotTimer();
  }

  function enableSectionHover() {
    document
      .querySelectorAll(".goal-section")
      .forEach((el) => el.classList.add("hover-enabled"));
  }

  function disableSectionHover() {
    document
      .querySelectorAll(".goal-section")
      .forEach((el) => el.classList.remove("hover-enabled"));
  }
});
