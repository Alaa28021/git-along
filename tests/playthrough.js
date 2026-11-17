// Git Along — automated playthrough scenarios.
// Drives the real UI with DOM clicks and checks story flow, language, layout and state.
// Run in the browser console on the game page:
//   const T = await import('/tests/playthrough.js'); await T.run({ lang: 'ar', address: 'f', track: 'web', policy: 'best' });
// Or open /?test=ar-best (see bottom of file) and read window.__gitAlongTest.

import { store } from '../js/store.js';
import { PARTS, MERGE6, STORY } from '../js/content.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const visible = el => !!el && !el.hidden && el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).opacity !== '0';

// Latin words allowed in Arabic mode (names of tools, products and code).
const ALLOWED = new Set(['StudySpot', 'Git', 'GitHub', 'Café', 'Commit', 'PR', 'LGTM', 'API', 'REST', 'JSON', 'React', 'Flutter', 'Dart', 'Python', 'Docker', 'Web', 'Mobile', 'AI', 'iOS', 'Android', 'Firebase', 'UI', 'Enter', 'Booking', 'Book', 'Missing', 'fields', 'current', 'incoming', 'config', 'rejected', 'pandas', 'scikit', 'learn', 'Releases', 'Teamwork', 'Terminal', 'pipeline', 'visualisation', 'deployment', 'release', 'notebooks', 'scripts', 'seeds', 'requirements', 'frontend', 'backend', 'Frontend', 'Backend', 'merge', 'forced', 'update', 'feature', 'fix', 'stuff', 'booking', 'form', 'login', 'crash', 'add', 'validation', 'env', 'example', 'commits', 'push', 'commit', 'random_state', 'Git', 'Along', 'Week',
  // terms the design keeps in English inside Arabic sentences
  'Caf', 'clone', 'branch', 'main', 'gitignore', 'force', 'pull', 'request', 'Repo', 'Add', 'booking-form', 'login-crash', 'env.example', 'code', 'review', 'merge', 'conflict']);

function latinLeaks(root) {
  if (!root) return [];
  const c = root.cloneNode(true);
  c.querySelectorAll('bdi, code, pre, .terminal, .term, .code-card, .merge-file, svg, [lang="en"], .lang-card, .t-prompt, .track-tag, .chip-gold').forEach(n => n.remove());
  const words = (c.textContent.match(/[A-Za-z][A-Za-z_'.-]+/g) || []).filter(w => !ALLOWED.has(w.replace(/[.'-]+$/, '')));
  return [...new Set(words)];
}

