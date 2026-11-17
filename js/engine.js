// Git Along — scene engine (SRS 3.3–3.6): plays a part's scene graph as a queue of steps.
import { store, evalCond } from './store.js';
import { t, tx, rich, plain, esc } from './i18n.js';
import { STORY, PARTS, NAMES, PLATE, TRACKS, MERGE6, MERGE_OUTCOMES, DEBRIEFS, STICKERS } from './content.js';
import { characterSVG, CAST, avatarToSpec, pixelSVG, emoteSVG, ICON, backgroundSVG, portraitSVG, pixelPortrait, stickerSVG } from './art.js';
import { h, $, $$, sleep, frame, show, sheet, toast, deltaToasts, meterHTML, updateMeters, wipeCover, wipeLeave, reduced, sparkleBurst } from './ui.js';

const SPEED = { slow: 42, normal: 24, fast: 10, instant: 0 };
const DEFAULT_HINT = { en: 'Notice who each choice affects. The story remembers.', ar: { m: 'انتبه لمن يتأثّر بكل اختيار؛ القصة تتذكّر.', f: 'انتبهي لمن يتأثّر بكل اختيار؛ القصة تتذكّر.' } };

export function tokens() {
  const r = store.state.run;
  const tk = r ? TRACKS[r.track].tokens : {};
  return { ...tk, name: store.state.avatar?.name || 'You' };
}
export function nameOf(who) {
  if (who === 'you') return store.state.avatar?.name || tx({ en: 'You', ar: 'أنت' });
  return tx(NAMES[who]);
}
function specOf(who) { return who === 'you' ? avatarToSpec(store.state.avatar) : CAST[who]; }
export function portraitOf(who, face = 'neutral') {
  if (who === 'pixel') return pixelPortrait(face === 'neutral' ? 'happy' : face);
  return portraitSVG(specOf(who), face, PLATE[who]);
}

/* Index chat messages so the hub phone can show history. */
export const MSG_INDEX = {};
(function index() {
  const walk = steps => steps.forEach(s => {
    if (s.t === 'chat') s.msgs.forEach(m => { MSG_INDEX[m.id] = m; });
    if (s.t === 'choice') s.options.forEach((o, i) => {
      if (s.via === 'chat') MSG_INDEX[`${s.id}#${i}`] = { who: 'you', text: o.text };
      if (o.reply) walk(o.reply);
    });
    if (s.t === 'if') { walk(s.then || []); walk(s.else || []); }
  });
  Object.values(STORY).forEach(p => Object.values(p.scenes).forEach(sc => walk(sc.steps)));
})();

/* "(Private message to Mira) Hey…" → "Hey…" once it is sent; a fully bracketed option is an action, not a message. */
const stripLead = v => (typeof v === 'string' ? v.replace(/^\([^)]*\)\s*/, '') : v && Object.fromEntries(Object.entries(v).map(([k, x]) => [k, stripLead(x)])));
const isAction = v => /^\(.*\)$/.test((v?.en || '').trim());

export function messageHTML(m, isMe) {
  const tk = tokens();
  if (isMe) m = { ...m, text: stripLead(m.text) };
  if (m.sys) return `<div class="sys-msg">${rich(m.text, tk)}</div>`;
  const who = m.who;
  return `<div class="msg ${isMe ? 'me' : ''}">
    <span class="m-ava">${portraitOf(who, 'happy')}</span>
    <div class="bubble">${isMe ? '' : `<span class="who" style="color:${'#174C4A'}">${esc(nameOf(who))}</span>`}<span>${rich(m.text, tk)}</span>${m.react ? `<span class="reaction">${m.react}</span>` : ''}</div>
  </div>`;
}

export class Player {
  constructor(partId, { practice = false, resume = false, onDone, openSettings }) {
    this.partId = partId;
    this.practice = practice;
    this.resume = resume;
    this.onDone = onDone;
    this.openSettings = openSettings;
    this.part = STORY[partId];
    this.meta = PARTS.find(p => p.id === partId);
    this.actors = {};
    this.backlog = [];
    this.auto = false;
    this.skip = false;
    this.hint = null;
    this.last = null;
    this.lastMerge = null;
    this.phone = null;
    this.rewound = new Set();   // choice ids already rethought once
    this.rewindCtx = null;      // snapshot that "Rethink" restores
    this.preChoice = null;
    this.choosing = false;
    this.hintKind = 'social';
  }

