let playerCoins = 200;
let opponentCoins = 200;
let playerPoints = 0;
let opponentPoints = 0;

function apostarRodada() {
  const betInput = document.getElementById("betAmount");
  const bet = parseInt(betInput.value);
  const resultDiv = document.getElementById("result");

  if (isNaN(bet) || bet <= 0) {
    resultDiv.textContent = "Digite um valor válido para a aposta.";
    return;
  }

  if (bet > playerCoins || bet > opponentCoins) {
    resultDiv.textContent = "Aposta maior do que o saldo de algum jogador.";
    return;
  }

  const playerWins = Math.random() < 0.5;

  if (playerWins) {
    playerPoints++;
    playerCoins += bet;
    opponentCoins -= bet;
    resultDiv.textContent = `Você venceu a rodada! Ganhou ${bet} moedas.`;
  } else {
    opponentPoints++;
    playerCoins -= bet;
    opponentCoins += bet;
    resultDiv.textContent = `Você perdeu a rodada. Perdeu ${bet} moedas.`;
  }

  updateStatus();

  if (playerPoints >= 12) {
    resultDiv.textContent = "🎉 Você ganhou o jogo!";
    disableApostas();
  } else if (opponentPoints >= 12) {
    resultDiv.textContent = "😢 O adversário venceu o jogo.";
    disableApostas();
  }

  betInput.value = "";
}

function updateStatus() {
  document.getElementById("playerCoins").textContent = playerCoins;
  document.getElementById("opponentCoins").textContent = opponentCoins;
  document.getElementById("playerPoints").textContent = playerPoints;
  document.getElementById("opponentPoints").textContent = opponentPoints;
}

function disableApostas() {
  document.querySelector(".bet-section button").disabled = true;
  document.querySelector(".bet-section input").disabled = true;
}

