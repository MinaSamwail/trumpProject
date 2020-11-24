const canvas = document.getElementById("theField");
const context = canvas.getContext("2d");

const message = document.getElementsByClassName("gameMessage");

let rectX = 0;
let winningScore = 3;

const user = {
  x: 0,
  y: canvas.height / 2 - 100 / 2, //tu divises par 2 la hauteur de ta plateform et tu divise par 2 la hauteur de ta raquette et tu soustraits
  width: 10,
  height: 100, //hauteur de la raquette
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
  radius: 10, // augmenter le radius peut etre
  speed: 5,
  velocityX: 5,
  velocityY: 5, //cette objet me permet de definir la vitesse et la direction de la balle
  color: "RED",
};

// fonction me permettant de creer les composant dont j'ai besoin pour le jeu
function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  //taille et position de la raquette
  context.fillRect(x, y, width, height);
}

// creation de la balle
function drawCircle(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "75px fantasy";
  context.fillText(text, x, y);
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "BLACK"); // creation du canvas
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawNet();
  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  );
  drawCircle(ball.x, ball.y, ball.radius, ball.color); // 100, 100, 50, 'WHITE'
  drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
  drawText(computer.score, (3 * canvas.width) / 4, canvas.height / 5, "WHITE");
}
setInterval(render, 1000); 

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

// controle du user paddle
canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt) {
  let rect = canvas.getBoundingClientRect(); //
  user.y = evt.clientY - rect.top - user.height / 2;
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 7;

//   if (user.score == winningScore) {
//     gameOver();
//   } else if (computer.score == winningScore) {
//     gameOver();
//   }
// }

// function gameOver(playerOne) {
//   clearInterval(call);
//   if (playerOne) {
//     message.textContent = "You cheated";
//   } else {
//     message.textContent = "Looser";
//   }
// }

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
  // let computerLevel = 0.1;
  computer.y += ball.y - (computer.y + computer.height / 2); // avec cette formule il est imbatable
  // let computerLevel = 0.1;
  // computer.y += (ball.y - computer.height / 2) * computerLevel;

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
      // la Partie incroyablement galere
      //la ou la balle va taper
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
  render();
}

const framePerSecond = 50;
setInterval(game, 1000 / framePerSecond); // cette fonction permet d'appeler la fonction game 60 fois par second
