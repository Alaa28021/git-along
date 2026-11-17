// Git Along — app entry: screens, hub room, sheets, settings.
import { store } from './store.js';
import { t, tx, rich, esc, applyDocumentLanguage, UI } from './i18n.js';
import { TRACKS, PARTS, NAMES, ROLES, HELPS, GLOSSARY, STICKERS } from './content.js';
import {
  roomSVG, logoSVG, characterSVG, avatarToSpec, CAST, SKINS, HAIR_COLORS, HIJAB_COLORS, OUTFIT_COLORS,
  HAIR_STYLES, OUTFITS, GLASSES, ACCESSORIES, EXPRESSIONS, trackIllustration, ICON, stickerSVG, pixelSVG,
} from './art.js';
import { h, $, $$, show, sheet, confirmModal, toast, meterHTML, applyPrefs, reduced, sparkleBurst } from './ui.js';
import { Player, MSG_INDEX, messageHTML, nameOf } from './engine.js';

let rerender = null; // re-renders the current screen after a language change

/* ---------------- Helpers ---------------- */
const isHijab = hair => hair === 'hijab' || hair === 'hijabSport';
const exprFor = bond => (bond >= 3 ? 'happy' : bond < 0 ? 'upset' : 'neutral');
const partMeta = id => PARTS.find(p => p.id === id);

function nextPart() {
  return PARTS.find(p => p.playable && !store.isDone(p.id)) || null;
}
function partState(p) {
  if (store.isDone(p.id)) return 'done';
  if (!p.playable) return 'soon';
  const i = PARTS.indexOf(p);
  if (i > 0 && !store.isDone(PARTS[i - 1].id)) return 'locked';
  return 'avail';
}

/* ---------------- Title ---------------- */
function titleScreen() {
  rerender = titleScreen;
  const bi = k => t(k);
  const hasRun = !!(store.state.run && store.state.avatar);
  const el = h(`<section class="screen title-screen">
    <div class="room-bg" aria-hidden="true">${roomSVG({ time: 'morning', teammates: { mira: { expr: 'happy' }, sara: { expr: 'happy' }, omar: { expr: 'neutral' } }, health: 60, trust: 70, labels: { week: '', health: tx(UI.health), trust: tx(UI.trust) } })}</div>
    <div class="title-veil"></div>
    <div class="title-card frame">
      ${logoSVG()}
      <p class="tagline">${bi('tagline')}</p>
      <div class="title-buttons">
        ${hasRun ? `<button class="btn btn-gold" data-a="continue" data-autofocus>${ICON.play} ${t('continue')}</button>` : ''}
        <button class="btn ${hasRun ? 'btn-ghost' : 'btn-gold'}" data-a="new" ${hasRun ? '' : 'data-autofocus'}>${ICON.plus} ${bi('newSemester')}</button>
        <button class="btn btn-ghost" data-a="settings">${ICON.gear} ${bi('settings')}</button>
      </div>
      <p class="title-foot">${t('prototype')}</p>
    </div>
  </section>`);
  el.addEventListener('click', e => {
    const a = e.target.closest('[data-a]')?.dataset.a;
    if (a === 'continue') hubScreen();
    if (a === 'new') newSemester();
    if (a === 'settings') openSettings();
  });
  return show(el, { type: 'fade' });
}

async function newSemester() {
  if (store.state.run) {
    const ok = await confirmModal({ title: t('newRunTitle'), body: t('newRunBody'), yes: t('yesNew'), no: t('cancel') });
    if (!ok) return;
  }
  if (!store.state.langChosen) languageScreen(); else avatarScreen();
}

/* ---------------- Language ---------------- */
function languageScreen(then = avatarScreen) {
  rerender = null;
  const el = h(`<section class="screen scroll"><div class="center-wrap"><div class="panel frame" style="width:min(560px,100%)">
    <h1>Choose your language<span class="bilingual-sub" lang="ar">اختر لغتك</span></h1>
    <div class="lang-grid">
      <button class="lang-card" data-l="en" lang="en" data-autofocus>English</button>
      <button class="lang-card" data-l="ar" lang="ar">العربية</button>
    </div></div></div></section>`);
  el.addEventListener('click', e => {
    const l = e.target.closest('[data-l]')?.dataset.l;
    if (!l) return;
    store.state.langChosen = true;
    store.setSetting('lang', l);
    applyDocumentLanguage();
    then();
  });
  return show(el, { type: 'fade' });
}

