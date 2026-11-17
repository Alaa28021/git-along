// Git Along — all art is flat SVG drawn in code (no gradients).
// Characters use a 200x300 viewBox; scenes use 1280x720.

export const C = {
  ink: '#174C4A', midnight: '#073F43', ocean: '#2F6F9F', jade: '#5FA89A',
  mint: '#B9D9CB', sky: '#CDE7F4', gold: '#F3B64E', champagne: '#C9A86A',
  antique: '#8A6416', cream: '#FFF2D8', softCream: '#FFF9F0', blush: '#F4C7D0',
  peach: '#F3B28D', lilac: '#D9CCEB', forest: '#2E6B4F', brick: '#B4413C',
};

export const SKINS = ['#FFE3CC', '#F6CBA8', '#E2A981', '#C68660', '#9A6244', '#6E4530'];
export const HAIR_COLORS = ['#2B2220', '#5A3A2A', '#8B5A3C', '#D9B26F', '#174C4A', '#B79FD6'];
export const HIJAB_COLORS = ['#D9CCEB', '#B9D9CB', '#CDE7F4', '#F4C7D0', '#F3B28D', '#174C4A'];
export const OUTFIT_COLORS = ['#CDE7F4', '#B9D9CB', '#F4C7D0', '#F3B64E', '#2F6F9F'];
export const HAIR_STYLES = ['short', 'buzz', 'long', 'ponytail', 'curly', 'bun', 'hijab', 'hijabSport'];
export const OUTFITS = ['hoodie', 'cardigan', 'shirt', 'dress'];
export const GLASSES = ['none', 'round', 'square'];
export const ACCESSORIES = ['none', 'headphones', 'scarf', 'cap'];
export const EXPRESSIONS = ['neutral', 'happy', 'worried', 'upset', 'proud', 'surprised'];

