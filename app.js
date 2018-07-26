let roundScore, score_0, score_1, activePlayer;

document.getElementById('start').addEventListener('click', function() {
    roundScore = 0;
    score_0 = 0;
    score_1 = 0;
    activePlayer = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('roundScore-0').textContent = 0;
    document.getElementById('roundScore-1').textContent = 0;
})

document.getElementById('reroll').addEventListener('click', function() {
    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceScore-' + activePlayer).textContent = 'You rolled a ' + dice;
    if (dice > 1) {
        roundScore += dice;
        document.getElementById('roundScore-' + activePlayer).textContent = roundScore;
    }else {
        roundScore = 0;
        document.getElementById('roundScore-' + activePlayer).textContent = roundScore;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.getElementById('player-0').classList.toggle('active');
        document.getElementById('player-1').classList.toggle('active');
    }
})

document.getElementById('stop').addEventListener('click', function() {
    activePlayer === 0 ? score_0 += roundScore : score_1 += roundScore;
    roundScore = 0;        
    document.getElementById('roundScore-' + activePlayer).textContent = roundScore;
    document.getElementById('score-' + activePlayer).textContent = 
    activePlayer === 0 ? score_0 : score_1;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('player-0').classList.toggle('active');
    document.getElementById('player-1').classList.toggle('active');
})