/* ---------------- Avatar creator ---------------- */
function defaultAvatar() {
  return { name: '', address: null, skin: 1, hair: 'short', hairColor: 0, glasses: 'none', outfit: 'hoodie', outfitColor: 0, accessory: 'none' };
}

const RANDOM_NAMES = {
  m: { en: ['Adam', 'Youssef', 'Karim', 'Hassan', 'Ziad', 'Tarek', 'Malik', 'Sami', 'Yassin', 'Ali'], ar: ['آدم', 'يوسف', 'كريم', 'حسن', 'زياد', 'طارق', 'مالك', 'سامي', 'ياسين', 'علي'] },
  f: { en: ['Lina', 'Hana', 'Laila', 'Salma', 'Yasmin', 'Farah', 'Reem', 'Jana', 'Malak', 'Dalia'], ar: ['لينا', 'هنا', 'ليلى', 'سلمى', 'ياسمين', 'فرح', 'ريم', 'جنى', 'ملك', 'داليا'] },
};
const HAIR_BY = { m: ['short', 'buzz', 'curly', 'long'], f: ['long', 'ponytail', 'bun', 'curly', 'short', 'hijab', 'hijabSport'] };
const OUTFIT_BY = { m: ['hoodie', 'cardigan', 'shirt'], f: ['hoodie', 'cardigan', 'shirt', 'dress'] };
const hairList = a => (a.address ? HAIR_BY[a.address] : HAIR_STYLES);
const outfitList = a => (a.address ? OUTFIT_BY[a.address] : OUTFITS);