export async function run(cfg = {}) {
  const C = { lang: 'ar', address: 'f', name: cfg.lang === 'en' ? 'Lina' : 'لينا', track: 'web', policy: 'best', rewindAt: null, stopAfter: null, maxSteps: 4000, ...cfg };
  const log = [];
  const problems = [];
  const note = (k, v) => log.push([k, v]);
  const bad = (k, v) => { problems.push([k, v]); };
  const errors = [];
  const onErr = e => errors.push(String(e.message || e.reason || e));
  window.addEventListener('error', onErr);
  window.addEventListener('unhandledrejection', onErr);

  // force the scenario language even if an old save says otherwise
  let langSwitched = false;
  if (store.state.langChosen && store.state.settings.lang !== C.lang) {
    store.state.settings.lang = C.lang;
    (await import('../js/i18n.js')).applyDocumentLanguage();
    langSwitched = true; // the screen already on display is still in the old language
  }
  // fast settings
  store.state.settings.textSpeed = 'instant';
  store.state.settings.reduceMotion = true;
  document.documentElement.classList.add('reduce-motion');
  // Measure final layouts: a hidden/background tab never advances CSS transitions.
  if (!document.getElementById('test-no-transitions')) {
    const st = document.createElement('style');
    st.id = 'test-no-transitions';
    st.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; }';
    document.head.append(st);
  }

  // Arabic mode: no stray English words. English mode: no Arabic letters.
  const leaks = root => {
    if (C.lang === 'ar') return latinLeaks(root);
    if (!root) return [];
    const c = root.cloneNode(true);
    c.querySelectorAll('[lang="ar"], .lang-card, svg').forEach(n => n.remove());
    // "Masculine (أنتَ)" deliberately shows the Arabic form being chosen
    return [...new Set(c.textContent.match(/[؀-ۿ]+/g) || [])].filter(w => !['أنتَ', 'أنتِ'].includes(w));
  };
  // Optional shortcut: start at a later week with earlier weeks marked done.
  if (C.preset) {
    store.state.avatar = { name: C.name, address: C.address, skin: 2, hair: C.address === 'f' ? 'long' : 'short', hairColor: 1, glasses: 'none', outfit: 'hoodie', outfitColor: 1, accessory: 'none' };
    store.newRun(C.track);
    C.preset.completed.forEach(p => store.state.run.completedParts.push({ part: p, stars: 3 }));
    Object.assign(store.state.run.flags, C.preset.flags || {}, { _hubHint: true });
    store.save();
  }
  const choicesSeen = [];
  let rewindDone = false, rewindChecked = false, rewindMeters = null;
  const partsDone = [];
  let steps = 0;
  const seenScreens = new Set();

  const pickIndex = (options) => {
    const qs = options.map(o => o.quality ?? 1);
    if (C.policy === 'best') return qs.indexOf(Math.max(...qs));
    if (C.policy === 'worst') return qs.indexOf(Math.min(...qs));
    if (C.policy === 'middle') { const s = [...qs].sort(); const m = s[Math.floor(s.length / 2)]; return qs.indexOf(m); }
    return Math.floor(Math.random() * options.length);
  };
  const ALL_CHOICES = {};
  const walk = arr => arr.forEach(st => {
    if (st.t === 'choice') { ALL_CHOICES[st.id] = st; st.options.forEach(o => o.reply && walk(o.reply)); }
    if (st.t === 'if') { walk(st.then || []); walk(st.else || []); }
  });
  Object.values(STORY).forEach(p => Object.values(p.scenes).forEach(sc => walk(sc.steps)));

  while (steps++ < C.maxSteps) {
    await sleep(40);
    const modal = $('.modal-scrim');
    if (modal) { $('[data-yes]', modal).click(); note('modal', 'yes'); continue; }
    const openSheet = $$('.sheet.open').find(s => !s.classList.contains('phone-sheet'));
    if (openSheet) { $('[data-close]', openSheet)?.click(); await sleep(60); continue; }

    // Language screen
    if ($('.lang-grid')) { seenScreens.add('language'); $(`[data-l="${C.lang}"]`).click(); await sleep(300); continue; }
    // Title
    if ($('.title-screen')) {
      seenScreens.add('title');
      if (partsDone.length || C._started) break;
      C._started = true;
      if (C.preset && $('[data-a="continue"]')) { $('[data-a="continue"]').click(); await sleep(300); continue; }
      if (!langSwitched) { const l = leaks($('.title-card')); if (l.length) bad('title-latin', l); }
      $('[data-a="new"]').click(); await sleep(300); continue;
    }
    // Avatar
    if ($('.avatar-form')) {
      seenScreens.add('avatar');
      const form = $('.avatar-form');
      const scroller = form.closest('.screen');
      // regression: option buttons must not submit or scroll to top
      scroller.scrollTop = 400;
      const top0 = scroller.scrollTop;
      $(`[data-k="address"][data-v="${C.address}"]`).click(); await sleep(30);
      $$('[data-k="skin"]')[2].click(); await sleep(30);
      $$('[data-k="outfit"]')[1].click(); await sleep(30);
      if (!$('.avatar-form')) bad('avatar', 'clicking an option left the avatar page');
      // the page may get shorter (fewer hair options), but it must never jump back to the top
      if (top0 > 100 && scroller.scrollTop < 60) bad('avatar', `scroll jumped to top ${top0} -> ${scroller.scrollTop}`);
      // random name must be a real name from the list, never gibberish
      $('#av-name').value = ''; $('#av-name').dispatchEvent(new Event('input'));
      $('[data-act="random"]').click(); await sleep(30);
      const rn = $('#av-name').value;
      note('randomName', rn);
      if (!rn || (C.lang === 'ar' ? !/^[؀-ۿ\s]+$/.test(rn) : !/^[A-Z][a-z]+$/.test(rn))) bad('random-name', rn);
      const addrNow = $('[data-k="address"][aria-pressed="true"]')?.dataset.v;
      if (addrNow !== C.address) $(`[data-k="address"][data-v="${C.address}"]`).click();
      const hairBtns = $$('[data-k="hair"]').map(b => b.dataset.v);
      note('hairOptions', hairBtns.join(','));
      if (C.address === 'm' && hairBtns.some(h => h.startsWith('hijab'))) bad('avatar', 'hijab offered for masculine');
      { const l = leaks($('.panel')); if (l.length) bad('avatar-latin', l); }
      $('#av-name').value = C.name; $('#av-name').dispatchEvent(new Event('input'));
      // Enter must not submit
      $('#av-name').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      $('.avatar-form').dispatchEvent(new Event('submit', { cancelable: true }));
      await sleep(30);
      if (!$('.avatar-form')) bad('avatar', 'form submit navigated away');
      $('[data-act="next"]').click(); await sleep(300); continue;
    }
    // Track
    if ($('.track-grid')) {
      seenScreens.add('track');
      { const l = leaks($('.panel')); if (l.length) bad('track-latin', l); }
      $(`[data-track="${C.track}"]`).click(); await sleep(30); $('[data-start]').click(); await sleep(300); continue;
    }
    // Chapter card
    if ($('.chapter-card-screen')) { $('[data-go]').click(); await sleep(400); continue; }
    // Debrief
    const deb = $('.debrief-screen');
    if (deb) {
      seenScreens.add('debrief');
      if ($('.phone-sheet')) bad('debrief', 'team chat still open over Pixel’s notebook');
      { const l = leaks(deb); if (l.length) bad('debrief-latin', [store.state.run.part, l]); }
      note('debrief', $('h1', deb).textContent + ' | ' + ($('.nb-sec p', deb)?.textContent || '').slice(0, 60));
      $('[data-cont]', deb).click(); await sleep(250); continue;
    }
    // Part done
    const done = $('.done-screen');
    if (done) {
      const stars = $$('.star svg path', done).filter(p => p.getAttribute('fill') === '#F3B64E').length;
      partsDone.push([store.state.run.completedParts.at(-1)?.part, stars, store.state.run.health, store.state.run.trust]);
      note('done', partsDone.at(-1));
      { const l = leaks(done); if (l.length) bad('done-latin', l); }
      if (C.stopAfter && partsDone.at(-1)[0] === C.stopAfter) break;
      $('[data-room]', done).click(); await sleep(400); continue;
    }
    // Hub
    const hub = $('.hub-screen');
    if (hub) {
      seenScreens.add('hub');
      const weekChip = $('.week-chip', hub).textContent;
      const boardText = $('.hub-stage svg').textContent;
      if (C.lang === 'ar' && /Health|Trust|Week/.test(boardText)) bad('hub-board-latin', boardText.match(/Health|Trust|Week/g));
      { const l = leaks($('.hub-top', hub)); if (l.length) bad('hub-latin', l); }
      // map order check
      const play = $('[data-play]', hub);
      if (!play) { note('hub', 'all done: ' + weekChip); break; }
      play.click(); await sleep(400); continue;
    }
    // VN
    const vn = $('.screen.vn');
    if (!vn) { await sleep(100); continue; }
    seenScreens.add('vn');
    const phone = $('.phone-sheet');
    const pick = phone && $('.chat-pick:not([hidden])', phone);
    const dlgChoices = $('.choices:not([hidden])', vn);
    const lap = $('.laptop', vn);

    if (pick) {
      await sleep(450); // let the slide-in finish before measuring
      const where = `${vn.dataset.choice} | phone="${phone.className}" vn="${vn.className}"`;
      if (getComputedStyle($('.dialogue', vn)).opacity !== '0') bad('layout', 'dialogue visible under the open phone: ' + where);
      const r = phone.getBoundingClientRect();
      if (r.bottom > innerHeight + 2 || r.top < 0) bad('layout', `phone outside viewport ${Math.round(r.top)}..${Math.round(r.bottom)}: ${where}`);
      const last = $$('.choice', pick).at(-1)?.getBoundingClientRect();
      if (last && last.bottom > innerHeight) bad('layout', 'last chat reply is cut off below the screen');
    }

    if (pick || (dlgChoices && $('.choice', dlgChoices))) {
      const box = pick || dlgChoices;
      if (!$('[data-hint]', vn).classList.contains('hint-glow')) bad('hint', 'hint bulb not glowing at a decision');
      if (pick) {
        const pr = pick.getBoundingClientRect(), sr = $('.chat-screen', phone).getBoundingClientRect();
        if (pr.top > sr.top) bad('layout', 'chat replies are not above the messages');
      }
      const step = ALL_CHOICES[vn.dataset.choice];
      if (!step) bad('choice', 'unknown choice id ' + vn.dataset.choice);
      let idx = step ? pickIndex(step.options) : 0;
      const isRewindTarget = C.rewindAt && step && step.id === C.rewindAt && !rewindDone;
      if (isRewindTarget) { idx = pickIndex.call(null, step.options.map(o => ({ quality: -(o.quality ?? 1) }))); rewindMeters = [store.state.run.health, store.state.run.trust, JSON.stringify(store.state.run.bond)]; }
      choicesSeen.push([step?.id, idx]);
      { const l = leaks(box); if (l.length) bad('choice-latin', [step?.id, l]); }
      // open the hint once at the first decision
      if (choicesSeen.length === 1) {
        $('[data-chint]', box)?.click(); await sleep(120);
        const hs = $$('.sheet.open').find(s => $('.hint-card', s));
        if (!hs || !$('.hint-qs li', hs)) bad('hint', 'hint sheet missing guiding questions');
        if (hs) { const l = leaks(hs); if (l.length) bad('hint-latin', l); }
        $('[data-close]', hs)?.click(); await sleep(120);
      }
      $$('.choice', box)[idx].click(); await sleep(30);
      $('[data-confirm]', box).click(); await sleep(150);
      if (rewindDone && !rewindChecked && step && step.id === C.rewindAt) {
        // second time at the same decision: Rethink must not be offered again
        rewindChecked = true;
        for (let k = 0; k < 60; k++) {
          await sleep(60);
          if ($$('[data-rewind]:not([hidden]), .chat-compose [data-rw]').some(visible)) { bad('rewind', 'Rethink offered twice for the same decision'); break; }
          if ($('.chat-compose [data-cont]') || $('.debrief-screen')) break;
        }
      }
      if (isRewindTarget) {
        // wait for the first reply, then press Rethink
        let rw = null;
        for (let k = 0; k < 200 && !rw; k++) {
          await sleep(60);
          rw = $$('[data-rewind]:not([hidden]), .chat-compose [data-rw]').find(visible);
          const cont = $('.chat-compose [data-cont]');
          if (!rw && $('.debrief-screen')) break;
          if (!rw && cont && !$('.chat-compose [data-rw]')) break;
        }
        if (!rw) bad('rewind', 'Rethink button never appeared after the first reply');
        else {
          rw.click(); await sleep(400);
          const now = [store.state.run.health, store.state.run.trust, JSON.stringify(store.state.run.bond)];
          if (JSON.stringify(now) !== JSON.stringify(rewindMeters)) bad('rewind', `state not restored ${rewindMeters} -> ${now}`);
          rewindDone = true; note('rewind', 'restored ' + now.join(' '));
        }
      }
      continue;
    }
    if (lap && $('.terminal', lap)) {
      const input = $('input', lap);
      if (input.disabled) { $('.terminal .btn', lap)?.click(); await sleep(250); continue; }
      $('[data-thint]', lap).click(); await sleep(60);
      const hints = $$('.t-hint', lap).map(x => x.textContent);
      const last = hints.at(-1) || '';
      const cmd = last.replace(/^.*?(git |cd )/, '$1').trim();
      { const l = leaks($('.tool-task', lap)); if (l.length) bad('terminal-latin', l); }
      input.value = cmd;
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await sleep(250);
      if ($$('.t-err', lap).length && !$$('.t-err', lap).at(-1).textContent.includes('CONFLICT') && !/both modified|Automatic merge failed|unmerged/i.test($$('.t-err', lap).at(-1).textContent)) {
        const t = $$('.t-err', lap).at(-1).textContent;
        if (!/^(CONFLICT|Automatic|\s*both)/.test(t)) bad('terminal', `rejected hinted command "${cmd}": ${t}`);
      }
      continue;
    }
    if (lap && $('.merge', lap)) {
      const done = $('[data-done]', lap);
      if (done) { done.click(); await sleep(300); continue; }
      const blocks = MERGE6[store.state.run.track];
      $$('.merge-block', lap).forEach((b, i) => {
        const want = C.policy === 'worst' ? 'mine' : C.policy === 'best' ? blocks[i].best : ['mine', 'theirs', 'combine'][Math.floor(Math.random() * 3)];
        $(`[data-c="${want}"]`, b).click();
      });
      await sleep(30);
      $('[data-check]', lap).click(); await sleep(200); continue;
    }
    const cont = phone && $('.chat-compose [data-cont]', phone);
    if (cont) { cont.click(); await sleep(120); continue; }
    // dialogue line: check language, then advance
    const line = $('.dialogue .line', vn);
    if (line && line.textContent && !line.hidden && vn.classList.contains('phone-open') && !$('.phone-sheet.open')) bad('layout', 'dialogue hidden although the phone is closed: ' + line.textContent.slice(0, 40));
    if (line && line.textContent) { const l = leaks($('.dialogue', vn)); if (l.length) bad('line-latin', [store.state.run?.part, l, line.textContent.slice(0, 50)]); }
    $('.dialogue', vn).click();
    await sleep(60);
  }

  window.removeEventListener('error', onErr);
  window.removeEventListener('unhandledrejection', onErr);
  errors.forEach(e => bad('js-error', e));
  const r = store.state.run;
  const result = {
    cfg: { lang: C.lang, address: C.address, track: C.track, policy: C.policy, rewindAt: C.rewindAt },
    partsDone, choices: choicesSeen.length, glossary: r?.glossary.length, bond: r?.bond, flags: Object.keys(r?.flags || {}).filter(k => !k.startsWith('_')),
    screens: [...seenScreens], steps, rewound: rewindDone, rewindRechecked: rewindChecked,
    randomName: log.find(x => x[0] === 'randomName')?.[1], problems: dedupe(problems), log: log.slice(-12),
  };
  window.__gitAlongTest = result;
  return result;
}

function dedupe(arr) {
  const seen = new Set();
  return arr.filter(x => { const k = JSON.stringify(x); if (seen.has(k)) return false; seen.add(k); return true; });
}

/** Fresh start: wipe the save and reload the app shell without a page reload. */
export async function fresh() {
  store.resetAll();
  location.hash = '';
}
