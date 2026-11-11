
score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0
};

const moveImages = {
    rock: "./icons8-fist-100.png",
    paper: "./icons8-so-so-100.png",
    scissors: "./icons8-hand-scissors-100.png"
};

showScore();


function computermove(){
    const randomNumber = Math.random();
    if (randomNumber < 1/3){
        computerplay = "rock";
    }
    else if (randomNumber <= 2/3){
        computerplay = "paper";
    }
    else {
        computerplay = "scissors";
    }
}


function playerMoveRock(){
    if (computerplay === "rock"){
        result = "you tied!";
    }
    else if (computerplay === "scissors"){
        result = "you won!";
    }
    else {
        result = "you lost!";
    }
    showResult();
}

function playerMovePaper(){
    if (computerplay === "rock"){
        result = "you won!";
    }
    else if (computerplay === "paper"){
        result = "you tied!";
    }
    else {
        result = "you lost!";
    }
    showResult();
}

function playerMoveScissors(){
    if (computerplay === "rock"){
        result = "you lost!";
    }
    else if (computerplay === "paper"){
        result = "you won!";
    }
    else {
        result = "you tied!";
    }
    showResult();
}


// Shows both moves in the arena and colors the result banner.
function showResult(){
    const playerSlot = document.querySelector(".js-player-slot");
    const cpuSlot = document.querySelector(".js-cpu-slot");
    playerSlot.innerHTML = '<img src="' + moveImages[playerplay] + '" alt="' + playerplay + '">';
    cpuSlot.innerHTML = '<img src="' + moveImages[computerplay] + '" alt="' + computerplay + '">';

    playerSlot.classList.toggle("winner", result === "you won!");
    cpuSlot.classList.toggle("winner", result === "you lost!");

    document.querySelectorAll(".move-btn").forEach(function(btn){
        btn.classList.toggle("picked", btn.dataset.move === playerplay);
    });

    const resultEl = document.querySelector(".js-result");
    resultEl.innerHTML = result;
    resultEl.className = "js-result";
    if (result === "you won!") resultEl.classList.add("win");
    else if (result === "you lost!") resultEl.classList.add("loss");
    else resultEl.classList.add("tie");
    bump(resultEl);
}


function updateScore(){
    if (result === "you won!"){
        score.wins++;
        bump(document.querySelector(".js-wins"));
    }
    else if (result === "you lost!"){
        score.losses++;
        bump(document.querySelector(".js-losses"));
    }
    else {
        score.ties++;
        bump(document.querySelector(".js-ties"));
    }
    showScore();
    localStorage.setItem("score", JSON.stringify(score));
}

function showScore(){
    document.querySelector(".js-wins").innerHTML = score.wins;
    document.querySelector(".js-losses").innerHTML = score.losses;
    document.querySelector(".js-ties").innerHTML = score.ties;
}

function resetScore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    showScore();
    localStorage.removeItem("score");

    document.querySelector(".js-player-slot").innerHTML = '<span class="placeholder">?</span>';
    document.querySelector(".js-cpu-slot").innerHTML = '<span class="placeholder">?</span>';
    document.querySelectorAll(".winner, .picked").forEach(function(el){
        el.classList.remove("winner", "picked");
    });
    const resultEl = document.querySelector(".js-result");
    resultEl.className = "js-result";
    resultEl.innerHTML = "make a move to start";
}

// Restarts a small CSS "bump" animation on an element.
function bump(el){
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
}
