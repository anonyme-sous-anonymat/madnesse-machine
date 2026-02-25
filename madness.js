const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const warning = document.getElementById("warning");
const info = document.getElementById("info");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let safeMode = false; // true = rythme plus lent
let lastChange = 0;
const safeInterval = 420;   // ~2.4 Hz max en safe
const madInterval  = 80;    // full folie (~12 Hz, toujours risqué)

warning.addEventListener('click', start);
canvas.addEventListener('click', toggleSafe);

function start() {
  warning.style.display = 'none';
  info.style.display = 'block';
  loop();
}

function toggleSafe() {
  safeMode = !safeMode;
  info.textContent = safeMode 
    ? "Mode SAFE activé (moins agressif)" 
    : "Mode FULL MADNESS (très risqué !)";
  setTimeout(() => info.textContent = "Clique pour switcher safe / full madness", 2500);
}

let time = 0;
const colors = ['#ff0044', '#00ffcc', '#ffaa00', '#ff00ff', '#00ff00', '#ffff00', '#ff3366'];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function draw() {
  const now = performance.now();
  const interval = safeMode ? safeInterval : madInterval;

  if (now - lastChange < interval) {
    // Pas de redraw complet → juste overlay léger pour fluidité
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = randomColor();
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 1;
    return;
  }
  lastChange = now;

  // Fond principal
  ctx.fillStyle = safeMode ? '#111' : randomColor();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rayures diagonales rapides
  const angle = time * (safeMode ? 0.02 : 0.2);
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(angle);
  const stripeW = Math.random() * 60 + 20;
  for (let i = -canvas.width*2; i < canvas.width*2; i += stripeW * 3) {
    ctx.fillStyle = randomColor();
    ctx.fillRect(i, -canvas.height*2, stripeW, canvas.height*4);
  }
  ctx.restore();

  // Cercles qui grossissent / rétrécissent vite
  const pulse = Math.sin(time * (safeMode ? 3 : 12)) * 0.5 + 0.5;
  for (let i = 0; i < 18; i++) {
    const r = 30 + Math.random() * 180 * pulse;
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      r,
      0, Math.PI * 2
    );
    ctx.fillStyle = randomColor();
    ctx.globalAlpha = safeMode ? 0.6 : 0.9;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Lignes chaos
  for (let i = 0; i < (safeMode ? 15 : 60); i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random()*canvas.width, Math.random()*canvas.height);
    ctx.lineTo(Math.random()*canvas.width, Math.random()*canvas.height);
    ctx.strokeStyle = randomColor();
    ctx.lineWidth = Math.random()*8 + 2;
    ctx.stroke();
  }

  // Texte hurlant
  ctx.font = `${80 + Math.sin(time*8)*40}px Impact`;
  ctx.fillStyle = randomColor();
  ctx.textAlign = 'center';
  ctx.fillText(
    safeMode ? "CALME TOI" : "AAAAAAAHHHH !!!",
    canvas.width/2 + Math.sin(time*5)*80,
    canvas.height/2 + Math.cos(time*7)*60
  );

  time += 0.08;
}

function loop() {
  draw();
  requestAnimationFrame(loop);
}
