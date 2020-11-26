const canvas = document.getElementById("theField");
const context = canvas.getContext("2d");

var img = new Image();
img.src = "./images/newtrump.png";
let hitPaddle = new Audio();
hitPaddle.src = "./sound/ping.mp3";

let rectX = 0;
let winningScore = 3;
let showTheScreen = true; // ICI

const user = {
  x: 0,
  y: canvas.height / 2 - 100 / 2, //tu divises par 2 la hauteur de la plateform et tu divise par 2 la hauteur de ta raquette et tu soustraits (afin de placer la raquette au milieu)
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0,
};

const computer = {
  x: canvas.width - 10,
  y: canvas.height / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "RED",
  score: 0,
};

const net = {
  x: canvas.width / 2,
  y: 0,
  width: 4, //largeur du filet
  height: 10,
  color: "WHITE",
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5, //ce parametre me permet de definir la vitesse et la direction de la balle
  color: "RED",
};

// fonction me permettant de creer les raquettes
function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  //taille et position de la raquette
  context.fillRect(x, y, width, height);
}

// creation de la balle
function drawCircle(x, y) {
  context.drawImage(img, x, y, 50, 50);
}

function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "75px Arial";
  context.fillText(text, x, y);
}

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

function drawEverything() {
  drawRect(0, 0, canvas.width, canvas.height, "BLACK"); // creation de la zone de jeu

  if (showTheScreen) {
    context.fillStyle = "WHITE";

    if (user.score == winningScore) {
      clearInterval(endOfGame);
      context.fillText("You cheated", 250, 250);
    } else if (computer.score == winningScore) {
      clearInterval(endOfGame);
      context.fillText("I won easily", 250, 250);
    }
  }

  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawNet();
  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  );

  drawCircle(ball.x, ball.y, ball.radius, ball.color);
  drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
  drawText(computer.score, (3 * canvas.width) / 4, canvas.height / 5, "WHITE");
}
let gameInterval = setInterval(drawEverything, 1000);

// controle du user paddle
canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt) {
  let rect = canvas.getBoundingClientRect(); //
  user.y = evt.clientY - rect.top - user.height / 2;
}

function resetBall() {
  if (user.score == winningScore || computer.score == winningScore) {
    showTheScreen = true;
  }

  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 7;
}

function collision(b, p) {
  //paddle
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  // ball
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return (
    b.right > p.left && b.bottom > p.top && b.left < p.right && p.top < p.bottom
  );
}

// fonction qui me permet de definir toute la logique du jeu
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  //pilote automatique
  computer.y += ball.y - (computer.y + computer.height / 2); // avec cette formule il est imbatable

  //update the score
  if (ball.x - ball.radius < 0) {
    computer.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    resetBall();
  }

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY; // si la balle touche les rebords(les rebords sont definis par la hauteur du canvas et si la balle touche l'un de ces rebords il faut qu'elle change de direction) change de direction
  }
  let player = ball.x < canvas.width / 2 ? user : computer;

  if (collision)
    if (collision(ball, player)) {
      //play sound
      hitPaddle.play();

      //ce calcul permet de determiner les points ou la balle va taper la raquette
      let collisionPoint = ball.y - (player.y + player.height / 2);

      collisionPoint = collisionPoint / (player.height / 2);
      //ce calcul permet d'avoir l'angle quand tu frappes avec le haut / le bas et le milieu de la raquette
      let angleRad = (Math.PI / 4) * collisionPoint;

      let direction = ball.x < canvas.width / 2 ? 1 : -1; // si c'est positif la balle est frappee par le user sinon c'est l'ordi

      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);
      ball.speed += 0.5; // cela permet d'incrementer la vitesse de la balle
    }
}

function game() {
  update();
  drawEverything();
}

const framePerSecond = 50;
let endOfGame = setInterval(game, 1000 / framePerSecond); // cette fonction permet d'appeler la fonction game 60 fois par second