  /* ---------- Screen ---------- */
  build() {
    const week = t('week', { n: this.meta.week });
    const r = store.state.run;
    this.el = h(`<section class="screen vn" aria-label="${esc(tx(this.meta.title))}">
      <div class="bg"></div>
      <div class="cast"></div>
      <div class="hud">
        <span class="part-chip">${week} · ${esc(tx(this.meta.title))}</span>
        ${this.practice ? `<span class="chip practice-chip">${t('practice')}</span>` : ''}
        <span class="spacer"></span>
        ${meterHTML('health', r.health)}${meterHTML('trust', r.trust)}
        <span class="hint-wrap"><button class="icon-btn" data-hint aria-label="${t('hint')}">${ICON.bulbLit}</button><span class="hint-nudge" hidden>${t('hintNudge')}</span></span>
        <button class="icon-btn" data-menu aria-label="${t('menu')}">${ICON.menu}</button>
      </div>
      <div class="dialogue frame no-crest" tabindex="0" data-autofocus>
        <div class="nameplate" hidden></div>
        <div class="line" aria-live="polite"></div>
        <div class="choices" hidden></div>
        <div class="controls">
          <button class="txt-btn rewind-btn" data-rewind hidden>${ICON.rewind} ${t('rethink')}</button>
          <span class="spacer"></span>
          <button class="txt-btn" data-log>${t('log')}</button>
          <button class="txt-btn" data-auto aria-pressed="false">${t('auto')}</button>
          <button class="txt-btn" data-skip aria-pressed="false">${t('skip')}</button>
          <span class="next-ind" aria-hidden="true"></span>
        </div>
      </div>
    </section>`);
    this.dlg = $('.dialogue', this.el);
    this.lineEl = $('.line', this.dlg);
    this.plateEl = $('.nameplate', this.dlg);
    this.choicesEl = $('.choices', this.dlg);
    this.nextInd = $('.next-ind', this.dlg);
    this.rewBtn = $('[data-rewind]', this.dlg);
    this.rewBtn.addEventListener('click', () => { if (this.typing) return; if (this.doRewind()) this.advance?.(); });

    const tap = e => {
      if (e.target.closest('button, input, .laptop, .choices')) return;
      this.tap();
    };
    this.dlg.addEventListener('click', tap);
    $('.bg', this.el).addEventListener('click', tap);
    this.keyHandler = e => {
      if (!this.el.isConnected) { document.removeEventListener('keydown', this.keyHandler); return; }
      if (document.querySelector('.sheet.open, .modal-scrim')) return;
      const tag = (e.target.tagName || '').toLowerCase();
      if (['input', 'textarea', 'button', 'select'].includes(tag)) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this.tap(); }
    };
    document.addEventListener('keydown', this.keyHandler);