function avatarScreen(draft = null) {
  const a = draft || { ...(store.state.avatar || defaultAvatar()) };
  rerender = () => avatarScreen(a);
  let exprI = 0;
  let lastRandomName = null;
  const optRow = (key, list, labelFn) => `<div class="opt-row" role="group" aria-label="${t(key)}">${list.map(v => `<button type="button" class="opt" data-k="${key}" data-v="${v}" aria-pressed="${a[key] === v}">${labelFn(v)}</button>`).join('')}</div>`;
  const swatches = (key, colors) => `<div class="opt-row" role="group" aria-label="${t(key)}">${colors.map((c, i) => `<button type="button" class="opt swatch" data-k="${key}" data-v="${i}" aria-pressed="${a[key] === i}" style="background:${c}" aria-label="${t(key)} ${i + 1}"></button>`).join('')}</div>`;
  const groups = {
    hair: () => `<span class="opt-label">${t('hair')}</span>${optRow('hair', hairList(a), v => t(`opt.${v}`))}`,
    hairColor: () => `<span class="opt-label">${t('hairColor')}</span>${swatches('hairColor', isHijab(a.hair) ? HIJAB_COLORS : HAIR_COLORS)}`,
    outfit: () => `<span class="opt-label">${t('outfit')}</span>${optRow('outfit', outfitList(a), v => t(`opt.${v}`))}`,
  };
  const el = h(`<section class="screen scroll"><div class="center-wrap"><div class="panel frame">
    <h1>${t('avatarTitle')}</h1><p class="lead">${t('avatarLead')}</p>
    <div class="avatar-layout">
      <div class="avatar-preview">
        <button type="button" class="preview-stage" data-preview aria-label="${t('previewHint')}"></button>
        <p class="hint">${t('previewHint')}</p>
      </div>
      <form class="avatar-form" novalidate>
        <div class="opt-group">
          <label class="opt-label" for="av-name">${t('name')}</label>
          <div class="field-row"><input id="av-name" class="text-input" maxlength="20" autocomplete="off" placeholder="${t('namePh')}" value="${esc(a.name)}" data-autofocus><span class="counter" aria-live="polite">${a.name.length}/20</span></div>
          <div class="field-error" id="name-err" aria-live="polite" hidden>${ICON.warn}<span>${t('nameErr')}</span></div>
        </div>
        <div class="opt-group">
          <span class="opt-label">${t('address')}</span>
          <div class="opt-row" role="radiogroup" aria-label="${t('address')}">
            <button type="button" class="opt" data-k="address" data-v="m" aria-pressed="${a.address === 'm'}">${t('addrM')}</button>
            <button type="button" class="opt" data-k="address" data-v="f" aria-pressed="${a.address === 'f'}">${t('addrF')}</button>
          </div>
          <p class="field-help">${t('addressHelp')}</p>
          <div class="field-error" id="addr-err" aria-live="polite" hidden>${ICON.warn}<span>${esc(tx({ en: 'Please choose one.', ar: 'يُرجى اختيار أحدهما.' }))}</span></div>
        </div>
        <div class="opt-group"><span class="opt-label">${t('skin')}</span>${swatches('skin', SKINS)}</div>
        <div class="opt-group" data-group="hair">${groups.hair()}</div>
        <div class="opt-group" data-group="hairColor">${groups.hairColor()}</div>
        <div class="opt-group"><span class="opt-label">${t('glasses')}</span>${optRow('glasses', GLASSES, v => t(`opt.${v}`))}</div>
        <div class="opt-group" data-group="outfit">${groups.outfit()}</div>
        <div class="opt-group"><span class="opt-label">${t('outfitColor')}</span>${swatches('outfitColor', OUTFIT_COLORS)}</div>
        <div class="opt-group"><span class="opt-label">${t('accessory')}</span>${optRow('accessory', ACCESSORIES, v => t(`opt.${v}`))}</div>
        <div class="form-actions">
          <button type="button" class="btn btn-ghost" data-act="random">${t('randomize')}</button>
          <button type="button" class="btn btn-ghost" data-act="back">${t('back')}</button>
          <button type="button" class="btn btn-gold" data-act="next">${t('next')} ›</button>
        </div>
      </form>
    </div></div></div></section>`);

  const preview = $('[data-preview]', el);
  const paint = () => { preview.innerHTML = characterSVG(avatarToSpec(a), EXPRESSIONS[exprI]); };
  const regroup = (...names) => names.forEach(n => { $(`[data-group="${n}"]`, el).innerHTML = groups[n](); });
  const numKey = k => ['skin', 'hairColor', 'outfitColor'].includes(k);
  const sync = () => $$('[data-k]', el).forEach(b => {
    const k = b.dataset.k;
    b.setAttribute('aria-pressed', String(a[k] === (numKey(k) ? Number(b.dataset.v) : b.dataset.v)));
  });
  // keep hair and outfit valid for the chosen form of address
  const fit = () => {
    if (!hairList(a).includes(a.hair)) a.hair = hairList(a)[0];
    if (!outfitList(a).includes(a.outfit)) a.outfit = outfitList(a)[0];
  };
  paint();
  preview.addEventListener('click', () => { exprI = (exprI + 1) % EXPRESSIONS.length; paint(); });

  const nameIn = $('#av-name', el);
  el.addEventListener('click', e => {
    const b = e.target.closest('[data-k]');
    if (b) {
      e.preventDefault();
      const k = b.dataset.k;
      const wasHijab = isHijab(a.hair);
      a[k] = numKey(k) ? Number(b.dataset.v) : b.dataset.v;
      if (k === 'address') { $('#addr-err', el).hidden = true; fit(); regroup('hair', 'outfit', 'hairColor'); }
      if (k === 'hair' && wasHijab !== isHijab(a.hair)) regroup('hairColor');
      sync();
      paint();
      return;
    }
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'random') {
      const pick = arr => arr[Math.floor(Math.random() * arr.length)];
      if (!a.address) { a.address = pick(['m', 'f']); $('#addr-err', el).hidden = true; }
      a.skin = Math.floor(Math.random() * SKINS.length);
      a.hair = pick(hairList(a)); a.hairColor = Math.floor(Math.random() * 6);
      a.glasses = pick(GLASSES); a.outfit = pick(outfitList(a)); a.outfitColor = Math.floor(Math.random() * OUTFIT_COLORS.length);
      a.accessory = isHijab(a.hair) ? pick(['none', 'scarf', 'headphones']) : pick(ACCESSORIES);
      const cur = nameIn.value.trim();
      if (!cur || cur === lastRandomName) {
        const list = RANDOM_NAMES[a.address][store.state.settings.lang === 'ar' ? 'ar' : 'en'];
        let n; do { n = pick(list); } while (n === cur);
        nameIn.value = n; a.name = n; lastRandomName = n;
        $('.counter', el).textContent = `${n.length}/20`; $('#name-err', el).hidden = true;
      }
      exprI = 1;
      regroup('hair', 'hairColor', 'outfit');
      sync(); paint();
    }
    if (act === 'back') titleScreen();
    if (act === 'next') submit();
  });
  nameIn.addEventListener('input', () => { a.name = nameIn.value; $('.counter', el).textContent = `${nameIn.value.length}/20`; $('#name-err', el).hidden = true; });
  // Only the Next button moves on; Enter in the name field does nothing.
  $('form', el).addEventListener('submit', e => e.preventDefault());
  nameIn.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });
  function submit() {
    const name = nameIn.value.trim().replace(/\s+/g, ' ');
    let ok = true;
    if (!name || name.length > 20) { $('#name-err', el).hidden = false; nameIn.focus(); ok = false; }
    if (!a.address) { $('#addr-err', el).hidden = false; if (ok) $('[data-k="address"]', el).focus(); ok = false; }
    if (!ok) return;
    a.name = name;
    store.setAvatar({ ...a });
    trackScreen();
  }
  return show(el, { type: 'fade' });
}

