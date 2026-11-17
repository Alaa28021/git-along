// Git Along — single central store (SRS FR-070..FR-077, section 8.1).
const KEY = 'gitAlong.v2';
const SCHEMA = 2;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function defaults() {
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ar = (navigator.language || '').toLowerCase().startsWith('ar');
  return {
    schemaVersion: SCHEMA,
    langChosen: false,
    settings: { lang: ar ? 'ar' : 'en', textSpeed: 'normal', textSize: '100', reduceMotion: reduce },
    avatar: null,
    run: null,
    collections: { stickers: [], endings: [], titles: [], seenLines: [] },
  };
}

function newRunObject(track) {
  return {
    track,
    part: 'P',
    sceneId: null,
    checkpoint: null,
    completedParts: [],
    health: 50,
    trust: 50,
    bond: { mira: 0, sara: 0, omar: 0 },
    flags: {},
    quality: {},
    styleCounts: { empathy: 0, structure: 0, direct: 0, solo: 0, avoid: 0 },
    chatLog: [],
    glossary: [],
    partStart: null,
  };
}

function valid(s) {
  if (!s || typeof s !== 'object' || s.schemaVersion !== SCHEMA) return false;
  if (!s.settings || typeof s.settings.lang !== 'string') return false;
  if (!s.collections || !Array.isArray(s.collections.stickers)) return false;
  if (s.avatar && (typeof s.avatar.name !== 'string' || s.avatar.name.length > 20)) return false;
  if (s.run) {
    const r = s.run;
    if (!['web', 'mobile', 'ai'].includes(r.track)) return false;
    if (typeof r.health !== 'number' || typeof r.trust !== 'number') return false;
    if (!r.bond || !r.flags || !Array.isArray(r.completedParts)) return false;
  }
  return true;
}

export const store = {
  state: defaults(),
  storageOk: true,
  listeners: new Set(),

  load() {
    let raw;
    try { raw = localStorage.getItem(KEY); } catch (e) { this.storageOk = false; return 'nostorage'; }
    if (!raw) return 'none';
    try {
      const parsed = JSON.parse(raw);
      if (!valid(parsed)) return 'corrupt';
      this.state = Object.assign(defaults(), parsed);
      return 'ok';
    } catch (e) { return 'corrupt'; }
  },

  save() {
    if (!this.storageOk) return false;
    try { localStorage.setItem(KEY, JSON.stringify(this.state)); return true; }
    catch (e) { this.storageOk = false; this.emit('storage'); return false; }
  },

  resetAll() {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    this.state = defaults();
  },

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  emit(type) { this.listeners.forEach(fn => fn(type)); },

  setSetting(k, v) { this.state.settings[k] = v; this.save(); this.emit('settings'); },

  setAvatar(a) { this.state.avatar = a; this.save(); },

  newRun(track) { this.state.run = newRunObject(track); this.save(); },

  get run() { return this.state.run; },

  startPart(part) {
    const r = this.state.run;
    r.part = part;
    r.partStart = { health: r.health, trust: r.trust };
    r.quality[part] = { earned: 0, max: 0 };
    this.save();
  },

  checkpoint(sceneId) {
    const r = this.state.run;
    r.sceneId = sceneId;
    r.checkpoint = JSON.parse(JSON.stringify({ health: r.health, trust: r.trust, bond: r.bond, flags: r.flags, quality: r.quality, styleCounts: r.styleCounts, chatLog: r.chatLog, glossary: r.glossary }));
    this.save();
  },

  restoreCheckpoint() {
    const r = this.state.run;
    if (r && r.checkpoint) Object.assign(r, JSON.parse(JSON.stringify(r.checkpoint)));
  },

  /** Apply effects; returns list of deltas actually applied. Practice mode applies nothing. */
  applyEffects(fx = {}, practice = false) {
    const out = [];
    if (!fx || practice) return out;
    const r = this.state.run;
    if (typeof fx.health === 'number') { const b = r.health; r.health = clamp(r.health + fx.health, 0, 100); out.push({ k: 'health', d: r.health - b }); }
    if (typeof fx.trust === 'number') { const b = r.trust; r.trust = clamp(r.trust + fx.trust, 0, 100); out.push({ k: 'trust', d: r.trust - b }); }
    if (fx.bond) for (const [who, d] of Object.entries(fx.bond)) { const b = r.bond[who] ?? 0; r.bond[who] = clamp(b + d, -3, 5); out.push({ k: 'bond', who, d: r.bond[who] - b }); }
    if (fx.flags) Object.assign(r.flags, fx.flags);
    if (fx.term) this.learnTerm(fx.term);
    return out;
  },

  recordChoice(quality, style, practice = false) {
    if (practice) return;
    const r = this.state.run;
    const q = r.quality[r.part] || (r.quality[r.part] = { earned: 0, max: 0 });
    q.earned += quality; q.max += 2;
    if (style && style in r.styleCounts) r.styleCounts[style]++;
  },

  learnTerm(term) {
    const r = this.state.run;
    if (r && !r.glossary.includes(term)) { r.glossary.push(term); return true; }
    return false;
  },

  logChat(msgId) {
    const r = this.state.run;
    if (r && !r.chatLog.includes(msgId)) r.chatLog.push(msgId);
  },

  markSeen(lineId) {
    const s = this.state.collections.seenLines;
    if (!s.includes(lineId)) s.push(lineId);
  },

  starsFor(part) {
    const q = this.state.run.quality[part];
    if (!q || q.max === 0) return 3;
    const score = q.earned / q.max;
    return 1 + (score >= 0.5 ? 1 : 0) + (score >= 0.85 ? 1 : 0);
  },

  /** Finish a part: returns {stars, sticker, newSticker, net} */
  completePart(part, stickerId) {
    const r = this.state.run;
    const stars = this.starsFor(part);
    const existing = r.completedParts.find(p => p.part === part);
    if (existing) existing.stars = Math.max(existing.stars, stars); else r.completedParts.push({ part, stars });
    const col = this.state.collections.stickers;
    let newSticker = false;
    if (stickerId && !col.some(s => s.id === stickerId)) { col.push({ id: stickerId, earnedAt: new Date().toISOString() }); newSticker = true; }
    const net = r.partStart ? { health: r.health - r.partStart.health, trust: r.trust - r.partStart.trust } : { health: 0, trust: 0 };
    r.sceneId = null; r.checkpoint = null;
    this.save();
    return { stars, newSticker, net };
  },

  isDone(part) { return !!this.state.run?.completedParts.some(p => p.part === part); },
  starsOf(part) { return this.state.run?.completedParts.find(p => p.part === part)?.stars || 0; },
};

export function evalCond(cond) {
  if (!cond) return true;
  const r = store.state.run;
  if (Array.isArray(cond)) return cond.every(evalCond);
  if ('flag' in cond) return !!r.flags[cond.flag] === (cond.is ?? true);
  if ('bond' in cond) {
    const v = r.bond[cond.bond] ?? 0;
    if ('gte' in cond) return v >= cond.gte;
    if ('lt' in cond) return v < cond.lt;
  }
  if ('track' in cond) return r.track === cond.track;
  if ('stat' in cond) {
    const v = r[cond.stat];
    if ('gte' in cond) return v >= cond.gte;
    if ('lt' in cond) return v < cond.lt;
  }
  return true;
}
