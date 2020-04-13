let cards = [
    'ac.jpg',
    'ad.jpg',
    'ah.jpg',
    'as.jpg',
    '2c.jpg',
    '2d.jpg',
    '2h.jpg',
    '2s.jpg',
    '3c.jpg',
    '3d.jpg',
    '3h.jpg',
    '3s.jpg',
    '4c.jpg',
    '4d.jpg',
    '4h.jpg',
    '4s.jpg',
    '5c.jpg',
    '5d.jpg',
    '5h.jpg',
    '5s.jpg',
    '6c.jpg',
    '6d.jpg',
    '6h.jpg',
    '6s.jpg',
    '7c.jpg',
    '7d.jpg',
    '7h.jpg',
    '7s.jpg',
    '8c.jpg',
    '8d.jpg',
    '8h.jpg',
    '8s.jpg',
    '9c.jpg',
    '9d.jpg',
    '9h.jpg',
    '9s.jpg',
    '10c.jpg',
    '10d.jpg',
    '10h.jpg',
    '10s.jpg',
    'jc.jpg',
    'jd.jpg',
    'jh.jpg',
    'js.jpg',
    'qc.jpg',
    'qd.jpg',
    'qh.jpg',
    'qs.jpg',
    'kc.jpg',
    'kd.jpg',
    'kh.jpg',
    'ks.jpg'
]

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

const wrapper = document.querySelector('.wrapper');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const whoseTurn = document.querySelector('.whoseTurn');
const nextButton = document.querySelector('.nextButton');
nextButton.addEventListener('click', nextTurn);

let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;
let firstCard;
let secondCard;
let turnCount = 1;
let currentPlayer = 1;

function flip() {
    // do nothing if player already had two flips
    if (turnCount > 2) {
        return;
    }
    
    if (this.src.endsWith('img/noface.jpg')) {
        this.src = 'img/' + this.id;
    } else {
        // don't flip if card has face up already
        return;
    }

    if (turnCount === 1) {
        firstCard = this.id;
    } else if (turnCount === 2){
        secondCard = this.id;
        compareCards();
    }
    turnCount++;
}

function nextTurn() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        whoseTurn.textContent = `${player2Name}'s turn`;
    } else {
        currentPlayer = 1;
        whoseTurn.textContent = `${player1Name}'s turn`;
    }

    const first = document.getElementById(firstCard);    
    // if no match, then turn cards face down
    if (first.src.endsWith('blank.jpg') === false) {
        const second = document.getElementById(secondCard);
        first.src = 'img/noface.jpg';
        second.src = 'img/noface.jpg';
    }

    firstCard = undefined;
    secondCard = undefined;

    turnCount = 1;
}

function compareCards(){
    if (firstCard[0] === secondCard[0]) {
        if (currentPlayer === 1) {
            player1Score++;
        } else {
            player2Score++;
        }

        const first = document.getElementById(firstCard);
        const second = document.getElementById(secondCard);
        first.src = 'img/blank.jpg';
        second.src = 'img/blank.jpg';
        first.removeEventListener('click', flip)
        second.removeEventListener('click', flip);

        if ((player1Score + player2Score) === 26) {
            gameOver();
        } else {
            player1.textContent = `${player1Name}: ${player1Score}`;
            player2.textContent = `${player2Name}: ${player2Score}`;
        }
    }
}

function gameOver() {
    if (player1Score > player2Score) {
        alert(`${player1Name} WINS!`);
    } else if (player2Score > player1Score) {
        alert(`${player2Name} WINS!`);
    } else {
        alert(`Its a draw`);
    }
    newGame();
}

function shuffleCards() {
    let shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++) {
        let image = document.createElement('img');
        image.src = 'img/noface.jpg';
        image.className = 'cards';
        image.id = shuffledCards[i];
        image.addEventListener('click', flip);
        wrapper.appendChild(image);
    }
}

function newGame() {
    player1Name = prompt('Name of Player 1');
    player2Name = prompt('Name of Player 2');
    player1Score = 0;
    player2Score = 0;
    firstCard = undefined;
    secondCard = undefined;
    turnCount = 1;

    player1.textContent = `${player1Name}: 0`;
    player2.textContent = `${player2Name}: 0`;
    whoseTurn.textContent = `${player1Name}'s turn`;
    shuffleCards();
}

newGame();