/* ---------------- Track ---------------- */
function trackScreen(selected = null) {
  rerender = () => trackScreen(sel);
  let sel = selected;
  const cards = Object.entries(TRACKS).map(([id, tr]) => `<button class="track-card" data-track="${id}" aria-pressed="${sel === id}">
      <div class="track-inner">
        <div class="track-face front">${trackIllustration(id)}<h2>${esc(tx(tr.name))}</h2><p>${esc(tx(tr.brief))}</p><span class="track-tag">${tr.tag}</span></div>
        <div class="track-face back"><h2>${esc(tx(tr.name))}</h2><strong>${t('youWillLearn')}</strong><ul>${tr.learn.map(l => `<li>${esc(tx(l))}</li>`).join('')}</ul>
          <span class="chip chip-gold" style="margin-top:auto">Git · Teamwork</span></div>
      </div></button>`).join('');
  const el = h(`<section class="screen scroll"><div class="center-wrap"><div class="panel frame">
    <h1>${t('trackTitle')}</h1><p class="lead">${t('trackLead')}</p>
    <p class="lead" style="margin-top:-8px;font-weight:700">${t('tapToFlip')}</p>
    <div class="track-grid">${cards}</div>
    <div class="form-actions" style="justify-content:center;margin-top:20px">
      <button class="btn btn-ghost" data-back>${t('back')}</button>
      <button class="btn btn-gold" data-start ${sel ? '' : 'disabled'}>${t('startTrack')} ›</button>
    </div></div></div></section>`);
  el.addEventListener('click', e => {
    const c = e.target.closest('[data-track]');
    if (c) {
      sel = c.dataset.track;
      $$('[data-track]', el).forEach(x => x.setAttribute('aria-pressed', String(x === c)));
      $('[data-start]', el).disabled = false;
      return;
    }
    if (e.target.closest('[data-back]')) avatarScreen();
    if (e.target.closest('[data-start]') && sel) {
      store.newRun(sel);
      playPart('P');
    }
  });
  return show(el, { type: 'fade' });
}

/* ---------------- Chapter card + play ---------------- */
async function playPart(id, { practice = false, resume = false } = {}) {
  const meta = partMeta(id);
  rerender = null;
  const el = h(`<section class="screen chapter-card-screen"><div class="chapter-page frame">
      <p class="week">${t('week', { n: meta.week })}</p>
      <h1>${esc(tx(meta.title))}</h1>
      ${practice ? `<p><span class="chip practice-chip">${t('practice')}</span> ${t('practiceNote')}</p>` : ''}
      <div style="width:110px;margin:6px auto">${stickerSVG(meta.sticker)}</div>
      <button class="btn btn-gold" data-go data-autofocus>${resume ? t('continue') : t('start')} ›</button>
    </div></section>`);
  await show(el, { type: 'page' });
  $('[data-go]', el).addEventListener('click', () => {
    const p = new Player(id, { practice, resume, openSettings, onDone: (info) => hubScreen(info) });
    p.start();
  }, { once: true });
}

/* ---------------- Hub Room ---------------- */
function hubLabels() {
  const L = { shelf: tx(UI.shelf), board: tx(UI.board), cork: tx(UI.cork), laptop: tx(UI.laptop), phone: tx(UI.phone), pixel: tx(UI.pixel), health: tx(UI.health), trust: tx(UI.trust), room: tx(UI.room) };
  return L;
}

