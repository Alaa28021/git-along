// Git Along — localization (English + Modern Standard Arabic).
// A value is a string, {en, ar}, or {en, ar: {m, f}} when Arabic depends on the player's form of address.
import { store } from './store.js';
import { GLOSSARY } from './content.js';

export const UI = {
  tagline: { en: 'Survive the semester. Keep the team.', ar: 'اعبُر الفصل الدراسي. حافظ على الفريق.' },
  continue: { en: 'Continue', ar: 'متابعة' },
  newSemester: { en: 'New semester', ar: 'فصل دراسي جديد' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  prototype: { en: 'Prototype · Weeks 1–7 playable', ar: 'نموذج أولي · الأسابيع من 1 إلى 7 قابلة للعب' },
  chooseLang: { en: 'Choose your language', ar: 'اختر لغتك' },
  chooseLangSub: { en: 'You can change it any time in Settings.', ar: 'يمكنك تغييرها في أي وقت من الإعدادات.' },
  newRunTitle: { en: 'Start a new semester?', ar: { m: 'هل تريد بدء فصل دراسي جديد؟', f: 'هل تريدين بدء فصل دراسي جديد؟' } },
  newRunBody: { en: 'Your current run ends. Stickers, endings and titles are kept.', ar: 'ستنتهي جولتك الحالية، وتبقى الملصقات والنهايات والألقاب محفوظة.' },
  cancel: { en: 'Cancel', ar: 'إلغاء' },
  yesNew: { en: 'Yes, start fresh', ar: { m: 'نعم، ابدأ من جديد', f: 'نعم، ابدئي من جديد' } },

  avatarTitle: { en: 'Create your student', ar: 'أنشئ شخصيتك' },
  avatarLead: { en: 'This is you in the story. Tap the preview to try your expressions.', ar: 'هذه شخصيتك في القصة. انقر على المعاينة لتجربة تعابيرها.' },
  previewHint: { en: 'Tap me!', ar: 'انقر هنا!' },
  name: { en: 'Your name', ar: 'اسمك' },
  namePh: { en: 'e.g. Lina', ar: 'مثلًا: لينا' },
  nameErr: { en: 'Please enter a name (1–20 characters).', ar: 'يُرجى إدخال اسم (من 1 إلى 20 حرفًا).' },
  address: { en: 'How should teammates address you?', ar: 'كيف يخاطبك زملاؤك؟' },
  addressHelp: { en: 'Used for Arabic grammar when teammates talk to you.', ar: 'تُستخدم لضبط قواعد اللغة العربية عندما يخاطبك زملاؤك.' },
  addrM: { en: 'Masculine (أنتَ)', ar: 'بصيغة المذكّر (أنتَ)' },
  addrF: { en: 'Feminine (أنتِ)', ar: 'بصيغة المؤنّث (أنتِ)' },
  skin: { en: 'Skin tone', ar: 'لون البشرة' },
  hair: { en: 'Hair or head covering', ar: 'الشعر أو غطاء الرأس' },
  hairColor: { en: 'Hair / hijab colour', ar: 'لون الشعر أو الحجاب' },
  glasses: { en: 'Glasses', ar: 'النظارة' },
  outfit: { en: 'Outfit', ar: 'الملابس' },
  outfitColor: { en: 'Outfit colour', ar: 'لون الملابس' },
  accessory: { en: 'Accessory', ar: 'الإكسسوار' },
  randomize: { en: 'Surprise me', ar: 'اختيار عشوائي' },
  next: { en: 'Next', ar: 'التالي' },
  back: { en: 'Back', ar: 'رجوع' },
  opt: {
    short: { en: 'Short', ar: 'قصير' }, buzz: { en: 'Buzz', ar: 'قصير جدًا' }, long: { en: 'Long', ar: 'طويل' },
    ponytail: { en: 'Ponytail', ar: 'ذيل حصان' }, curly: { en: 'Curly', ar: 'مجعّد' }, bun: { en: 'Bun', ar: 'كعكة' },
    hijab: { en: 'Hijab', ar: 'حجاب' }, hijabSport: { en: 'Sporty hijab', ar: 'حجاب رياضي' },
    none: { en: 'None', ar: 'بدون' }, round: { en: 'Round', ar: 'دائرية' }, square: { en: 'Square', ar: 'مربعة' },
    hoodie: { en: 'Hoodie', ar: 'هودي' }, cardigan: { en: 'Cardigan', ar: 'كارديغان' }, shirt: { en: 'Shirt', ar: 'قميص' }, dress: { en: 'Long dress', ar: 'فستان طويل' },
    headphones: { en: 'Headphones', ar: 'سماعات' }, scarf: { en: 'Scarf', ar: 'وشاح' }, cap: { en: 'Cap', ar: 'قبعة' },
  },

  trackTitle: { en: 'Choose your project', ar: 'اختر مشروعك' },
  trackLead: {
    en: 'All three tracks build StudySpot, an app for booking quiet study spaces on campus. Pick what you want to learn. You can’t change it during this semester.',
    ar: { m: 'تبني المسارات الثلاثة تطبيق StudySpot لحجز أماكن هادئة للمذاكرة في الجامعة. اختر ما تريد تعلّمه؛ لا يمكن تغييره خلال هذا الفصل.', f: 'تبني المسارات الثلاثة تطبيق StudySpot لحجز أماكن هادئة للمذاكرة في الجامعة. اختاري ما تريدين تعلّمه؛ لا يمكن تغييره خلال هذا الفصل.' },
  },
  youWillLearn: { en: 'You will learn', ar: { m: 'ستتعلّم', f: 'ستتعلّمين' } },
  startTrack: { en: 'Start the semester', ar: { m: 'ابدأ الفصل الدراسي', f: 'ابدئي الفصل الدراسي' } },
  tapToFlip: { en: 'Tap a card to see what you’ll learn', ar: { m: 'انقر على بطاقة لترى ما ستتعلّمه', f: 'انقري على بطاقة لتري ما ستتعلّمينه' } },

  room: { en: 'Study room', ar: 'غرفة المذاكرة' },
  shelf: { en: 'Glossary', ar: 'المسرد' },
  board: { en: 'Project board', ar: 'لوحة المشروع' },
  cork: { en: 'Stickers', ar: 'الملصقات' },
  laptop: { en: 'Semester map', ar: 'خريطة الفصل' },
  phone: { en: 'Team chat', ar: 'محادثة الفريق' },
  pixel: { en: 'Pixel', ar: 'بيكسل' },
  week: { en: 'Week {n}', ar: 'الأسبوع {n}' },
  healthShort: { en: 'Health', ar: 'الصحة' },
  trustShort: { en: 'Trust', ar: 'الثقة' },
  health: { en: 'Project Health', ar: 'صحة المشروع' },
  trust: { en: 'Team Trust', ar: 'ثقة الفريق' },
  roomMenu: { en: 'Room menu', ar: 'قائمة الغرفة' },
  playNext: { en: 'Play: {title}', ar: 'العب: {title}' },
  allDone: { en: 'Weeks 1–7 complete — open the map to replay any week', ar: { m: 'اكتملت الأسابيع من 1 إلى 7 — افتح الخريطة لإعادة لعب أي أسبوع', f: 'اكتملت الأسابيع من 1 إلى 7 — افتحي الخريطة لإعادة لعب أي أسبوع' } },
  hubHint: { en: 'Everything in the room is clickable.', ar: 'كل شيء في الغرفة قابل للنقر.' },
  start: { en: 'Start', ar: { m: 'ابدأ', f: 'ابدئي' } },

  mapTitle: { en: 'Semester map', ar: 'خريطة الفصل الدراسي' },
  mapLead: { en: 'One week per page. Finished weeks can be replayed as practice.', ar: 'صفحة لكل أسبوع. يمكن إعادة لعب الأسابيع المنتهية للتدريب.' },
  locked: { en: 'Finish the previous week', ar: 'يُفتح بعد الأسبوع السابق' },
  soon: { en: 'In the full version', ar: 'في النسخة الكاملة' },
  available: { en: 'Ready to play', ar: 'جاهز للعب' },
  done: { en: 'Done', ar: 'مكتمل' },
  practice: { en: 'Practice', ar: 'تدريب' },
  practiceNote: { en: 'Practice mode: nothing you choose is saved.', ar: 'وضع التدريب: لن تُحفَظ اختياراتك.' },

  hint: { en: 'Hint', ar: 'تلميح' },
  log: { en: 'Log', ar: 'السجل' },
  auto: { en: 'Auto', ar: 'تلقائي' },
  skip: { en: 'Skip', ar: 'تخطٍّ' },
  confirm: { en: 'Confirm', ar: 'تأكيد' },
  toRoom: { en: 'Back to the room', ar: 'العودة إلى الغرفة' },
  menu: { en: 'Menu', ar: 'القائمة' },
  close: { en: 'Close', ar: 'إغلاق' },
  you: { en: 'You', ar: 'أنت' },
  logTitle: { en: 'Backlog', ar: 'سجل الحوار' },
  pixelSays: { en: 'Pixel’s hint', ar: 'تلميح بيكسل' },
  pixelHintBtn: { en: 'Pixel’s hint', ar: 'تلميح بيكسل' },
  hintNudge: { en: 'Pixel has a hint for this decision', ar: 'لدى بيكسل تلميح لهذا القرار' },
  askYourself: { en: 'Before you choose, ask yourself:', ar: { m: 'قبل أن تختار، اسأل نفسك:', f: 'قبل أن تختاري، اسألي نفسك:' } },
  rethink: { en: 'Rethink', ar: 'تراجُع' },
  rethinkToast: { en: 'Back to the decision. You can rethink each decision once.', ar: 'عُدنا إلى لحظة القرار. يمكن التراجع عن كل قرار مرة واحدة فقط.' },
  typing: { en: 'typing', ar: 'يكتب الآن' },

  groupName: { en: 'StudySpot Team', ar: 'فريق StudySpot' },
  members: { en: '4 members', ar: '4 أعضاء' },
  chooseReply: { en: 'Choose your reply', ar: { m: 'اختر ردّك', f: 'اختاري ردّك' } },
  send: { en: 'Send', ar: 'إرسال' },
  seen: { en: 'Seen', ar: 'شوهدت' },

  simulated: { en: 'Simulated — nothing runs on your computer', ar: 'محاكاة — لا يُنفَّذ شيء على جهازك' },
  terminal: { en: 'Terminal', ar: 'Terminal' },
  unknownCmd: { en: 'That command isn’t part of this lesson. Try: {s}', ar: { m: 'هذا الأمر ليس جزءًا من هذا الدرس. جرّب: {s}', f: 'هذا الأمر ليس جزءًا من هذا الدرس. جرّبي: {s}' } },
  typeHint: { en: 'Type the command, or press Hint.', ar: { m: 'اكتب الأمر، أو اضغط «تلميح».', f: 'اكتبي الأمر، أو اضغطي «تلميح».' } },
  hintCmd: { en: 'Next command: {s}', ar: 'الأمر التالي: {s}' },
  cmdInput: { en: 'Command input', ar: 'إدخال الأمر' },
  mergeTitle: { en: 'Merge tool', ar: 'أداة الدمج (merge)' },
  mergeTask: { en: 'Choose a version for each conflict, then check the result.', ar: { m: 'اختر نسخة لكل تعارض، ثم افحص النتيجة.', f: 'اختاري نسخة لكل تعارض، ثم افحصي النتيجة.' } },
  conflictN: { en: 'Conflict {n}', ar: 'التعارض {n}' },
  mine: { en: 'Yours · current', ar: 'نسختك · current' },
  theirs: { en: 'Mira’s · incoming', ar: 'نسخة ميرا · incoming' },
  combined: { en: 'Combined', ar: 'المدمجة' },
  keepMine: { en: 'Keep mine', ar: 'الإبقاء على نسختي' },
  keepTheirs: { en: 'Keep Mira’s', ar: 'الإبقاء على نسخة ميرا' },
  combine: { en: 'Combine both', ar: 'دمج النسختين' },
  checkResult: { en: 'Check result', ar: 'فحص النتيجة' },
  resultTitle: { en: 'Result', ar: 'النتيجة' },
  continueStory: { en: 'Continue the story', ar: 'متابعة القصة' },

  debriefTitle: { en: 'Pixel’s notebook', ar: 'دفتر بيكسل' },
  whatHappened: { en: 'What happened', ar: 'ماذا حدث' },
  theirSide: { en: '{who}’s side', ar: 'من وجهة نظر {who}' },
  lesson: { en: 'The lesson', ar: 'الدرس' },
  better: { en: 'A better move', ar: 'خطوة أفضل' },
  tip: { en: 'Real-life tip', ar: 'نصيحة للحياة الواقعية' },
  changes: { en: 'This choice changed', ar: 'ما غيّره هذا الاختيار' },
  noChange: { en: 'No meter changes', ar: 'لا تغيير في المؤشرات' },
  tryAgain: { en: 'Try another way', ar: 'تجربة طريقة أخرى' },

  weekDone: { en: 'Week complete!', ar: 'اكتمل الأسبوع!' },
  newSticker: { en: 'New sticker', ar: 'ملصق جديد' },
  netChange: { en: 'This week', ar: 'حصيلة هذا الأسبوع' },
  stars: { en: '{n} of 3 stars', ar: '{n} من 3 نجوم' },

  settingsTitle: { en: 'Settings', ar: 'الإعدادات' },
  language: { en: 'Language', ar: 'اللغة' },
  textSpeed: { en: 'Text speed', ar: 'سرعة النص' },
  speeds: { slow: { en: 'Slow', ar: 'بطيئة' }, normal: { en: 'Normal', ar: 'عادية' }, fast: { en: 'Fast', ar: 'سريعة' }, instant: { en: 'Instant', ar: 'فورية' } },
  textSize: { en: 'Text size', ar: 'حجم النص' },
  reduceMotion: { en: 'Reduce motion', ar: 'تقليل الحركة' },
  on: { en: 'On', ar: 'تشغيل' },
  off: { en: 'Off', ar: 'إيقاف' },
  resetAll: { en: 'Reset everything', ar: 'مسح كل شيء' },
  resetTitle: { en: 'Erase everything?', ar: { m: 'هل تريد مسح كل شيء؟', f: 'هل تريدين مسح كل شيء؟' } },
  resetBody: { en: 'This erases your run, avatar, stickers, endings, titles and settings on this browser. It can’t be undone.', ar: 'سيمسح هذا جولتك وشخصيتك وملصقاتك ونهاياتك وألقابك وإعداداتك في هذا المتصفح، ولا يمكن التراجع عنه.' },
  yesReset: { en: 'Yes, erase everything', ar: { m: 'نعم، امسح كل شيء', f: 'نعم، امسحي كل شيء' } },
  storageOff: { en: 'Progress can’t be saved in this browser. You can still play.', ar: 'لا يمكن حفظ التقدّم في هذا المتصفح، لكن يمكنك اللعب.' },
  corrupt: { en: 'Saved progress could not be read.', ar: 'تعذّرت قراءة التقدّم المحفوظ.' },
  startFresh: { en: 'Start fresh', ar: 'البدء من جديد' },

  role: { en: 'Role', ar: 'الدور' },
  bond: { en: 'Bond', ar: 'الرابطة' },
  distant: { en: 'Distant', ar: 'متباعدة' },
  helps: { en: 'What helps {who}', ar: 'ما يساعد {who}' },
  helpsLocked: { en: 'Unlocks after their key week.', ar: 'يُفتح بعد أسبوعه أو أسبوعها المحوري.' },
  glossTitle: { en: 'Glossary', ar: 'المسرد' },
  glossEmpty: { en: 'Terms you meet in the story appear here.', ar: 'تظهر هنا المصطلحات التي تقابلها في القصة.' },
  stickersTitle: { en: 'Sticker board', ar: 'لوحة الملصقات' },
  chatHistory: { en: 'Team chat', ar: 'محادثة الفريق' },
  chatEmpty: { en: 'No messages yet.', ar: 'لا توجد رسائل بعد.' },
  pixelTip: {
    en: 'Psst… Hover or tap anything in the room. The laptop opens your semester map.',
    ar: { m: 'بسس… مرّر المؤشر أو انقر على أي شيء في الغرفة. الحاسوب المحمول يفتح خريطة الفصل.', f: 'بسس… مرّري المؤشر أو انقري على أي شيء في الغرفة. الحاسوب المحمول يفتح خريطة الفصل.' },
  },
  saved: { en: 'Saved', ar: 'تم الحفظ' },
};

export function lang() { return store.state.settings.lang || 'en'; }
export function address() { return store.state.avatar?.address || 'm'; }

/** Resolve a localized value to a plain string. */
export function tx(v) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  let x = v[lang()] ?? v.en;
  if (x && typeof x === 'object') x = x[address()] ?? x.m ?? x.f;
  return x ?? '';
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** UI string with {vars}; returns escaped HTML-safe text. */
export function t(key, vars = {}) {
  const parts = key.split('.');
  let v = UI;
  for (const p of parts) v = v?.[p];
  return fill(esc(tx(v) || key), vars, true);
}

function fill(s, vars, escapeVals) {
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? (escapeVals ? esc(vars[k]) : vars[k]) : m));
}

/**
 * Rich story text: escape, then resolve {name}/{file}/... tokens and [[terms]].
 * Terms stay in English (Latin script) and are bidi-isolated.
 */
export function rich(v, tokens = {}) {
  let s = esc(tx(v));
  s = s.replace(/\{(\w+)\}/g, (m, k) => (k in tokens ? `<bdi>${esc(tokens[k])}</bdi>` : m));
  s = s.replace(/\[\[([^\]]+)\]\]/g, (m, term) => {
    const g = GLOSSARY[term.toLowerCase()];
    const title = g ? esc(tx(g.def)) : '';
    return `<bdi class="term" data-term="${esc(term.toLowerCase())}" title="${title}">${term}</bdi>`;
  });
  return s;
}

/** Plain text version (no markup), for aria labels and typewriter length. */
export function plain(v, tokens = {}) {
  return tx(v).replace(/\{(\w+)\}/g, (m, k) => tokens[k] ?? m).replace(/\[\[([^\]]+)\]\]/g, '$1');
}

export function applyDocumentLanguage() {
  const l = lang();
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.title = 'Git Along';
  const skip = document.querySelector('.skip-link');
  if (skip) skip.textContent = l === 'ar' ? 'انتقل إلى اللعبة' : 'Skip to game';
}
