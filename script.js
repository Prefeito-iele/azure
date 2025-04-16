<script>
  let playerCoins = 200;
  let opponentCoins = 200;
  let playerPoints = 0;
  let opponentPoints = 0;
  let trucoValor = 1;
  let playerHand = [];
  let opponentHand = [];
  let cartas = [Copas, AinnZapSeco, Zap, Espadilha, ourinhos, pikafumo, Josi];
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