function hubScreen(info = {}) {
  rerender = () => hubScreen();
  const r = store.state.run;
  if (!r) return titleScreen();
  const next = nextPart();
  const time = next ? next.time : 'evening';
  const weekN = next ? next.week : 7;
  const labels = { ...hubLabels(), week: tx(UI.week).replace('{n}', weekN) };
  const mates = {};
  ['mira', 'sara', 'omar'].forEach(w => { mates[w] = { expr: exprFor(r.bond[w]), label: nameOf(w) }; });
  const unread = r.chatLog.length - (r.flags._chatRead || 0);
  const newTerms = r.glossary.length > (r.flags._glossRead || 0);
  const stickers = store.state.collections.stickers.map(s => s.id);
  const resume = next && r.sceneId && r.part === next.id;
  const svg = roomSVG({ hot: true, time, labels, teammates: mates, health: r.health, trust: r.trust, stickers, badges: { laptop: !!next, phone: unread > 0 ? unread : 0, shelf: newTerms } });
  const listItems = [
    ['laptop', ICON.home, t('laptop'), next ? t('playNext', { title: tx(next.title) }) : ''],
    ['phone', ICON.log, t('phone'), unread > 0 ? `${unread}` : ''],
    ['board', ICON.health, t('board'), `${t('health')} ${r.health} · ${t('trust')} ${r.trust}`],
    ['cork', ICON.star(true), t('cork'), `${stickers.length}/12`],
    ['shelf', ICON.tip, t('shelf'), `${r.glossary.length}`],
    ['mate-mira', ICON.heart(true), nameOf('mira'), ''],
    ['mate-sara', ICON.heart(true), nameOf('sara'), ''],
    ['mate-omar', ICON.heart(true), nameOf('omar'), ''],
    ['pixel', ICON.bulb, t('pixel'), t('hint')],
  ];
  const el = h(`<section class="screen hub-screen" aria-label="${t('room')}">
    <div class="hub-top">
      <span class="week-chip">${t('week', { n: weekN })}</span>
      <span class="spacer"></span>
      ${meterHTML('health', r.health)}${meterHTML('trust', r.trust)}
      <button class="icon-btn" data-roommenu aria-label="${t('roomMenu')}">${ICON.menu}</button>
      <button class="icon-btn" data-settings aria-label="${t('settings')}">${ICON.gear}</button>
    </div>
    <div class="hub-stage">${svg}</div>
    <div class="hub-cta">
      ${next ? `<button class="btn btn-gold" data-play data-autofocus>${resume ? `${t('continue')}: ${esc(tx(next.title))}` : t('playNext', { title: `${tx(UI.week).replace('{n}', next.week)} · ${tx(next.title)}` })} ›</button>`
        : `<button class="btn btn-gold" data-hot-btn="laptop" data-autofocus>${t('allDone')}</button>`}
    </div>
    <nav class="hub-list" aria-label="${t('roomMenu')}">${listItems.map(([id, ic, label, sub]) => `<button data-hot-btn="${id}"><span style="width:28px;height:28px;display:inline-grid">${ic}</span><span>${label}${sub ? `<small>${esc(sub)}</small>` : ''}</span></button>`).join('')}</nav>
  </section>`);

  const onHot = (id, ev) => {
    const origin = ev && ev.clientX ? [ev.clientX, ev.clientY] : [innerWidth / 2, innerHeight / 2];
    if (id === 'laptop') return mapScreen(origin);
    if (id === 'phone') return chatHistorySheet();
    if (id === 'board') return boardSheet();
    if (id === 'cork') return stickersSheet();
    if (id === 'shelf') return glossarySheet();
    if (id === 'pixel') return pixelSheet();
    if (id.startsWith('mate-')) return teamCardSheet(id.slice(5));
  };
  $$('.hot', el).forEach(g => {
    g.addEventListener('click', e => onHot(g.dataset.hot, e));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onHot(g.dataset.hot, null); } });
  });
  // Pixel long-press → settings
  const pix = $('.hot[data-hot="pixel"]', el);
  if (pix) {
    let timer;
    pix.addEventListener('pointerdown', () => { timer = setTimeout(() => { timer = null; openSettings(); }, 650); });
    ['pointerup', 'pointerleave'].forEach(ev => pix.addEventListener(ev, () => clearTimeout(timer)));
    pix.addEventListener('contextmenu', e => { e.preventDefault(); openSettings(); });
  }
  $$('[data-hot-btn]', el).forEach(b => b.addEventListener('click', e => onHot(b.dataset.hotBtn, e)));
  $('[data-play]', el)?.addEventListener('click', () => playPart(next.id, { resume }));
  $('[data-settings]', el).addEventListener('click', openSettings);
  $('[data-roommenu]', el).addEventListener('click', roomMenuSheet);

  // Parallax (desktop pointer only)
  const stage = $('.hub-stage', el);
  if (!reduced() && matchMedia('(pointer: fine)').matches) {
    const layers = [['.parallax-back', 3], ['.parallax-mid', 5], ['.parallax-front', 9]].map(([s, k]) => [$(s, stage), k]);
    stage.addEventListener('pointermove', e => {
      const dx = (e.clientX / innerWidth - 0.5) * 2, dy = (e.clientY / innerHeight - 0.5) * 2;
      layers.forEach(([l, k]) => l && (l.style.transform = `translate(${-dx * k}px, ${-dy * k * 0.5}px)`));
    });
  }

  const p = show(el, { type: info.completed || info.exited || info.practice ? 'wipe' : 'fade' });
  if (!r.flags._hubHint) {
    r.flags._hubHint = true; store.save();
    setTimeout(() => toast(`${ICON.bulb}<span>${t('hubHint')}</span>`), 900);
  }
  return p;
}

