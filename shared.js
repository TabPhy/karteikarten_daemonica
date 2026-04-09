/* shared.js — navigation, fire background & easter egg */

function initSharedUI(activePage) {
  const pages = [
    { href: "index.html",        key: "karten",      icon: "📚", label: "Karteikarten" },
    { href: "werke.html",        key: "werke",        icon: "📖", label: "Meine Werke" },
    { href: "timeline.html",     key: "timeline",     icon: "🗺️", label: "Zeitleiste" },
    { href: "beziehungen.html",  key: "beziehungen",  icon: "👥", label: "Beziehungen" },
    { href: "spiele.html",       key: "spiele",       icon: "🎮", label: "Spiele" },
    { href: "fokus.html",        key: "fokus",        icon: "🕯️", label: "Fokus" },
  ];

  const gamePages = ["spiel","wortspiel","tictactoe","hangman","wordle","typing"];
  const effectiveActive = gamePages.includes(activePage) ? "spiele" : activePage;

  // ── Navigation ──
  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.innerHTML = pages.map(p =>
    `<a href="${p.href}" class="nav-link ${p.key === effectiveActive ? 'active' : ''}">${p.icon}<span class="nav-label"> ${p.label}</span></a>`
  ).join('');
  document.body.prepend(nav);

  // ── Fire Background ──
  initFireBackground();

  // ── Konami Code Easter Egg ──
  const konami = [38,38,40,40,37,39,37,39,66,65];
  let konamiIdx = 0;
  document.addEventListener('keydown', e => {
    if (e.keyCode === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) { konamiIdx = 0; window.location.href = 'easter.html'; }
    } else { konamiIdx = 0; }
  });
}

/* ═══════════════════════════════════════════
   FIRE / EMBER / ASH BACKGROUND
   ═══════════════════════════════════════════ */
function initFireBackground() {
  const container = document.createElement('div');
  container.id = 'fire-bg';
  container.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';

  const canvas = document.createElement('canvas');
  canvas.id = 'fire-canvas';
  canvas.style.cssText = 'width:100%;height:100%;display:block;';
  container.appendChild(canvas);
  document.body.appendChild(container);

  const ctx = canvas.getContext('2d');

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const COUNT = 140;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function createParticle(init) {
    const type = Math.random();
    const w = window.innerWidth;
    const h = window.innerHeight;
    const xBase = rand(0, w);
    let p;

    if (type < 0.38) {
      p = {
        kind: 'ember', x: xBase, y: h + rand(0, 40),
        r: rand(1.2, 3.2), speed: rand(0.4, 1.4),
        drift: rand(-0.3, 0.3), opacity: rand(0.5, 0.85),
        fade: rand(0.001, 0.003), glow: rand(0.6, 1),
        color: Math.random() > 0.5 ? 'brass' : 'orange',
        wobbleAmp: rand(0.3, 1.2), wobbleSpeed: rand(0.002, 0.005),
        phase: rand(0, Math.PI * 2)
      };
    } else if (type < 0.75) {
      p = {
        kind: 'ash', x: xBase, y: h + rand(0, 50),
        w: rand(2.5, 7), h: rand(1.5, 3.8),
        speed: rand(0.2, 0.8), drift: rand(-0.4, 0.4),
        opacity: rand(0.15, 0.4), fade: rand(0.0005, 0.0015),
        rotation: rand(0, Math.PI * 2), rotSpeed: rand(-0.02, 0.02),
        wobbleAmp: rand(0.4, 1.3), wobbleSpeed: rand(0.001, 0.004),
        phase: rand(0, Math.PI * 2), shade: rand(45, 90)
      };
    } else {
      p = {
        kind: 'spark', x: xBase, y: h + rand(0, 18),
        r: rand(0.6, 1.5), speed: rand(1.2, 2.8),
        drift: rand(-0.8, 0.8), opacity: rand(0.7, 1),
        fade: rand(0.005, 0.01), life: 1,
        phase: rand(0, Math.PI * 2),
        wobbleAmp: rand(0.2, 0.8), wobbleSpeed: rand(0.003, 0.008)
      };
    }

    if (init) {
      p.y = rand(h * 0.05, h);
      p.opacity *= rand(0.3, 0.7);
    }
    return p;
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle(true));

  function drawBg() {
    const w = window.innerWidth, h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0c1519');
    g.addColorStop(0.45, '#141012');
    g.addColorStop(0.75, '#241112');
    g.addColorStop(1, '#3a1612');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(w*0.5, h*1.02, 0, w*0.5, h*1.02, h*0.75);
    glow.addColorStop(0, 'rgba(224,185,154,0.18)');
    glow.addColorStop(0.18, 'rgba(207,157,123,0.14)');
    glow.addColorStop(0.38, 'rgba(114,75,57,0.12)');
    glow.addColorStop(0.68, 'rgba(90,25,20,0.08)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    const band = ctx.createLinearGradient(0, h*0.62, 0, h);
    band.addColorStop(0, 'rgba(120,20,18,0)');
    band.addColorStop(0.55, 'rgba(120,20,18,0.08)');
    band.addColorStop(1, 'rgba(170,35,20,0.14)');
    ctx.fillStyle = band;
    ctx.fillRect(0, 0, w, h);
  }

  function drawEmber(p, t) {
    ctx.save();
    ctx.globalAlpha = p.opacity * p.glow;
    const main = p.color === 'brass' ? '#CF9D7B' : '#ff7a3c';
    const core = p.color === 'brass' ? '#f0dcc8' : '#ffd39a';
    ctx.shadowColor = main; ctx.shadowBlur = p.r * 5;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = main; ctx.fill();
    ctx.beginPath(); ctx.globalAlpha = p.opacity * 0.6;
    ctx.arc(p.x, p.y, p.r*0.5, 0, Math.PI*2);
    ctx.fillStyle = core; ctx.fill();
    ctx.restore();
  }

  function drawAsh(p) {
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    const c = Math.floor(p.shade);
    ctx.fillStyle = `rgb(${c},${Math.floor(c*0.78)},${Math.floor(c*0.72)})`;
    ctx.beginPath(); ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  function drawSpark(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity * p.life;
    ctx.shadowColor = '#e0b99a'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r*p.life, 0, Math.PI*2);
    ctx.fillStyle = '#ffd7a8'; ctx.fill();
    ctx.restore();
  }

  let lastTime = 0;
  function animate(time) {
    const dt = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1;
    lastTime = time;
    drawBg();

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const wobble = Math.sin(time * (p.wobbleSpeed || 0.003) + p.phase) * (p.wobbleAmp || 0.5);
      p.y -= p.speed * dt;
      p.x += (p.drift + wobble) * dt;
      p.opacity -= p.fade * dt;
      if (p.kind === 'ash') p.rotation += p.rotSpeed * dt;
      if (p.kind === 'spark') p.life -= p.fade * dt;
      if (p.kind === 'ember') p.glow = 0.65 + Math.sin(time * 0.008 + p.phase) * 0.35;

      if (p.opacity <= 0 || p.y < -40 || p.x < -30 || p.x > window.innerWidth + 30 || (p.kind === 'spark' && p.life <= 0)) {
        particles[i] = createParticle(false);
        continue;
      }

      if (p.kind === 'ember') drawEmber(p, time);
      else if (p.kind === 'ash') drawAsh(p);
      else drawSpark(p);
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}