const S = `stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;
let uid = 0;

/* ---------------- Characters ---------------- */

export const CAST = {
  mira: { skin: SKINS[1], hair: 'bun', hairColor: HAIR_COLORS[1], glasses: 'none', outfit: 'cardigan', outfitColor: C.blush, accessory: 'none', starClip: true, gender: 'f' },
  sara: { skin: SKINS[2], hair: 'hijab', hairColor: 0, hijabColor: C.lilac, glasses: 'round', outfit: 'cardigan', outfitColor: C.sky, accessory: 'none', gender: 'f' },
  nour: { skin: SKINS[2], hair: 'long', hairColor: HAIR_COLORS[0], glasses: 'square', outfit: 'shirt', outfitColor: C.ocean, accessory: 'scarf', gender: 'f' },
  omar: { skin: SKINS[3], hair: 'curly', hairColor: HAIR_COLORS[0], glasses: 'square', outfit: 'hoodie', outfitColor: C.jade, accessory: 'none', oversize: true, gender: 'm' },
};

export function avatarToSpec(a) {
  const isHijab = a.hair === 'hijab' || a.hair === 'hijabSport';
  return {
    skin: SKINS[a.skin] ?? SKINS[1],
    hair: a.hair,
    hairColor: HAIR_COLORS[a.hairColor] ?? HAIR_COLORS[0],
    hijabColor: isHijab ? (HIJAB_COLORS[a.hairColor] ?? HIJAB_COLORS[0]) : null,
    glasses: a.glasses, outfit: a.outfit,
    outfitColor: OUTFIT_COLORS[a.outfitColor] ?? OUTFIT_COLORS[0],
    accessory: a.accessory,
    gender: a.address || (['long', 'ponytail', 'bun', 'hijab', 'hijabSport'].includes(a.hair) || a.outfit === 'dress' ? 'f' : 'm'),
  };
}

function hairBack(sp) {
  const h = sp.hairColor;
  switch (sp.hair) {
    case 'long': return `<path d="M40 92 Q38 28 100 28 Q162 28 160 92 L166 196 Q100 208 34 196 Z" fill="${h}" ${S}/>`;
    case 'ponytail': return `<path d="M146 64 Q196 92 176 176 Q168 150 150 122 Z" fill="${h}" ${S}/>`;
    case 'bun': return `<circle cx="100" cy="30" r="22" fill="${h}" ${S}/>`;
    case 'curly': {
      let c = '';
      [[54, 58], [72, 38], [100, 30], [128, 38], [146, 58], [158, 84], [42, 84], [40, 112], [160, 112]].forEach(([x, y]) => { c += `<circle cx="${x}" cy="${y}" r="22" fill="${h}" ${S}/>`; });
      return c;
    }
    case 'hijab': return `<path d="M32 100 Q32 24 100 24 Q168 24 168 100 L174 196 Q100 212 26 196 Z" fill="${sp.hijabColor}" ${S}/>`;
    case 'hijabSport': return `<path d="M36 100 Q36 26 100 26 Q164 26 164 100 L158 172 Q100 184 42 172 Z" fill="${sp.hijabColor}" ${S}/>`;
    default: return '';
  }
}

function hairFront(sp) {
  const h = sp.hairColor;
  switch (sp.hair) {
    case 'short': return `<path d="M42 94 Q38 32 100 30 Q162 32 158 94 Q152 66 128 58 Q112 78 74 70 Q54 74 42 94 Z" fill="${h}" ${S}/>`;
    case 'buzz': return `<path d="M44 82 Q48 36 100 34 Q152 36 156 82 Q100 58 44 82 Z" fill="${h}" ${S}/>`;
    case 'long': return `<path d="M42 104 Q36 32 100 30 Q164 32 158 104 L158 136 Q152 82 122 62 Q104 80 70 72 Q50 86 46 136 Z" fill="${h}" ${S}/>`;
    case 'ponytail': return `<path d="M42 92 Q40 32 100 30 Q160 32 158 92 Q146 60 112 58 Q90 70 62 68 Q48 76 42 92 Z" fill="${h}" ${S}/>`;
    case 'curly': {
      let c = '';
      [[56, 60], [76, 46], [100, 42], [124, 46], [144, 60]].forEach(([x, y]) => { c += `<circle cx="${x}" cy="${y}" r="17" fill="${h}" ${S}/>`; });
      return c;
    }
    case 'bun': return `<path d="M44 90 Q44 36 100 34 Q156 36 156 90 Q140 58 100 56 Q60 58 44 90 Z" fill="${h}" ${S}/>`;
    case 'hijab':
    case 'hijabSport': {
      const fold = sp.hair === 'hijab'
        ? `<path d="M58 150 Q100 172 142 150" fill="none" stroke="${C.ink}" stroke-width="2" opacity=".55"/>`
        : `<path d="M40 74 Q100 50 160 74" fill="none" stroke="${C.softCream}" stroke-width="7" opacity=".7"/>`;
      return `<path fill-rule="evenodd" d="M100 30 C138 30 166 60 166 98 C166 140 138 166 100 166 C62 166 34 140 34 98 C34 60 62 30 100 30 Z M100 52 C74 52 54 72 54 100 C54 128 74 150 100 150 C126 150 146 128 146 100 C146 72 126 52 100 52 Z" fill="${sp.hijabColor}" ${S}/>${fold}`;
    }
    default: return '';
  }
}

function outfit(sp) {
  const o = sp.outfitColor, male = sp.gender === 'm', wide = (sp.oversize ? 8 : 0) + (male ? 6 : 0);
  const tapered = !male && !sp.oversize && sp.outfit !== 'dress';
  const torso = sp.outfit === 'dress'
    ? `<path d="M62 168 Q100 152 138 168 L158 282 Q100 292 42 282 Z" fill="${o}" ${S}/>`
    : tapered
      ? `<path d="M64 168 Q100 153 136 168 L132 212 Q142 236 148 262 Q100 272 52 262 Q58 236 68 212 Z" fill="${o}" ${S}/>`
      : `<path d="M${62 - wide} 168 Q100 152 ${138 + wide} 168 L${150 + wide} 262 Q100 272 ${50 - wide} 262 Z" fill="${o}" ${S}/>`;
  const shade = sp.outfit === 'dress'
    ? `<path d="M120 170 L138 168 L158 282 Q140 286 128 287 Z" fill="${C.midnight}" opacity=".1"/>`
    : `<path d="M120 168 L${138 + wide} 168 L${150 + wide} 262 Q136 266 126 268 Z" fill="${C.midnight}" opacity=".1"/>`;
  let detail = '';
  if (sp.outfit === 'hoodie') {
    detail = `<path d="M74 166 Q100 186 126 166" fill="${o}" ${S}/>
      <path d="M92 176 L90 204 M108 176 L110 204" stroke="${C.softCream}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="90" cy="206" r="3" fill="${C.softCream}"/><circle cx="110" cy="206" r="3" fill="${C.softCream}"/>
      <rect x="76" y="222" width="48" height="24" rx="10" fill="none" ${S} opacity=".7"/>`;
  } else if (sp.outfit === 'cardigan') {
    detail = `<path d="M88 160 L100 236 L112 160 Z" fill="${C.softCream}" ${S}/>
      <circle cx="94" cy="200" r="3" fill="${C.gold}"/><circle cx="95" cy="218" r="3" fill="${C.gold}"/><circle cx="96" cy="236" r="3" fill="${C.gold}"/>`;
  } else if (sp.outfit === 'shirt') {
    detail = `<path d="M86 158 L100 176 L94 186 Z M114 158 L100 176 L106 186 Z" fill="${C.softCream}" ${S}/>
      <path d="M100 178 L100 260" stroke="${C.ink}" stroke-width="2" opacity=".5"/>
      <circle cx="100" cy="200" r="2.5" fill="${C.ink}"/><circle cx="100" cy="222" r="2.5" fill="${C.ink}"/>`;
  } else if (sp.outfit === 'dress') {
    detail = `<path d="M84 160 Q100 178 116 160" fill="${C.softCream}" ${S}/>
      <path d="M58 226 Q100 236 142 226" stroke="${C.ink}" stroke-width="2.5" fill="none"/>`;
  }
  return torso + shade + detail;
}

function arms(sp) {
  const o = sp.outfitColor, w = (sp.oversize ? 6 : 0) + (sp.gender === 'm' ? 5 : 0);
  return `<path d="M${66 - w} 178 Q${52 - w} 212 ${52 - w} 246" stroke="${C.ink}" stroke-width="23" fill="none" stroke-linecap="round"/>
    <path d="M${66 - w} 178 Q${52 - w} 212 ${52 - w} 246" stroke="${o}" stroke-width="17.5" fill="none" stroke-linecap="round"/>
    <path d="M${134 + w} 178 Q${148 + w} 212 ${148 + w} 246" stroke="${C.ink}" stroke-width="23" fill="none" stroke-linecap="round"/>
    <path d="M${134 + w} 178 Q${148 + w} 212 ${148 + w} 246" stroke="${o}" stroke-width="17.5" fill="none" stroke-linecap="round"/>
    <circle cx="${52 - w}" cy="252" r="9" fill="${sp.skin}" ${S}/><circle cx="${148 + w}" cy="252" r="9" fill="${sp.skin}" ${S}/>`;
}

function legs(sp) {
  const pants = sp.outfit === 'dress' ? sp.skin : C.ink;
  const top = sp.outfit === 'dress' ? 276 : 252;
  return `<rect x="79" y="${top}" width="17" height="${290 - top}" rx="7" fill="${pants}" ${S}/>
    <rect x="104" y="${top}" width="17" height="${290 - top}" rx="7" fill="${pants}" ${S}/>
    <ellipse cx="86" cy="290" rx="14" ry="7" fill="${C.midnight}"/><ellipse cx="114" cy="290" rx="14" ry="7" fill="${C.midnight}"/>`;
}

export function face(expr, g = 'f') {
  const dark = C.midnight, male = g === 'm';
  const lashes = male ? '' : `<path d="M74.5 94 L68 89.5 M73.6 99 L66.8 98 M125.5 94 L132 89.5 M126.4 99 L133.2 98" stroke="${dark}" stroke-width="2.3" stroke-linecap="round"/>`;
  const openEyes = (r = 8, rx = 6) => `<g class="eyes-open" style="animation-delay:${(Math.random() * 3).toFixed(2)}s">${lashes}
      <ellipse cx="80" cy="100" rx="${rx}" ry="${r}" fill="${dark}"/><ellipse cx="120" cy="100" rx="${rx}" ry="${r}" fill="${dark}"/>
      <circle cx="82.5" cy="96" r="2.4" fill="#fff"/><circle cx="122.5" cy="96" r="2.4" fill="#fff"/></g>`;
  const happyEyes = `<path d="M71 103 Q80 92 89 103 M111 103 Q120 92 129 103${male ? '' : ' M71 103 L65.5 99.5 M129 103 L134.5 99.5'}" fill="none" stroke="${dark}" stroke-width="3.4" stroke-linecap="round"/>`;
  const blush = (o = 0.75) => `<ellipse cx="68" cy="116" rx="9" ry="5" fill="${C.blush}" opacity="${male ? o * 0.45 : o}"/><ellipse cx="132" cy="116" rx="9" ry="5" fill="${C.blush}" opacity="${male ? o * 0.45 : o}"/>`;
  const brow = d => `<path d="${d}" fill="none" stroke="${dark}" stroke-width="${male ? 4.8 : 2.6}" stroke-linecap="round"/>`;
  const mouth = (d, fill = 'none') => `<path d="${d}" fill="${fill}" stroke="${male ? dark : '#8E3A36'}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  switch (expr) {
    case 'happy': return happyEyes + brow('M71 82 Q80 77 89 81 M111 81 Q120 77 129 82') + mouth('M89 119 Q100 136 111 119 Z', C.brick) + blush(0.95);
    case 'worried': return openEyes() + brow('M71 87 L89 80 M111 80 L129 87') + mouth('M91 125 Q95.5 120 100 125 Q104.5 130 109 125') + blush(0.4);
    case 'upset': return openEyes(6.5) + brow('M71 79 L89 86 M111 86 L129 79') + mouth('M91 127 Q100 118 109 127') + blush(0.3);
    case 'proud': return happyEyes + brow('M70 80 Q80 74 90 79 M110 79 Q120 74 130 80') + mouth('M90 120 Q102 130 112 118') + blush(0.85);
    case 'surprised': return openEyes(9.5, 7.5) + brow('M70 76 Q80 70 90 75 M110 75 Q120 70 130 76') + `<ellipse cx="100" cy="125" rx="6" ry="7.5" fill="${C.brick}" stroke="${dark}" stroke-width="2.4"/>` + blush(0.5);
    default: return openEyes() + brow('M71 84 L89 83 M111 83 L129 84') + mouth('M93 122 Q100 127 107 122') + blush(0.6);
  }
}

function glasses(kind) {
  if (kind === 'round') return `<g fill="#fff" fill-opacity=".18" stroke="${C.ink}" stroke-width="2.6"><circle cx="80" cy="100" r="14"/><circle cx="120" cy="100" r="14"/><path d="M94 99 Q100 95 106 99" fill="none"/></g>`;
  if (kind === 'square') return `<g fill="#fff" fill-opacity=".18" stroke="${C.ink}" stroke-width="2.6"><rect x="64" y="88" width="32" height="24" rx="6"/><rect x="104" y="88" width="32" height="24" rx="6"/><path d="M96 99 L104 99" fill="none"/></g>`;
  return '';
}