function roomMenuSheet() {
  const items = [['laptop', t('laptop')], ['phone', t('phone')], ['board', t('board')], ['cork', t('cork')], ['shelf', t('shelf')], ['mate-mira', nameOf('mira')], ['mate-sara', nameOf('sara')], ['mate-omar', nameOf('omar')], ['pixel', t('pixel')]];
  const s = sheet(`<div style="display:grid;gap:8px">${items.map(([id, l]) => `<button class="btn btn-ghost" data-go="${id}">${l}</button>`).join('')}</div>`, { title: t('roomMenu') });
  s.el.addEventListener('click', e => {
    const id = e.target.closest('[data-go]')?.dataset.go; if (!id) return;
    s.close();
    setTimeout(() => {
      const btn = document.querySelector(`[data-hot-btn="${id}"]`) || document.querySelector(`.hot[data-hot="${id}"]`);
      btn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }, 300);
  });
}

/* ---------------- Semester map ---------------- */
function mapScreen(origin) {
  rerender = () => mapScreen();
  const pages = PARTS.map(p => {
    const st = partState(p);
    const stars = store.starsOf(p.id);
    const stateLine = st === 'done' ? `<span class="mini-stars">${[0, 1, 2].map(i => ICON.star(i < stars)).join('')}</span> ${t('done')}`
      : st === 'avail' ? `▶ ${t('available')}` : st === 'locked' ? `${ICON.lock.replace('<svg', '<svg width="16" height="16"')} ${t('locked')}` : `${t('soon')}`;
    const disabled = st === 'soon' || st === 'locked';
    return `<button class="cal-page ${st}" data-part="${p.id}" ${disabled ? 'disabled aria-disabled="true"' : ''}>
      <span class="cal-top">${t('week', { n: p.week })}</span>
      <span class="cal-body"><span class="cal-title">${esc(tx(p.title))}</span><span class="cal-state">${stateLine}</span></span></button>`;
  }).join('');
  const el = h(`<section class="screen scroll"><div class="center-wrap"><div class="panel frame">
    <h1>${t('mapTitle')}</h1><p class="lead">${t('mapLead')}</p>
    <div class="map-grid">${pages}</div>
    <div class="form-actions" style="justify-content:center;margin-top:18px"><button class="btn btn-ghost" data-back>${ICON.back} ${t('toRoom')}</button></div>
  </div></div></section>`);
  el.addEventListener('click', e => {
    if (e.target.closest('[data-back]')) return hubScreen();
    const b = e.target.closest('[data-part]');
    if (!b || b.disabled) return;
    const p = partMeta(b.dataset.part);
    const st = partState(p);
    const r = store.state.run;
    if (st === 'done') playPart(p.id, { practice: true });
    else playPart(p.id, { resume: r.sceneId && r.part === p.id });
  });
  return show(el, { type: 'zoom', origin });
}

