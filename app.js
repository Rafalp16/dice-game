let roundScore, scores = [], activePlayer, game = 0, dice;
const scoresDOM = [document.getElementById('score-0'), document.getElementById('score-1')];
const roundScoreDOM = document.getElementById('roundScore');
const diceScoreDOM = document.getElementById('diceScore');
const playersDOM = [document.getElementById('player-0'), document.getElementById('player-1')];
const trophyDOM = [document.getElementById('trophy-0'), document.getElementById('trophy-1')];
const rulesDOM = document.getElementById('rules');

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
    document.getElementById('log-0').textContent = 'Player 1\r\n';
    document.getElementById('log-1').textContent = 'Player 2\r\n';
    game = 1;
}

function roll() {
    roundScore > 0 ? dice = Math.floor(Math.random() * 6) + 1 : dice = Math.floor(Math.random() * 5) + 2;
    diceScoreDOM.textContent = 'You rolled a ' + dice;
    console.log(dice);
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

function isGameWon() {
    if(scores[activePlayer] >= 100) {
        game = 0;
        roundScore = 0;
        alert("End of game!");
        return true;
    }
    return false;
}

function enemy() {
    roll();
    document.getElementById('log-' + activePlayer).textContent += (dice + ' ');
    if (dice > 1) {
        roundScore += dice;
        if(roundScore < 13 && scores[activePlayer]+roundScore < 100)
        enemy();
        else document.getElementById('stop').click();
    } else {
        roundScore = 0;
        document.getElementById('log-' + activePlayer).textContent += ('\r\n');
        changePlayer();
        resetDiceScore();
    }
    updateRoundScore();
}

document.getElementById('rules-button').addEventListener('click', function() {
    rulesDOM.classList.toggle('display');
})

document.getElementById('start').addEventListener('click', gameStart);

document.getElementById('reroll').addEventListener('click', function() {
    if(game) {
        roll();
        document.getElementById('log-' + activePlayer).textContent += (dice + ' ');
        if (dice > 1) {
            roundScore += dice;
        } else {
            roundScore = 0;
            document.getElementById('log-' + activePlayer).textContent += ('\r\n');
            changePlayer();
            if(activePlayer === 1) enemy();
            resetDiceScore();
        }
        updateRoundScore();
    }
})

document.getElementById('stop').addEventListener('click', function() {
    updateScore();
    currentWinner();
    isGameWon();
    if(game) {
        resetDiceScore();
        document.getElementById('log-' + activePlayer).textContent += ('\r\n');
        changePlayer();
        roundScore = 0;
        updateRoundScore();
        if(activePlayer === 1) enemy();
    }
})