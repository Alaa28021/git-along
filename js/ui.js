// Git Along — shared UI helpers: screens, the five transitions, sheets, modals, toasts.
import { store } from './store.js';
import { t } from './i18n.js';
import { ICON, cloudWipeSVG } from './art.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const sleep = ms => new Promise(r => setTimeout(r, ms));
/** Next frame, with a timer fallback so hidden/background tabs still progress. */
export function frame(fn) { let done = false; const go = () => { if (!done) { done = true; fn(); } }; requestAnimationFrame(go); setTimeout(go, 60); }

export function h(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

export const reduced = () => !!store.state.settings.reduceMotion;
const app = () => document.getElementById('app');

/**
 * Show a new screen with one of the five transitions (SRS 5.5):
 * zoom (into an object), fade (time passes), page (new week), wipe (step out to reflect), none.
 */
export async function show(el, { type = 'fade', origin = null } = {}) {
  const root = app();
  const old = root.firstElementChild;
  closeAllSheets();
  if (reduced()) type = 'fade';

  if (type === 'wipe') {
    await wipeCover();
    root.replaceChildren(el);
    await wipeLeave();
  } else if (type === 'zoom' && old) {
    if (origin) old.style.transformOrigin = `${origin[0]}px ${origin[1]}px`;
    old.classList.add('zoom-out-from');
    frame(() => { old.style.transform = 'scale(2.3)'; old.style.opacity = '0'; });
    await sleep(380);
    el.classList.add('fade-in');
    root.replaceChildren(el);
  } else if (type === 'page') {
    el.classList.add('page-in');
    root.replaceChildren(el);
  } else {
    el.classList.add('fade-in');
    root.replaceChildren(el);
  }
  const focusable = el.querySelector('[data-autofocus]') || el.querySelector('h1, button, [tabindex="0"]');
  if (focusable && !el.dataset.noFocus) focusable.focus({ preventScroll: true });
  return el;
}

/* ---------- Cloud wipe ---------- */
function wipeEl() {
  const w = document.getElementById('wipe');
  if (!w.firstElementChild) w.innerHTML = `<div class="cloud-row">${cloudWipeSVG()}</div>`;
  return w;
}
export async function wipeCover() {
  if (reduced()) return;
  const w = wipeEl();
  w.classList.remove('leave', 'cover');
  void w.offsetWidth;
  w.classList.add('cover');
  await sleep(520);
}
export async function wipeLeave() {
  if (reduced()) return;
  const w = wipeEl();
  w.classList.remove('cover');
  w.classList.add('leave');
  await sleep(520);
  w.classList.remove('leave');
}

/* ---------- Sheets (slide-up) ---------- */
const openSheets = [];
export function sheet(innerHTML, { title = '', cls = '', onClose = null, raw = false } = {}) {
  const layer = document.getElementById('sheet-layer');
  const scrim = h(`<div class="sheet-scrim"></div>`);
  const el = h(`<div class="sheet ${cls}" role="dialog" aria-modal="true" ${title ? `aria-label="${title}"` : ''}></div>`);
  el.innerHTML = raw ? innerHTML : `<div class="grab" aria-hidden="true"></div><div class="sheet-head"><h2>${title}</h2><button class="icon-btn" data-close aria-label="${t('close')}">${ICON.close}</button></div>${innerHTML}`;
  layer.append(scrim, el);
  const prevFocus = document.activeElement;
  frame(() => { scrim.classList.add('open'); el.classList.add('open'); });
  const close = async () => {
    if (!el.isConnected) return;
    el.classList.remove('open'); scrim.classList.remove('open');
    const i = openSheets.indexOf(api); if (i >= 0) openSheets.splice(i, 1);
    document.removeEventListener('keydown', onKey);
    await sleep(reduced() ? 10 : 290);
    el.remove(); scrim.remove();
    if (prevFocus && prevFocus.isConnected) prevFocus.focus({ preventScroll: true });
    onClose && onClose();
  };
  const onKey = e => { if (e.key === 'Escape' && openSheets.at(-1) === api) { e.preventDefault(); close(); } };
  document.addEventListener('keydown', onKey);
  scrim.addEventListener('click', close);
  el.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
  const api = { el, close };
  openSheets.push(api);
  setTimeout(() => (el.querySelector('[data-autofocus]') || el.querySelector('button, input, [tabindex="0"]'))?.focus({ preventScroll: true }), 60);
  return api;
}
export function closeAllSheets() { [...openSheets].forEach(s => s.close()); }

/* ---------- Modal ---------- */
export function confirmModal({ title, body, yes, no, danger = false }) {
  return new Promise(resolve => {
    const scrim = h(`<div class="modal-scrim" role="presentation">
      <div class="modal frame no-crest" role="alertdialog" aria-modal="true" aria-labelledby="m-title" aria-describedby="m-body">
        <h2 id="m-title">${title}</h2><p id="m-body">${body}</p>
        <div class="form-actions"><button class="btn btn-ghost" data-no>${no}</button><button class="btn ${danger ? '' : 'btn-gold'}" data-yes>${yes}</button></div>
      </div></div>`);
    document.body.append(scrim);
    const done = v => { scrim.remove(); document.removeEventListener('keydown', key); resolve(v); };
    const key = e => { if (e.key === 'Escape') done(false); };
    document.addEventListener('keydown', key);
    scrim.addEventListener('click', e => { if (e.target === scrim) done(false); });
    scrim.querySelector('[data-no]').addEventListener('click', () => done(false));
    scrim.querySelector('[data-yes]').addEventListener('click', () => done(true));
    scrim.querySelector('[data-no]').focus();
  });
}

/* ---------- Toasts ---------- */
export function toast(html, cls = '') {
  const el = h(`<div class="toast ${cls}" role="status">${html}</div>`);
  document.getElementById('toast-layer').append(el);
  setTimeout(() => el.remove(), 2500);
}

export function deltaToasts(deltas) {
  deltas.filter(d => d.k !== 'bond' && d.d !== 0).forEach((d, i) => {
    setTimeout(() => {
      const up = d.d > 0;
      toast(`${ICON[d.k]}<span>${up ? '▲ +' : '▼ '}${d.d} ${t(d.k)}</span>`, up ? 'up' : 'down');
    }, i * 260);
  });
}

/* ---------- Sparkles ---------- */
export function sparkleBurst(target, n = 10) {
  if (reduced() || !target) return;
  const r = target.getBoundingClientRect();
  for (let i = 0; i < n; i++) {
    const s = h(`<svg class="sparkle" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" fill="${i % 2 ? '#F3B64E' : '#F4C7D0'}"/></svg>`);
    const ang = (Math.PI * 2 * i) / n;
    s.style.left = `${r.left + r.width / 2}px`; s.style.top = `${r.top + r.height / 2}px`; s.style.position = 'fixed'; s.style.zIndex = 95;
    s.style.setProperty('--dx', `${Math.cos(ang) * (60 + Math.random() * 40)}px`);
    s.style.setProperty('--dy', `${Math.sin(ang) * (60 + Math.random() * 40)}px`);
    document.body.append(s);
    setTimeout(() => s.remove(), 950);
  }
}

/* ---------- Meters ---------- */
export function meterHTML(kind, value) {
  return `<div class="meter ${kind}" data-meter="${kind}" role="img" aria-label="${t(kind)}: ${value}">
    <span class="m-icon">${ICON[kind]}</span>
    <span class="m-body"><span class="m-label" aria-hidden="true">${t(kind)}</span><span class="m-bar"><span class="m-fill" style="width:${value}%"></span></span></span>
    <span class="m-num">${value}</span></div>`;
}
export function updateMeters(root = document) {
  const r = store.state.run; if (!r) return;
  ['health', 'trust'].forEach(k => {
    root.querySelectorAll(`[data-meter="${k}"]`).forEach(m => {
      m.querySelector('.m-fill').style.width = `${r[k]}%`;
      m.querySelector('.m-num').textContent = r[k];
      m.setAttribute('aria-label', `${t(k)}: ${r[k]}`);
    });
  });
}

export function applyPrefs() {
  const s = store.state.settings;
  document.documentElement.classList.toggle('reduce-motion', !!s.reduceMotion);
  document.documentElement.dataset.textSize = s.textSize || '100';
}
