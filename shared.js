/* shared.js — particles, glow, navigation & easter egg */

function initSharedUI(activePage) {
  const pages = [
    { href: "index.html",        key: "karten",      icon: "📚", label: "Karteikarten" },
    { href: "werke.html",        key: "werke",        icon: "📖", label: "Meine Werke" },
    { href: "timeline.html",     key: "timeline",     icon: "🗺️", label: "Zeitleiste" },
    { href: "beziehungen.html",  key: "beziehungen",  icon: "👥", label: "Beziehungen" },
    { href: "spiele.html",       key: "spiele",       icon: "🎮", label: "Spiele" },
    { href: "fokus.html",        key: "fokus",        icon: "🕯️", label: "Fokus" },
  ];

  // Mark "Spiele" as active for any game sub-page
  const gamePages = ["spiel","wortspiel","tictactoe","hangman","wordle","typing"];
  const effectiveActive = gamePages.includes(activePage) ? "spiele" : activePage;

  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.innerHTML = pages.map(p =>
    `<a href="${p.href}" class="nav-link ${p.key === effectiveActive ? 'active' : ''}">${p.icon}<span class="nav-label"> ${p.label}</span></a>`
  ).join('');
  document.body.prepend(nav);

  // Background
  const g1 = document.createElement("div"); g1.className = "bg-glow-1";
  const g2 = document.createElement("div"); g2.className = "bg-glow-2";
  document.body.append(g1, g2);

  // Particles
  const pc = document.createElement("div");
  pc.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;";
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const s = 2 + Math.random() * 5;
    p.style.cssText = `left:${3+Math.random()*94}%;bottom:-20px;width:${s}px;height:${s}px;animation:floatUp ${12+Math.random()*10}s ${i*0.9}s infinite ease-in-out;`;
    pc.appendChild(p);
  }
  document.body.append(pc);

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