function accessoryBack(kind) {
  if (kind === 'headphones') return `<path d="M38 100 Q38 18 100 18 Q162 18 162 100" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>`;
  return '';
}
function accessoryFront(kind, sp) {
  if (kind === 'headphones') return `<rect x="30" y="84" width="17" height="32" rx="7" fill="${C.gold}" ${S}/><rect x="153" y="84" width="17" height="32" rx="7" fill="${C.gold}" ${S}/>`;
  if (kind === 'scarf') return `<path d="M68 158 Q100 176 132 158 L134 172 Q100 192 66 172 Z" fill="${C.blush}" ${S}/><rect x="112" y="170" width="16" height="34" rx="5" fill="${C.blush}" ${S}/>`;
  if (kind === 'cap') return `<path d="M44 74 Q44 26 100 26 Q156 26 156 74 Z" fill="${sp.outfitColor === C.gold ? C.ocean : C.gold}" ${S}/><path d="M100 66 L172 70 Q176 80 150 80 L100 76 Z" fill="${sp.outfitColor === C.gold ? C.ocean : C.gold}" ${S}/><circle cx="100" cy="28" r="5" fill="${C.ink}"/>`;
  return '';
}

/** Full character SVG (inner markup, no wrapper) */
export function characterInner(spec, expr = 'neutral') {
  const sp = spec;
  const male = sp.gender === 'm';
  const isHijab = sp.hair === 'hijab' || sp.hair === 'hijabSport';
  const ears = isHijab ? '' : `<circle cx="44" cy="100" r="10" fill="${sp.skin}" ${S}/><circle cx="156" cy="100" r="10" fill="${sp.skin}" ${S}/>`;
  const star = sp.starClip ? `<path d="M138 40 l4.5 9 10 1.5 -7.2 7 1.7 10 -9 -4.7 -9 4.7 1.7 -10 -7.2 -7 10 -1.5z" fill="${C.gold}" ${S}/>` : '';
  return `<ellipse cx="100" cy="292" rx="56" ry="7" fill="${C.midnight}" opacity=".12"/>
  <g class="breathe">
    ${legs(sp)}
    ${hairBack(sp)}
    ${accessoryBack(sp.accessory)}
    ${outfit(sp)}
    ${arms(sp)}
    ${male ? `<rect x="88" y="140" width="24" height="24" rx="7" fill="${sp.skin}" ${S}/>` : `<rect x="92" y="140" width="16" height="24" rx="7" fill="${sp.skin}" ${S}/>`}
    ${ears}
    ${male ? `<path d="M43 96 C43 58 68 41 100 41 C132 41 157 58 157 96 C157 124 147 140 128 147 Q100 156 72 147 C53 140 43 124 43 96 Z" fill="${sp.skin}" ${S}/>` : `<ellipse cx="100" cy="96" rx="56" ry="55" fill="${sp.skin}" ${S}/>`}
    <g class="face-layer">${face(expr, sp.gender)}</g>
    ${hairFront(sp)}
    ${glasses(sp.glasses)}
    ${accessoryFront(sp.accessory, sp)}
    ${star}
  </g>`;
}

export function characterSVG(spec, expr = 'neutral', attrs = '') {
  return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" ${attrs}>${characterInner(spec, expr)}</svg>`;
}

/** Head-and-shoulders crop for chat avatars and portraits */
export function portraitSVG(spec, expr = 'neutral', bg = C.sky) {
  return `<svg viewBox="22 10 156 156" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="0" y="0" width="200" height="300" fill="${bg}"/>${characterInner(spec, expr)}</svg>`;
}

/* ---------------- Pixel the cat ---------------- */
export function pixelInner(expr = 'neutral') {
  const eyes = expr === 'happy'
    ? `<path d="M76 86 Q84 77 92 86 M108 86 Q116 77 124 86" fill="none" stroke="${C.midnight}" stroke-width="3.4" stroke-linecap="round"/>`
    : `<g class="eyes-open"><ellipse cx="84" cy="84" rx="5.5" ry="7" fill="${C.midnight}"/><ellipse cx="116" cy="84" rx="5.5" ry="7" fill="${C.midnight}"/><circle cx="86" cy="81" r="2" fill="#fff"/><circle cx="118" cy="81" r="2" fill="#fff"/></g>`;
  return `<ellipse cx="100" cy="190" rx="54" ry="7" fill="${C.midnight}" opacity=".12"/>
  <g class="tail"><path d="M142 168 Q186 158 176 112" fill="none" stroke="${C.ink}" stroke-width="17" stroke-linecap="round"/><path d="M142 168 Q186 158 176 112" fill="none" stroke="${C.softCream}" stroke-width="11.5" stroke-linecap="round"/></g>
  <g class="cat-breathe">
    <path d="M58 124 Q100 104 142 124 L150 182 Q100 194 50 182 Z" fill="${C.ink}" ${S}/>
    <path d="M70 120 Q100 138 130 120" fill="${C.ink}" stroke="${C.softCream}" stroke-width="2"/>
    <rect x="84" y="146" width="32" height="20" rx="6" fill="${C.gold}" ${S}/>
    <text x="100" y="161" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="${C.ink}">&lt;/&gt;</text>
    <ellipse cx="78" cy="184" rx="13" ry="8" fill="${C.softCream}" ${S}/><ellipse cx="122" cy="184" rx="13" ry="8" fill="${C.softCream}" ${S}/>
    <path d="M58 62 L64 22 L92 46 Z" fill="${C.softCream}" ${S}/><path d="M142 62 L136 22 L108 46 Z" fill="${C.softCream}" ${S}/>
    <path d="M65 54 L68 34 L82 46 Z" fill="${C.blush}"/><path d="M135 54 L132 34 L118 46 Z" fill="${C.blush}"/>
    <ellipse cx="100" cy="84" rx="50" ry="43" fill="${C.softCream}" ${S}/>
    <path d="M118 50 Q134 54 140 70 Q128 66 118 50 Z" fill="${C.champagne}" opacity=".8"/>
    ${eyes}
    <path d="M96 95 L104 95 L100 100 Z" fill="${C.blush}" stroke="${C.ink}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M92 104 Q96 108 100 104 Q104 108 108 104" fill="none" stroke="${C.midnight}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M60 94 L42 90 M60 100 L42 102 M140 94 L158 90 M140 100 L158 102" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/>
    <ellipse cx="72" cy="100" rx="7" ry="4.5" fill="${C.blush}" opacity=".8"/><ellipse cx="128" cy="100" rx="7" ry="4.5" fill="${C.blush}" opacity=".8"/>
  </g>`;
}
export function pixelSVG(expr = 'neutral', attrs = '') {
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" ${attrs}>${pixelInner(expr)}</svg>`;
}
export function pixelPortrait(expr = 'happy') {
  return `<svg viewBox="30 14 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="200" height="200" fill="${C.gold}"/>${pixelInner(expr)}</svg>`;
}

