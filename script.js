const cartas = [
  '4♦️', '5♣️', '6♠️', '7♥️', 'Q♣️',
  'J♦️', 'K♠️', 'A♥️', '2♠️', '3♣️'
];

const imagens = {
  '4♦️': 'https://deckofcardsapi.com/static/img/4D.png',
  '5♣️': 'https://deckofcardsapi.com/static/img/5C.png',
  '6♠️': 'https://deckofcardsapi.com/static/img/6S.png',
  '7♥️': 'https://deckofcardsapi.com/static/img/7H.png',
  'Q♣️': 'https://deckofcardsapi.com/static/img/QC.png',
  'J♦️': 'https://deckofcardsapi.com/static/img/JD.png',
  'K♠️': 'https://deckofcardsapi.com/static/img/KS.png',
  'A♥️': 'https://deckofcardsapi.com/static/img/AH.png',
  '2♠️': 'https://deckofcardsapi.com/static/img/2S.png',
  '3♣️': 'https://deckofcardsapi.com/static/img/3C.png'
};

const mesa = document.getElementById('mesa');
const botao = document.getElementById('sortear');

function sortearCartas() {
  mesa.innerHTML = ''; // limpa as cartas antigas

  const embaralhadas = cartas.sort(() => 0.5 - Math.random());
  const selecionadas = embaralhadas.slice(0, 3);

  selecionadas.forEach(carta => {
    const divCarta = document.createElement('div');
    divCarta.className = 'carta';
    divCarta.style.backgroundImage = `url(${imagens[carta]})`;
    mesa.appendChild(divCarta);
  });
}

botao.addEventListener('click', sortearCartas);