/* ---------------- Sheets ---------------- */
function chatHistorySheet() {
  const r = store.state.run;
  r.flags._chatRead = r.chatLog.length; store.save();
  const msgs = r.chatLog.map(id => MSG_INDEX[id] ? messageHTML(MSG_INDEX[id], id.includes('#')) : '').join('');
  sheet(`<div class="chat-screen" style="border-radius:18px;max-height:60vh">${msgs || `<p>${t('chatEmpty')}</p>`}</div>`, { title: t('chatHistory'), onClose: () => rerender && rerender() });
}

function boardSheet() {
  const r = store.state.run;
  const done = r.completedParts.map(c => `<li>${t('week', { n: partMeta(c.part).week })} · ${esc(tx(partMeta(c.part).title))} — ${c.stars}★</li>`).join('');
  const rules = r.flags.noForcePushRule ? `<p class="helps">✔ ${esc(tx({ en: 'Team rule: no force push to main. Everything goes through a pull request.', ar: 'قاعدة الفريق: لا force push على main، وكل شيء يمرّ عبر pull request.' }))}</p>` : '';
  sheet(`<div class="settings-list">
    <div class="settings-row"><span>${t('health')}</span>${meterHTML('health', r.health)}<p class="field-help">${esc(tx({ en: 'How good the project is: technical choices raise or lower it.', ar: 'مدى جودة المشروع؛ ترفعه القرارات التقنية أو تخفضه.' }))}</p></div>
    <div class="settings-row"><span>${t('trust')}</span>${meterHTML('trust', r.trust)}<p class="field-help">${esc(tx({ en: 'How much the team trusts you: how you treat people raises or lowers it.', ar: 'مدى ثقة الفريق بك؛ ترفعه طريقة تعاملك مع الناس أو تخفضه.' }))}</p></div>
    <p class="field-help">${esc(tx({ en: 'At Demo Day, both meters decide your ending. Carrying the project alone can raise Health while Trust falls.', ar: 'في يوم العرض يحدّد المؤشران نهايتك. حمل المشروع وحدك قد يرفع الصحة بينما تنخفض الثقة.' }))}</p>
    ${rules}
    ${done ? `<div class="settings-row"><span>${t('done')}</span><ul style="margin:0">${done}</ul></div>` : ''}
  </div>`, { title: t('board') });
}

function stickersSheet() {
  const have = new Set(store.state.collections.stickers.map(s => s.id));
  const cells = PARTS.map(p => `<div class="sticker-cell ${have.has(p.sticker) ? '' : 'locked'}">${stickerSVG(p.sticker)}<span>${have.has(p.sticker) ? esc(tx(STICKERS[p.sticker])) : '?'}</span></div>`).join('');
  sheet(`<div class="sticker-grid">${cells}</div>`, { title: t('stickersTitle') });
}

function glossarySheet() {
  const r = store.state.run;
  r.flags._glossRead = r.glossary.length; store.save();
  const items = r.glossary.map(term => `<div class="gloss-item"><dt><bdi>${esc(term)}</bdi></dt><dd>${esc(tx(GLOSSARY[term]?.def))}</dd></div>`).join('');
  sheet(items ? `<dl style="margin:0">${items}</dl>` : `<p>${t('glossEmpty')}</p>`, { title: t('glossTitle'), onClose: () => rerender && rerender() });
}

function pixelSheet() {
  const s = sheet(`<div class="team-card"><span class="tc-ava" style="background:var(--warm-gold)">${pixelSVG('happy')}</span>
    <div style="display:grid;gap:10px"><p style="font-size:1.1rem;font-weight:600">${rich(UI.pixelTip)}</p>
    <button class="btn btn-ghost btn-small" data-s>${ICON.gear} ${t('settings')}</button></div></div>`, { title: t('pixelSays') });
  $('[data-s]', s.el).addEventListener('click', () => { s.close(); setTimeout(openSettings, 300); });
}