    $('[data-log]', this.el).addEventListener('click', () => this.showLog());
    $('[data-auto]', this.el).addEventListener('click', e => { this.auto = !this.auto; e.currentTarget.setAttribute('aria-pressed', this.auto); if (this.auto && this.advance && !this.typing) this.advance(); });
    $('[data-skip]', this.el).addEventListener('click', e => { this.skip = !this.skip; e.currentTarget.setAttribute('aria-pressed', this.skip); if (this.skip) { this.finishTyping?.(); if (this.seenNow) this.advance?.(); } });
    $('[data-hint]', this.el).addEventListener('click', () => this.showHint());
    $('[data-menu]', this.el).addEventListener('click', () => this.showMenu());
    return this.el;
  }

  tap() {
    if (this.typing && this.finishTyping) this.finishTyping();
    else if (this.advance) this.advance();
  }

  async start() {
    await show(this.build(), { type: 'fade' });
    let sceneId = this.part.start;
    if (!this.practice) {
      const r = store.state.run;
      if (this.resume && r.sceneId && r.part === this.partId) { store.restoreCheckpoint(); sceneId = r.sceneId; }
      else store.startPart(this.partId);
    }
    updateMeters(this.el);
    await this.runScene(sceneId);
  }

  async runScene(id) {
    const sc = this.part.scenes[id];
    this.sceneId = id;
    if (!this.practice) store.checkpoint(id);
    this.setBg(sc.bg);
    this.queue = [...sc.steps];
    while (this.queue.length) {
      if (!this.el.isConnected) return;
      const step = this.queue.shift();
      const r = await this.exec(step);
      if (r === 'goto') return;
      if (r === 'end') return this.finish();
    }
  }

  async exec(step) {
    if (!['line', 'chat', 'closeChat', 'face', 'cast', 'if'].includes(step.t)) this.rewindCtx = null;
    switch (step.t) {
      case 'line':
        if (step.if && !evalCond(step.if)) return;
        if (step.term && !this.practice) store.learnTerm(step.term);
        if (step.who && step.face) this.setFace(step.who, step.face);
        if (step.who && step.emote) this.emote(step.who, step.emote);
        return this.say(step);
      case 'cast': return this.setCast(step.cast);
      case 'face': return this.setFace(step.who, step.face);
      case 'chat': return this.chat(step);
      case 'closeChat': return this.closeChat();
      case 'choice': if (step.hint) this.hint = step.hint; return step.via === 'chat' ? this.chatChoice(step) : this.dialogueChoice(step);
      case 'terminal': return this.terminal(step);
      case 'merge': this.hint = step.hint || this.hint; return this.merge(step);
      case 'debrief': return this.debrief(step.id, step.from || this.last);
      case 'if': this.queue.unshift(...(evalCond(step.cond) ? step.then : (step.else || []))); return;
      case 'goto': await this.runScene(step.to); return 'goto';
      case 'end': return 'end';
      default: return;
    }
  }

  /* ---------- Stage ---------- */
  setBg(name) {
    const bg = $('.bg', this.el);
    if (bg.dataset.name === name) return;
    bg.dataset.name = name;
    bg.style.opacity = '0';
    const r = store.state.run;
    bg.innerHTML = backgroundSVG(name, {
      labels: { week: t('week', { n: this.meta.week }), health: t('health'), trust: t('trust'), room: t('room') },
      health: r?.health, trust: r?.trust, stickers: store.state.collections.stickers.map(x => x.id),
    });
    frame(() => { bg.style.transition = 'opacity var(--dur-fade)'; bg.style.opacity = '1'; });
  }

  actorSVG(who, face) {
    return who === 'pixel' ? pixelSVG(face === 'happy' ? 'happy' : 'neutral') : characterSVG(specOf(who), face || 'neutral');
  }

  setCast(list) {
    const castEl = $('.cast', this.el);
    const keep = new Set(list.map(c => c.who));
    Object.keys(this.actors).forEach(who => {
      if (!keep.has(who)) { const a = this.actors[who]; a.style.opacity = '0'; setTimeout(() => a.remove(), 300); delete this.actors[who]; }
    });
    list.forEach(c => {
      let a = this.actors[c.who];
      if (!a) {
        a = h(`<div class="actor ${c.who === 'pixel' ? 'pixel' : ''}" data-who="${c.who}"></div>`);
        a.innerHTML = this.actorSVG(c.who, c.face);
        castEl.append(a);
        this.actors[c.who] = a;
      } else if (c.face) a.innerHTML = this.actorSVG(c.who, c.face);
      a.classList.remove('at-left', 'at-center', 'at-right');
      a.classList.add(`at-${c.at}`);
    });
  }

  setFace(who, face) {
    const a = this.actors[who];
    if (!a || a.dataset.face === face) return;
    a.dataset.face = face;
    const em = a.querySelector('.emote');
    a.innerHTML = this.actorSVG(who, face);
    if (em) a.append(em);
  }

  emote(who, kind) {
    const a = this.actors[who];
    if (!a || !kind) return;
    a.querySelector('.emote')?.remove();
    const e = h(`<div class="emote">${emoteSVG(kind)}</div>`);
    a.append(e);
    setTimeout(() => e.remove(), 1800);
  }

  /* ---------- Dialogue ---------- */
  async say(step) {
    const tk = tokens();
    const who = step.who;
    if (this.phone) this.phoneVisible(false);
    this.rewBtn.hidden = true;
    this.choicesEl.hidden = true;
    this.lineEl.hidden = false;
    if (who) {
      this.plateEl.hidden = false;
      this.plateEl.textContent = nameOf(who);
      this.plateEl.style.background = PLATE[who] || PLATE.you;
      this.plateEl.style.animation = 'none'; void this.plateEl.offsetWidth; this.plateEl.style.animation = '';
    } else this.plateEl.hidden = true;
    this.lineEl.classList.toggle('narration', !who);
    Object.entries(this.actors).forEach(([w, a]) => {
      a.classList.toggle('dim', !!who && w !== who);
      if (w === who) { a.classList.remove('speaking'); void a.offsetWidth; a.classList.add('speaking'); }
    });
    const html = rich(step.text, tk);
    const txt = plain(step.text, tk);
    if (!this.practice) (step.text.en || '').replace(/\[\[([^\]]+)\]\]/g, (m, term) => { store.learnTerm(term.toLowerCase()); return m; });
    this.backlog.push({ who, html });
    const lineId = `${this.partId}:${(step.text.en || '').slice(0, 48)}`;
    const seen = store.state.collections.seenLines.includes(lineId);
    this.seenNow = seen;
    this.nextInd.style.visibility = 'hidden';
    if (this.skip && seen) this.lineEl.innerHTML = html;
    else await this.type(this.lineEl, html);
    this.nextInd.style.visibility = 'visible';
    this.rewBtn.hidden = !this.rewindCtx;
    store.markSeen(lineId);
    await this.waitAdvance(txt.length, seen);
  }

  type(el, html) {
    el.innerHTML = html;
    const speed = reduced() ? 0 : (SPEED[store.state.settings.textSpeed] ?? 24);
    if (!speed) return Promise.resolve();
    const nodes = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) { nodes.push([n, Array.from(n.textContent)]); n.textContent = ''; }
    return new Promise(res => {
      let i = 0, j = 0;
      this.typing = true;
      const finish = () => {
        clearInterval(timer);
        nodes.forEach(([nd, chars]) => { nd.textContent = chars.join(''); });
        this.typing = false; this.finishTyping = null; res();
      };
      this.finishTyping = finish;
      const timer = setInterval(() => {
        if (!el.isConnected) return finish();
        if (i >= nodes.length) return finish();
        const [nd, chars] = nodes[i];
        j++;
        nd.textContent = chars.slice(0, j).join('');
        if (j >= chars.length) { i++; j = 0; }
      }, speed);
    });
  }

  waitAdvance(len = 40, seen = false) {
    return new Promise(res => {
      this.advance = () => { this.advance = null; clearTimeout(this.autoT); res(); };
      if (this.skip && seen) this.autoT = setTimeout(() => this.advance?.(), 90);
      else if (this.auto) this.autoT = setTimeout(() => this.advance?.(), 1300 + len * 35);
    });
  }

  /* ---------- Choices ---------- */
  /* Snapshot taken when a decision appears, so "Rethink" can return to it once. */
  beginChoice(step) {
    this.preChoice = {
      step, queue: [...this.queue], backlog: this.backlog.length,
      run: JSON.parse(JSON.stringify(store.state.run)),
      chatCount: this.phone ? $('.chat-screen', this.phone).children.length : null,
    };
    this.choosing = true;
    this.el.dataset.choice = step.id;
    this.hintKind = step.hintKind || 'social';
    this.setHintGlow(true);
  }
  setHintGlow(on) {
    const b = $('[data-hint]', this.el), n = $('.hint-nudge', this.el);
    b.classList.toggle('hint-glow', on);
    clearTimeout(this.nudgeT);
    n.hidden = !on;
    if (on) this.nudgeT = setTimeout(() => { n.hidden = true; }, 4200);
  }
  doRewind() {
    const c = this.rewindCtx;
    if (!c) return false;
    this.rewindCtx = null;
    this.rewound.add(c.step.id);
    store.state.run = JSON.parse(JSON.stringify(c.run));
    if (!this.practice) store.save();
    this.backlog.length = c.backlog;
    if (this.phone) {
      if (c.chatCount == null) this.closeChat();
      else { const scr = $('.chat-screen', this.phone); while (scr.children.length > c.chatCount) scr.lastElementChild.remove(); }
    }
    this.queue = [c.step, ...c.queue];
    this.rewBtn.hidden = true;
    updateMeters(this.el);
    toast(`${ICON.rewind}<span>${t('rethinkToast')}</span>`);
    return true;
  }

  dialogueChoice(step) {
    const tk = tokens();
    this.beginChoice(step);
    this.plateEl.hidden = true;
    this.lineEl.hidden = true;
    this.nextInd.style.visibility = 'hidden';
    Object.values(this.actors).forEach(a => a.classList.remove('dim'));
    const c = this.choicesEl;
    c.hidden = false;
    c.innerHTML = `${step.prompt ? `<p class="prompt">${rich(step.prompt, tk)}</p>` : ''}
      <div class="choice-list" role="group">${step.options.map((o, i) => `<button class="choice" aria-pressed="false" data-i="${i}">${rich(o.text, tk)}</button>`).join('')}</div>
      <div class="choice-actions"><button class="btn btn-ghost btn-small" data-chint>${ICON.bulb} ${t('pixelHintBtn')}</button><span class="spacer"></span><button class="btn btn-gold btn-small" data-confirm disabled>${t('confirm')}</button></div>`;
    $('[data-chint]', c).addEventListener('click', () => this.showHint());
    return this.pickFrom(c).then(idx => { c.hidden = true; c.innerHTML = ''; this.commit(step, idx); });
  }

  pickFrom(container) {
    return new Promise(res => {
      const btns = $$('.choice', container);
      const confirm = $('[data-confirm]', container);
      let sel = -1;
      btns.forEach((b, i) => {
        b.addEventListener('click', () => {
          sel = i;
          btns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          confirm.disabled = false;
        });
        b.addEventListener('keydown', e => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const n = btns[(i + (e.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length];
            n.focus();
          }
        });
      });
      confirm.addEventListener('click', () => { if (sel >= 0) res(sel); });
      setTimeout(() => btns[0]?.focus({ preventScroll: true }), 50);
    });
  }

  commit(step, idx) {
    const option = step.options[idx];
    this.choosing = false;
    this.setHintGlow(false);
    this.rewindCtx = this.preChoice && !this.rewound.has(step.id) ? this.preChoice : null;
    this.preChoice = null;
    const deltas = store.applyEffects(option.fx, this.practice);
    store.recordChoice(option.quality, option.style, this.practice);
    if (!this.practice) store.save();
    updateMeters(this.el);
    deltaToasts(deltas);
    deltas.filter(d => d.k === 'bond' && d.d !== 0).forEach(d => this.emote(d.who, d.d > 0 ? 'heart' : 'crack'));
    this.last = { step, option, idx, deltas };
    const follow = [...(option.reply || [])];
    if (step.debrief) follow.push({ t: 'debrief', id: step.debrief, from: this.last });
    this.queue.unshift(...follow);
  }

  /* ---------- Team Chat ---------- */
  openChat() {
    if (this.phone) { this.phoneVisible(true); return this.phone; }
    const layer = document.getElementById('sheet-layer');
    const el = h(`<div class="sheet phone-sheet" role="dialog" aria-label="${t('groupName')}">
      <div class="phone-top"><span class="grp-ava">S</span><div><div class="grp-name">${t('groupName')}</div><div class="grp-sub">${t('members')}</div></div><span class="spacer"></span></div>
      <div class="chat-pick" hidden></div>
      <div class="chat-screen" aria-live="polite"></div>
      <div class="chat-compose" hidden></div>
    </div>`);
    layer.append(el);
    this.phone = el;
    this.el.classList.add('phone-open');
    // slide in on the next frame, unless the phone was hidden or closed meanwhile
    const tok = this.phoneTok = (this.phoneTok || 0) + 1;
    frame(() => { if (this.phone === el && this.phoneTok === tok) this.phoneVisible(true); });
    return el;
  }
  phoneVisible(on) {
    if (!this.phone) return;
    this.phoneTok = (this.phoneTok || 0) + 1;
    this.phone.classList.toggle('open', on);
    this.el.classList.toggle('phone-open', on);
  }

  async chat(step) {
    const ph = this.openChat();
    const scr = $('.chat-screen', ph);
    if (step.dm && this.dmShown !== step.dm) scr.insertAdjacentHTML('beforeend', `<div class="sys-msg">${esc(tx({ en: 'Private chat with', ar: 'محادثة خاصة مع' }))} ${esc(nameOf(step.dm))}</div>`);
    await sleep(reduced() ? 50 : 350);
    for (const m of step.msgs) {
      if (m.if && !evalCond(m.if)) continue;
      if (!m.sys) {
        const typing = h(`<div class="msg"><span class="m-ava">${portraitOf(m.who, 'neutral')}</span><div class="bubble typing" aria-label="${t('typing')}"><span></span><span></span><span></span></div></div>`);
        scr.append(typing); scr.scrollTop = scr.scrollHeight;
        await sleep(reduced() ? 120 : 700 + Math.min(1200, plain(m.text).length * 18));
        typing.remove();
      }
      if (!this.el.isConnected) return;
      scr.insertAdjacentHTML('beforeend', messageHTML(m, false));
      scr.scrollTop = scr.scrollHeight;
      if (!this.practice) store.logChat(m.id);
      await sleep(reduced() ? 60 : 240);
    }
    const comp = $('.chat-compose', ph);
    comp.hidden = false;
    comp.innerHTML = `<div class="compose-row">${this.rewindCtx ? `<button class="btn btn-ghost btn-small" data-rw>${ICON.rewind} ${t('rethink')}</button>` : ''}<span class="spacer"></span><button class="btn btn-small" data-cont>${t('continue')} ›</button></div>`;
    const b = $('[data-cont]', comp), rw = $('[data-rw]', comp);
    b.focus({ preventScroll: true });
    const res = await new Promise(r => {
      b.addEventListener('click', () => r('cont'), { once: true });
      rw?.addEventListener('click', () => r('rewind'), { once: true });
    });
    comp.hidden = true; comp.innerHTML = '';
    if (res === 'rewind') this.doRewind();
    if (!this.practice) store.save();
  }

  /* Reply options sit at the top of the phone; the chosen one becomes a real message. */
  async chatChoice(step) {
    const tk = tokens();
    const ph = this.openChat();
    this.beginChoice(step);
    const pick = $('.chat-pick', ph);
    pick.hidden = false;
    pick.innerHTML = `<p class="prompt">${t('chooseReply')}</p>
      <div class="choice-list" role="group">${step.options.map((o, i) => `<button class="choice" aria-pressed="false" data-i="${i}">${rich(o.text, tk)}</button>`).join('')}</div>
      <div class="choice-actions"><button class="btn btn-ghost btn-small" data-chint>${ICON.bulb} ${t('pixelHintBtn')}</button><span class="spacer"></span><button class="btn btn-gold btn-small" data-confirm disabled>${t('send')} ➤</button></div>`;
    $('[data-chint]', pick).addEventListener('click', () => this.showHint());
    const idx = await this.pickFrom(pick);
    pick.hidden = true; pick.innerHTML = '';
    const scr = $('.chat-screen', ph);
    const opt = step.options[idx];
    const dm = opt.reply?.[0]?.t === 'chat' && opt.reply[0].dm;
    this.dmShown = dm || null;
    if (dm) scr.insertAdjacentHTML('beforeend', `<div class="sys-msg">${esc(tx({ en: 'Private chat with', ar: 'محادثة خاصة مع' }))} ${esc(nameOf(dm))}</div>`);
    if (!isAction(opt.text)) scr.insertAdjacentHTML('beforeend', messageHTML({ who: 'you', text: opt.text }, true));
    scr.scrollTop = scr.scrollHeight;
    if (!this.practice && !isAction(opt.text)) store.logChat(`${step.id}#${idx}`);
    this.commit(step, idx);
    await sleep(reduced() ? 50 : 500);
  }

  async closeChat() {
    if (!this.phone) return;
    const el = this.phone;
    this.phone = null;
    this.phoneTok = (this.phoneTok || 0) + 1;
    el.classList.remove('open');
    this.el.classList.remove('phone-open');
    await sleep(reduced() ? 20 : 300);
    el.remove();
  }

  /* ---------- Laptop tools ---------- */
  laptop(title, bodyHTML) {
    const lap = h(`<div class="laptop" role="dialog" aria-label="${esc(title)}">
      <div class="tool-head"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><h2>${esc(title)}</h2><span class="chip chip-sim">${t('simulated')}</span><span class="spacer"></span>
      <button class="btn btn-ghost btn-small" data-thint>${ICON.bulb} ${t('hint')}</button></div>
      ${bodyHTML}
    </div>`);
    this.el.append(lap);
    this.dlg.style.visibility = 'hidden';
    return lap;
  }
  async closeLaptop(lap) {
    lap.style.transition = 'opacity var(--dur-fade), transform var(--dur-fade)';
    lap.style.opacity = '0'; lap.style.transform = 'scale(0.96)';
    await sleep(reduced() ? 20 : 300);
    lap.remove();
    this.dlg.style.visibility = '';
  }

  terminal(step) {
    const tk = tokens();
    const sub = s => s.replaceAll('{file}', tk.file).replaceAll('{feature}', tk.feature).replaceAll('{name}', tk.name);
    const lap = this.laptop(t('terminal'), `<div class="tool-task">${rich(step.task, tk)}</div>
      <div class="tool-body"><div class="terminal" role="log" aria-live="polite">
        <div class="t-out"></div>
        <label class="t-prompt"><span class="t-ps">${esc(step.ps || 'studyspot (main) $')}</span><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${t('cmdInput')}"></label>
      </div></div>`);
    const out = $('.t-out', lap), input = $('input', lap), term = $('.terminal', lap);
    const print = (text, cls = '') => { out.insertAdjacentHTML('beforeend', `<div class="t-line ${cls}">${esc(text)}</div>`); term.parentElement.scrollTop = term.parentElement.scrollHeight; };
    print(tx(UI_TYPE_HINT), 't-hint');
    this.hintKind = 'tech';
    let si = 0;
    const history = []; let hi = 0;
    return new Promise(res => {
      $('[data-thint]', lap).addEventListener('click', () => { if (si < step.steps.length) print(tx({ en: 'Next command: ', ar: 'الأمر التالي: ' }) + sub(step.steps[si].hint), 't-hint'); input.focus(); });
      input.addEventListener('keydown', async e => {
        if (e.key === 'ArrowUp') { if (history.length) { hi = Math.max(0, hi - 1); input.value = history[hi]; } e.preventDefault(); return; }
        if (e.key === 'ArrowDown') { hi = Math.min(history.length, hi + 1); input.value = history[hi] || ''; e.preventDefault(); return; }
        if (e.key !== 'Enter') return;
        const raw = input.value.trim().replace(/\s+/g, ' ');
        if (!raw) return;
        history.push(raw); hi = history.length;
        input.value = '';
        print(`$ ${raw}`, 't-cmd');
        const s = step.steps[si];
        let ok = false, msg = '';
        if (s.accept) ok = s.accept.map(a => sub(a).toLowerCase()).includes(raw.toLowerCase());
        if (!ok && s.acceptRe) { const m = raw.match(new RegExp(s.acceptRe)); if (m) { ok = true; msg = m[2]; } }
        if (!ok) { print(tx(UI_UNKNOWN).replace('{s}', sub(s.hint)), 't-err'); return; }
        for (const line of s.out) {
          const isErr = line.startsWith('!');
          print(sub(isErr ? line.slice(1) : line).replace('{msg}', msg), isErr ? 't-err' : '');
          await sleep(reduced() ? 0 : 110);
        }
        if (s.term && !this.practice) store.learnTerm(s.term);
        if (s.ps) $('.t-ps', lap).textContent = sub(s.ps);
        si++;
        if (si >= step.steps.length) {
          input.disabled = true;
          print('✓ ' + tx({ en: 'Done!', ar: 'تم!' }), 't-ok');
          const b = h(`<button class="btn btn-gold btn-small" style="margin-top:10px">${t('continueStory')} ›</button>`);
          term.append(b); b.focus();
          b.addEventListener('click', async () => { await this.closeLaptop(lap); res(); }, { once: true });
        }
      });
      setTimeout(() => input.focus({ preventScroll: true }), 120);
    });
  }

  merge(step) {
    const tk = tokens();
    const track = store.state.run.track;
    const blocks = MERGE6[track];
    if (!this.practice) store.learnTerm('merge conflict');
    const blockHTML = blocks.map((b, i) => `<div class="merge-block" data-b="${i}">
        <strong>${t('conflictN', { n: i + 1 })}</strong>
        <div class="merge-cols">
          <div class="code-card mine"><div class="cc-head">${t('mine')}</div><pre>${esc(b.mine)}</pre></div>
          <div class="code-card theirs"><div class="cc-head">${t('theirs')}</div><pre>${esc(b.theirs)}</pre></div>
        </div>
        <div class="merge-actions" role="group" aria-label="${t('conflictN', { n: i + 1 })}">
          <button class="opt" data-c="mine" aria-pressed="false">${t('keepMine')}</button>
          <button class="opt" data-c="theirs" aria-pressed="false">${t('keepTheirs')}</button>
          <button class="opt" data-c="combine" aria-pressed="false">${t('combine')}</button>
        </div>
        <div class="combined-preview"></div>
      </div>`).join('');
    const lap = this.laptop(t('mergeTitle'), `<div class="tool-task">${t('mergeTask')}</div>
      <div class="tool-body"><div class="merge">
        <div class="merge-file">⚠ CONFLICT · <bdi>${esc(tk.file)}</bdi></div>
        ${blockHTML}
        <div><button class="btn btn-gold" data-check disabled>${t('checkResult')}</button></div>
        <div class="merge-out"></div>
      </div></div>`);
    const picks = new Array(blocks.length).fill(null);
    const checkBtn = $('[data-check]', lap);
    $$('.merge-block', lap).forEach((bEl, i) => {
      $$('.opt', bEl).forEach(btn => btn.addEventListener('click', () => {
        if (checkBtn.dataset.locked) return;
        picks[i] = btn.dataset.c;
        $$('.opt', bEl).forEach(x => x.setAttribute('aria-pressed', String(x === btn)));
        const prev = $('.combined-preview', bEl);
        const code = picks[i] === 'mine' ? blocks[i].mine : picks[i] === 'theirs' ? blocks[i].theirs : blocks[i].combined;
        prev.innerHTML = `<div class="code-card combined"><div class="cc-head">${t('resultTitle')}</div><pre>${esc(code)}</pre></div>`;
        checkBtn.disabled = picks.some(p => !p);
      }));
    });
    $('[data-thint]', lap).addEventListener('click', () => this.showHint());
    this.choosing = true; this.hintKind = 'tech';
    $('[data-thint]', lap).classList.add('hint-glow');
    return new Promise(res => {
      checkBtn.addEventListener('click', () => {
        this.choosing = false;
        $('[data-thint]', lap).classList.remove('hint-glow');
        if (checkBtn.dataset.locked) return;
        checkBtn.dataset.locked = '1';
        checkBtn.disabled = true;
        let good = 0;
        const verdicts = blocks.map((b, i) => {
          const ok = picks[i] === b.best; if (ok) good++;
          return `<div class="verdict"><span class="v-ico">${ok ? ICON.check : ICON.cross}</span><span><strong>${t('conflictN', { n: i + 1 })}:</strong> ${rich(b.explain[picks[i]], tk)}</span></div>`;
        }).join('');
        const outcome = MERGE_OUTCOMES[good];
        const deltas = store.applyEffects(outcome.fx, this.practice);
        store.recordChoice(outcome.quality, outcome.style, this.practice);
        if (!this.practice) store.save();
        updateMeters(this.el);
        deltaToasts(deltas);
        this.lastMerge = { outcome, deltas };
        const outEl = $('.merge-out', lap);
        outEl.innerHTML = `<div class="merge-result merge-explain"><strong>${t('resultTitle')}</strong>${verdicts}
          <div style="margin-top:12px"><button class="btn btn-small" data-done>${t('continueStory')} ›</button></div></div>`;
        if (good === 2) sparkleBurst(outEl, 12);
        const done = $('[data-done]', outEl);
        done.focus();
        outEl.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' });
        done.addEventListener('click', async () => { await this.closeLaptop(lap); res(); }, { once: true });
      });
    });
  }

  /* ---------- Debrief ---------- */
  async debrief(id, from) {
    const d = DEBRIEFS[id];
    if (!d) return;
    await this.closeChat();
    const tk = tokens();
    const useM = d.useMerge && this.lastMerge;
    const happened = useM ? this.lastMerge.outcome.happened : from?.option?.happened;
    const quality = useM ? this.lastMerge.outcome.quality : from?.option?.quality ?? 2;
    const deltas = (useM ? this.lastMerge.deltas : from?.deltas) || [];
    const shown = deltas.filter(x => x.k !== 'bond' && x.d !== 0);
    const others = !useM && from ? from.step.options.map((o, i) => ({ o, i })).filter(x => x.i !== from.idx) : [];
    const el = h(`<section class="screen scroll debrief-screen" style="z-index:20" aria-label="${t('debriefTitle')}">
      <article class="notebook frame no-crest">
        <h1 tabindex="-1">${t('debriefTitle')}</h1>
        <p class="nb-sub">${this.practice ? `<span class="chip practice-chip">${t('practice')}</span>` : ''}${t('week', { n: this.meta.week })} · ${esc(tx(this.meta.title))}</p>
        ${happened ? `<section class="nb-sec"><h2>${ICON.what}${t('whatHappened')}</h2><p>${rich(happened, tk)}</p></section>` : ''}
        <section class="nb-sec"><h2>${ICON.side}${t('theirSide', { who: nameOf(d.who) })}</h2>
          <div class="pov"><span class="pov-ava">${portraitOf(d.who, d.face)}</span><blockquote>${rich(d.side, tk)}</blockquote></div></section>
        <section class="nb-sec"><h2>${ICON.bulb}${t('lesson')}</h2><p>${rich(d.lesson, tk)}</p></section>
        ${quality < 2 ? `<section class="nb-sec"><h2>${ICON.better}${t('better')}</h2><p>${rich(d.better, tk)}</p></section>` : ''}
        <section class="nb-sec"><h2>${ICON.tip}${t('tip')}</h2><p>${rich(d.tip, tk)}</p></section>
        <section class="nb-sec"><h2>${ICON.save}${t('changes')}</h2>
          <div class="deltas">${shown.length ? shown.map(x => `<span class="delta ${x.d > 0 ? 'up' : 'down'}">${ICON[x.k]} ${x.d > 0 ? '▲ +' : '▼ '}${x.d} ${t(x.k)}</span>`).join('') : `<span>${this.practice ? t('practiceNote') : t('noChange')}</span>`}</div></section>
        ${others.length ? `<section class="nb-sec whatif" hidden><h2>${ICON.what}${esc(tx({ en: 'What if you had chosen…', ar: { m: 'ماذا لو اخترتَ…', f: 'ماذا لو اخترتِ…' } }))}</h2>
          ${others.map(({ o }) => `<div class="merge-result" style="background:var(--warm-cream);margin-top:6px"><p><strong>“${rich(o.text, tk)}”</strong></p><p>${rich(o.happened, tk)}</p></div>`).join('')}</section>` : ''}
        <div class="nb-actions">
          ${others.length ? `<button class="btn btn-ghost" data-whatif>${t('tryAgain')}</button>` : ''}
          <button class="btn btn-gold" data-cont>${t('continue')} ›</button>
        </div>
      </article></section>`);
    await wipeCover();
    document.getElementById('app').append(el);
    await wipeLeave();
    $('h1', el).focus({ preventScroll: true });
    const wi = $('[data-whatif]', el);
    if (wi) wi.addEventListener('click', () => { const s = $('.whatif', el); s.hidden = !s.hidden; if (!s.hidden) s.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' }); });
    await new Promise(res => $('[data-cont]', el).addEventListener('click', res, { once: true }));
    await wipeCover();
    el.remove();
    await wipeLeave();
  }

  /* ---------- Overlays ---------- */
  showLog() {
    const items = this.backlog.map(b => `<p style="margin:0 0 10px">${b.who ? `<strong>${esc(nameOf(b.who))}:</strong> ` : ''}${b.html}</p>`).join('') || `<p>—</p>`;
    sheet(`<div>${items}</div>`, { title: t('logTitle') });
  }
  showHint() {
    const qs = this.choosing ? HINT_QS[this.hintKind] || HINT_QS.social : null;
    sheet(`<div class="hint-card"><span class="tc-ava">${pixelSVG('happy')}</span>
      <div><p class="hint-main">${rich(this.hint || DEFAULT_HINT, tokens())}</p>
      ${qs ? `<p class="hint-sub">${t('askYourself')}</p><ul class="hint-qs">${qs.map(q => `<li>${esc(tx(q))}</li>`).join('')}</ul>` : ''}</div></div>`, { title: t('pixelSays') });
  }
  showMenu() {
    const s = sheet(`<div style="display:grid;gap:10px">
      <button class="btn btn-ghost" data-m="log">${ICON.log} ${t('log')}</button>
      <button class="btn btn-ghost" data-m="settings">${ICON.gear} ${t('settings')}</button>
      <button class="btn" data-m="room">${ICON.home} ${t('toRoom')}</button></div>`, { title: t('menu') });
    s.el.addEventListener('click', e => {
      const b = e.target.closest('[data-m]'); if (!b) return;
      const m = b.dataset.m;
      s.close();
      if (m === 'log') setTimeout(() => this.showLog(), 300);
      if (m === 'settings') setTimeout(() => this.openSettings?.(), 300);
      if (m === 'room') this.exit();
    });
  }

  async exit() {
    await this.closeChat();
    document.removeEventListener('keydown', this.keyHandler);
    this.el.remove();
    this.onDone?.({ exited: true });
  }

  /* ---------- Part done ---------- */
  async finish() {
    await this.closeChat();
    document.removeEventListener('keydown', this.keyHandler);
    if (this.practice) { this.onDone?.({ practice: true }); return; }
    const res = store.completePart(this.partId, this.meta.sticker);
    const stars = store.starsFor(this.partId);
    const net = res.net;
    const el = h(`<section class="screen scroll done-screen">
      <div class="done-card frame">
        <h1 tabindex="-1">${t('weekDone')}</h1>
        <p><strong>${t('week', { n: this.meta.week })} · ${esc(tx(this.meta.title))}</strong></p>
        <div class="stars" role="img" aria-label="${t('stars', { n: stars })}">${[0, 1, 2].map(i => `<span class="star" style="animation-delay:${200 + i * 260}ms">${ICON.star(i < stars)}</span>`).join('')}</div>
        <div class="sticker-wrap" aria-hidden="true">${stickerSVG(this.meta.sticker)}</div>
        <p>${res.newSticker ? `${t('newSticker')}: ` : ''}<strong>${esc(tx(STICKERS[this.meta.sticker]))}</strong></p>
        <div class="deltas" aria-label="${t('netChange')}"><strong>${t('netChange')}:</strong>
          <span class="delta ${net.health >= 0 ? 'up' : 'down'}">${ICON.health} ${net.health >= 0 ? '+' : ''}${net.health} ${t('health')}</span>
          <span class="delta ${net.trust >= 0 ? 'up' : 'down'}">${ICON.trust} ${net.trust >= 0 ? '+' : ''}${net.trust} ${t('trust')}</span></div>
        <button class="btn btn-gold" data-room>${ICON.home} ${t('toRoom')}</button>
      </div></section>`);
    await show(el, { type: 'wipe' });
    $('h1', el).focus({ preventScroll: true });
    setTimeout(() => sparkleBurst($('.stars', el), 14), reduced() ? 0 : 900);
    $('[data-room]', el).addEventListener('click', () => this.onDone?.({ completed: this.partId }));
  }
}

const UI_TYPE_HINT = { en: 'Type the command and press Enter, or press Hint.', ar: { m: 'اكتب الأمر واضغط Enter، أو اضغط «تلميح».', f: 'اكتبي الأمر واضغطي Enter، أو اضغطي «تلميح».' } };
const UI_UNKNOWN = { en: 'That command isn’t part of this lesson. Try: {s}', ar: { m: 'هذا الأمر ليس جزءًا من هذا الدرس. جرّب: {s}', f: 'هذا الأمر ليس جزءًا من هذا الدرس. جرّبي: {s}' } };

const HINT_QS = {
  social: [
    { en: 'Who will read or feel this, and how?', ar: 'مَن سيقرأ هذا أو يتأثّر به، وكيف سيشعر؟' },
    { en: 'Does it fix the cause, or only today’s problem?', ar: 'هل يعالج السبب، أم مشكلة اليوم فقط؟' },
    { en: 'Would you be glad to receive it yourself?', ar: { m: 'هل كنتَ ستسعد لو وصلك أنت؟', f: 'هل كنتِ ستسعدين لو وصلكِ أنتِ؟' } },
  ],
  tech: [
    { en: 'What does each version add?', ar: 'ماذا تضيف كل نسخة؟' },
    { en: 'Will the team understand this a month from now?', ar: 'هل سيفهم الفريق هذا بعد شهر؟' },
    { en: 'Is it safe for your teammates’ work?', ar: 'هل هو آمن على عمل زملائك؟' },
  ],
};