/* ---------------- Emotes & icons ---------------- */
export function emoteSVG(kind) {
  const bubble = `<path d="M30 4 C46 4 56 14 56 28 C56 42 46 50 32 50 L22 58 L23 49 C11 46 4 38 4 28 C4 14 14 4 30 4 Z" fill="${C.softCream}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const inner = {
    alert: `<path d="M30 14 L30 32" stroke="${C.brick}" stroke-width="6" stroke-linecap="round"/><circle cx="30" cy="41" r="3.6" fill="${C.brick}"/>`,
    ellipsis: `<circle cx="19" cy="28" r="4" fill="${C.ink}"/><circle cx="30" cy="28" r="4" fill="${C.ink}"/><circle cx="41" cy="28" r="4" fill="${C.ink}"/>`,
    heart: `<path d="M30 42 C16 32 14 24 18 19 C22 14 28 16 30 21 C32 16 38 14 42 19 C46 24 44 32 30 42 Z" fill="${C.blush}" stroke="${C.brick}" stroke-width="2.4" stroke-linejoin="round"/>`,
    crack: `<path d="M30 42 C16 32 14 24 18 19 C22 14 28 16 30 21 C32 16 38 14 42 19 C46 24 44 32 30 42 Z" fill="${C.blush}" stroke="${C.ink}" stroke-width="2.4" stroke-linejoin="round"/><path d="M30 21 L27 28 L33 31 L29 40" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-linejoin="round"/>`,
    anger: `<path d="M18 18 Q26 26 22 34 M42 18 Q34 26 38 34 M18 38 Q26 30 34 38 M26 16 Q30 24 38 20" fill="none" stroke="${C.brick}" stroke-width="3.4" stroke-linecap="round"/>`,
    sweat: `<path d="M30 12 C30 12 42 28 42 34 C42 41 36 45 30 45 C24 45 18 41 18 34 C18 28 30 12 30 12 Z" fill="${C.sky}" stroke="${C.ocean}" stroke-width="2.6" stroke-linejoin="round"/>`,
    sparkle: `<path d="M30 10 L34 24 L48 28 L34 32 L30 46 L26 32 L12 28 L26 24 Z" fill="${C.gold}" stroke="${C.antique}" stroke-width="2" stroke-linejoin="round"/>`,
    question: `<path d="M22 21 Q22 12 31 12 Q40 12 40 20 Q40 26 32 29 L31 34" fill="none" stroke="${C.ocean}" stroke-width="5" stroke-linecap="round"/><circle cx="31" cy="42" r="3.4" fill="${C.ocean}"/>`,
  }[kind] || '';
  return `<svg viewBox="0 0 60 62" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${bubble}${inner}</svg>`;
}

export const ICON = {
  health: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="5" r="2.6" fill="${C.jade}" stroke="${C.ink}" stroke-width="1.6"/><circle cx="6" cy="19" r="2.6" fill="${C.jade}" stroke="${C.ink}" stroke-width="1.6"/><circle cx="18" cy="9" r="2.6" fill="${C.gold}" stroke="${C.ink}" stroke-width="1.6"/><path d="M6 7.6V16.4M6 14C6 11 18 13 18 11.6" fill="none" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  trust: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20 C5 15 3 11 4.5 8 C6 5 10 5 12 8.4 C14 5 18 5 19.5 8 C21 11 19 15 12 20 Z" fill="${C.gold}" stroke="${C.ink}" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  star: (filled = true) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9z" fill="${filled ? C.gold : C.softCream}" stroke="${C.ink}" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  heart: (filled = true) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20 C5 15 3 11 4.5 8 C6 5 10 5 12 8.4 C14 5 18 5 19.5 8 C21 11 19 15 12 20 Z" fill="${filled ? C.blush : C.softCream}" stroke="${C.ink}" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`,
  close: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  back: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`,
  home: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  log: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="${C.mint}" stroke="${C.forest}" stroke-width="2"/><path d="M7 12.5l3.2 3L17 9" fill="none" stroke="${C.forest}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cross: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="${C.blush}" stroke="${C.brick}" stroke-width="2"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="${C.brick}" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  warn: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L22 20H2z" fill="${C.gold}" stroke="${C.antique}" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 9v5" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17" r="1.4" fill="${C.ink}"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" fill="${C.lilac}"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
  what: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="${C.sky}" stroke="${C.ink}" stroke-width="1.8"/><path d="M12 7v6" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="16.5" r="1.4" fill="${C.ink}"/></svg>`,
  side: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v10H10l-5 4v-4H4z" fill="${C.blush}" stroke="${C.ink}" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  play: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5.5 3.5-5.5 3.5z" fill="currentColor"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
  rewind: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5v5h5"/><path d="M5.2 14.5A7.5 7.5 0 1 0 6 8.2L4 10"/></svg>`,
  bulbLit: `<svg viewBox="0 0 24 24" aria-hidden="true"><g class="rays" stroke="${C.antique}" stroke-width="1.6" stroke-linecap="round"><path d="M12 0.6v1.6M3.4 4.2l1.2 1.2M20.6 4.2l-1.2 1.2M0.8 11h1.7M21.5 11h1.7"/></g><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V17h5v-1.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" fill="${C.gold}" stroke="${C.ink}" stroke-width="1.8"/><path d="M9.5 20h5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/></svg>`,
  bulb: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V17h5v-1.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" fill="${C.gold}" stroke="${C.ink}" stroke-width="1.8"/><path d="M9.5 20h5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/></svg>`,
  better: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18l4-4 3 3 7-8" fill="none" stroke="${C.forest}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 9h4v4" fill="none" stroke="${C.forest}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  tip: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="3" fill="${C.mint}" stroke="${C.ink}" stroke-width="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  save: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z" fill="${C.sky}" stroke="${C.ink}" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
};

/* ---------------- Stickers ---------------- */
export function stickerSVG(id) {
  const base = (inner, bg = C.softCream) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#fff" stroke="${C.champagne}" stroke-width="4"/><circle cx="50" cy="50" r="38" fill="${bg}"/>${inner}</svg>`;
  const k = `stroke="${C.ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const art = {
    'st-p': base(`<path d="M30 40h34v18a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14z" fill="${C.peach}" ${k}/><path d="M64 46h4a7 7 0 0 1 0 14h-5" fill="none" ${k}/><path d="M40 22q4 6 0 12M50 20q4 6 0 12" fill="none" ${k}/>`, C.sky),
    'st-1': base(`<path d="M36 64V38a5 5 0 0 1 10 0v14V30a5 5 0 0 1 10 0v22-16a5 5 0 0 1 10 0v24c0 10-7 16-16 16s-14-5-17-10l-7-11a5 5 0 0 1 8-6z" fill="${C.gold}" ${k}/>`, C.mint),
    'st-2': base(`<path d="M22 56l14-14 14 6 14-6 14 14-14 12H36z" fill="${C.blush}" ${k}/>`, C.cream),
    'st-3': base(`<rect x="28" y="30" width="44" height="40" rx="6" fill="${C.sky}" ${k}/><path d="M36 42h12M36 52h20M36 62h8" ${k}/>`, C.lilac),
    'st-4': base(`<path d="M50 74V44" ${k}/><path d="M50 50q-16-2-18-16 16 0 18 16zM50 44q14-4 18-16-16 0-18 16z" fill="${C.jade}" ${k}/>`, C.cream),
    'st-5': base(`<circle cx="44" cy="44" r="16" fill="${C.sky}" ${k}/><path d="M56 56l14 14" ${k} stroke-width="6"/>`, C.mint),
    'st-6': base(`<path d="M50 74C30 60 24 48 30 38c5-8 15-8 20 0 5-8 15-8 20 0 6 10 0 22-20 36z" fill="${C.blush}" ${k}/><rect x="34" y="44" width="32" height="14" rx="6" transform="rotate(-30 50 51)" fill="${C.softCream}" ${k}/><circle cx="46" cy="52" r="1.6" fill="${C.ink}"/><circle cx="54" cy="48" r="1.6" fill="${C.ink}"/>`, C.sky),
    'st-7': base(`<path d="M24 50l50-22-14 48-10-18z" fill="${C.softCream}" ${k}/><path d="M50 58l24-30" ${k}/>`, C.peach),
    'st-8': base(`<rect x="28" y="36" width="44" height="30" rx="4" fill="${C.ocean}" ${k}/><path d="M36 36v30M46 36v30M56 36v30M64 36v30" stroke="${C.softCream}" stroke-width="2"/>`, C.mint),
    'st-9': base(`<path d="M58 26a24 24 0 1 0 16 36 20 20 0 0 1-16-36z" fill="${C.gold}" ${k}/>`, C.midnight),
    'st-10': base(`<path d="M34 28h32v14a16 16 0 0 1-32 0z" fill="${C.gold}" ${k}/><path d="M50 58v10M38 72h24" ${k}/>`, C.blush),
    'st-e': base(`<path d="M50 20l8 18 20 2-15 13 5 20-18-11-18 11 5-20-15-13 20-2z" fill="${C.gold}" ${k}/>`, C.lilac),
  };
  return art[id] || base('');
}

/* ---------------- Scenes ---------------- */
const SKY = {
  morning: [C.sky, C.sky, C.softCream],
  afternoon: [C.sky, C.cream, C.peach],
  evening: [C.lilac, C.blush, C.peach],
  night: [C.midnight, C.ink, C.ocean],
};

function windowView(x, y, w, h, time) {
  const b = SKY[time] || SKY.morning;
  const bh = h / 3;
  const id = `win${++uid}`;
  let s = `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/></clipPath><g clip-path="url(#${id})">`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${bh + 1}" fill="${b[0]}"/><rect x="${x}" y="${y + bh}" width="${w}" height="${bh + 1}" fill="${b[1]}"/><rect x="${x}" y="${y + 2 * bh}" width="${w}" height="${bh}" fill="${b[2]}"/>`;
  if (time === 'night') {
    s += `<circle cx="${x + w * 0.72}" cy="${y + h * 0.26}" r="16" fill="${C.cream}"/><circle cx="${x + w * 0.76}" cy="${y + h * 0.22}" r="14" fill="${b[0]}"/>`;
    [[0.2, 0.2], [0.4, 0.12], [0.5, 0.34], [0.86, 0.5], [0.3, 0.46]].forEach(([a, c]) => { s += `<circle class="twinkle" style="animation-delay:${a * 3}s" cx="${x + w * a}" cy="${y + h * c}" r="2.4" fill="${C.cream}"/>`; });
  } else {
    s += `<circle cx="${x + w * 0.74}" cy="${y + h * (time === 'evening' ? 0.62 : 0.28)}" r="20" fill="${time === 'evening' ? C.gold : C.softCream}"/>`;
    s += `<path d="M${x + w * 0.1} ${y + h * 0.3} q14 -12 28 0 q12 -8 22 2 h-50z" fill="${C.softCream}" opacity=".9"/>`;
  }
  const hill1 = time === 'night' ? C.ink : C.jade, hill2 = time === 'night' ? C.midnight : C.ink;
  s += `<path d="M${x} ${y + h * 0.82} Q${x + w * 0.3} ${y + h * 0.64} ${x + w * 0.6} ${y + h * 0.8} T${x + w} ${y + h * 0.76} V${y + h} H${x} Z" fill="${hill1}"/>`;
  s += `<path d="M${x} ${y + h * 0.92} Q${x + w * 0.5} ${y + h * 0.8} ${x + w} ${y + h * 0.9} V${y + h} H${x} Z" fill="${hill2}"/>`;
  s += `</g>`;
  return s;
}

