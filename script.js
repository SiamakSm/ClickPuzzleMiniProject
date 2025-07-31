const buttons = document.querySelectorAll("#buttonsContainer button");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const bestScoreDisplay = document.getElementById("bestScoreDisplay");

let numbers = [1, 2, 3, 4, 5];
let expectedNumber = 1;
let startTime = null;
let bestScore;

lastBestScore();
function lastBestScore() {
    bestScore = JSON.parse(localStorage.getItem("Best Score 5 Buttons"));
    if (bestScore) {
        bestScoreDisplay.textContent = `Your last best score is : ${bestScore.toFixed(2)} secondes`;
    } else {
        bestScoreDisplay.textContent = "You dont have a best score yet!";
    };
};

buttons.forEach((button) => {
    button.disabled = true;
    button.style.color = "red";
    button.textContent = "?";
});

buttons.forEach(button => {
    button.addEventListener("click", ({ target }) => {
        if (expectedNumber <= 5) {
            if ((Number(target.textContent)) == expectedNumber) {
                console.log(target.textContent);
                target.disabled = true;
                target.style.color = "green";
                expectedNumber++;
            };
        };
        if (expectedNumber > 5) {

            let score = (Date.now() - startTime) / 1000;
            scoreDisplay.textContent = `Time : ${score.toFixed(2)} secondes`;

            bestScore = JSON.parse(localStorage.getItem("Best Score 5 Buttons"));
            if (!bestScore || score < bestScore) {
                localStorage.setItem("Best Score 5 Buttons", score);
                bestScore = score;
                bestScoreDisplay.textContent = `Your new best score is : ${bestScore.toFixed(2)} secondes`;
            } else {
                lastBestScore();
            };
            scoreDisplay.textContent = `Time : ${score.toFixed(2)} secondes`;
            startBtn.textContent = "Restart";
            return;
        };
    });
});



startBtn.addEventListener("click", function () {
    let count = 3;
    startBtn.textContent = count;

    buttons.forEach((button) => {
        button.disabled = true;
        button.textContent = "?";
        button.style.color = "red";
    });

    scoreDisplay.textContent = "Score";
    expectedNumber = 1;
    let shuffled = [...numbers].sort(() => Math.random() - 0.5);

    let countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            startBtn.textContent = count;
        } else {
            clearInterval(countdownInterval);
            startBtn.textContent = "Go...";
            buttons.forEach((button, i) => {
                button.disabled = false;
                button.style.color = "black";
                button.textContent = shuffled[i];
                startTime = Date.now()
            });
        };
    }, 1000);
});


