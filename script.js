const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const bestScoreDisplay = document.getElementById("bestScoreDisplay");
const modeButtons = document.querySelectorAll('input[name="mode"]');
const allButtons = document.getElementById("allButtons");

let count;
let startWaitTime;
let numbers;
let expectedNumber = 1;
let startTime = null;
let bestScore;
let interval;
let isPlaying = false;

modeButton();
function modeButton() {
    for (let button of modeButtons) {
        if (button.checked) {
            return Number(button.value);
        };
    };
    return null;
}

lastBestScore();
function lastBestScore() {
    bestScore = JSON.parse(localStorage.getItem("orderButtons"));
    if (bestScore) {
        bestScoreDisplay.textContent = `Your last best score is : ${bestScore.toFixed(2)} secondes`;
    } else {
        bestScoreDisplay.textContent = "You dont have a best score yet!";
    };
};


startBtn.addEventListener("click", function () {
    if (isPlaying) return;

    isPlaying = true;
    clearInterval(interval);
    startWaitTime = 3;
    startBtn.textContent = startWaitTime;
    allButtons.textContent = "";

    interval = setInterval(() => {
        startWaitTime--;
        startBtn.textContent = startWaitTime;

        if (startWaitTime == 0) {
            clearInterval(interval);
            count = modeButton();
            numbers = Array.from({ length: count }, (_, i) => i + 1);
            let shuffled = [...numbers].sort(() => Math.random() - 0.5);
            startBtn.textContent = "Go...";

            for (let i = 0; i < count; i++) {
                let button = document.createElement("button");
                button.disabled = false;
                button.style.color = "black";
                button.textContent = shuffled[i];
                addEventFunction(button);
                allButtons.appendChild(button);
            }
            startTime = Date.now();
            startBtn.textContent = "RESTART";
            isPlaying = false;
        };
    }, 1000);

    scoreDisplay.textContent = "Score";
    expectedNumber = 1;

});


function addEventFunction(button) {
    button.addEventListener("click", ({ target }) => {
        if (expectedNumber <= count) {
            if ((Number(target.textContent)) == expectedNumber) {
                console.log(target.textContent);
                target.disabled = true;
                target.classList.add("clicked");
                expectedNumber++;
            };
        };
        if (expectedNumber > count) {
            let score = (Date.now() - startTime) / 1000;
            scoreDisplay.textContent = `Time : ${score.toFixed(2)} secondes`;

            bestScore = JSON.parse(localStorage.getItem("orderButtons"));
            if (!bestScore || score < bestScore) {
                localStorage.setItem("orderButtons", score);
                bestScore = score;
                bestScoreDisplay.textContent = `Your new best score is : ${bestScore.toFixed(2)} secondes`;
            } else {
                lastBestScore();
            };
            scoreDisplay.textContent = `Time : ${score.toFixed(2)} secondes`;
            startBtn.textContent = "Try Again?";
            isPlaying = false;
            return;
        };
    });
};

