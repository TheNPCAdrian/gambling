let deck = [];
let player = [];
let dealer = [];
let balance = Number(localStorage.getItem("balance")) || 100;

function cardImg(card) {
  return `https://deckofcardsapi.com/static/img/${card}.png`;
}

function createDeck() {
  const suits = ["S","H","D","C"];
  const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

  deck = [];

  for (let s of suits) {
    for (let v of values) {
      deck.push(v + s);
    }
  }

  deck.sort(() => Math.random() - 0.5);
}

function val(c) {
  let v = c.slice(0, -1);

  if (["J","Q","K"].includes(v)) return 10;
  if (v === "A") return 11;
  return Number(v);
}

function score(hand) {
  let total = 0;
  let aces = 0;

  for (let c of hand) {
    let v = c.slice(0, -1);
    total += val(c);

    if (v === "A") aces++;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function render() {
  document.getElementById("playerCards").innerHTML =
    player.map(c => `<img src="${cardImg(c)}">`).join("");

  document.getElementById("dealerCards").innerHTML =
    dealer.map(c => `<img src="${cardImg(c)}">`).join("");

  document.getElementById("balance").innerText = balance;

  localStorage.setItem("balance", balance);
}

function hit() {
  player.push(deck.pop());

  if (score(player) > 21) {
    balance = Math.max(0, balance - 10);
    render();

    setTimeout(start, 1500);
    return;
  }

  render();
}

function stand() {
  while (score(dealer) < 17) {
    dealer.push(deck.pop());
  }

  let p = score(player);
  let d = score(dealer);

  if (p > d || d > 21) {
    balance += 20;
  } else {
    balance = Math.max(0, balance - 10);
  }

  render();

  setTimeout(start, 1500);
}

function start() {
  createDeck();

  player = [deck.pop(), deck.pop()];
  dealer = [deck.pop()];

  render();
}

start();