function quad(p0, p1, p2, t) {
  const a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0], a * p0[1] + b * p1[1] + c * p2[1]];
}

function stringLights(on = true) {
  let s = `<path d="M20 50 Q330 118 640 54 Q950 118 1260 50" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
  const segs = [[[20, 50], [330, 118], [640, 54]], [[640, 54], [950, 118], [1260, 50]]];
  const colors = [C.gold, C.blush, C.mint, C.sky, C.gold, C.lilac];
  let i = 0;
  segs.forEach(seg => {
    for (let t = 0.06; t < 1; t += 0.11) {
      const [x, y] = quad(seg[0], seg[1], seg[2], t);
      const col = colors[i % colors.length];
      s += `<g class="${on ? 'twinkle' : ''}" style="animation-delay:${(i * 0.37) % 2.4}s"><path d="M${x} ${y} v6" stroke="${C.ink}" stroke-width="2"/><ellipse cx="${x}" cy="${y + 13}" rx="6.5" ry="8.5" fill="${col}" stroke="${C.ink}" stroke-width="2"/></g>`;
      i++;
    }
  });
  return s;
}

function hotWrap(id, label, x, y, w, h, inner, labelPos) {
  // labelPos: [lx, ly] centre of label tag
  const [lx, ly] = labelPos || [x + w / 2, y - 18];
  const tw = Math.max(70, label.length * 9 + 26);
  return `<g class="hot" data-hot="${id}" tabindex="0" role="button" aria-label="${label}">
    <g class="hot-lift">${inner}
      <rect class="hot-outline" x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="14" fill="none" stroke="${C.champagne}" stroke-width="3" stroke-dasharray="1 0"/>
    </g>
    <g class="hot-label"><rect x="${lx - tw / 2}" y="${ly - 16}" width="${tw}" height="30" rx="15" fill="${C.ink}"/><text x="${lx}" y="${ly + 4}" text-anchor="middle" style="font-family:var(--font-body)" font-weight="800" font-size="15" fill="${C.cream}">${label}</text></g>
  </g>`;
}

/**
 * Study room — used by the Hub (with hotspots) and as a VN background.
 * opts: { time, week, hot: bool, labels:{}, teammates:{mira:{expr,present}, ...}, health, trust, stickers:[], badges:{laptop, phone, shelf}, clutter }
 */
export function roomSVG(opts = {}) {
  const time = opts.time || 'morning';
  const L = opts.labels || {};
  const hot = !!opts.hot;
  const wrap = (id, label, x, y, w, h, inner, lp) => hot ? hotWrap(id, label, x, y, w, h, inner, lp) : inner;
  const H = Math.max(0, Math.min(100, opts.health ?? 50)), T = Math.max(0, Math.min(100, opts.trust ?? 50));

  // --- back layer
  let back = `<rect width="1280" height="720" fill="${C.cream}"/>`;
  // wall dots pattern (flat)
  for (let yy = 150; yy < 430; yy += 46) for (let xx = (yy / 46) % 2 ? 30 : 53; xx < 1280; xx += 46) back += `<circle cx="${xx}" cy="${yy}" r="2.2" fill="${C.champagne}" opacity=".35"/>`;
  back += `<rect y="430" width="1280" height="74" fill="${C.mint}"/><rect y="428" width="1280" height="6" fill="${C.champagne}"/>`;
  back += `<path d="M0 504 H1280" stroke="${C.ink}" stroke-width="2" opacity=".25"/>`;
  // window
  back += windowView(548, 96, 184, 214, time);
  back += `<rect x="542" y="90" width="196" height="226" rx="10" fill="none" stroke="${C.champagne}" stroke-width="12"/>`;
  back += `<path d="M640 96 V310 M548 203 H732" stroke="${C.champagne}" stroke-width="7"/>`;
  back += `<rect x="528" y="312" width="224" height="14" rx="5" fill="${C.champagne}" stroke="${C.ink}" stroke-width="2"/>`;
  back += `<path d="M512 82 H768" stroke="${C.antique}" stroke-width="5" stroke-linecap="round"/><circle cx="512" cy="82" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/><circle cx="768" cy="82" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>`;
  back += `<path class="curtain" d="M518 84 H566 Q560 180 572 260 Q560 300 566 352 H528 Q540 260 520 180 Z" fill="${C.blush}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  back += `<path class="curtain" style="animation-delay:-2s" d="M762 84 H714 Q720 180 708 260 Q720 300 714 352 H752 Q740 260 760 180 Z" fill="${C.blush}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  back += stringLights(true);

  // --- mid layer: furniture & hotspots
  let mid = '';
  // bookshelf
  let books = '';
  const bc = [C.lilac, C.sky, C.gold, C.blush, C.mint, C.peach, C.ocean];
  [200, 286, 372].forEach((sy, r) => {
    let bx = 90;
    for (let k = 0; k < 7; k++) {
      const bw = 16 + ((k * 7 + r * 3) % 9), bh = 56 + ((k * 13 + r * 5) % 18);
      books += `<rect x="${bx}" y="${sy + 74 - bh}" width="${bw}" height="${bh}" rx="3" fill="${bc[(k + r * 2) % bc.length]}" stroke="${C.ink}" stroke-width="2"/>`;
      bx += bw + 3;
      if (bx > 220) break;
    }
  });
  const shelfGlow = opts.badges?.shelf ? `<rect class="glow" x="96" y="216" width="18" height="58" rx="3" fill="${C.gold}"/>` : '';
  const shelf = `<rect x="74" y="176" width="172" height="306" rx="10" fill="${C.ink}"/><rect x="84" y="190" width="152" height="282" rx="4" fill="${C.midnight}"/>${books}${shelfGlow}
    <rect x="80" y="272" width="160" height="10" fill="${C.ink}"/><rect x="80" y="358" width="160" height="10" fill="${C.ink}"/><rect x="80" y="444" width="160" height="10" fill="${C.ink}"/>
    <path d="M196 160 q10 -26 24 -10 q-8 16 -24 10z" fill="${C.jade}" stroke="${C.ink}" stroke-width="2"/><rect x="190" y="160" width="34" height="18" rx="4" fill="${C.peach}" stroke="${C.ink}" stroke-width="2"/>`;
  mid += wrap('shelf', L.shelf || 'Glossary', 74, 150, 172, 332, shelf, [160, 134]);

  // whiteboard with branches + meters
  const wbLabel = (y, txt, val) => `<text x="395" y="${y}" text-anchor="middle" style="font-family:var(--font-body)" font-size="12.5" font-weight="800" fill="${C.ink}">${txt} · ${val}</text>`;
  const wbBars = `${wbLabel(222, L.health || 'Health', H)}
    <rect x="320" y="228" width="150" height="10" rx="5" fill="none" stroke="${C.ink}" stroke-width="2"/><rect x="321" y="229" width="${148 * H / 100}" height="8" rx="4" fill="${C.jade}"/>
    ${wbLabel(256, L.trust || 'Trust', T)}
    <rect x="320" y="262" width="150" height="10" rx="5" fill="none" stroke="${C.ink}" stroke-width="2"/><rect x="321" y="263" width="${148 * T / 100}" height="8" rx="4" fill="${C.gold}"/>`;
  const wb = `<rect x="290" y="124" width="210" height="166" rx="8" fill="${C.softCream}" stroke="${C.champagne}" stroke-width="9"/>
    <text x="395" y="152" text-anchor="middle" style="font-family:var(--font-head)" font-size="17" font-weight="600" fill="${C.ink}">${L.week ?? 'Week 1'}</text>
    <path d="M310 192 H480" stroke="${C.ocean}" stroke-width="3.5" stroke-linecap="round"/><path d="M340 192 Q356 168 380 168 H420 Q444 168 456 192" fill="none" stroke="${C.jade}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="320" cy="192" r="5.5" fill="${C.ocean}"/><circle cx="360" cy="192" r="5.5" fill="${C.ocean}"/><circle cx="396" cy="168" r="5.5" fill="${C.jade}"/><circle cx="430" cy="168" r="5.5" fill="${C.jade}"/><circle cx="456" cy="192" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>
    ${wbBars}
    <rect x="300" y="290" width="190" height="8" rx="3" fill="${C.champagne}"/><rect x="440" y="284" width="26" height="8" rx="3" fill="${C.blush}"/>`;
  mid += wrap('board', L.board || 'Project board', 290, 124, 210, 172, wb, [395, 106]);

  // corkboard with stickers
  let pinned = '';
  (opts.stickers || []).slice(0, 6).forEach((sid, i) => {
    const sx = 806 + (i % 3) * 50, sy = 140 + Math.floor(i / 3) * 56;
    pinned += `<g transform="translate(${sx} ${sy}) rotate(${(i % 2 ? 6 : -5)} 22 22)"><svg x="0" y="0" width="44" height="44" viewBox="0 0 100 100">${stickerSVG(sid).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg></g><circle cx="${sx + 22}" cy="${sy + 2}" r="3.5" fill="${C.brick}"/>`;
  });
  if (!pinned) pinned = `<rect x="818" y="150" width="44" height="40" rx="3" fill="${C.softCream}" transform="rotate(-4 840 170)"/><rect x="876" y="160" width="50" height="34" rx="3" fill="${C.sky}" transform="rotate(5 900 176)"/><circle cx="840" cy="150" r="3.5" fill="${C.brick}"/><circle cx="900" cy="160" r="3.5" fill="${C.brick}"/>`;
  const cork = `<rect x="792" y="124" width="176" height="150" rx="8" fill="${C.champagne}" stroke="${C.antique}" stroke-width="7"/>
    <g opacity=".25">${[0, 1, 2, 3, 4, 5].map(n => `<circle cx="${810 + n * 28}" cy="${250 - (n % 2) * 8}" r="2" fill="${C.antique}"/>`).join('')}</g>${pinned}`;
  mid += wrap('cork', L.cork || 'Collections', 792, 124, 176, 150, cork, [880, 106]);

  // sticky notes (clutter)
  if (opts.clutter) {
    mid += `<rect x="508" y="140" width="26" height="26" fill="${C.gold}" transform="rotate(6 520 152)"/><rect x="508" y="176" width="26" height="26" fill="${C.blush}" transform="rotate(-5 520 188)"/>`;
  }

  // desk
  mid += `<rect x="826" y="430" width="380" height="20" rx="6" fill="${C.ink}"/><rect x="846" y="450" width="16" height="170" rx="4" fill="${C.ink}"/><rect x="1170" y="450" width="16" height="170" rx="4" fill="${C.ink}"/><rect x="1040" y="450" width="130" height="70" rx="6" fill="${C.midnight}"/><rect x="1096" y="478" width="20" height="5" rx="2" fill="${C.champagne}"/>`;
  // chair (Omar's) — with hoodie when absent
  const omarAbsent = opts.teammates && opts.teammates.omar && opts.teammates.omar.present === false;
  mid += `<rect x="952" y="430" width="70" height="90" rx="12" fill="${C.ocean}" stroke="${C.ink}" stroke-width="2.5" opacity="${omarAbsent ? 1 : 0}"/>`;
  if (omarAbsent) mid += `<path d="M954 438 Q988 420 1020 438 L1024 500 Q988 508 950 500 Z" fill="${C.jade}" stroke="${C.ink}" stroke-width="2.5"/><path d="M968 440 Q988 452 1008 440" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
  // laptop
  const lapGlow = opts.badges?.laptop ? `<rect class="glow" x="908" y="322" width="134" height="86" rx="6" fill="${C.gold}" opacity=".6"/>` : '';
  const lap = `<rect x="904" y="318" width="142" height="94" rx="8" fill="${C.midnight}" stroke="${C.ink}" stroke-width="2.5"/><rect x="912" y="326" width="126" height="78" rx="4" fill="${C.sky}"/>${lapGlow}
    <path d="M922 340 h40 M922 352 h70 M922 364 h54 M922 376 h80" stroke="${C.ocean}" stroke-width="4" stroke-linecap="round"/>
    <path d="M884 412 H1066 L1054 428 H896 Z" fill="${C.champagne}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  mid += wrap('laptop', L.laptop || 'Semester map', 884, 318, 182, 110, lap, [975, 300]);
  // phone
  const badge = opts.badges?.phone ? `<g class="badge"><circle cx="1124" cy="412" r="9" fill="${C.brick}" stroke="${C.softCream}" stroke-width="2"/><text x="1124" y="416.5" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" style="font-family:var(--font-body)">${opts.badges.phone}</text></g>` : '';
  const phone = `<rect x="1080" y="414" width="52" height="16" rx="5" fill="${C.ink}"/><rect x="1086" y="417" width="40" height="10" rx="3" fill="${C.lilac}"/>${badge}`;
  mid += wrap('phone', L.phone || 'Team chat', 1076, 400, 62, 32, phone, [1106, 382]);
  // mug + steam
  mid += `<rect x="1152" y="396" width="30" height="34" rx="6" fill="${C.softCream}" stroke="${C.ink}" stroke-width="2.5"/><path d="M1182 404 q12 0 12 10 t-12 10" fill="none" stroke="${C.ink}" stroke-width="2.5"/><rect x="1156" y="404" width="22" height="6" fill="${C.blush}"/>`;
  mid += `<path class="steam" d="M1160 388 q-6 -10 0 -18" fill="none" stroke="${C.ink}" stroke-width="2" opacity=".5"/><path class="steam" style="animation-delay:-1.3s" d="M1172 388 q6 -10 0 -18" fill="none" stroke="${C.ink}" stroke-width="2" opacity=".5"/>`;
  if (opts.clutter) mid += `<rect x="1004" y="408" width="22" height="24" rx="5" fill="${C.peach}" stroke="${C.ink}" stroke-width="2"/><rect x="860" y="410" width="22" height="22" rx="5" fill="${C.sky}" stroke="${C.ink}" stroke-width="2"/>`;
  // plant
  mid += `<g class="sway"><path d="M1238 530 Q1204 470 1222 440 Q1240 480 1238 530 Z" fill="${C.jade}" stroke="${C.ink}" stroke-width="2.5"/><path d="M1238 530 Q1268 476 1256 446 Q1236 486 1238 530 Z" fill="${C.jade}" stroke="${C.ink}" stroke-width="2.5"/><path d="M1238 532 Q1220 500 1196 494 Q1206 524 1238 532 Z" fill="${C.mint}" stroke="${C.ink}" stroke-width="2.5"/></g>`;
  mid += `<path d="M1212 528 H1264 L1256 590 H1220 Z" fill="${C.peach}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;

  // --- floor & front
  let floor = `<rect y="504" width="1280" height="216" fill="${C.peach}"/>`;
  for (let i = -12; i <= 12; i++) floor += `<path d="M${640 + i * 46} 504 L${640 + i * 150} 720" stroke="${C.champagne}" stroke-width="2.2" opacity=".75"/>`;
  [560, 625, 690].forEach(y => { floor += `<path d="M0 ${y} H1280" stroke="${C.champagne}" stroke-width="1.6" opacity=".45"/>`; });

  let front = `<ellipse cx="640" cy="652" rx="330" ry="58" fill="${C.lilac}" stroke="${C.ink}" stroke-width="2.5"/><ellipse cx="640" cy="652" rx="288" ry="44" fill="none" stroke="${C.softCream}" stroke-width="3" stroke-dasharray="10 8"/>`;
  // beanbag + Pixel
  const bean = `<path d="M262 650 Q250 572 330 560 Q420 552 450 600 Q470 650 430 664 Q350 682 262 650 Z" fill="${C.sky}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M300 600 Q350 590 410 606" fill="none" stroke="${C.ink}" stroke-width="2" opacity=".35"/>
    <svg x="292" y="470" width="130" height="130" viewBox="0 0 200 200">${pixelInner(opts.pixelExpr || 'neutral')}</svg>`;
  front += wrap('pixel', L.pixel || 'Pixel', 262, 470, 210, 200, bean, [362, 456]);

  // teammates
  const tm = opts.teammates || {};
  const placeMate = (id, cx, feetY, scale = 0.86) => {
    const m = tm[id];
    if (!m || m.present === false) return '';
    const w = 200 * scale, h = 300 * scale;
    const x = cx - w / 2, y = feetY - h;
    const inner = `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 200 300" overflow="visible">${characterInner(CAST[id], m.expr || 'neutral')}</svg>`;
    return wrap(`mate-${id}`, m.label || id, x + 20, y + 10, w - 40, h - 14, inner, [cx, y - 6]);
  };
  front += placeMate('mira', 568, 676) + placeMate('sara', 712, 676) + placeMate('omar', 1000, 690);
  if (opts.player) {
    const w = 172, h = 258;
    front += `<svg x="${790 - w / 2}" y="${690 - h}" width="${w}" height="${h}" viewBox="0 0 200 300">${characterInner(opts.player, 'happy')}</svg>`;
  }

  const tint = time === 'night' ? `<rect width="1280" height="720" fill="${C.midnight}" opacity=".22" pointer-events="none"/>`
    : time === 'evening' ? `<rect width="1280" height="720" fill="${C.lilac}" opacity=".14" pointer-events="none"/>` : '';

  return `<svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L.room || 'Study room'}">
    <g class="parallax-back">${back}</g>
    <g class="parallax-mid">${floor}${mid}</g>
    <g class="parallax-front">${front}</g>
    ${tint}
  </svg>`;
}

