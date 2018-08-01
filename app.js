let roundScore, scores = [], activePlayer, game = 0, dice;
const scoresDOM = [document.getElementById('score-0'), document.getElementById('score-1')];
const roundScoreDOM = document.getElementById('roundScore');
const diceScoreDOM = document.getElementById('diceScore');
const playersDOM = [document.getElementById('player-0'), document.getElementById('player-1')];
const trophyDOM = [document.getElementById('trophy-0'), document.getElementById('trophy-1')];
const rulesDOM = document.getElementById('rules');
let newSpan = document.createElement('span');

function gameStart() {
    roundScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    activePlayer = 0;
    scoresDOM[0].textContent = 0;
    scoresDOM[1].textContent = 0;
    roundScoreDOM.textContent = 0;
    diceScoreDOM.textContent = 'Roll a dice!';
    playersDOM[0].classList.add('active');
    playersDOM[1].classList.remove('active');
    trophyDOM[0].classList.add('hidden');
    trophyDOM[1].classList.add('hidden');
    document.getElementById('log-0').innerHTML = 'Player 1<br>';
    document.getElementById('log-1').innerHTML = 'Player 2<br>';
    game = 1;
}

function roll() {
    roundScore > 0 ? dice = Math.floor(Math.random() * 6) + 1 : dice = Math.floor(Math.random() * 5) + 2;
    diceScoreDOM.textContent = 'You rolled a ' + dice;
    console.log(dice);
}

function resetRoundScore() {
    roundScore = 0;
}

function updateRoundScore() {
    roundScoreDOM.textContent = roundScore;
}

function updateScore() {
    scores[activePlayer] += roundScore;
    scoresDOM[activePlayer].textContent = scores[activePlayer];
}

function resetDiceScore() {
    diceScoreDOM.textContent = 'Roll a dice!';
}

function changePlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    playersDOM[0].classList.toggle('active');
    playersDOM[1].classList.toggle('active');
    console.log("player changed");
}

function currentWinner() {
    if(scores[0] > scores[1]) {
        trophyDOM[0].classList.remove('hidden');
        trophyDOM[1].classList.add('hidden');
    } else if(scores[1] > scores[0]) {
        trophyDOM[0].classList.add('hidden');
        trophyDOM[1].classList.remove('hidden');
    }
}

function toggleRules() {
    rulesDOM.classList.toggle('display');
}

function isGameWon() {
    if(scores[activePlayer] >= 100) {
        game = 0;
        resetRoundScore();
        alert("End of game!");
        return true;
    }
    return false;
}

function logRound(color) {
    newSpan.innerHTML += '<br>';
    newSpan.classList.add(color);
    document.getElementById('log-' + activePlayer).appendChild(newSpan);
    newSpan = document.createElement('span');        
}

function logRoll() {
    newSpan.innerHTML += dice + ' ';
}

function decideNextStep() {
    if(roundScore < 13 && scores[activePlayer]+roundScore < 100)
    rollDice();
    else document.getElementById('stop').click();
}

function rollDice() {
    if(game) {
        roll();
        logRoll();
        if (dice > 1) {
            roundScore += dice;
        } else {
            resetRoundScore();
            logRound('red');
            changePlayer();
            resetDiceScore();
        }
        if(activePlayer === 1) decideNextStep();
        updateRoundScore();
    }
}

function stopRound() {
    if(roundScore !== 0) {
        updateScore();
        currentWinner();
        logRound('green');
        isGameWon();
        if(game) {
            resetDiceScore();
            changePlayer();
            resetRoundScore();
            updateRoundScore();
            if(activePlayer === 1) decideNextStep();
        }
    }
}

document.getElementById('rules-button').addEventListener('click', toggleRules);

document.getElementById('start').addEventListener('click', gameStart);

document.getElementById('reroll').addEventListener('click', rollDice);

document.getElementById('stop').addEventListener('click', stopRound);