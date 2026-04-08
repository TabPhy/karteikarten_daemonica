/* shared.js — particles, glow & navigation (plain DOM, no React needed) */

function initSharedUI(activePage) {
  // ── Navigation ──
  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.innerHTML = `
    <a href="index.html" class="nav-link ${activePage === 'karten' ? 'active' : ''}">📚 Karteikarten</a>
    <a href="spiel.html" class="nav-link ${activePage === 'spiel' ? 'active' : ''}">🎮 Minispiel</a>
  `;
  document.body.prepend(nav);

  // ── Background glow ──
  const g1 = document.createElement("div"); g1.className = "bg-glow-1";
  const g2 = document.createElement("div"); g2.className = "bg-glow-2";
  document.body.append(g1, g2);

  // ── Particles ──
  const pContainer = document.createElement("div");
  pContainer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;";
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = 2 + Math.random() * 5;
    p.style.cssText = `
      left:${3 + Math.random() * 94}%;bottom:-20px;
      width:${size}px;height:${size}px;
      animation:floatUp ${12 + Math.random() * 10}s ${i * 0.9}s infinite ease-in-out;
    `;
    pContainer.appendChild(p);
  }
  document.body.append(pContainer);
}