export function cafeSVG(time = 'morning') {
  let s = `<rect width="1280" height="720" fill="${C.cream}"/>`;
  // wall stripes (flat, alternating)
  for (let x = 0; x < 1280; x += 64) s += `<rect x="${x}" y="0" width="32" height="440" fill="${C.softCream}"/>`;
  s += `<rect y="440" width="1280" height="70" fill="${C.peach}"/><rect y="436" width="1280" height="6" fill="${C.champagne}"/>`;
  // big windows
  s += windowView(80, 110, 300, 250, time) + `<rect x="74" y="104" width="312" height="262" rx="12" fill="none" stroke="${C.champagne}" stroke-width="12"/><path d="M230 110 V360" stroke="${C.champagne}" stroke-width="7"/>`;
  s += windowView(900, 110, 300, 250, time) + `<rect x="894" y="104" width="312" height="262" rx="12" fill="none" stroke="${C.champagne}" stroke-width="12"/><path d="M1050 110 V360" stroke="${C.champagne}" stroke-width="7"/>`;
  // menu board
  s += `<rect x="470" y="96" width="340" height="190" rx="12" fill="${C.midnight}" stroke="${C.champagne}" stroke-width="9"/>
    <text x="640" y="140" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="30" font-weight="600" fill="${C.gold}">Café Commit</text>
    <path d="M510 172 h120 M510 204 h150 M510 236 h100" stroke="${C.cream}" stroke-width="5" stroke-linecap="round" opacity=".85"/>
    <path d="M700 172 h60 M700 204 h60 M700 236 h60" stroke="${C.mint}" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 10"/>`;
  // hanging lamps
  [300, 640, 980].forEach((x, i) => { s += `<path d="M${x} 0 V58" stroke="${C.ink}" stroke-width="3"/><path d="M${x - 34} 92 Q${x} 44 ${x + 34} 92 Z" fill="${C.gold}" stroke="${C.ink}" stroke-width="2.5"/><ellipse class="glow" style="animation-delay:${i * 0.6}s" cx="${x}" cy="98" rx="14" ry="6" fill="${C.softCream}"/>`; });
  // counter
  s += `<rect x="420" y="330" width="440" height="30" rx="8" fill="${C.ink}"/><rect x="436" y="360" width="408" height="150" fill="${C.jade}" stroke="${C.ink}" stroke-width="2.5"/>`;
  for (let x = 460; x < 840; x += 48) s += `<path d="M${x} 372 V498" stroke="${C.ink}" stroke-width="2" opacity=".25"/>`;
  s += `<rect x="470" y="262" width="80" height="68" rx="10" fill="${C.ocean}" stroke="${C.ink}" stroke-width="2.5"/><rect x="486" y="276" width="48" height="18" rx="4" fill="${C.sky}"/><circle cx="510" cy="312" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>`;
  s += `<rect x="700" y="288" width="30" height="42" rx="6" fill="${C.softCream}" stroke="${C.ink}" stroke-width="2.5"/><rect x="740" y="296" width="30" height="34" rx="6" fill="${C.blush}" stroke="${C.ink}" stroke-width="2.5"/><path class="steam" d="M715 280 q-6 -10 0 -18" fill="none" stroke="${C.ink}" stroke-width="2" opacity=".5"/>`;
  // plants
  s += `<g class="sway"><path d="M60 500 Q30 430 54 400 Q70 450 60 500Z" fill="${C.jade}" stroke="${C.ink}" stroke-width="2.5"/><path d="M60 500 Q96 440 84 408 Q60 450 60 500Z" fill="${C.mint}" stroke="${C.ink}" stroke-width="2.5"/></g><path d="M36 498 H86 L78 560 H44Z" fill="${C.peach}" stroke="${C.ink}" stroke-width="2.5"/>`;
  // floor
  s += `<rect y="510" width="1280" height="210" fill="${C.mint}"/>`;
  for (let i = 0; i < 1280; i += 80) for (let j = 510; j < 720; j += 52) if (((i / 80) + Math.round((j - 510) / 52)) % 2 === 0) s += `<rect x="${i}" y="${j}" width="80" height="52" fill="${C.sky}" opacity=".7"/>`;
  // tables
  [[220, 620], [1060, 620]].forEach(([x, y]) => { s += `<ellipse cx="${x}" cy="${y - 50}" rx="90" ry="22" fill="${C.softCream}" stroke="${C.ink}" stroke-width="2.5"/><rect x="${x - 8}" y="${y - 30}" width="16" height="80" fill="${C.ink}"/><ellipse cx="${x}" cy="${y + 52}" rx="44" ry="10" fill="${C.ink}"/>`; });
  const tint = time === 'night' ? `<rect width="1280" height="720" fill="${C.midnight}" opacity=".22"/>` : '';
  return `<svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}${tint}</svg>`;
}

