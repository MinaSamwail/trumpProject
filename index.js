const canvas = document.getElementById("theField");
const context = canvas.getContext("2d");

let rectX = 0;

//ici on creer 2 objets afin de definir les joueurs
const user = {
  x: 0,
  y: canvas.height / 2 - 100 / 2, //tu divises par 2 la hauteur de ta plateform et tu divise par 2 la hauteur de ta raquette et tu soustraits
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
  color: "WHITE",
  score: 0,
};

const net = {
  x: canvas.width / 2,
  y: 0,
  width: 2,
  height: 10,
  color: "WHITE",
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  color: "red",
};

// fonction pour les raquettes
function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  //taille et position de la raquette
  context.fillRect(x, y, width, height);
}

// // creation de la balle
// function ball(x, y, width, height, color) {
//   context.fillStyle = "red";
//   context.beginPath();
//   context.arc(400, 300, 100, 0, Math.PI * 2, false); //x,y,radius
//   context.closePath();
//   context.fill();
// }

function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "75px fantasy";
  context.fillText(text, x, y);
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawNet();
  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  );
  // drawCircle(ball.x, ball.y, ball.radius, ball.color);
  drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
  drawText(computer.score, (3 * canvas.width) / 4, canvas.height / 5, "WHITE");
}
setInterval(render, 1000);

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}
