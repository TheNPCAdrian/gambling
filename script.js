let deck = [];
let player = [];
let dealer = [];
let balance = localStorage.getItem("balance") || 100;

function createDeck() {
  const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
  deck = [];

  for (let v of values) {
    for (let i = 0; i < 4; i++) deck.push(v);
  }

  deck.sort(() => Math.random() - 0.5);
}

function val(c) {
  if (["J","Q","K"].includes(c)) return 10;
  if (c === "A") return 11;
  return Number(c);
}

function score(hand) {
  let total = 0;
  let aces = 0;

  for (let c of hand) {
    total += val(c);
    if (c === "A") aces++;
  }

  while (total > 21 && aces) {
    total -= 10;
    aces--;
  }

  return total;
}

function render() {
  document.getElementById("playerCards").innerText = player.join(" ");
  document.getElementById("dealerCards").innerText = dealer.join(" ");

  document.getElementById("playerScore").innerText = score(player);
  document.getElementById("dealerScore").innerText = score(dealer);

  document.getElementById("balance").innerText = balance;

  localStorage.setItem("balance", balance);
}

function hit() {
  player.push(deck.pop());

  if (score(player) > 21) {
    balance -= 10;
    alert("Bust!");
    end();
  }

  render();
}

function stand() {
  while (score(dealer) < 17) dealer.push(deck.pop());

  let p = score(player);
  let d = score(dealer);

  if (p > d || d > 21) balance += 20;
  else if (p < d) balance -= 10;

  end();
}

function end() {
  render();
  setTimeout(start, 1000);
}

function start() {
  createDeck();
  player = [deck.pop(), deck.pop()];
  dealer = [deck.pop()];
  render();
}

function resetGame() {
  balance = 100;
  start();
}

start();
