const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let width, height, columns, drops;
const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\$#@%&*+=-_PYTHON";

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / 16);
  drops = Array(columns).fill(1).map(() => Math.random() * -50);
}
resize();
window.addEventListener("resize", resize);

function matrix() {
  ctx.fillStyle = "rgba(2, 6, 5, 0.075)";
  ctx.fillRect(0, 0, width, height);

  ctx.font = "13px monospace";
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * 16;
    const y = drops[i] * 16;

    ctx.fillStyle = Math.random() > 0.96 ? "#baffdf" : "#00ff88";
    ctx.globalAlpha = Math.random() * .7 + .2;
    ctx.fillText(char, x, y);
    ctx.globalAlpha = 1;

    if (y > height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.7 + Math.random() * 0.8;
  }
}
setInterval(matrix, 45);

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.animation = "fadeUp .7s ease both";
  });
}, { threshold: .08 });

document.querySelectorAll(".project, .skill, .about-box").forEach(el => observer.observe(el));