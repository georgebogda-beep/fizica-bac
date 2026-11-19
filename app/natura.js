/* ===== FIZICA ÎN NATURĂ =====
   Scene animate (SVG) care leagă lecțiile de fenomene reale din natură.
   Fiecare scenă: id, t (titlu), a (aria), ls (lecțiile legate), txt (explicația),
   fx (formula), num (o cifră reală), calc (un calculator mic, opțional), svg (desenul).
   Desenele folosesc animațiile CSS cu prefixul nt- din index.html. */
(function () {
  'use strict';
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const n1 = (x, d = 1) => Number(x).toFixed(d).replace('.', ',');
  const big = x => Math.round(x).toLocaleString('ro-RO');
  const F = 'font-family="Plus Jakarta Sans,Segoe UI,sans-serif" font-weight="800"';
  const T = (x, y, t, s = 11, c = '#fff', a = 'middle') => `<text x="${x}" y="${y}" font-size="${s}" fill="${c}" text-anchor="${a}" ${F} paint-order="stroke" stroke="rgba(0,0,0,.28)" stroke-width="2.5">${t}</text>`;
  const sky = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="320" height="200" fill="url(#${id})"/>`;
  const sun = (x, y, r = 15) => `<g class="nt-pulse" style="transform-origin:${x}px ${y}px"><circle cx="${x}" cy="${y}" r="${r + 9}" fill="#ffe082" opacity=".35"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ffd54f"/></g>`;
  const rain = (n, x0, x1, y0, y1) => { let o = ''; for (let i = 0; i < n; i++) { const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0); o += `<line class="nt-rain" x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - 3).toFixed(1)}" y2="${(y + 10).toFixed(1)}" style="animation-delay:-${(rnd()).toFixed(2)}s"/>`; } return `<g stroke="#fff" stroke-opacity=".55" stroke-width="1.4" stroke-linecap="round">${o}</g>`; };
  const stars = (n, ymax = 130) => { let o = ''; for (let i = 0; i < n; i++) o += `<circle class="nt-twinkle" cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * ymax).toFixed(1)}" r="${(0.5 + rnd() * 1.1).toFixed(2)}" fill="#fff" style="animation-delay:-${(rnd() * 3).toFixed(2)}s"/>`; return o; };
  const cloud = (x, y, s = 1, c = '#fff', o = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}"><ellipse cx="0" cy="0" rx="22" ry="11"/><ellipse cx="18" cy="-6" rx="16" ry="12"/><ellipse cx="-16" cy="-3" rx="13" ry="9"/></g>`;
  const bird = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-6" rx="8" ry="5.5" fill="#37474f"/><circle cx="7" cy="-11" r="3.6" fill="#37474f"/><path d="M10 -11 l4 1 l-4 1z" fill="#ff9800"/><path d="M-7 -6 l-7 4 l2 -6z" fill="#37474f"/><line x1="-1" y1="-1" x2="-1" y2="1" stroke="#37474f" stroke-width="1.4"/><line x1="2" y1="-1" x2="2" y2="1" stroke="#37474f" stroke-width="1.4"/></g>`;

  const S = [];
  const add = o => S.push(o);

  /* ---------------- MECANICĂ ---------------- */
  seed = 11;
  add({ id: 'soim', t: 'Șoimul în picaj', a: 'Mecanică', ls: ['m-cin', 'm-princ'],
    txt: 'Șoimul călător e cel mai rapid animal: în picaj atinge aproape 390 km/h. Își strânge aripile pe lângă corp ca să micșoreze frecarea cu aerul și se lasă accelerat de greutate. Fără aer, după t secunde de cădere liberă ar avea viteza v = g·t și ar ajunge la 108 m/s în aproximativ 11 secunde.',
    fx: 'v = v₀ + a·t ;  a = g ≈ 10 m/s²', num: ['390 km/h', 'viteza record în picaj'],
    calc: { lab: 'Timp de cădere liberă', min: 1, max: 12, step: 0.5, val: 5, unit: 's', out: t => `v = ${n1(10 * t, 0)} m/s = <b>${big(36 * t)} km/h</b>` },
    svg: sky('ntg-soim', '#6aa8e8', '#d7ebfb') + cloud(70, 50, 1.2, '#fff', .9) + cloud(250, 150, 1.4, '#fff', .8) + cloud(230, 40, .8, '#fff', .7) +
      `<g class="nt-dive"><g transform="rotate(38)"><g stroke="#fff" stroke-opacity=".8" stroke-width="2" stroke-linecap="round"><line x1="-60" y1="-4" x2="-30" y2="-4"/><line x1="-70" y1="4" x2="-34" y2="4"/><line x1="-50" y1="0" x2="-28" y2="0"/></g><path d="M-26 0 C-16 -9 6 -8 18 -2 L24 0 L18 2 C6 8 -16 9 -26 0Z" fill="#455a64"/><path d="M-6 -4 L-30 -9 L-14 0Z" fill="#37474f"/><circle cx="16" cy="-1.5" r="1.4" fill="#fff"/><path d="M24 0 l5 1.5 l-5 1z" fill="#ffb300"/></g></g>` + T(250, 30, '390 km/h', 15, '#0d47a1')
  });

  add({ id: 'calmar', t: 'Calmarul cu reacție', a: 'Mecanică', ls: ['m-impuls', 'm-princ'],
    txt: 'Calmarul își umple mantaua cu apă și o aruncă brusc înapoi printr-un tub numit sifon. Impulsul total rămâne zero: apa pleacă într-un sens, calmarul în sens opus, exact ca o rachetă (principiul acțiunii și reacțiunii). Unii calmari ies astfel din apă și planează zeci de metri.',
    fx: 'm_calmar·v_calmar = m_apă·v_apă', num: ['~ 30 m', 'zbor deasupra apei'],
    calc: { lab: 'Viteza apei aruncate (calmar 1 kg, apă 0,3 kg)', min: 1, max: 20, step: 1, val: 8, unit: 'm/s', out: v => `calmarul pleacă cu <b>${n1(0.3 * v, 1)} m/s</b> în sens opus` },
    svg: sky('ntg-calm', '#1e88c9', '#0b2a4a') + `<g opacity=".18" fill="#fff"><path d="M40 0 L70 0 L20 200 L0 200Z"/><path d="M150 0 L170 0 L130 200 L110 200Z"/><path d="M250 0 L265 0 L240 200 L228 200Z"/></g>` +
      `<g class="nt-swim"><g transform="translate(120 100)"><path d="M0 0 C18 -16 52 -10 66 -4 C70 0 70 4 66 8 C52 14 18 18 0 4Z" fill="#ef8a7a"/><path d="M0 0 L-8 -8 L-6 2 L-8 10 L0 4Z" fill="#e57363"/><circle cx="58" cy="2" r="3" fill="#3e2723"/><g stroke="#ef8a7a" stroke-width="3" stroke-linecap="round" fill="none"><path class="nt-wig" d="M66 0 q10 -4 20 0 t20 0"/><path class="nt-wig" style="animation-delay:-.3s" d="M66 4 q10 4 20 0 t24 2"/><path class="nt-wig" style="animation-delay:-.6s" d="M66 8 q10 -2 20 4 t18 2"/></g><g fill="#bfe6ff" opacity=".8"><circle class="nt-jet" cx="76" cy="8" r="3"/><circle class="nt-jet" style="animation-delay:-.25s" cx="76" cy="9" r="2.4"/><circle class="nt-jet" style="animation-delay:-.5s" cx="76" cy="7" r="2"/></g></g></g>` +
      T(60, 40, '← calmar', 12, '#fff', 'start') + T(270, 175, 'apă →', 12, '#bfe6ff')
  });

  add({ id: 'arcas', t: 'Peștele arcaș', a: 'Mecanică', ls: ['m-arunc', 'o-reflexie'],
    txt: 'Peștele arcaș scuipă un jet de apă care zboară pe o traiectorie de aruncare oblică și doboară insecte de pe frunze de la 1–2 m. Ochii lui sunt sub apă, așa că învață să corecteze și refracția luminii la suprafața apei: insecta nu e acolo unde pare.',
    fx: 'x = v₀cos α·t ;  y = v₀sin α·t − g·t²/2', num: ['2 m', 'bătaia jetului'],
    calc: { lab: 'Viteza jetului (la 45°)', min: 2, max: 6, step: 0.1, val: 4, unit: 'm/s', out: v => `bătaia = v₀²/g = <b>${n1(v * v / 10, 2)} m</b>, înălțimea maximă = <b>${n1(v * v / 40, 2)} m</b>` },
    svg: sky('ntg-arc', '#bfe3f5', '#e9f6fb') + `<path d="M210 30 C240 24 280 30 320 22 L320 36 C290 40 250 38 214 40Z" fill="#5d4037"/><path d="M226 38 C236 30 256 30 262 40 C250 48 236 48 226 38Z" fill="#66bb6a"/><g class="nt-bob"><ellipse cx="244" cy="33" rx="5" ry="3" fill="#212121"/><path d="M242 30 l-4 -5 M246 30 l3 -5" stroke="#212121" stroke-width="1"/></g>` +
      `<rect y="112" width="320" height="88" fill="#2a7fb0"/><path d="M0 112 Q20 108 40 112 T80 112 T120 112 T160 112 T200 112 T240 112 T280 112 T320 112" fill="none" stroke="#bfe6ff" stroke-width="2"/>` +
      `<path class="nt-flow" d="M104 116 Q170 -40 240 36" fill="none" stroke="#4fc3f7" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="3 7"/>` +
      `<g transform="translate(80 140) rotate(-35)"><path d="M0 0 C10 -12 34 -12 44 0 C34 12 10 12 0 0Z" fill="#cfd8dc"/><path d="M0 0 L-12 -9 L-12 9Z" fill="#b0bec5"/><g fill="#37474f"><rect x="14" y="-9" width="4" height="18" rx="2"/><rect x="26" y="-9" width="4" height="18" rx="2"/></g><circle cx="38" cy="-2" r="2.4" fill="#212121"/></g>` + T(160, 190, 'aruncare oblică', 12)
  });

  add({ id: 'grohotis', t: 'Pietrele de pe versant', a: 'Mecanică', ls: ['m-plan', 'm-forte'],
    txt: 'Pietrele de pe un munte stau pe loc cât timp frecarea le ține. Când panta devine prea mare, componenta greutății de-a lungul pantei, mg·sin α, învinge frecarea maximă, μ·mg·cos α, și pietrele alunecă. La limită tg α = μ: de aceea grohotișul și nisipul uscat formează mereu pante de aproximativ 30–35°.',
    fx: 'mg·sin α = μ·mg·cos α  ⇒  tg α = μ', num: ['≈ 34°', 'panta nisipului uscat'],
    calc: { lab: 'Coeficientul de frecare μ', min: 0.1, max: 1.2, step: 0.05, val: 0.65, unit: '', out: m => `unghiul limită α = <b>${n1(Math.atan(m) * 180 / Math.PI, 1)}°</b>` },
    svg: sky('ntg-gro', '#90caf9', '#e3f2fd') + `<path d="M0 200 L0 175 L290 52 L320 46 L320 200Z" fill="#8d6e63"/><path d="M0 175 L290 52" stroke="#5d4037" stroke-width="3"/><path d="M120 200 L240 120 L320 160 L320 200Z" fill="#a1887f" opacity=".6"/>` +
      `<g fill="#6d4c41">${[0, 0.7, 1.4, 2.1].map(d => `<circle class="nt-slide" cx="270" cy="54" r="${5 + (d * 2) % 3}" style="animation-delay:-${d}s"/>`).join('')}</g>` +
      `<path d="M60 175 A50 50 0 0 0 56 156" fill="none" stroke="#fff" stroke-width="2"/><line x1="10" y1="175" x2="120" y2="175" stroke="#fff" stroke-dasharray="4 4"/>` + T(80, 166, 'α', 14) + T(220, 30, 'tg α = μ', 15, '#263238')
  });

  add({ id: 'cascada', t: 'Cascada', a: 'Mecanică', ls: ['m-energie', 'm-lucru'],
    txt: 'Apa din vârful cascadei are energie potențială. Cât cade, aceasta se transformă în energie cinetică: m·g·h = m·v²/2, deci v = √(2gh) dacă neglijăm aerul. La baza cascadei energia se transformă în căldură și sunet: apa de jos e puțin mai caldă decât cea de sus (cu aproximativ 0,1 °C la 50 m).',
    fx: 'm·g·h = m·v²/2  ⇒  v = √(2·g·h)', num: ['51 m', 'înălțimea cascadei Niagara'],
    calc: { lab: 'Înălțimea cascadei', min: 2, max: 980, step: 1, val: 51, unit: 'm', out: h => `v = <b>${n1(Math.sqrt(20 * h), 1)} m/s</b> (${big(Math.sqrt(20 * h) * 3.6)} km/h); apa se încălzește cu ${n1(10 * h / 4180, 2)} °C` },
    svg: sky('ntg-cas', '#81c7f0', '#d9f0fb') + `<path d="M0 60 L120 60 L120 200 L0 200Z" fill="#6d5a4b"/><path d="M200 60 L320 60 L320 200 L200 200Z" fill="#6d5a4b"/><path d="M0 60 L120 60 L118 70 L0 72Z" fill="#4caf50"/><path d="M200 60 L320 60 L320 72 L202 70Z" fill="#4caf50"/>` +
      `<rect x="120" y="52" width="80" height="140" fill="#4fa3d9"/><g stroke="#e3f6ff" stroke-width="2.5" stroke-linecap="round" fill="none">${[128, 140, 152, 164, 176, 188].map((x, i) => `<line class="nt-down" x1="${x}" y1="52" x2="${x}" y2="190" stroke-dasharray="10 12" style="animation-delay:-${i * .13}s"/>`).join('')}</g>` +
      `<ellipse cx="160" cy="190" rx="90" ry="12" fill="#2f86c2"/>${[0, .6, 1.2].map(d => `<ellipse class="nt-ripple" cx="160" cy="188" rx="40" ry="6" fill="none" stroke="#fff" stroke-width="1.5" style="animation-delay:-${d}s"/>`).join('')}` +
      `<g fill="#fff" opacity=".55">${[0, .5, 1, 1.5].map((d, i) => `<circle class="nt-mist" cx="${130 + i * 20}" cy="182" r="8" style="animation-delay:-${d}s"/>`).join('')}</g>` +
      `<line x1="226" y1="58" x2="226" y2="182" stroke="#fff" stroke-width="1.5"/><path d="M222 64 L226 56 L230 64 M222 176 L226 184 L230 176" stroke="#fff" stroke-width="1.5" fill="none"/>` + T(236, 125, 'h', 15, '#fff', 'start') + T(60, 40, 'v = √(2gh)', 14, '#0d47a1')
  });

  add({ id: 'luna', t: 'Luna și mareele', a: 'Mecanică', ls: ['m-grav', 'm-circular'],
    txt: 'Forța de atracție universală dintre Pământ și Lună ține Luna pe orbită: ea joacă rolul de forță centripetă. Atracția Lunii e mai puternică pe fața Pământului apropiată de ea decât pe cea îndepărtată, așa că apa oceanelor se umflă în ambele părți. Pământul se rotește pe sub aceste „umflături”, deci în cele mai multe locuri apar două maree pe zi.',
    fx: 'F = k·m₁·m₂/r² = m·v²/r', num: ['27,3 zile', 'o rotație a Lunii în jurul Pământului'],
    calc: { lab: 'Distanța Pământ–Lună (în mii de km)', min: 200, max: 500, step: 5, val: 384, unit: 'mii km', out: r => { const v = Math.sqrt(6.67e-11 * 5.97e24 / (r * 1e6)); return `viteza orbitală = <b>${n1(v / 1000, 2)} km/s</b>, perioada = <b>${n1(2 * Math.PI * r * 1e6 / v / 86400, 1)} zile</b>`; } },
    svg: `<rect width="320" height="200" fill="#0b1026"/>` + stars(45, 200) +
      `<g class="nt-orbit" style="transform-origin:150px 100px"><ellipse cx="150" cy="100" rx="44" ry="34" fill="#4fc3f7" opacity=".35"/><circle cx="262" cy="100" r="11" fill="#cfd8dc"/><circle cx="259" cy="97" r="2.5" fill="#b0bec5"/><circle cx="265" cy="104" r="2" fill="#b0bec5"/><circle cx="262" cy="100" r="96" fill="none" stroke="#fff" stroke-opacity=".12" stroke-dasharray="3 6" transform="translate(-112 0)"/></g>` +
      `<circle cx="150" cy="100" r="30" fill="#1e88e5"/><path d="M132 86 C140 78 152 80 156 90 C150 96 138 98 132 86Z M148 108 C158 104 168 110 164 120 C156 124 146 118 148 108Z" fill="#43a047"/>` + T(160, 188, 'două maree pe zi', 12, '#b3e5fc')
  });

  add({ id: 'flamingo', t: 'Flamingo pe un picior', a: 'Mecanică', ls: ['m-statica'],
    txt: 'Flamingo poate dormi stând într-un singur picior. Un corp e în echilibru când suma forțelor și suma momentelor sunt zero, adică verticala prin centrul de greutate trece prin punctul de sprijin. Flamingo își ține centrul de greutate exact deasupra piciorului, așa că stă aproape fără efort muscular.',
    fx: 'ΣF = 0 ;  ΣM = 0', num: ['1 picior', 'echilibru aproape fără efort'],
    svg: sky('ntg-fla', '#ffe0b2', '#b3e5fc') + `<rect y="150" width="320" height="50" fill="#81d4fa"/><path d="M0 150 Q40 146 80 150 T160 150 T240 150 T320 150" fill="none" stroke="#fff" stroke-width="1.5" opacity=".7"/>` +
      `<g class="nt-sway" style="transform-origin:160px 168px"><line x1="160" y1="110" x2="160" y2="168" stroke="#f06292" stroke-width="3"/><path d="M160 130 l10 6 l-6 4" stroke="#f06292" stroke-width="3" fill="none"/><ellipse cx="160" cy="100" rx="30" ry="16" fill="#f48fb1"/><path d="M182 94 C196 80 186 62 192 48 C196 40 206 40 208 48" stroke="#f48fb1" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="208" cy="48" r="7" fill="#f48fb1"/><path d="M212 46 l10 6 l-10 3z" fill="#212121"/><circle cx="206" cy="46" r="1.6" fill="#212121"/><circle cx="160" cy="100" r="4" fill="#fff" stroke="#c2185b" stroke-width="2"/><line x1="160" y1="104" x2="160" y2="168" stroke="#c2185b" stroke-width="1.5" stroke-dasharray="3 3"/></g>` +
      T(196, 114, 'centrul de greutate', 11, '#880e4f', 'start') + T(160, 190, 'deasupra sprijinului', 12, '#01579b')
  });

  /* ---------------- TERMODINAMICĂ ---------------- */
  seed = 23;
  add({ id: 'miros', t: 'Mirosul unei flori', a: 'Termodinamică', ls: ['cinetica', 'intro'],
    txt: 'Moleculele din aer se mișcă cu sute de metri pe secundă, dar mirosul unei flori ajunge la tine abia după secunde sau minute. De ce? Fiecare moleculă se ciocnește de miliarde de ori pe secundă cu altele și merge în zigzag: asta e difuzia. Cu cât e mai cald, cu atât moleculele sunt mai rapide și mirosul se simte mai repede.',
    fx: 'v_T = √(3·R·T/μ)', num: ['~ 500 m/s', 'viteza moleculelor de aer'],
    calc: { lab: 'Temperatura aerului', min: -30, max: 45, step: 1, val: 20, unit: '°C', out: c => `viteza termică a moleculelor de azot = <b>${big(Math.sqrt(3 * 8.31 * (c + 273) / 0.028))} m/s</b>` },
    svg: sky('ntg-mir', '#e8f5e9', '#fffde7') + `<path d="M60 200 C62 160 58 140 62 118" stroke="#388e3c" stroke-width="4" fill="none"/><path d="M60 160 C40 150 34 140 36 132 C48 136 58 146 60 160Z" fill="#43a047"/>` +
      `<g transform="translate(62 104)">${[0, 72, 144, 216, 288].map(r => `<ellipse rx="9" ry="16" cy="-14" fill="#ec407a" transform="rotate(${r})"/>`).join('')}<circle r="8" fill="#ffca28"/></g>` +
      `<g fill="#ab47bc">${Array.from({ length: 14 }, (_, i) => `<circle class="nt-zig nt-zig${i % 3}" cx="${80 + rnd() * 30}" cy="${80 + rnd() * 50}" r="${(2 + rnd() * 1.5).toFixed(1)}" style="animation-delay:-${(i * .45).toFixed(2)}s"/>`).join('')}</g>` + T(230, 40, 'difuzie în zigzag', 13, '#6a1b9a')
  });

  add({ id: 'bule', t: 'Bulele dintr-un lac', a: 'Termodinamică', ls: ['stare', 'transformari'],
    txt: 'O bulă de aer pornită de pe fundul unui lac crește pe măsură ce urcă. Presiunea apei scade spre suprafață (p = p₀ + ρ·g·h), iar la temperatură constantă p·V = const. La 10 m adâncime presiunea e dublă față de suprafață, deci bula ajunge sus de două ori mai mare. Tot de aceea scafandrii nu au voie să urce ținându-și respirația.',
    fx: 'p₁·V₁ = p₂·V₂ ;  p = p₀ + ρ·g·h', num: ['10 m', 'apă = încă o atmosferă de presiune'],
    calc: { lab: 'Adâncimea de unde pornește bula', min: 0, max: 40, step: 1, val: 10, unit: 'm', out: h => `presiunea acolo = ${n1(1 + h / 10, 1)} atm, bula ajunge sus de <b>${n1(1 + h / 10, 1)} ori</b> mai mare` },
    svg: sky('ntg-bul', '#4fc3f7', '#01304f') + `<rect width="320" height="16" fill="#b3e5fc"/><path d="M0 16 Q20 12 40 16 T80 16 T120 16 T160 16 T200 16 T240 16 T280 16 T320 16" fill="none" stroke="#fff" stroke-width="2"/>` +
      `<path d="M0 190 Q60 176 120 186 T240 182 T320 186 V200 H0Z" fill="#3e2723" opacity=".7"/><g fill="#2e7d32"><path d="M40 190 q-6 -30 4 -60 q-2 30 2 60z"/><path d="M270 190 q8 -24 -2 -50 q8 26 8 50z"/></g>` +
      `<g fill="none" stroke="#e1f5fe" stroke-width="1.5">${[0, 1, 2, 3, 4].map(i => `<circle class="nt-rise" cx="${110 + i * 26}" cy="180" r="4" style="animation-delay:-${(i * .8).toFixed(1)}s"/>`).join('')}</g>` +
      `<g class="nt-swim2"><path d="M200 120 C210 110 230 110 240 120 C230 130 210 130 200 120Z" fill="#ffb74d"/><path d="M240 120 l10 -8 v16z" fill="#ffa726"/><circle cx="208" cy="118" r="1.8" fill="#212121"/></g>` +
      T(60, 40, 'p mică → V mare', 12, '#fff', 'start') + T(60, 170, 'p mare → V mic', 12, '#fff', 'start')
  });

  add({ id: 'nori', t: 'Norii de pe munte', a: 'Termodinamică', ls: ['adiabatica', 'principiu', 'lucru', 'politropa'],
    txt: 'Vântul împinge aerul cald pe versantul muntelui. Sus presiunea e mai mică, așa că aerul se destinde aproape fără schimb de căldură (transformare adiabatică): face lucru mecanic pe seama energiei interne și se răcește cu aproximativ 10 °C la fiecare kilometru. Când se răcește destul, vaporii condensează și pe vârf apare un nor. Pe partea cealaltă aerul coboară, se comprimă și se încălzește: vântul de föhn, cald și uscat.',
    fx: 'Q = 0  ⇒  ΔU = −L ;  p·V^γ = const', num: ['−10 °C/km', 'răcirea aerului uscat care urcă'],
    calc: { lab: 'Altitudinea la care urcă aerul (pornește cu 20 °C)', min: 0, max: 4, step: 0.1, val: 2, unit: 'km', out: h => `temperatura aerului = <b>${n1(20 - 10 * h, 0)} °C</b>` },
    svg: sky('ntg-nor', '#64b5f6', '#e3f2fd') + `<path d="M0 200 L160 50 L320 200Z" fill="#78909c"/><path d="M160 50 L130 78 L146 74 L160 86 L174 74 L190 78Z" fill="#fff"/>` +
      `<g class="nt-cap">${cloud(160, 44, 1.6, '#fff', .95)}</g>` +
      `<g class="nt-parcel"><circle cx="24" cy="182" r="9" fill="#ff7043" opacity=".85"/></g>` +
      T(40, 160, '20 °C', 13, '#bf360c') + T(160, 18, '0 °C la 2 km', 12, '#0d47a1') + T(280, 160, 'föhn', 13, '#bf360c')
  });

  add({ id: 'lac', t: 'Lacul înghețat', a: 'Termodinamică', ls: ['calorimetrie'],
    txt: 'Apa are densitatea maximă la 4 °C. Iarna, apa de 4 °C coboară la fundul lacului, iar gheața, mai puțin densă, plutește deasupra și izolează lacul ca o pătură. Ca să îngheți 1 kg de apă trebuie să îi iei 334 kJ (căldura latentă de solidificare), așa că un lac îngheață greu și doar la suprafață, iar peștii trăiesc liniștiți dedesubt.',
    fx: 'Q = m·λ ;  λ_topire = 334 kJ/kg', num: ['4 °C', 'apa de pe fundul lacului'],
    calc: { lab: 'Masa de apă care îngheață', min: 1, max: 1000, step: 1, val: 100, unit: 'kg', out: m => `trebuie cedată căldura Q = <b>${big(334 * m)} kJ</b>` },
    svg: sky('ntg-lac', '#cfd8dc', '#eceff1') + `<rect y="60" width="320" height="140" fill="#1565c0"/><rect y="60" width="320" height="140" fill="url(#ntg-lacw)"/><defs><linearGradient id="ntg-lacw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#90caf9"/><stop offset="1" stop-color="#0d47a1"/></linearGradient></defs>` +
      `<rect y="56" width="320" height="16" fill="#e3f2fd"/><path d="M0 72 L40 70 L80 73 L130 70 L180 73 L230 70 L280 72 L320 70" stroke="#90caf9" fill="none"/>` +
      `<g fill="#fff">${Array.from({ length: 12 }, (_, i) => `<circle class="nt-snow" cx="${(rnd() * 320).toFixed(0)}" cy="${(rnd() * 40).toFixed(0)}" r="1.8" style="animation-delay:-${(rnd() * 4).toFixed(1)}s"/>`).join('')}</g>` +
      `<g class="nt-swim2"><path d="M140 150 C150 140 170 140 180 150 C170 160 150 160 140 150Z" fill="#ffcc80"/><path d="M180 150 l10 -8 v16z" fill="#ffb74d"/><circle cx="148" cy="148" r="1.8" fill="#212121"/></g>` +
      T(290, 90, '0 °C', 13, '#0d47a1', 'end') + T(290, 186, '4 °C', 14, '#fff', 'end') + T(30, 68, 'gheață', 11, '#1565c0', 'start')
  });

  add({ id: 'uragan', t: 'Uraganul, un motor termic', a: 'Termodinamică', ls: ['principiul2', 'randament'],
    txt: 'Un uragan funcționează ca un motor termic uriaș. Primește căldură de la oceanul cald (sursa caldă, ~300 K), transformă o parte din ea în energia vântului și cedează restul sus, în aerul foarte rece (sursa rece, ~200 K). Ca orice motor, nu poate transforma toată căldura în lucru mecanic: randamentul lui e cel mult cel al unui ciclu Carnot.',
    fx: 'η = 1 − T₂/T₁', num: ['≈ 33 %', 'randamentul maxim al unui uragan'],
    calc: { lab: 'Temperatura oceanului (sus: −73 °C)', min: 20, max: 32, step: 0.5, val: 28, unit: '°C', out: c => `η_max = 1 − 200/${n1(c + 273, 0)} = <b>${n1((1 - 200 / (c + 273)) * 100, 1)} %</b>` },
    svg: `<rect width="320" height="200" fill="#0d3b66"/><rect width="320" height="200" fill="url(#ntg-urg)"/><defs><radialGradient id="ntg-urg"><stop offset="0" stop-color="#1e6091"/><stop offset="1" stop-color="#0b2545"/></radialGradient></defs>` +
      `<g class="nt-spin" style="transform-origin:160px 100px"><g fill="none" stroke="#fff" stroke-linecap="round">${[0, 60, 120, 180, 240, 300].map((r, i) => `<path d="M160 100 C178 76 214 78 230 108 C240 130 226 158 200 168" stroke-width="${10 - i % 2 * 4}" stroke-opacity="${.75 - i % 2 * .3}" transform="rotate(${r} 160 100)"/>`).join('')}</g></g>` +
      `<circle cx="160" cy="100" r="9" fill="#0b2545"/>` + T(40, 24, 'ocean cald', 12, '#ffcc80', 'start') + T(280, 190, 'η = 1 − T₂/T₁', 13, '#fff', 'end')
  });

  /* ---------------- ELECTRICITATE ȘI MAGNETISM ---------------- */
  seed = 37;
  add({ id: 'fulger', t: 'Fulgerul și tunetul', a: 'Electricitate', ls: ['e-curent', 'e-energie', 'os-sunet', 'os-unde'],
    txt: 'Fulgerul e un curent electric uriaș (zeci de mii de amperi) între nor și pământ, care încălzește aerul la ~30 000 °C. Aerul se dilată brusc și produce o undă de șoc: tunetul. Lumina ajunge la tine aproape instantaneu, sunetul doar cu ~340 m/s. Numără secundele dintre fulger și tunet: la fiecare 3 secunde, furtuna e cu încă 1 km mai departe.',
    fx: 'd = v_sunet·t ;  v_sunet ≈ 340 m/s', num: ['30 000 A', 'curentul unui fulger'],
    calc: { lab: 'Secunde între fulger și tunet', min: 1, max: 30, step: 1, val: 6, unit: 's', out: t => `furtuna e la <b>${n1(0.34 * t, 1)} km</b>` },
    svg: sky('ntg-ful', '#1b2140', '#4a5578') + cloud(80, 34, 2.2, '#5c6680') + cloud(190, 30, 2.6, '#4b5470') + cloud(280, 40, 1.8, '#5c6680') +
      `<rect class="nt-flash2" width="320" height="200" fill="#fff"/><path class="nt-flash" d="M140 48 L118 100 L136 100 L112 168 L162 88 L142 88 L160 48Z" fill="#fff9c4" stroke="#fff176" stroke-width="2"/>` +
      `<path d="M0 172 Q80 162 160 170 T320 166 V200 H0Z" fill="#263238"/>` +
      `${[0, 1, 2].map(d => `<circle class="nt-ripple2" cx="128" cy="168" r="60" fill="none" stroke="#b0bec5" stroke-width="2" style="animation-delay:-${d}s"/>`).join('')}` +
      `<g transform="translate(262 150)"><rect width="34" height="22" fill="#8d6e63"/><path d="M-4 0 L17 -16 L38 0Z" fill="#5d4037"/><rect x="12" y="6" width="9" height="8" fill="#ffd54f"/></g>` + T(250, 120, '3 s ≈ 1 km', 13, '#fff59d')
  });

  add({ id: 'tipar', t: 'Țiparul electric', a: 'Electricitate', ls: ['e-grupare', 'e-curent', 'e-energie'],
    txt: 'Țiparul electric are în corp mii de celule speciale, electrocitele. Fiecare se comportă ca o baterie mică de aproximativ 0,15 V, iar ele sunt legate în serie, ca generatoarele din lecție. Tensiunile se adună: cu câteva mii de celule, peștele dă descărcări de peste 600 V, cu care își amețește prada.',
    fx: 'E_serie = N·E₁', num: ['600 V', 'descărcarea unui țipar mare'],
    calc: { lab: 'Numărul de electrocite legate în serie', min: 500, max: 6000, step: 100, val: 4000, unit: '', out: n => `E = ${big(n)} · 0,15 V = <b>${big(n * 0.15)} V</b>` },
    svg: sky('ntg-tip', '#2e5e4e', '#0e2a22') + `<g fill="#3e7a5e" opacity=".5"><path d="M20 200 q-4 -40 6 -80 q0 40 2 80z"/><path d="M290 200 q8 -50 -4 -90 q10 40 10 90z"/></g>` +
      `<g class="nt-wig2"><path d="M40 120 C80 96 110 144 150 120 S220 96 262 118" stroke="#6d7b3a" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M40 120 C80 96 110 144 150 120 S220 96 262 118" stroke="#9e9d24" stroke-width="5" fill="none" stroke-dasharray="2 8"/><circle cx="262" cy="118" r="10" fill="#6d7b3a"/><circle cx="266" cy="114" r="2" fill="#fff"/></g>` +
      `<g class="nt-flash" stroke="#ffee58" stroke-width="2.5" fill="none" stroke-linejoin="round"><path d="M80 92 l6 -12 l-8 -4 l8 -12"/><path d="M150 96 l-6 -14 l8 -2 l-6 -14"/><path d="M220 92 l6 -12 l-8 -4 l8 -12"/><path d="M110 148 l6 12 l-8 4 l6 12"/><path d="M190 146 l-6 12 l8 4 l-6 12"/></g>` +
      `<g class="nt-flee"><path d="M282 80 C288 74 298 74 304 80 C298 86 288 86 282 80Z" fill="#90a4ae"/><path d="M304 80 l6 -5 v10z" fill="#90a4ae"/></g>` + T(160, 30, 'celule în serie: 600 V', 13, '#ffee58')
  });

  add({ id: 'pasari', t: 'Păsările de pe fire', a: 'Electricitate', ls: ['e-ohm', 'e-kirchhoff'],
    txt: 'O pasăre poate sta liniștită pe un fir de înaltă tensiune. Între picioarele ei sunt doar câțiva centimetri dintr-un fir foarte gros, cu rezistență minusculă, deci tensiunea dintre picioare e U = I·R, de ordinul milivolților. Corpul păsării e o ramură legată în paralel cu acea bucată de fir, dar are o rezistență de milioane de ori mai mare, așa că aproape tot curentul trece mai departe prin fir. Dacă ar atinge în același timp două fire sau stâlpul, ar fi electrocutată.',
    fx: 'U = I·R_fir ;  I_pasăre = U / R_pasăre ≈ 0', num: ['~ 1 mV', 'tensiunea dintre picioarele păsării'],
    calc: { lab: 'Curentul prin linie (2 cm de fir gros: R ≈ 1,4 μΩ)', min: 100, max: 1500, step: 50, val: 600, unit: 'A', out: i => `tensiunea dintre picioare = <b>${n1(i * 1.4e-3, 2)} mV</b>` },
    svg: sky('ntg-pas', '#81d4fa', '#e1f5fe') + `<rect x="16" y="50" width="8" height="150" fill="#6d4c41"/><rect x="296" y="50" width="8" height="150" fill="#6d4c41"/><rect x="8" y="50" width="24" height="5" fill="#5d4037"/><rect x="288" y="50" width="24" height="5" fill="#5d4037"/>` +
      `<path d="M20 52 Q160 112 300 52" stroke="#263238" stroke-width="3" fill="none"/><path class="nt-flow" d="M20 52 Q160 112 300 52" stroke="#ffeb3b" stroke-width="3" fill="none" stroke-dasharray="2 14"/>` +
      bird(118, 77.5) + bird(160, 81) + bird(202, 77.5, .9) + T(160, 140, 'U = I·R ≈ 1 mV', 15, '#01579b')
  });

  add({ id: 'aurora', t: 'Aurora boreală', a: 'Electricitate', ls: ['ca-magnetic', 'a-bohr'],
    txt: 'Soarele trimite spre noi particule încărcate electric (vântul solar). Câmpul magnetic al Pământului le curbează traiectoria cu forța Lorentz și le dirijează spre poli. Acolo particulele lovesc atomii din aer, la 100–300 km înălțime, și îi excită. Când electronii acestor atomi revin pe nivele de energie mai joase, emit lumină cu lungimi de undă precise: verde (oxigen, 557,7 nm), roșu sau violet (azot).',
    fx: 'F = q·v·B·sin α ;  h·ν = E_n − E_m', num: ['557,7 nm', 'verdele aurorei (oxigen)'],
    svg: sky('ntg-aur', '#020818', '#0a2340') + stars(50, 140) + `<defs><linearGradient id="ntg-aurc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c4dff" stop-opacity="0"/><stop offset=".45" stop-color="#b388ff" stop-opacity=".35"/><stop offset="1" stop-color="#69f0ae" stop-opacity=".85"/></linearGradient></defs>` +
      `${[0, 1, 2].map(i => `<path class="nt-aurora" style="animation-delay:-${i * 1.7}s;transform-origin:160px 130px" d="M${-20 + i * 20} ${120 - i * 12} C60 ${90 - i * 10} 110 ${130 - i * 6} 170 ${100 - i * 8} S270 ${80 - i * 4} 340 ${105 - i * 10} V10 H${-20 + i * 20}Z" fill="url(#ntg-aurc)"/>`).join('')}` +
      `<path d="M0 200 L0 160 L40 140 L70 158 L110 130 L150 160 L190 138 L230 160 L270 132 L320 156 V200Z" fill="#05101e"/>` + T(280, 30, '557,7 nm', 12, '#b9f6ca')
  });

  add({ id: 'busola', t: 'Busola și păsările migratoare', a: 'Electricitate', ls: ['ca-magnetic'],
    txt: 'Pământul se comportă ca un magnet uriaș, cu un câmp de aproximativ 50 μT la suprafață, de câteva sute de ori mai slab decât al unui magnet de frigider. Acul busolei se aliniază cu liniile de câmp. Unele păsări migratoare, broaștele țestoase marine și somonii simt acest câmp și îl folosesc ca să se orienteze pe mii de kilometri.',
    fx: 'B_Pământ ≈ 50 μT', num: ['50 μT', 'câmpul magnetic la suprafața Pământului'],
    svg: `<rect width="320" height="200" fill="#0b1630"/>` + stars(25, 200) +
      `<g fill="none" stroke="#80deea" stroke-width="1.3" class="nt-flow" stroke-dasharray="4 6">${[1, 2, 3].map(k => `<path d="M100 66 C${100 + 34 * k} ${66 - 24 * k} ${100 + 34 * k} ${134 + 24 * k} 100 134"/><path d="M100 66 C${100 - 34 * k} ${66 - 24 * k} ${100 - 34 * k} ${134 + 24 * k} 100 134"/>`).join('')}</g>` +
      `<circle cx="100" cy="100" r="34" fill="#1e88e5"/><path d="M80 86 C90 76 104 80 108 92 C100 98 86 98 80 86Z M96 110 C108 106 120 112 116 124 C106 128 94 120 96 110Z" fill="#43a047"/>` + T(100, 60, 'N', 11, '#fff') + T(100, 148, 'S', 11, '#fff') +
      `<g class="nt-fly" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round">${[[0, 0], [12, 8], [12, -8], [24, 16], [24, -16]].map(([x, y]) => `<path d="M${200 - x} ${40 + y} l-6 -4 m6 4 l-6 4" transform="rotate(0)"/>`).join('')}</g>` +
      `<g transform="translate(250 145)"><circle r="26" fill="#eceff1" stroke="#90a4ae" stroke-width="3"/><g class="nt-needle"><path d="M0 -20 L5 0 L-5 0Z" fill="#e53935"/><path d="M0 20 L5 0 L-5 0Z" fill="#455a64"/></g><circle r="2.5" fill="#263238"/></g>` + T(250, 112, 'B ≈ 50 μT', 12, '#b2ebf2')
  });

  add({ id: 'hidro', t: 'Râul care face curent', a: 'Electricitate', ls: ['ca-inductie', 'ca-putere', 'ca-marimi', 'e-transfer', 'm-energie'],
    txt: 'La o hidrocentrală, apa care cade de la baraj rotește o turbină. Turbina rotește un generator: fluxul magnetic prin bobinele lui variază mereu, iar asta induce o tensiune alternativă (legea lui Faraday). Transformatoarele ridică apoi tensiunea la sute de mii de volți, ca la același transport de putere curentul să fie mic și pierderile R·I² în cabluri să fie neglijabile.',
    fx: 'e = −ΔΦ/Δt ;  U₂/U₁ = N₂/N₁', num: ['≈ 1 GW', 'puterea hidrocentralei Porțile de Fier I'],
    calc: { lab: 'Tensiunea de transport', min: 10, max: 400, step: 10, val: 220, unit: 'kV', out: u => `pentru 100 MW: I = <b>${big(1e5 / u)} A</b>; pierderile sunt de ${n1((220 / u) ** 2, 2)} ori cele de la 220 kV` },
    svg: sky('ntg-hid', '#90caf9', '#e3f2fd') + `<path d="M0 60 L90 60 L110 200 L0 200Z" fill="#1976d2"/><path d="M90 50 L110 50 L132 200 L104 200Z" fill="#9e9e9e"/><path d="M110 200 L320 200 L320 176 L150 176Z" fill="#42a5f5"/>` +
      `<path class="nt-flow" d="M96 120 L130 168 L170 168" stroke="#bbdefb" stroke-width="7" fill="none" stroke-dasharray="6 6"/>` +
      `<g transform="translate(180 160)"><circle r="16" fill="#eceff1" stroke="#607d8b" stroke-width="3"/><g class="nt-spin2">${[0, 60, 120, 180, 240, 300].map(r => `<path d="M0 0 L14 -4 L14 4Z" fill="#455a64" transform="rotate(${r})"/>`).join('')}</g></g>` +
      `<rect x="204" y="132" width="40" height="40" rx="5" fill="#ffb300"/>` + T(224, 157, 'G', 15, '#fff') +
      `<line x1="244" y1="140" x2="300" y2="60" stroke="#37474f" stroke-width="2"/><path class="nt-flow" d="M244 140 L300 60" stroke="#ffeb3b" stroke-width="3" stroke-dasharray="2 10"/>` +
      `<g transform="translate(276 40)"><rect width="34" height="22" fill="#8d6e63"/><path d="M-4 0 L17 -14 L38 0Z" fill="#5d4037"/><rect class="nt-twinkle" x="12" y="6" width="9" height="8" fill="#ffeb3b"/></g>` + T(40, 40, 'baraj', 12, '#fff')
  });

  /* ---------------- OPTICĂ ---------------- */
  seed = 53;
  add({ id: 'curcubeu', t: 'Curcubeul', a: 'Optică', ls: ['on-dispersie', 'o-reflexie'],
    txt: 'Lumina albă a Soarelui intră într-o picătură de ploaie, se refractă, se reflectă pe spatele picăturii și iese refractată din nou. Indicele de refracție al apei depinde puțin de culoare: violetul e deviat mai mult decât roșul. Culorile se despart (dispersie), iar fiecare ajunge la ochi sub un anumit unghi: roșul la ~42°, violetul la ~40° față de punctul opus Soarelui. De aceea curcubeul e mereu un arc și îl vezi doar cu Soarele în spate.',
    fx: 'n = sin i / sin r ;  n_violet > n_roșu', num: ['42°', 'unghiul la care vezi roșul'],
    svg: sky('ntg-cur', '#5b8fd6', '#cfe3f7') + sun(34, 32) + rain(36, 150, 320, 0, 150) +
      `<g fill="none" stroke-width="4.6" stroke-linecap="round">${['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#3949ab', '#8e24aa'].map((c, i) => `<path class="nt-draw" pathLength="1" d="M${60 + i * 4.6} 172 A${100 - i * 4.6} ${100 - i * 4.6} 0 0 1 ${260 - i * 4.6} 172" stroke="${c}" style="animation-delay:${(i * 0.1).toFixed(1)}s"/>`).join('')}</g>` +
      `<path d="M0 172 Q80 160 160 170 T320 166 V200 H0Z" fill="#3f8a4d"/>` + T(250, 190, 'roșu: 42°', 12)
  });

  add({ id: 'miraj', t: 'Mirajul de pe șosea', a: 'Optică', ls: ['o-reflexie'],
    txt: 'Vara, aerul de lângă asfalt sau nisip e mult mai cald, deci mai rar și cu indice de refracție puțin mai mic. O rază care vine oblic de la cer trece din straturi mai dense în straturi mai rare, se curbează tot mai mult și, la unghiuri foarte razante, se întoarce în sus spre ochiul tău (reflexie totală). Vezi „apă” pe drum, dar e de fapt imaginea cerului.',
    fx: 'n₁·sin i = n₂·sin r ;  sin ℓ = n₂/n₁', num: ['60 °C', 'asfaltul încins vara'],
    svg: sky('ntg-mi', '#64b5f6', '#fff3e0') + sun(270, 30) + `<path d="M0 120 Q80 108 160 118 T320 114 V200 H0Z" fill="#ffcc80"/><path d="M100 200 L150 120 L170 120 L220 200Z" fill="#616161"/><path d="M158 124 v8 m0 12 v10 m0 14 v14" stroke="#fff" stroke-width="2"/>` +
      `<g class="nt-shimmer" style="transform-origin:160px 150px"><ellipse cx="160" cy="150" rx="40" ry="6" fill="#90caf9" opacity=".75"/></g>` +
      `<g transform="translate(60 118)"><path d="M0 0 C-2 -20 2 -40 0 -54" stroke="#6d4c41" stroke-width="4" fill="none"/><g fill="#388e3c">${[-60, -20, 20, 60].map(r => `<ellipse cx="0" cy="-54" rx="16" ry="4" transform="rotate(${r} 0 -54) translate(10 0)"/>`).join('')}</g></g>` +
      `<path class="nt-draw" pathLength="1" d="M40 30 Q150 168 300 104" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="1"/>` + T(160, 104, 'imaginea cerului pe asfalt', 12, '#4e342e')
  });

  add({ id: 'roua', t: 'Picătura de rouă, o lentilă', a: 'Optică', ls: ['o-lentile', 'o-sisteme', 'o-instrumente', 'o-oglinzi'],
    txt: 'O picătură de rouă de pe o frunză e o lentilă convergentă naturală: prin ea vezi nervurile frunzei mărite, ca printr-o lupă. Ochiul tău are tot un sistem de lentile, corneea și cristalinul, care formează o imagine reală și răsturnată pe retină. Puterea lor totală e de aproximativ 60 de dioptrii.',
    fx: 'C = 1/f ;  1/x₂ − 1/x₁ = 1/f', num: ['≈ 60 δ', 'convergența ochiului uman'],
    calc: { lab: 'Distanța focală a ochiului', min: 14, max: 25, step: 0.5, val: 17, unit: 'mm', out: f => `convergența C = 1/f = <b>${n1(1000 / f, 1)} dioptrii</b>` },
    svg: sky('ntg-rou', '#c8e6c9', '#f1f8e9') + `<path d="M-20 200 C40 120 160 40 340 20 L340 200Z" fill="#66bb6a"/><g stroke="#43a047" stroke-width="2" fill="none"><path d="M0 200 C80 130 180 70 330 30"/>${[60, 120, 180, 240].map(x => `<path d="M${x} ${200 - x * .55} l30 30"/>`).join('')}</g>` +
      `<defs><clipPath id="ntg-rouc"><circle cx="170" cy="96" r="30"/></clipPath><radialGradient id="ntg-roug" cx=".35" cy=".3"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="#e8f5e9" stop-opacity=".25"/><stop offset="1" stop-color="#a5d6a7" stop-opacity=".2"/></radialGradient></defs>` +
      `<g clip-path="url(#ntg-rouc)"><rect x="130" y="60" width="80" height="80" fill="#81c784"/><g transform="translate(170 96) scale(2.2) translate(-170 -96)" stroke="#2e7d32" stroke-width="1.6" fill="none"><path d="M0 200 C80 130 180 70 330 30"/><path d="M180 101 l30 30"/></g></g>` +
      `<g class="nt-bob"><circle cx="170" cy="96" r="30" fill="url(#ntg-roug)" stroke="#e8f5e9" stroke-width="1.5"/><ellipse cx="160" cy="84" rx="8" ry="5" fill="#fff" opacity=".85"/></g>` + T(70, 40, 'lupă naturală', 13, '#1b5e20')
  });

  add({ id: 'bula', t: 'Culorile baloanelor de săpun', a: 'Optică', ls: ['on-lame', 'o-interferenta'],
    txt: 'Pelicula unui balon de săpun are o grosime de câteva sute de nanometri. Lumina se reflectă și pe fața din față, și pe cea din spate a peliculei; cele două unde interferă, așa că unele culori se întăresc, iar altele se sting. Grosimea peliculei se schimbă tot timpul (apa curge în jos), deci și culorile se mișcă. La fel apar culorile petelor de benzină pe apă și ale penelor de păun.',
    fx: '2·n·d = (k + ½)·λ   (maxime în reflexie)', num: ['~ 300 nm', 'grosimea peliculei de săpun'],
    calc: { lab: 'Grosimea peliculei (n = 1,33)', min: 80, max: 700, step: 10, val: 300, unit: 'nm', out: d => { const l = []; for (let k = 0; k < 8; k++) { const x = 4 * 1.33 * d / (2 * k + 1); if (x >= 380 && x <= 750) l.push(Math.round(x)); } return l.length ? `culori întărite în reflexie: <b>${l.join(', ')} nm</b>` : 'nicio culoare vizibilă nu e întărită'; } },
    svg: sky('ntg-bs', '#263238', '#37474f') + `<defs><linearGradient id="ntg-bsg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4081"/><stop offset=".25" stop-color="#ffd740"/><stop offset=".5" stop-color="#69f0ae"/><stop offset=".75" stop-color="#40c4ff"/><stop offset="1" stop-color="#e040fb"/><animateTransform attributeName="gradientTransform" type="rotate" from="0 .5 .5" to="360 .5 .5" dur="9s" repeatCount="indefinite"/></linearGradient></defs>` +
      `<g class="nt-bob"><circle cx="150" cy="100" r="62" fill="url(#ntg-bsg)" opacity=".42"/><circle cx="150" cy="100" r="62" fill="none" stroke="url(#ntg-bsg)" stroke-width="3" opacity=".9"/><ellipse cx="124" cy="72" rx="14" ry="8" fill="#fff" opacity=".7" transform="rotate(-30 124 72)"/></g>` +
      `${[0, 1, 2].map(i => `<g class="nt-rise2" style="animation-delay:-${i * 1.5}s"><circle cx="${250 + i * 18}" cy="170" r="${10 - i * 2}" fill="url(#ntg-bsg)" opacity=".5"/></g>`).join('')}` + T(150, 190, 'interferență în lame subțiri', 12)
  });

  add({ id: 'coroana', t: 'Inelele din jurul Lunii', a: 'Optică', ls: ['on-difractie'],
    txt: 'Când Luna se vede printr-un nor subțire, în jurul ei apar inele colorate, numite coroană. Lumina se difractă pe picăturile foarte mici de apă din nor (~10–20 μm). Unghiul inelelor e de ordinul λ/d, deci roșul (λ mare) apare la exterior. Cu cât picăturile sunt mai mici, cu atât inelele sunt mai largi.',
    fx: 'sin θ ≈ λ/d', num: ['10 μm', 'diametrul picăturilor din nor'],
    calc: { lab: 'Diametrul picăturilor (lumină verde, 550 nm)', min: 4, max: 40, step: 1, val: 12, unit: 'μm', out: d => `primul inel la θ ≈ <b>${n1(Math.asin(Math.min(1, 0.55 / d)) * 180 / Math.PI, 1)}°</b>` },
    svg: `<rect width="320" height="200" fill="#0a1128"/>` + stars(30, 200) + `<defs><radialGradient id="ntg-cor"><stop offset=".18" stop-color="#fffde7"/><stop offset=".3" stop-color="#bbdefb" stop-opacity=".5"/><stop offset=".45" stop-color="#fff59d" stop-opacity=".35"/><stop offset=".58" stop-color="#ef9a9a" stop-opacity=".4"/><stop offset=".72" stop-color="#90caf9" stop-opacity=".25"/><stop offset=".86" stop-color="#ffab91" stop-opacity=".25"/><stop offset="1" stop-color="#0a1128" stop-opacity="0"/></radialGradient></defs>` +
      `<g class="nt-pulse" style="transform-origin:160px 95px"><circle cx="160" cy="95" r="80" fill="url(#ntg-cor)"/></g><circle cx="160" cy="95" r="14" fill="#fffde7"/>` +
      cloud(90, 140, 2, '#90a4ae', .25) + cloud(240, 60, 2.2, '#90a4ae', .2) + T(160, 190, 'difracție pe picături de apă', 12, '#e1f5fe')
  });

  add({ id: 'albina', t: 'Albina și lumina polarizată', a: 'Optică', ls: ['on-polarizare'],
    txt: 'Lumina cerului albastru e parțial polarizată, cel mai mult pe direcțiile aflate la 90° față de Soare. Ochii albinelor „văd” direcția de polarizare, așa că ele își găsesc drumul spre stup după Soare chiar și când acesta e acoperit de nori. Ochelarii de soare polarizanți folosesc același fenomen ca să oprească reflexiile de pe apă.',
    fx: 'I = I₀·cos²α', num: ['90°', 'față de Soare: polarizarea e maximă'],
    calc: { lab: 'Unghiul dintre polarizor și direcția de polarizare', min: 0, max: 90, step: 1, val: 30, unit: '°', out: a => `trece <b>${n1(100 * Math.cos(a * Math.PI / 180) ** 2, 0)} %</b> din intensitate` },
    svg: sky('ntg-alb', '#42a5f5', '#bbdefb') + sun(60, 50, 13) + `<g stroke="#fff" stroke-width="1.6" stroke-linecap="round">${[40, 75, 110, 145].map((r, k) => Array.from({ length: 10 + k * 4 }, (_, i) => { const a = i / (10 + k * 4) * 2 * Math.PI, x = 60 + r * Math.cos(a), y = 50 + r * Math.sin(a); if (x < 0 || x > 320 || y < 0 || y > 200) return ''; const dx = -Math.sin(a) * 5, dy = Math.cos(a) * 5; return `<line x1="${(x - dx).toFixed(1)}" y1="${(y - dy).toFixed(1)}" x2="${(x + dx).toFixed(1)}" y2="${(y + dy).toFixed(1)}" opacity="${(0.25 + k * 0.22).toFixed(2)}"/>`; }).join('')).join('')}</g>` +
      `<g class="nt-bob"><g transform="translate(200 120)"><ellipse rx="12" ry="8" fill="#fdd835"/><path d="M-6 -7 v14 M0 -8 v16 M6 -7 v14" stroke="#212121" stroke-width="2.5"/><circle cx="12" cy="-1" r="5" fill="#212121"/><ellipse class="nt-wing" cx="-2" cy="-12" rx="9" ry="5" fill="#e3f2fd" opacity=".85"/></g></g>` +
      `<g transform="translate(270 150)"><path d="M-18 30 Q-22 0 0 -8 Q22 0 18 30Z" fill="#ffb300"/><path d="M-19 8 h38 M-19 18 h38" stroke="#e65100" stroke-width="2"/><circle cy="22" r="4" fill="#4e342e"/></g>` + T(150, 190, 'polarizarea cerului', 12, '#0d47a1')
  });

  /* ---------------- OSCILAȚII ȘI UNDE ---------------- */
  seed = 71;
  add({ id: 'liliac', t: 'Liliacul care „vede” cu sunete', a: 'Unde', ls: ['os-unde', 'os-sunet'],
    txt: 'Liliecii emit ultrasunete, cu frecvențe între 20 și peste 100 kHz, și ascultă ecoul. Din timpul în care se întoarce sunetul află distanța până la insectă (d = v·t/2). Cu cât frecvența e mai mare, cu atât lungimea de undă e mai mică și pot detecta insecte mai mici. Din efectul Doppler își dau seama și dacă insecta se apropie sau se depărtează.',
    fx: 'λ = v/ν ;  d = v·t/2', num: ['100 kHz', 'frecvența strigătelor unor lilieci'],
    calc: { lab: 'Frecvența ultrasunetului', min: 20, max: 120, step: 5, val: 50, unit: 'kHz', out: f => `lungimea de undă λ = 340/ν = <b>${n1(340 / f, 1)} mm</b>` },
    svg: sky('ntg-lil', '#0d1530', '#2c3a66') + stars(30, 120) + `<circle cx="270" cy="40" r="18" fill="#fff8e1"/><circle cx="263" cy="35" r="3" fill="#ffecb3"/>` +
      `${[0, .5, 1, 1.5].map(d => `<circle class="nt-ripple" cx="96" cy="100" r="60" fill="none" stroke="#80deea" stroke-width="2" style="animation-delay:-${d}s;transform-origin:96px 100px"/>`).join('')}` +
      `${[0, .7].map(d => `<circle class="nt-ripple" cx="226" cy="104" r="30" fill="none" stroke="#ffcc80" stroke-width="1.5" style="animation-delay:-${d}s;transform-origin:226px 104px"/>`).join('')}` +
      `<g class="nt-bob"><g transform="translate(90 100)"><path d="M0 0 C-8 -14 -26 -16 -36 -8 C-28 -6 -26 2 -22 6 C-16 2 -10 4 -6 8 C-4 4 0 2 0 2 C0 2 4 4 6 8 C10 4 16 2 22 6 C26 2 28 -6 36 -8 C26 -16 8 -14 0 0Z" fill="#6a5d9c" stroke="#d1c4e9" stroke-width="1.2"/><circle cx="0" cy="-2" r="5" fill="#6a5d9c" stroke="#d1c4e9" stroke-width="1"/><path d="M-3 -6 l-2 -5 l3 2z M3 -6 l2 -5 l-3 2z" fill="#d1c4e9"/></g></g>` +
      `<g class="nt-bob" style="animation-delay:-.7s"><g transform="translate(226 104)"><ellipse rx="4" ry="2.5" fill="#d7ccc8"/><ellipse class="nt-wing" cx="-1" cy="-4" rx="5" ry="3" fill="#efebe9"/></g></g>` + T(160, 188, 'ecolocație cu ultrasunete', 12, '#b2ebf2')
  });

  add({ id: 'tsunami', t: 'Valurile și tsunami-ul', a: 'Unde', ls: ['os-unde', 'os-interf'],
    txt: 'Valurile transportă energie, nu apă: o barcă doar urcă și coboară pe loc. Când lungimea de undă e mult mai mare decât adâncimea, viteza valului e v = √(g·h). Un tsunami în oceanul adânc de 4 km merge cu peste 700 km/h, dar e aproape invizibil. Lângă țărm adâncimea scade, valul încetinește, apa se înghesuie și valul crește la zeci de metri.',
    fx: 'v = √(g·h) ;  v = λ·ν', num: ['720 km/h', 'tsunami în oceanul de 4 km'],
    calc: { lab: 'Adâncimea oceanului', min: 1, max: 6000, step: 1, val: 4000, unit: 'm', out: h => `v = √(g·h) = ${big(Math.sqrt(10 * h))} m/s = <b>${big(Math.sqrt(10 * h) * 3.6)} km/h</b>` },
    svg: sky('ntg-tsu', '#90caf9', '#e3f2fd') + `<path d="M0 90 L320 90 L320 200 L0 200Z" fill="#1565c0"/><path d="M0 200 L170 186 C230 176 270 130 320 96 L320 200Z" fill="#a1887f"/><path d="M276 120 L320 96 L320 104 L282 124Z" fill="#ffe082"/>` +
      `<g class="nt-tsu"><path d="M-30 90 C-20 90 -14 80 0 78 C14 80 20 90 30 90Z" fill="#1976d2" stroke="#e3f2fd" stroke-width="2"/></g>` +
      `<g class="nt-bob"><path d="M60 86 L84 86 L80 92 L64 92Z" fill="#fff"/><line x1="72" y1="86" x2="72" y2="72" stroke="#5d4037" stroke-width="1.5"/><path d="M72 72 L82 84 L72 84Z" fill="#ef5350"/></g>` +
      T(70, 150, 'adânc: rapid, mic', 12, '#e3f2fd', 'start') + T(300, 80, 'lângă mal: înalt', 12, '#0d47a1', 'end')
  });

  add({ id: 'picioare', t: 'Picioarele ca pendule', a: 'Unde', ls: ['os-pendul', 'os-armonic'],
    txt: 'Când mergi relaxat, piciorul se balansează înainte aproape ca un pendul, sub acțiunea greutății. Perioada unui pendul crește cu lungimea lui (T = 2π√(l/g)), așa că animalele cu picioare lungi, ca girafele, fac pași rari și ample, iar șoarecii își mișcă picioarele foarte repede. Ritmul natural de mers e cel apropiat de frecvența proprie a piciorului: acolo efortul e minim, ca la rezonanță.',
    fx: 'T = 2π·√(l/g)', num: ['≈ 1,4 s', 'perioada unui picior de om (l ≈ 0,5 m)'],
    calc: { lab: 'Lungimea pendulului (piciorului)', min: 0.03, max: 2.5, step: 0.01, val: 0.5, unit: 'm', out: l => `T = <b>${n1(2 * Math.PI * Math.sqrt(l / 9.8), 2)} s</b>, adică ${n1(60 / (2 * Math.PI * Math.sqrt(l / 9.8)), 0)} oscilații pe minut` },
    svg: sky('ntg-pic', '#fff8e1', '#ffe0b2') + `<rect y="176" width="320" height="24" fill="#a1887f"/>` +
      `<g><rect x="56" y="30" width="44" height="10" rx="4" fill="#5d4037"/><g class="nt-pend" style="transform-origin:78px 40px;animation-duration:2.6s"><line x1="78" y1="40" x2="78" y2="160" stroke="#8d6e63" stroke-width="8" stroke-linecap="round"/><ellipse cx="82" cy="164" rx="10" ry="5" fill="#4e342e"/></g></g>` +
      `<g><rect x="216" y="120" width="34" height="8" rx="4" fill="#5d4037"/><g class="nt-pend" style="transform-origin:233px 128px;animation-duration:1.2s"><line x1="233" y1="128" x2="233" y2="160" stroke="#8d6e63" stroke-width="6" stroke-linecap="round"/><ellipse cx="236" cy="163" rx="6" ry="3.5" fill="#4e342e"/></g></g>` +
      T(78, 22, 'l mare: pași rari', 12, '#4e342e') + T(233, 110, 'l mică: pași deși', 12, '#4e342e') + T(160, 194, 'T = 2π√(l/g)', 12, '#fff')
  });

  /* ---------------- FIZICĂ MODERNĂ ---------------- */
  seed = 89;
  add({ id: 'frunza', t: 'Frunza care prinde fotoni', a: 'Fizică modernă', ls: ['o-foto', 'q-termic', 'em-unde'],
    txt: 'Pentru clorofilă, lumina vine în „pachete” de energie, fotonii, fiecare cu energia E = h·ν = h·c/λ. Clorofila absoarbe mai ales fotonii roșii (~680 nm) și albaștri (~430 nm) și reflectă verdele: de aceea frunzele sunt verzi. Un foton roșu are ~1,8 eV, destul cât să pornească reacțiile fotosintezei, la fel cum un foton trebuie să aibă destulă energie ca să smulgă un electron în efectul fotoelectric.',
    fx: 'E = h·ν = h·c/λ', num: ['680 nm', 'lumina roșie absorbită de clorofilă'],
    calc: { lab: 'Lungimea de undă a luminii', min: 380, max: 750, step: 5, val: 680, unit: 'nm', out: l => `energia unui foton E = <b>${n1(1240 / l, 2)} eV</b>` },
    svg: sky('ntg-fru', '#e8f5e9', '#c8e6c9') + sun(30, 30, 16) +
      `<path d="M120 180 C80 120 120 50 230 40 C260 110 220 180 120 180Z" fill="#43a047"/><path d="M120 180 C160 130 200 90 230 40" stroke="#2e7d32" stroke-width="3" fill="none"/><g stroke="#2e7d32" stroke-width="2" fill="none"><path d="M150 140 l-20 -16 M170 116 l-22 -20 M190 92 l-18 -24 M160 130 l24 6 M182 104 l26 2 M200 80 l20 -2"/></g>` +
      `<g fill="#1b5e20" opacity=".55">${Array.from({ length: 8 }, () => `<ellipse class="nt-twinkle" cx="${(140 + rnd() * 70).toFixed(0)}" cy="${(70 + rnd() * 80).toFixed(0)}" rx="4" ry="2.5" style="animation-delay:-${(rnd() * 3).toFixed(1)}s"/>`).join('')}</g>` +
      `${[['#e53935', 0], ['#1e88e5', .8], ['#e53935', 1.6]].map(([c, d]) => `<g class="nt-photon" style="animation-delay:-${d}s"><path d="M0 0 q4 -6 8 0 t8 0 t8 0 t8 0" stroke="${c}" stroke-width="2.5" fill="none" transform="translate(40 40) rotate(35)"/></g>`).join('')}` +
      T(260, 175, 'E = h·c/λ', 14, '#1b5e20')
  });

  add({ id: 'stele', t: 'Culoarea stelelor', a: 'Fizică modernă', ls: ['q-termic', 'em-unde'],
    txt: 'Culoarea unei stele îți spune cât de fierbinte e la suprafață. O stea radiază aproape ca un corp negru, cel mai intens la lungimea de undă λmax = b/T (legea lui Wien). Betelgeuse (~3500 K) e roșiatică, Soarele (~5800 K) e alb-gălbui, iar Rigel (~12 000 K) e albăstruie. Așa măsoară astronomii temperatura stelelor fără să ajungă la ele.',
    fx: 'λmax·T = b ;  b = 2,9·10⁻³ m·K', num: ['5800 K', 'temperatura suprafeței Soarelui'],
    calc: { lab: 'Temperatura stelei', min: 2500, max: 20000, step: 100, val: 5800, unit: 'K', out: t => { const l = 2.9e6 / t; return `λmax = <b>${big(l)} nm</b> (${l > 750 ? 'infraroșu: steaua pare roșie' : l > 590 ? 'roșu-portocaliu' : l > 490 ? 'galben-verde: steaua pare albă' : l > 380 ? 'albastru' : 'ultraviolet: steaua pare albastră'})`; } },
    svg: `<rect width="320" height="200" fill="#060b1d"/>` + stars(70, 200) + `<defs>${[['r', '#ff7043'], ['y', '#fff59d'], ['b', '#82b1ff']].map(([k, c]) => `<radialGradient id="ntg-st${k}"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')}</defs>` +
      `${[[70, 90, 'r', 34, '3500 K'], [160, 120, 'y', 26, '5800 K'], [250, 80, 'b', 30, '12 000 K']].map(([x, y, k, r, t], i) => `<circle class="nt-pulse" style="transform-origin:${x}px ${y}px;animation-delay:-${i}s" cx="${x}" cy="${y}" r="${r}" fill="url(#ntg-st${k})"/>` + T(x, y + r + 14, t, 11, '#fff')).join('')}` + T(160, 24, 'λmax·T = const', 13, '#e1f5fe')
  });

  add({ id: 'soare', t: 'Soarele, un reactor de fuziune', a: 'Fizică modernă', ls: ['n-reactii', 'r-dinamica', 'n-nucleu'],
    txt: 'În centrul Soarelui, la ~15 milioane de grade, nucleele de hidrogen fuzionează și formează heliu. Masa heliului obținut e puțin mai mică decât masa hidrogenului din care s-a format (defectul de masă); diferența devine energie, E = Δm·c². Soarele radiază 3,8·10²⁶ W, adică pierde în fiecare secundă cam 4 milioane de tone de masă, și va mai străluci așa încă ~5 miliarde de ani.',
    fx: 'E = Δm·c²', num: ['4 milioane t/s', 'masa transformată în energie'],
    svg: `<rect width="320" height="200" fill="#120a05"/>` + stars(20, 200) + `<defs><radialGradient id="ntg-soa"><stop offset="0" stop-color="#fff59d"/><stop offset=".5" stop-color="#ffb300"/><stop offset="1" stop-color="#e65100"/></radialGradient></defs>` +
      `<g class="nt-pulse" style="transform-origin:100px 100px"><circle cx="100" cy="100" r="78" fill="#ff6d00" opacity=".25"/></g><circle cx="100" cy="100" r="66" fill="url(#ntg-soa)"/>` +
      `<g fill="#ffcc80" opacity=".45">${Array.from({ length: 14 }, () => `<circle class="nt-twinkle" cx="${(60 + rnd() * 80).toFixed(0)}" cy="${(60 + rnd() * 80).toFixed(0)}" r="${(3 + rnd() * 4).toFixed(1)}" style="animation-delay:-${(rnd() * 3).toFixed(1)}s"/>`).join('')}</g>` +
      `<path class="nt-flare" d="M150 60 C180 30 196 60 168 78" stroke="#ff7043" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<g transform="translate(250 90)"><circle class="nt-fuseL" r="7" fill="#ef5350"/><circle class="nt-fuseR" r="7" fill="#ef5350"/><circle class="nt-boom" r="16" fill="#fff59d"/></g>` + T(250, 136, '¹H + ¹H → …', 11, '#ffcc80') + T(250, 154, '→ ⁴He + energie', 11, '#ffcc80') + T(250, 30, 'E = Δm·c²', 15, '#fff59d')
  });

  add({ id: 'c14', t: 'Ceasul radioactiv din lemn', a: 'Fizică modernă', ls: ['n-radio'],
    txt: 'Orice ființă vie conține carbon-14 radioactiv în aceeași proporție ca aerul, pentru că îl schimbă mereu cu mediul. După moarte nu mai primește C-14, iar cel rămas se dezintegrează cu timpul de înjumătățire de 5730 de ani. Măsurând cât C-14 a mai rămas într-o bucată de lemn, într-un os sau într-o pânză, afli cât de veche e, până la ~50 000 de ani.',
    fx: 'N = N₀·2^(−t/T½) ;  T½ = 5730 ani', num: ['5730 ani', 'timpul de înjumătățire al C-14'],
    calc: { lab: 'Vârsta probei', min: 0, max: 50000, step: 100, val: 5730, unit: 'ani', out: t => `a mai rămas <b>${n1(100 * Math.pow(2, -t / 5730), 2)} %</b> din C-14` },
    svg: sky('ntg-c14', '#efebe9', '#d7ccc8') + `<g transform="translate(90 104)"><circle r="72" fill="#a1887f"/>${[60, 48, 38, 28, 18, 9].map((r, i) => `<circle r="${r}" fill="${i % 2 ? '#bcaaa4' : '#d7ccc8'}"/>`).join('')}<circle r="72" fill="none" stroke="#5d4037" stroke-width="6"/>` +
      `<g fill="#43a047">${Array.from({ length: 16 }, (_, i) => { const a = rnd() * 6.28, r = 8 + rnd() * 56; return `<circle class="nt-decay" cx="${(r * Math.cos(a)).toFixed(1)}" cy="${(r * Math.sin(a)).toFixed(1)}" r="3" style="animation-delay:-${(i * 0.5).toFixed(1)}s"/>`; }).join('')}</g></g>` +
      `<g transform="translate(186 40)"><path d="M0 0 V120 H120" stroke="#5d4037" stroke-width="2" fill="none"/><path class="nt-draw" pathLength="1" d="M0 6 C30 60 60 96 120 114" stroke="#43a047" stroke-width="3" fill="none"/><line x1="0" y1="63" x2="34" y2="63" stroke="#8d6e63" stroke-dasharray="3 3"/><line x1="34" y1="63" x2="34" y2="120" stroke="#8d6e63" stroke-dasharray="3 3"/>` + T(34, 136, 'T½', 11, '#4e342e') + T(60, -8, 'C-14 rămas', 11, '#4e342e') + `</g>`
  });

  add({ id: 'miuoni', t: 'Miuonii din raze cosmice', a: 'Fizică modernă', ls: ['r-postulate'],
    txt: 'Razele cosmice lovesc atmosfera la ~15 km înălțime și creează miuoni, particule care trăiesc în medie doar 2,2 μs. Chiar și cu viteza luminii ar parcurge doar ~660 m, totuși mulți ajung la sol. Explicația e relativitatea: pentru noi, „ceasul” miuonilor care zboară cu 0,999·c merge de zeci de ori mai încet (dilatarea duratelor), deci trăiesc destul cât să străbată atmosfera.',
    fx: 'Δt = γ·Δt₀ ;  γ = 1/√(1 − v²/c²)', num: ['2,2 μs', 'viața medie a unui miuon în repaus'],
    calc: { lab: 'Viteza miuonului (fracțiune din c)', min: 0.9, max: 0.9999, step: 0.0001, val: 0.999, unit: 'c', out: b => { const g = 1 / Math.sqrt(1 - b * b); return `γ = <b>${n1(g, 1)}</b>; parcurge în medie <b>${n1(g * b * 3e8 * 2.2e-6 / 1000, 1)} km</b> în loc de ${n1(b * 3e8 * 2.2e-6, 0)} m`; } },
    svg: sky('ntg-miu', '#0b1a3a', '#90caf9') + stars(15, 50) + `<g stroke="#fff" stroke-opacity=".25">${[50, 90, 130].map(y => `<line x1="0" y1="${y}" x2="320" y2="${y}" stroke-dasharray="2 6"/>`).join('')}</g>` +
      `<path class="nt-flow" d="M140 0 L160 30" stroke="#ff5252" stroke-width="3" stroke-dasharray="6 6"/><circle class="nt-pulse" style="transform-origin:160px 30px" cx="160" cy="30" r="6" fill="#ffeb3b"/>` +
      `<g stroke="#b388ff" stroke-width="2" stroke-dasharray="5 8" class="nt-down2">${[[-50, 1], [-20, 1], [10, 1], [40, 1], [70, 1]].map(([dx]) => `<line x1="160" y1="30" x2="${160 + dx}" y2="176"/>`).join('')}</g>` +
      `<path d="M0 176 Q80 168 160 174 T320 172 V200 H0Z" fill="#33691e"/><rect x="104" y="168" width="112" height="10" rx="3" fill="#37474f"/>` + T(270, 40, '15 km', 12, '#e1f5fe') + T(260, 150, 'γ ≈ 22', 13, '#311b92')
  });

  S.forEach(s => { s.svg = `<svg class="nt-svg" viewBox="0 0 320 200" role="img" aria-label="${s.t}" xmlns="http://www.w3.org/2000/svg">${s.svg}</svg>`; });
  window.NATURA = S;
})();