export function lectureSVG() {
  let s = `<rect width="1280" height="720" fill="${C.sky}"/>`;
  s += `<rect x="240" y="80" width="800" height="340" rx="12" fill="${C.softCream}" stroke="${C.champagne}" stroke-width="12"/>`;
  s += `<text x="640" y="200" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="56" font-weight="600" fill="${C.ink}">CS 391 — Team Project</text>`;
  s += `<path d="M380 270 H900 M420 320 H860" stroke="${C.ocean}" stroke-width="8" stroke-linecap="round" opacity=".5"/>`;
  s += `<rect y="470" width="1280" height="250" fill="${C.ink}"/>`;
  for (let r = 0; r < 3; r++) for (let x = 40; x < 1280; x += 120) s += `<rect x="${x + (r % 2) * 60}" y="${500 + r * 72}" width="96" height="40" rx="10" fill="${C.ocean}" stroke="${C.midnight}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${s}</svg>`;
}

export function backgroundSVG(name, opts = {}) {
  const [place, time] = String(name).split('-');
  if (place === 'cafe') return cafeSVG(time);
  if (place === 'lecture') return lectureSVG();
  return roomSVG({ ...opts, time: time || 'morning' });
}

/* ---------------- Logo & misc ---------------- */
export function logoSVG(title = 'Git Along') {
  return `<svg class="logo" viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
    <svg x="300" y="-6" width="96" height="96" viewBox="0 0 200 200">${pixelInner('happy')}</svg>
    <text x="196" y="112" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="80" font-weight="600" fill="${C.ink}" letter-spacing="1">Git Along</text>
    <path d="M40 140 H360" stroke="${C.champagne}" stroke-width="5" stroke-linecap="round"/>
    <path d="M110 140 C130 160 170 162 200 152 C230 142 250 140 280 140" fill="none" stroke="${C.jade}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="40" cy="140" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2.5"/>
    <circle cx="110" cy="140" r="6" fill="${C.softCream}" stroke="${C.ink}" stroke-width="2.5"/>
    <circle cx="190" cy="155" r="6" fill="${C.jade}" stroke="${C.ink}" stroke-width="2.5"/>
    <circle cx="280" cy="140" r="9" fill="${C.gold}" stroke="${C.ink}" stroke-width="2.5"/>
    <circle cx="360" cy="140" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2.5"/>
  </svg>`;
}

