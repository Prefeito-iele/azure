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
