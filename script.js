const cartas = [
  {
    nome: '4 de Ouros',
    codigo: '4D',
    curiosidade: 'No Truco, é a carta mais fraca, mas pode surpreender.'
  },
  {
    nome: '5 de Paus',
    codigo: '5C',
    curiosidade: 'Quase ninguém liga pra ela... mas faz parte do jogo.'
  },
  {
    nome: '6 de Espadas',
    codigo: '6S',
    curiosidade: 'Boa carta de meio de jogo. Dá para ganhar rodadas.'
  },
  {
    nome: '7 de Copas',
    codigo: '7H',
    curiosidade: 'É linda, mas no Truco vale pouco!'
  },
  {
    nome: 'Dama de Paus',
    codigo: 'QC',
    curiosidade: 'Uma das damas do baralho... charme e presença.'
  },
  {
    nome: 'Valete de Ouros',
    codigo: 'JD',
    curiosidade: 'Esse valete pode te dar a vitória se bem usado!'
  },
  {
    nome: 'Rei de Espadas',
    codigo: 'KS',
    curiosidade: 'O rei tem moral, mas precisa de apoio.'
  },
  {
    nome: 'Ás de Copas',
    codigo: 'AH',
    curiosidade: 'O Ás sempre impõe respeito. Confie nele.'
  },
  {
    nome: '2 de Espadas',
    codigo: '2S',
    curiosidade: 'No Truco, essa carta é a segunda mais forte!'
  },
  {
    nome: '3 de Paus',
    codigo: '3C',
    curiosidade: 'A carta mais poderosa do Truco tradicional!'
  }
];

function sortearCarta() {
  const sorteada = cartas[Math.floor(Math.random() * cartas.length)];

  document.getElementById("imagem-carta").src = `https://deckofcardsapi.com/static/img/${sorteada.codigo}.png`;
  document.getElementById("nome-carta").textContent = sorteada.nome;
  document.getElementById("descricao-carta").textContent = sorteada.curiosidade;
}
