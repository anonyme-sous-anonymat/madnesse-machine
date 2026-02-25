const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const warning = document.getElementById("warning");

// Adapter au fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Cacher le warning au clic
document.addEventListener('click', () => {
  warning.style.display = 'none';
  loop(); // Lancer l'animation seulement après clic
});

// Variables pour la folie
let time = 0;
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']; // Couleurs vives

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawMadness() {
  // Fond clignotant aléatoire
  ctx.fillStyle = randomColor();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rayures agressives
  const stripeWidth = Math.random() * 50 + 10;
  for (let i = 0; i < canvas.width; i += stripeWidth * 2) {
    ctx.fillStyle = randomColor();
    ctx.fillRect(i, 0, stripeWidth, canvas.height);
  }

  // Cercles qui pulsent rapidement
  const numCircles = Math.floor(Math.random() * 50) + 20;
  for (let i = 0; i < numCircles; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 100 + 20,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.strokeStyle = randomColor();
    ctx.lineWidth = Math.random() * 10 + 5;
    ctx.stroke();
  }

  // Points et lignes folles
  const numLines = Math.floor(Math.random() * 100) + 50;
  for (let i = 0; i < numLines; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.strokeStyle = randomColor();
    ctx.lineWidth = Math.random() * 5 + 1;
    ctx.stroke();
  }

  // Texte agressif qui bouge
  ctx.font = `${Math.random() * 100 + 50}px Arial`;
  ctx.fillStyle = randomColor();
  ctx.fillText(
    "MADNESS!!!",
    Math.random() * (canvas.width - 200),
    Math.random() * (canvas.height - 50) + 50
  );

  // Incrémenter le temps pour des variations
  time += 0.1;
}

function loop() {
  drawMadness();
  requestAnimationFrame(loop); // Boucle ultra-rapide
}

// Ne lance pas avant le clic (pour le warning)
