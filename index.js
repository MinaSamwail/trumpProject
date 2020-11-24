let canvas = document.getElementById("theField");
let canvasContext = canvas.getContext("2d");

//parametre de la balle
let ballPositionY = canvas.height / 2;
let ballPositionX = canvas.width / 2;
let ballSpeedX = 10;
let ballSpeedY = 5;
// let ballSize = 20;

//  mesure de la réactivité des sites web
let framePerSecond = 60;

//parametre de la raquete
let raquetteWidth = 10;
let raquetteHeight = 100;
let raquette1Y = 250;
let raquette2Y = 250;
// Rajouter la vitesse des raquettes ?

// score des joueurs
let playerOneScore = 0;
let playerTwoScore = 0;

let startGame = document.getElementById("startGame");
// let pauseTheGame = document.getElementById("pauseTheGame");
let gameOver = document.getElementById("gameOver");
let gameplay = document.getElementById("gameplay");

let startBtn = document.getElementsByClassName("startBtn");
// let continueBtn = document.getElementsByClassName("continueBtn");
// let restartBtn = document.getElementsByClassName("restartBtn");
let tryAgainBtn = document.getElementsByClassName("tryAgainBtn");
let theField = document.getElementsByClassName("theField");
let gameMessage = document.getElementsByClassName("gameMessage");

//Parametre
let scoreToWin = 10;
// let gamePaused = false;
let gameInProgress = false;

//Afin d'avoir la largeur et la hauteur de la fenetre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//placement des raquettes
raquette1Y = canvas.height / 2 - raquetteHeight / 2;
raquette2Y = canvas.height / 2 - raquetteHeight / 2;

//liste des className active or not
startMenu.className = "active";
gameplay.className = "";
gameOver.className = "";

startBtn.addEventListener("click", startGame);
tryAgainBtn.addEventListener("click", resetGame);
document.addEventListener("keydown", goDown);

function startGame() {
  gameInProgress = true;
  gameplay.className = "";
  startMenu.className = "";
  gameOver.className = "";
  window.setInterval(function () {
    moveEverything();
    plateform();
  }, 1000 / fps);
}

function resetGame() {
  playerOneScore = 0;
  playerTwoScore = 0;
  startGame();
}

// function drawTheGame() {
// canvasContext.fillRect = "black";
//   canvasContext.clearRect(0, 0, canvas.height, canvas.width);
// }
