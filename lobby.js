function findMatch() {
  document.getElementById("status").innerText = "Spieler gefunden!";

  setTimeout(() => {
    window.location.href = "game.html";
  }, 1500);
}
