let roundScore, scores = [], activePlayer, game = 0;
const scoresDOM = [document.getElementById('score-0'), document.getElementById('score-1')];
const roundScoreDOM = document.getElementById('roundScore');
const diceScoreDOM = document.getElementById('diceScore');
const playersDOM = [document.getElementById('player-0'), document.getElementById('player-1')];
const trophyDOM = [document.getElementById('trophy-0'), document.getElementById('trophy-1')];
const rulesDOM = document.getElementById('rules');

document.getElementById('rules-button').addEventListener('click', function() {
    rulesDOM.classList.toggle('hidden');
})

document.getElementById('start').addEventListener('click', function() {
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
    trophyDOM[0].style = "visibility: hidden;" 
    trophyDOM[1].style = "visibility: hidden;" 
    game = 1;
})

document.getElementById('reroll').addEventListener('click', function() {
    if(game) {
        let dice;
        roundScore > 0 ? dice = Math.floor(Math.random() * 6) + 1 : dice = Math.floor(Math.random() * 5) + 2;
        diceScoreDOM.textContent = 'You rolled a ' + dice;
        if (dice > 1) {
            roundScore += dice;
            roundScoreDOM.textContent = roundScore;
        }else {
            roundScore = 0;
            roundScoreDOM.textContent = roundScore;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            playersDOM[0].classList.toggle('active');
            playersDOM[1].classList.toggle('active');
            diceScoreDOM.textContent = 'Roll a dice!';
        }
    }
})

document.getElementById('stop').addEventListener('click', function() {
    if(game) {
        scores[activePlayer] += roundScore;
        roundScore = 0;        
        roundScoreDOM.textContent = roundScore;
        scoresDOM[activePlayer].textContent = scores[activePlayer];
        if(scores[0] > scores[1]) {
           trophyDOM[0].style = "visibility: visible;";
           trophyDOM[1].style = "visibility: hidden;";
        }else if(scores[1] > scores[0]) {
           trophyDOM[1].style = "visibility: visible;";
           trophyDOM[0].style = "visibility: hidden;";
        }
        diceScoreDOM.textContent = 'Roll a dice!';
        if(scores[activePlayer] >= 100) {
            game = 0;
            alert("End of game!");
            return;
        }
        playersDOM[0].classList.toggle('active');
        playersDOM[1].classList.toggle('active');
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    }
})