function teamCardSheet(who) {
  const r = store.state.run;
  const bond = r.bond[who] ?? 0;
  const hearts = Math.max(0, Math.min(5, bond));
  const helps = HELPS[who];
  const unlocked = store.isDone(helps.after);
  sheet(`<div class="team-card">
      <span class="tc-ava">${characterSVG(CAST[who], exprFor(bond))}</span>
      <div style="display:grid;gap:8px">
        <p><strong>${t('role')}:</strong> ${esc(tx(ROLES[who][r.track]))}</p>
        <div><strong>${t('bond')}:</strong> <span class="hearts" role="img" aria-label="${t('bond')} ${hearts}/5">${[0, 1, 2, 3, 4].map(i => ICON.heart(i < hearts)).join('')}</span>${bond < 0 ? ` <span class="chip" style="background:var(--blush)">${t('distant')}</span>` : ''}</div>
        <div class="helps"><strong>${t('helps', { who: nameOf(who) })}:</strong><br>${unlocked ? esc(tx(helps.text)) : `${ICON.lock.replace('<svg', '<svg width="18" height="18"')} ${t('helpsLocked')}`}</div>
      </div></div>`, { title: nameOf(who) });
}

/* ---------------- Settings ---------------- */
function openSettings() {
  const s0 = store.state.settings;
  const row = (label, key, opts) => `<div class="settings-row"><span>${label}</span><div class="opt-row" role="group" aria-label="${label}">${opts.map(([v, l]) => `<button class="opt" data-set="${key}" data-v="${v}" aria-pressed="${String(s0[key]) === String(v)}">${l}</button>`).join('')}</div></div>`;
  const addrRow = store.state.avatar ? `<div class="settings-row"><span>${t('address')}</span><div class="opt-row">
      <button class="opt" data-addr="m" aria-pressed="${store.state.avatar.address === 'm'}">${t('addrM')}</button>
      <button class="opt" data-addr="f" aria-pressed="${store.state.avatar.address === 'f'}">${t('addrF')}</button></div></div>` : '';
  const s = sheet(`<div class="settings-list">
      ${row(t('language'), 'lang', [['en', 'English'], ['ar', 'العربية']])}
      ${addrRow}
      ${row(t('textSpeed'), 'textSpeed', ['slow', 'normal', 'fast', 'instant'].map(v => [v, t(`speeds.${v}`)]))}
      ${row(t('textSize'), 'textSize', [['100', '100%'], ['115', '115%'], ['130', '130%']])}
      ${row(t('reduceMotion'), 'reduceMotion', [['true', t('on')], ['false', t('off')]])}
      <div class="settings-row"><button class="btn btn-ghost danger" data-reset>${t('resetAll')}</button></div>
    </div>`, { title: t('settingsTitle') });
  s.el.addEventListener('click', async e => {
    const b = e.target.closest('[data-set]');
    if (b) {
      const k = b.dataset.set; let v = b.dataset.v;
      if (k === 'reduceMotion') v = v === 'true';
      store.setSetting(k, v);
      $$(`[data-set="${k}"]`, s.el).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      applyPrefs();
      if (k === 'lang') { store.state.langChosen = true; store.save(); applyDocumentLanguage(); s.close(); rerender ? rerender() : toast(t('saved')); }
      return;
    }
    const ad = e.target.closest('[data-addr]');
    if (ad) {
      const av = store.state.avatar;
      av.address = ad.dataset.addr;
      if (!HAIR_BY[av.address].includes(av.hair)) av.hair = HAIR_BY[av.address][0];
      if (!OUTFIT_BY[av.address].includes(av.outfit)) av.outfit = OUTFIT_BY[av.address][0];
      store.save();
      $$('[data-addr]', s.el).forEach(x => x.setAttribute('aria-pressed', String(x === ad)));
      return;
    }
    if (e.target.closest('[data-reset]')) {
      const ok = await confirmModal({ title: t('resetTitle'), body: t('resetBody'), yes: t('yesReset'), no: t('cancel'), danger: true });
      if (!ok) return;
      s.close();
      store.resetAll();
      applyPrefs(); applyDocumentLanguage();
      titleScreen();
    }
  });
}

/* ---------------- Boot ---------------- */
async function boot() {
  const status = store.load();
  applyPrefs();
  applyDocumentLanguage();
  if (!store.state.langChosen) await languageScreen(titleScreen); else await titleScreen();
  if (status === 'nostorage') toast(`${ICON.warn}<span>${t('storageOff')}</span>`);
  if (status === 'corrupt') {
    await confirmModal({ title: t('corrupt'), body: '', yes: t('startFresh'), no: t('close') });
    store.resetAll(); applyPrefs(); applyDocumentLanguage(); titleScreen();
  }
  store.on(type => { if (type === 'storage') toast(`${ICON.warn}<span>${t('storageOff')}</span>`); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') store.save(); });
}

boot();
