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
  preloadImages(); // Précharge les images infernales
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

// Nouvelles features : Images infernales ultra malaisantes
const infernalImages = [];
const imageUrls = [
  'https://cultmetalflix.wordpress.com/wp-content/uploads/2019/07/head-explosion-abrasive-audio-header-e1564603877922.jpg?w=800', // Explosion tête gore
  'https://example.com/moloch-demon-sacrifice-art.jpg', // Placeholder Moloch sacrificiel (remplace par une vraie URL dark art)
  'https://example.com/body-horror-distorted-flesh.jpg', // Corps déformé violent
  'https://example.com/occult-ritual-blood.jpg', // Rituel occulte borderline
  'https://example.com/demon-eyes-abyss.jpg', // Yeux démoniaques malaisants
  'https://example.com/violent-glitch-art.jpg'  // Glitch ultra violent fictif
]; // Ajoute plus d'URLs si tu veux (cherche "moloch demon art violent" sur des sites d'art dark)

function preloadImages() {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous'; // Pour éviter CORS issues
    img.onload = () => infernalImages.push(img);
  });
}

function drawInfernalImage() {
  if (infernalImages.length === 0) return;
  const numImages = safeMode ? 1 : Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < numImages; i++) {
    const img = infernalImages[Math.floor(Math.random() * infernalImages.length)];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const scale = (safeMode ? 0.3 : Math.random() * 0.8 + 0.4) * Math.min(canvas.width, canvas.height) / Math.max(img.width, img.height);
    const rotation = Math.random() * Math.PI * 2;
    const alpha = safeMode ? 0.4 : Math.random() * 0.6 + 0.4;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.drawImage(img, -img.width * scale / 2, -img.height * scale / 2, img.width * scale, img.height * scale);
    
    // Effet glitch : inversion couleurs random
    if (Math.random() > 0.5 && !safeMode) {
      ctx.globalCompositeOperation = 'difference';
      ctx.fillStyle = randomColor();
      ctx.fillRect(-img.width * scale / 2, -img.height * scale / 2, img.width * scale, img.height * scale);
    }
    ctx.restore();
  }
}

// Nouvelles features : Spirales infernales
function drawSpirals() {
  const numSpirals = safeMode ? 2 : Math.floor(Math.random() * 5) + 3;
  for (let s = 0; s < numSpirals; s++) {
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height;
    const maxR = Math.min(canvas.width, canvas.height) * (safeMode ? 0.2 : Math.random() * 0.5 + 0.3);
    const turns = safeMode ? 5 : Math.random() * 10 + 8;
    const dir = Math.random() > 0.5 ? 1 : -1;
    const pulse = Math.sin(time * (safeMode ? 2 : 10)) * 0.5 + 0.5;

    ctx.beginPath();
    ctx.lineWidth = (safeMode ? 2 : Math.random() * 6 + 3) * (1 + pulse * 0.5);
    ctx.strokeStyle = randomColor();

    for (let i = 0; i < 360 * turns; i++) {
      const angle = (i * Math.PI / 180) * dir;
      const r = (i / (360 * turns)) * maxR * (1 + Math.sin(angle * 5) * 0.1); // Distortion wavy
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Ajout malaise : yeux ou flammes au centre
    if (!safeMode && Math.random() > 0.7) {
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(cx, cy, 10 + Math.random() * 20, 0, Math.PI * 2);
      ctx.fill();
    }
  }
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
  for (let i = -canvas.width*2; i < canvas.width*2; i += stripeW *
