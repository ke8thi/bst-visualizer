const gameBoard = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');

const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍒', '🍉']; // 8 pairs = 16 cards

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards() {
  const doubleSymbols = [...symbols, ...symbols];
  cards = shuffle(doubleSymbols);
  gameBoard.innerHTML = '';

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${symbol}</div>
      </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if(lockBoard) return;
  if(flippedCards.includes(card)) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if(flippedCards.length === 2) {
    moves++;
    movesCounter.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  const [card1, card2] = flippedCards;
  if(card1.dataset.symbol === card2.dataset.symbol) {
    matchedPairs++;
    flippedCards = [];
    lockBoard = false;
    if(matchedPairs === symbols.length) {
      setTimeout(() => alert(`Congrats! You finished in ${moves} moves.`), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

function resetGame() {
  matchedPairs = 0;
  moves = 0;
  movesCounter.textContent = moves;
  flippedCards = [];
  lockBoard = false;
  createCards();
}

restartBtn.addEventListener('click', resetGame);

// Start game on load
resetGame();
