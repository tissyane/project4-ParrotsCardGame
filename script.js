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
        <div class="card">
            <div class="front-face face">
                <img src="imagens/front.png" alt="papagaio" />
            </div>
            <div class="back-face face">
                <img src="imagens/${deck[i]}" alt="" />
            </div>
        </div>`;
  } 
  const elemento = document.querySelector(".container_cards")
  elemento.innerHTML = str;
}

function getDeck() {
    deck = [];
    for (let i = 0; i < deck.length; i++) {
        const element = PARROTS[i];
    deck.push(element);
    deck.push(element);
    }
    deck.sort(comparador);
}

function comparador() { 
	return Math.random() - 0.5; 
}

getCardNumber();
getDeck();
renderHtml();
