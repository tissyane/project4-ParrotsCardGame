let cardNumber = null;
let deck = null;
const PARROTS = [
  "revertitparrot.gif",
  "bobrossparrot.gif",
  "tripletsparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "explodyparrot.gif",
  "unicornparrot.gif",
];
let selectedCards = null;
let numClicks = null;
let numPairs = null;

function getCardNumber() {
  cardNumber = Number(prompt("Com quantas cartas você quer jogar?"));
  if (isInvalid(cardNumber)) {
    return getCardNumber();
  }
}

function isInvalid(n) {
  if (isNaN(n)) {
    return true;
  }

  if (n % 2 !== 0) {
    return true;
  }
  return n < 4 || n > 14;
}

function renderHtml() {
  //criar string
  let str = "";
  for (let i = 0; i < cardNumber; i++) {
    str += `
        <div class="card" onclick="flip(this, '${deck[i]}')">
            <div class="front-face face">
                <img src="imagens/front.png" alt="papagaio" />
            </div>
            <div class="back-face face">
                <img src="imagens/${deck[i]}" alt="" />
            </div>
        </div>`;
  }
  const elemento = document.querySelector(".container_cards");
  elemento.innerHTML = str;
}

function getDeck() {
  deck = [];
  for (let i = 0; i < cardNumber / 2; i++) {
    const element = PARROTS[i];
    deck.push(element);
    deck.push(element);
  }
  deck.sort(comparador);
}

function comparador() {
  return Math.random() - 0.5;
}

function canFlip(card) {
  return selectedCards.length < 2 && !card.classList.contains("paired");
}

function flip(card, cardName) {
  if (canFlip(card)) {
    numClicks++;
    card.classList.add("clicked");
    selectedCards.push([cardName, card]);
    if (selectedCards.length === 2) {
      flipOff();
    }
  }
}

function verifyCards() {
  return selectedCards[0][0] === selectedCards[1][0];
}

function flipOff() {
  if (verifyCards()) {
    selectedCards[0][1].classList.add("paired");
    selectedCards[1][1].classList.add("paired");
    selectedCards = [];
    numPairs++
    if (numPairs === cardNumber / 2) {
        setTimeout(gameOver, 250);
    }
  } else {
    setTimeout(flipBack, 1000);
  }
}

function flipBack() {
  selectedCards[0][1].classList.remove("clicked");
  selectedCards[1][1].classList.remove("clicked");
  selectedCards = [];
}

function gameOver() {
    alert (`Você ganhou em ${numClicks} rodadas!`)
    const newGame = prompt ("Você quer jogar de novo?")
    if (newGame === "sim") {
    game();
    }
}

function game() {
  getCardNumber();
  getDeck();
  renderHtml();
  selectedCards = [];
  numClicks = 0;
  numPairs = 0;
}
game();