export function trackIllustration(track) {
  if (track === 'web') return `<svg class="track-ill" viewBox="0 0 240 120" aria-hidden="true"><rect x="30" y="14" width="180" height="96" rx="10" fill="${C.sky}" stroke="${C.ink}" stroke-width="3"/><rect x="30" y="14" width="180" height="20" rx="10" fill="${C.ink}"/><circle cx="46" cy="24" r="4" fill="${C.blush}"/><circle cx="60" cy="24" r="4" fill="${C.gold}"/><circle cx="74" cy="24" r="4" fill="${C.mint}"/><rect x="46" y="46" width="70" height="50" rx="6" fill="${C.softCream}" stroke="${C.ink}" stroke-width="2.5"/><path d="M130 52h60M130 66h44M130 80h54" stroke="${C.ocean}" stroke-width="5" stroke-linecap="round"/></svg>`;
  if (track === 'mobile') return `<svg class="track-ill" viewBox="0 0 240 120" aria-hidden="true"><rect x="92" y="6" width="58" height="108" rx="12" fill="${C.ink}"/><rect x="98" y="16" width="46" height="84" rx="6" fill="${C.mint}"/><rect x="104" y="24" width="34" height="20" rx="4" fill="${C.softCream}"/><rect x="104" y="50" width="34" height="8" rx="3" fill="${C.ocean}"/><rect x="104" y="62" width="24" height="8" rx="3" fill="${C.jade}"/><rect x="104" y="80" width="34" height="12" rx="6" fill="${C.gold}"/><circle cx="60" cy="40" r="14" fill="${C.blush}" stroke="${C.ink}" stroke-width="2.5"/><circle cx="184" cy="80" r="12" fill="${C.sky}" stroke="${C.ink}" stroke-width="2.5"/></svg>`;
  return `<svg class="track-ill" viewBox="0 0 240 120" aria-hidden="true"><path d="M60 30 L120 20 L180 40 M60 30 L120 60 L180 40 M60 90 L120 60 L180 80 M60 90 L120 100 L180 80 M60 30 L120 100 M60 90 L120 20" stroke="${C.ink}" stroke-width="2.5" opacity=".6"/>${[[60, 30], [60, 90], [120, 20], [120, 60], [120, 100], [180, 40], [180, 80]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="11" fill="${[C.sky, C.sky, C.mint, C.mint, C.mint, C.gold, C.gold][i]}" stroke="${C.ink}" stroke-width="2.5"/>`).join('')}</svg>`;
}

export function cloudWipeSVG() {
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
    <rect x="200" y="0" width="1200" height="900" fill="${C.softCream}"/>
    <g fill="${C.softCream}">${[60, 180, 300, 420, 540, 660, 780, 900].map((y, i) => `<circle cx="${200 + (i % 2) * 30}" cy="${y}" r="${110 + (i % 3) * 20}"/><circle cx="${1400 - (i % 2) * 30}" cy="${y}" r="${110 + ((i + 1) % 3) * 20}"/>`).join('')}</g>
    <g fill="${C.sky}" opacity=".9">${[140, 460, 760].map(y => `<circle cx="1420" cy="${y}" r="80"/><circle cx="180" cy="${y + 120}" r="70"/>`).join('')}</g>
  </svg>`;
}