function resetGame() {
  playerCoins = 200;
  opponentCoins = 200;
  playerPoints = 0;
  opponentPoints = 0;
  updateStatus();
  document.getElementById("result").textContent = "";
  document.querySelector(".bet-section button").disabled = false;
  document.querySelector(".bet-section input").disabled = false;
}

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Truco Apostas</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Truco Apostas 🔥</h1>

    <div class="status">
      <div class="player">
        <h2>Você</h2>
        <p>Moedas: <span id="playerCoins">200</span></p>
        <p>Pontos: <span id="playerPoints">0</span></p>
      </div>
      <div class="opponent">
        <h2>Adversário</h2>
        <p>Moedas: <span id="opponentCoins">200</span></p>
        <p>Pontos: <span id="opponentPoints">0</span></p>
      </div>
    </div>

    <div class="bet-section">
      <input type="number" id="betAmount" placeholder="Valor da aposta" min="1" max="200"/>
      <button onclick="apostarRodada()">Apostar</button>
    </div>

    <div class="truco-game" style="display:none">
      <div class="hand">
        <h3>Sua Mão</h3>
        <div id="playerHand" class="cards"></div>
      </div>
      <div class="actions">
        <button onclick="jogarCarta(0)">Carta 1</button>
        <button onclick="jogarCarta(1)">Carta 2</button>
        <button onclick="jogarCarta(2)">Carta 3</button>
        <button onclick="pedirTruco()">Pedir Truco</button>
      </div>
      <div id="gameMessage"></div>
    </div>

    <div id="result"></div>

    <button onclick="resetGame()">Reiniciar Jogo</button>
  </div>

  <script>
    let playerCoins = 200;
    let opponentCoins = 200;
    let playerPoints = 0;
    let opponentPoints = 0;
    let trucoValor = 1;
    let playerHand = [];
    let opponentHand = [];
    let cartas = [1, 2, 3, 4, 5, 6, 7];
    let apostaRodada = 0;

    function apostarRodada() {
      const betInput = document.getElementById("betAmount");
      apostaRodada = parseInt(betInput.value);
      const resultDiv = document.getElementById("result");

      if (isNaN(apostaRodada) || apostaRodada <= 0) {
        resultDiv.textContent = "Digite um valor válido para a aposta.";
        return;
      }

      if (apostaRodada > playerCoins || apostaRodada > opponentCoins) {
        resultDiv.textContent = "Aposta maior do que o saldo de algum jogador.";
        return;
      }

      document.querySelector(".truco-game").style.display = "block";
      distribuirCartas();
      atualizarMao();
      resultDiv.textContent = "";
    }

    function distribuirCartas() {
      playerHand = embaralhar(cartas).slice(0, 3);
      opponentHand = embaralhar(cartas).slice(0, 3);
    }

    function embaralhar(array) {
      return [...array].sort(() => Math.random() - 0.5);
    }

    function atualizarMao() {
      const handDiv = document.getElementById("playerHand");
      handDiv.innerHTML = "";
      playerHand.forEach((carta, i) => {
        const el = document.createElement("div");
        el.textContent = `Carta ${carta}`;
        el.className = "carta";
        handDiv.appendChild(el);
      });
    }

    function jogarCarta(indice) {
      if (!playerHand[indice]) return;

      const cartaPlayer = playerHand[indice];
      const cartaBot = opponentHand[Math.floor(Math.random() * opponentHand.length)];
      playerHand.splice(indice, 1);
      opponentHand.splice(opponentHand.indexOf(cartaBot), 1);

      const msg = document.getElementById("gameMessage");
      if (cartaPlayer > cartaBot) {
        playerPoints++;
        playerCoins += apostaRodada * trucoValor;
        opponentCoins -= apostaRodada * trucoValor;
        msg.textContent = `Você venceu esta mão! (${cartaPlayer} vs ${cartaBot})`;
      } else if (cartaPlayer < cartaBot) {
        opponentPoints++;
        playerCoins -= apostaRodada * trucoValor;
        opponentCoins += apostaRodada * trucoValor;
        msg.textContent = `Você perdeu esta mão. (${cartaPlayer} vs ${cartaBot})`;
      } else {
        msg.textContent = `Empate na mão. (${cartaPlayer} vs ${cartaBot})`;
      }

      atualizarStatus();
      atualizarMao();
      checarFimJogo();
    }

    function pedirTruco() {
      const aceitar = Math.random() < 0.5;
      const msg = document.getElementById("gameMessage");
      if (aceitar) {
        trucoValor = 3;
        msg.textContent = "Adversário aceitou o Truco! Agora vale 3!";
      } else {
        playerPoints++;
        playerCoins += apostaRodada;
        opponentCoins -= apostaRodada;
        msg.textContent = "Adversário correu! Você ganhou a rodada.";
        checarFimJogo();
      }
      atualizarStatus();
    }

    function atualizarStatus() {
      document.getElementById("playerCoins").textContent = playerCoins;
      document.getElementById("opponentCoins").textContent = opponentCoins;
      document.getElementById("playerPoints").textContent = playerPoints;
      document.getElementById("opponentPoints").textContent = opponentPoints;
    }

    function checarFimJogo() {
      if (playerPoints >= 12) {
        document.getElementById("result").textContent = "🎉 Você ganhou o jogo!";
        desativarJogo();
      } else if (opponentPoints >= 12) {
        document.getElementById("result").textContent = "😢 O adversário venceu o jogo.";
        desativarJogo();
      }
    }

    function desativarJogo() {
      document.querySelector(".truco-game").style.display = "none";
      document.querySelector(".bet-section button").disabled = true;
      document.querySelector(".bet-section input").disabled = true;
    }

    function resetGame() {
      playerCoins = 200;
      opponentCoins = 200;
      playerPoints = 0;
      opponentPoints = 0;
      trucoValor = 1;
      apostaRodada = 0;
      atualizarStatus();
      document.getElementById("result").textContent = "";
      document.getElementById("gameMessage").textContent = "";
      document.querySelector(".truco-game").style.display = "none";
      document.querySelector(".bet-section button").disabled = false;
      document.querySelector(".bet-section input").disabled = false;
    }
  </script>
</body>
</html>
