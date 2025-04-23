const cartas = [
  '4D', '5C', '6S', '7H', 'QC', 'JD', 'KS', 'AH', '2S', '3C'
];

const imagens = carta => `https://deckofcardsapi.com/static/img/${carta}.png`;

let pontosJogador = 0;
let pontosCPU = 0;

const mesa = document.getElementById('mesa');
const maoJogador = document.getElementById('maoJogador');
const btnNovaRodada = document.getElementById('novaRodada');
const spanJogador = document.getElementById('pontosJogador');
const spanCPU = document.getElementById('pontosCPU');

btnNovaRodada.addEventListener('click', iniciarRodada);

function iniciarRodada() {
  mesa.innerHTML = '';
  maoJogador.innerHTML = '';

  const baralho = [...cartas].sort(() => 0.5 - Math.random());
  const mao = baralho.slice(0, 6);
  const maoJog = mao.slice(0, 3);
  const maoComp = mao.slice(3, 6);

  maoJog.forEach((carta, index) => {
    const div = document.createElement('div');
    div.className = 'carta';
    div.style.backgroundImage = `url(${imagens(carta)})`;
    div.onclick = () => jogarCarta(carta, maoComp[index]);
    maoJogador.appendChild(div);
  });
}

function jogarCarta(cartaJog, cartaComp) {
  maoJogador.innerHTML = '';
  mesa.innerHTML = '';

  const cartaJogEl = document.createElement('div');
  cartaJogEl.className = 'carta';
  cartaJogEl.style.backgroundImage = `url(${imagens(cartaJog)})`;

  const cartaCompEl = document.createElement('div');
  cartaCompEl.className = 'carta';
  cartaCompEl.style.backgroundImage = `url(${imagens(cartaComp)})`;

  mesa.appendChild(cartaJogEl);
  mesa.appendChild(cartaCompEl);

  if (cartas.indexOf(cartaJog) > cartas.indexOf(cartaComp)) {
    pontosJogador++;
  } else {
    pontosCPU++;
  }

  spanJogador.textContent = pontosJogador;
  spanCPU.textContent = pontosCPU;

  if (pontosJogador >= 12) {
    alert("Você venceu o jogo!");
    resetarJogo();
  } else if (pontosCPU >= 12) {
    alert("O computador venceu o jogo!");
    resetarJogo();
  }
}

function resetarJogo() {
  pontosJogador = 0;
  pontosCPU = 0;
  spanJogador.textContent = '0';
  spanCPU.textContent = '0';
  mesa.innerHTML = '';
  maoJogador.innerHTML = '';
}
