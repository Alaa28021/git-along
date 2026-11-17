// Git Along — story content as data (SRS section 7 and 8.2).
// Text: {en, ar} or {en, ar: {m, f}} when Arabic depends on the player's address.
// [[term]] marks a glossary term (kept in English). {name}/{file}/{feature}/{stack} are tokens.

export const TRACKS = {
  web: {
    name: { en: 'Web', ar: 'Web' },
    brief: { en: 'The StudySpot website: a React frontend talking to a REST API.', ar: 'موقع StudySpot: واجهة React تتواصل مع REST API.' },
    learn: [
      { en: 'Frontend / backend split', ar: 'الفصل بين frontend وbackend' },
      { en: 'API contracts in JSON', ar: 'عقود API بصيغة JSON' },
      { en: 'Environment variables, Docker basics', ar: 'متغيّرات البيئة وأساسيات Docker' },
    ],
    tokens: { stack: 'Web (React + API)', file: 'src/components/BookingForm.jsx', feature: 'booking-form', secret: '.env' },
    tag: 'React · REST · Docker',
  },
  mobile: {
    name: { en: 'Mobile', ar: 'Mobile' },
    brief: { en: 'The StudySpot phone app, built from one shared Flutter codebase.', ar: 'تطبيق StudySpot للهواتف، مبني من قاعدة كود Flutter مشتركة.' },
    learn: [
      { en: 'One shared codebase for iOS and Android', ar: 'قاعدة كود واحدة لـ iOS وAndroid' },
      { en: 'Build config, signing keys as secrets', ar: 'إعدادات البناء ومفاتيح التوقيع كأسرار' },
      { en: 'Version numbers and releases', ar: 'أرقام الإصدارات والنشر' },
    ],
    tokens: { stack: 'Mobile (Flutter)', file: 'lib/screens/booking_screen.dart', feature: 'booking-screen', secret: 'key.properties' },
    tag: 'Flutter · Dart · Releases',
  },
  ai: {
    name: { en: 'AI', ar: 'AI' },
    brief: { en: 'A model that predicts how crowded each study space will be.', ar: 'نموذج يتوقّع مدى ازدحام كل مكان للمذاكرة.' },
    learn: [
      { en: 'Notebooks vs. scripts', ar: 'الـ notebooks مقابل الـ scripts' },
      { en: 'Versioning data and models', ar: 'إدارة إصدارات البيانات والنماذج' },
      { en: 'Reproducibility: seeds and requirements', ar: 'قابلية إعادة الإنتاج: seeds وrequirements' },
    ],
    tokens: { stack: 'AI (Python)', file: 'src/train.py', feature: 'occupancy-model', secret: 'data/raw/visits.csv' },
    tag: 'Python · pandas · scikit-learn',
  },
};

export const NAMES = {
  mira: { en: 'Mira', ar: 'ميرا' },
  sara: { en: 'Sara', ar: 'سارة' },
  omar: { en: 'Omar', ar: 'عمر' },
  pixel: { en: 'Pixel', ar: 'بيكسل' },
  nour: { en: 'Eng. Nour', ar: 'م. نور' },
};

export const PLATE = { you: '#CDE7F4', mira: '#F4C7D0', sara: '#D9CCEB', omar: '#B9D9CB', pixel: '#F3B64E', nour: '#F3B28D' };

export const ROLES = {
  mira: { web: { en: 'Frontend', ar: 'Frontend' }, mobile: { en: 'UI screens', ar: 'شاشات الواجهة (UI)' }, ai: { en: 'Data visualisation', ar: 'تصوير البيانات (visualisation)' } },
  sara: { web: { en: 'Backend API', ar: 'Backend API' }, mobile: { en: 'Firebase backend', ar: 'Firebase backend' }, ai: { en: 'Data pipeline', ar: 'خط معالجة البيانات (pipeline)' } },
  omar: { web: { en: 'Deployment', ar: 'النشر (deployment)' }, mobile: { en: 'Build and release', ar: 'البناء والإصدار (release)' }, ai: { en: 'Model training', ar: 'تدريب النموذج' } },
};

export const HELPS = {
  mira: { after: '6', text: { en: 'Asking before assuming. She relaxes when someone works next to her instead of judging from afar.', ar: 'يساعدها السؤال قبل الافتراض، وتهدأ عندما يعمل أحد بجانبها بدل أن يحكم عليها من بعيد.' } },
  sara: { after: '2', text: { en: 'Being asked “What can I take off your plate?”', ar: 'أن يسألها أحد: «ما الذي يمكنني أن أحمله عنكِ؟»' } },
  omar: { after: '1', text: { en: 'Short, direct messages — and checking on him as a person first.', ar: 'الرسائل القصيرة المباشرة، والسؤال عنه كإنسان أولًا.' } },
};

export const GLOSSARY = {
  'commit': { def: { en: 'A saved snapshot of your changes, with a message explaining them.', ar: 'لقطة محفوظة من تعديلاتك، مع رسالة تشرحها.' } },
  'push': { def: { en: 'Sending your local commits to the shared repository (e.g. GitHub).', ar: 'إرسال الـ commits المحلية إلى المستودع المشترك (مثل GitHub).' } },
  'main': { def: { en: 'The team’s main branch: the version everyone builds on.', ar: 'الفرع الرئيسي للفريق: النسخة التي يبني عليها الجميع.' } },
  'branch': { def: { en: 'A separate line of work, so you can change code without touching main.', ar: 'خط عمل منفصل يتيح لك تعديل الكود دون المساس بـ main.' } },
  'git pull': { def: { en: 'Download the latest changes from the shared repository and merge them into yours.', ar: 'تنزيل آخر التعديلات من المستودع المشترك ودمجها مع نسختك.' } },
  'git status': { def: { en: 'Shows which files changed and what Git expects you to do next.', ar: 'يعرض الملفات المعدّلة وما يتوقّع Git أن تفعله بعد ذلك.' } },
  'merge conflict': { def: { en: 'When two people change the same lines, Git can’t choose alone; a person must decide.', ar: 'عندما يعدّل شخصان الأسطر نفسها لا يستطيع Git الاختيار وحده، فيجب أن يقرّر إنسان.' } },
  'force push': { def: { en: 'A push that overwrites the shared history. It can erase teammates’ work. Avoid it on shared branches.', ar: 'push يستبدل التاريخ المشترك وقد يمسح عمل الزملاء. تجنّبه على الفروع المشتركة.' } },
  'pull request': { def: { en: 'A request to merge your branch, so teammates can review the change first.', ar: 'طلب لدمج فرعك، حتى يراجع الزملاء التعديل أولًا.' } },
  'git config': { def: { en: 'Sets Git options, like the name and email attached to your commits.', ar: 'يضبط إعدادات Git، مثل الاسم والبريد الإلكتروني المرفقين بالـ commits.' } },
  'repository': { def: { en: 'The project’s shared home: all its files plus their full history.', ar: 'البيت المشترك للمشروع: كل ملفاته مع تاريخها الكامل.' } },
  'git clone': { def: { en: 'Downloads a full copy of a repository, history included, to your computer.', ar: 'ينزّل نسخة كاملة من المستودع، بتاريخه، إلى جهازك.' } },
  '.gitignore': { def: { en: 'A list of files Git should never track, such as secrets and huge data files.', ar: 'قائمة بالملفات التي يجب ألّا يتتبّعها Git أبدًا، مثل الأسرار وملفات البيانات الضخمة.' } },
  'git switch': { def: { en: 'Moves you to another branch. With -c it creates the branch first.', ar: 'ينقلك إلى فرع آخر، ومع -c ينشئ الفرع أولًا.' } },
  'code review': { def: { en: 'Teammates reading a change before it is merged, to catch bugs and share knowledge.', ar: 'قراءة الزملاء للتعديل قبل دمجه، لاكتشاف الأخطاء وتبادل المعرفة.' } },
  'git add': { def: { en: 'Marks changes (or a resolved conflict) to be included in the next commit.', ar: 'يحدّد التعديلات (أو التعارض المحلول) لتُضمَّن في الـ commit التالي.' } },
};

export const STICKERS = {
  'st-p': { en: 'Coffee cup', ar: 'كوب القهوة' }, 'st-1': { en: 'Hello wave', ar: 'تلويحة مرحبًا' }, 'st-2': { en: 'Handshake', ar: 'المصافحة' },
  'st-3': { en: 'Tiny repo', ar: 'مستودع صغير' }, 'st-4': { en: 'Branch sprout', ar: 'برعم الفرع' }, 'st-5': { en: 'Magnifier', ar: 'العدسة' },
  'st-6': { en: 'Bandage heart', ar: 'القلب المضمَّد' }, 'st-7': { en: 'Paper plane', ar: 'الطائرة الورقية' }, 'st-8': { en: 'Tiny container', ar: 'الحاوية الصغيرة' },
  'st-9': { en: 'Moon and coffee', ar: 'القمر والقهوة' }, 'st-10': { en: 'Trophy', ar: 'الكأس' }, 'st-e': { en: 'Gold star', ar: 'النجمة الذهبية' },
};

export const PARTS = [
  { id: 'P', week: 1, sticker: 'st-p', playable: true, time: 'morning', title: { en: 'The Assignment', ar: 'التكليف' } },
  { id: '1', week: 2, sticker: 'st-1', playable: true, time: 'evening', title: { en: 'Strangers in a Group Chat', ar: 'غرباء في مجموعة محادثة' } },
  { id: '2', week: 3, sticker: 'st-2', playable: true, time: 'morning', title: { en: 'The Team Contract', ar: 'عقد الفريق' } },
  { id: '3', week: 4, sticker: 'st-3', playable: true, time: 'evening', title: { en: 'Hello, Repo', ar: 'مرحبًا يا Repo' } },
  { id: '4', week: 5, sticker: 'st-4', playable: true, time: 'morning', title: { en: 'Branch Out', ar: 'تفرّع' } },
  { id: '5', week: 6, sticker: 'st-5', playable: true, time: 'evening', title: { en: 'Review Me Gently', ar: 'راجِعني بلطف' } },
  { id: '6', week: 7, sticker: 'st-6', playable: true, time: 'evening', title: { en: 'The Merge Conflict', ar: 'تعارُض الدمج' } },
  { id: '7', week: 8, sticker: 'st-7', title: { en: 'Seen, 3 Days Ago', ar: 'شوهدت منذ 3 أيام' } },
  { id: '8', week: 9, sticker: 'st-8', title: { en: 'Works on My Machine', ar: 'يعمل على جهازي' } },
  { id: '9', week: 10, sticker: 'st-9', title: { en: 'Crunch Week', ar: 'أسبوع الضغط' } },
  { id: '10', week: 11, sticker: 'st-10', title: { en: 'Demo Day', ar: 'يوم العرض' } },
  { id: 'E', week: 12, sticker: 'st-e', title: { en: 'Retrospective', ar: 'المراجعة الختامية' } },
];

/* ------------------------------------------------------------------
   Merge tool data per track (Chapter 6)
   ------------------------------------------------------------------ */
const FORM_EXPLAIN = [
  {
    mine: { en: 'Your check catches both fields, but users only see a vague “Missing fields”.', ar: 'تحقّقك يلتقط الحقلين، لكن المستخدم لا يرى إلا رسالة مبهمة: «Missing fields».' },
    theirs: { en: 'Mira’s friendly message stays, but the time check is gone — people can book with no time!', ar: 'تبقى رسالة ميرا الودّية، لكن التحقّق من الوقت اختفى؛ يمكن الحجز دون تحديد وقت!' },
    combine: { en: 'Both checks and both friendly messages. Each side added something real.', ar: 'التحقّقان معًا والرسالتان الودّيتان. أضاف كل طرف شيئًا حقيقيًا.' },
  },
  {
    mine: { en: 'Your old button works, but it has no loading state — users can tap “Book” twice.', ar: 'زرّك القديم يعمل، لكن بلا حالة تحميل، فقد ينقر المستخدم «Book» مرتين.' },
    theirs: { en: 'Mira’s button shows “Booking…” and blocks double taps. Simply better.', ar: 'زر ميرا يعرض «Booking…» ويمنع النقر المزدوج. إنه أفضل ببساطة.' },
    combine: { en: 'Now there are two buttons on the screen. Combining isn’t always the answer.', ar: 'صار على الشاشة زرّان! الدمج ليس الحل دائمًا.' },
  },
];
const DATA_EXPLAIN = [
  {
    mine: { en: 'Your check stops the whole pipeline when a single room is missing.', ar: 'تحقّقك يوقف خط المعالجة كله إذا غابت غرفة واحدة.' },
    theirs: { en: 'Mira’s version drops bad rows, but nobody knows how many were lost.', ar: 'نسخة ميرا تحذف الصفوف الناقصة، لكن لا أحد يعرف كم صفًا فُقد.' },
    combine: { en: 'Bad rows are dropped and the count is logged. Clean data, no silent surprises.', ar: 'تُحذف الصفوف الناقصة ويُسجَّل عددها: بيانات نظيفة بلا مفاجآت صامتة.' },
  },
  {
    mine: { en: 'Without random_state, every training run gives different numbers. Nobody can reproduce your results.', ar: 'من دون random_state تعطي كل عملية تدريب أرقامًا مختلفة، ولا يستطيع أحد إعادة إنتاج نتائجك.' },
    theirs: { en: 'random_state=42 makes results reproducible for the whole team.', ar: 'يجعل random_state=42 النتائج قابلة لإعادة الإنتاج للفريق كله.' },
    combine: { en: 'Two model lines: the second silently replaces the first. Confusing and fragile.', ar: 'سطرا نموذج: الثاني يستبدل الأول بصمت. هذا مربك وهشّ.' },
  },
];

export const MERGE6 = {
  web: [
    { best: 'combine', explain: FORM_EXPLAIN[0],
      mine: `if (!form.room || !form.time) {\n  return setError("Missing fields");\n}`,
      theirs: `if (!form.room) {\n  return setError(t("pickRoom"));\n}`,
      combined: `if (!form.room) return setError(t("pickRoom"));\nif (!form.time) return setError(t("pickTime"));` },
    { best: 'theirs', explain: FORM_EXPLAIN[1],
      mine: `<button className="btn">Book</button>`,
      theirs: `<button className="btn btn-primary" disabled={loading}>\n  {loading ? "Booking…" : "Book room"}\n</button>`,
      combined: `<button className="btn">Book</button>\n<button className="btn btn-primary" disabled={loading}>\n  {loading ? "Booking…" : "Book room"}\n</button>` },
  ],
  mobile: [
    { best: 'combine', explain: FORM_EXPLAIN[0],
      mine: `if (room == null || time == null) {\n  return showError('Missing fields');\n}`,
      theirs: `if (room == null) {\n  return showError(l10n.pickRoom);\n}`,
      combined: `if (room == null) return showError(l10n.pickRoom);\nif (time == null) return showError(l10n.pickTime);` },
    { best: 'theirs', explain: FORM_EXPLAIN[1],
      mine: `ElevatedButton(onPressed: book, child: Text('Book'))`,
      theirs: `FilledButton(\n  onPressed: loading ? null : book,\n  child: Text(loading ? 'Booking…' : 'Book room'),\n)`,
      combined: `ElevatedButton(onPressed: book, child: Text('Book')),\nFilledButton(\n  onPressed: loading ? null : book,\n  child: Text(loading ? 'Booking…' : 'Book room'),\n)` },
  ],
  ai: [
    { best: 'combine', explain: DATA_EXPLAIN[0],
      mine: `if df["room"].isna().any():\n    raise ValueError("Missing rooms")`,
      theirs: `df = df.dropna(subset=["room"])\nlog.info("Dropped rows without room")`,
      combined: `missing = df["room"].isna().sum()\ndf = df.dropna(subset=["room"])\nlog.info(f"Dropped {missing} rows without room")` },
    { best: 'theirs', explain: DATA_EXPLAIN[1],
      mine: `model = RandomForestRegressor()`,
      theirs: `model = RandomForestRegressor(random_state=42)`,
      combined: `model = RandomForestRegressor()\nmodel = RandomForestRegressor(random_state=42)` },
  ],
};

export const MERGE_OUTCOMES = [
  { quality: 0, style: 'solo', fx: { health: -4 }, happened: { en: 'Both blocks lost something important. The story goes on — but the app now has bugs to fix.', ar: 'فقد الجزءان شيئًا مهمًا. تستمر القصة، لكن في التطبيق الآن أخطاء تحتاج إلى إصلاح.' } },
  { quality: 1, style: 'structure', fx: { health: 4, flags: { mergeOk: true } }, happened: { en: 'One conflict was resolved well; the other lost something useful.', ar: 'حُلّ أحد التعارضين جيدًا، وفقد الآخر شيئًا مفيدًا.' } },
  { quality: 2, style: 'structure', fx: { health: 10, flags: { mergeGood: true } }, happened: { en: 'You and Mira resolved both conflicts well: you combined where both sides added value and kept hers where it was simply better.', ar: { m: 'حللتَ أنت وميرا التعارضين جيدًا: دمجتما حيث أضاف الطرفان قيمة، واحتفظتما بنسختها حيث كانت أفضل ببساطة.', f: 'حللتِ أنتِ وميرا التعارضين جيدًا: دمجتما حيث أضاف الطرفان قيمة، واحتفظتما بنسختها حيث كانت أفضل ببساطة.' } } },
];

/* ------------------------------------------------------------------
   Debriefs
   ------------------------------------------------------------------ */
export const DEBRIEFS = {
  'd-p': {
    who: 'sara', face: 'worried',
    side: { en: 'I make plans when I’m nervous. A new team is scary — I just hide it behind colour-coded sticky notes.', ar: 'أضع الخطط عندما أتوتّر. الفريق الجديد مخيف، وأنا أخفي خوفي خلف الملاحظات الملوّنة.' },
    lesson: { en: 'First impressions set the tone. Show curiosity about your teammates before talking about tasks.', ar: { m: 'الانطباع الأول يحدّد نبرة العلاقة. أظهِر فضولك تجاه زملائك قبل الحديث عن المهام.', f: 'الانطباع الأول يحدّد نبرة العلاقة. أظهري فضولك تجاه زملائك قبل الحديث عن المهام.' } },
    better: { en: 'Share what you enjoy and ask what they enjoy. The task plan can come ten minutes later.', ar: { m: 'شارِك ما تحبّه واسأل عمّا يحبّونه. يمكن أن تأتي خطة المهام بعد عشر دقائق.', f: 'شاركي ما تحبّينه واسألي عمّا يحبّونه. يمكن أن تأتي خطة المهام بعد عشر دقائق.' } },
    tip: { en: 'In your first real meeting, ask everyone: “What do you want to learn from this project?”', ar: { m: 'في أول اجتماع حقيقي، اسأل الجميع: «ماذا تريدون أن تتعلّموا من هذا المشروع؟»', f: 'في أول اجتماع حقيقي، اسألي الجميع: «ماذا تريدون أن تتعلّموا من هذا المشروع؟»' } },
  },
  'd1': {
    who: 'omar', face: 'worried',
    side: { en: 'I work evenings to pay for the semester. When I open the chat and see two hundred messages, I don’t know where to start — so I don’t start at all.', ar: 'أعمل مساءً لأدفع رسوم الفصل. عندما أفتح المحادثة وأرى مئتي رسالة لا أعرف من أين أبدأ، فلا أبدأ أبدًا.' },
    lesson: { en: 'Silence is information, not an insult. Check on people privately, keep it short, and give them an easy way to answer.', ar: { m: 'الصمت معلومة لا إهانة. اسأل عن زملائك على انفراد، واجعل رسالتك قصيرة، وامنحهم طريقة سهلة للردّ.', f: 'الصمت معلومة لا إهانة. اسألي عن زملائك على انفراد، واجعلي رسالتك قصيرة، وامنحيهم طريقة سهلة للردّ.' } },
    better: { en: 'A short private message with one easy question: “Which part sounds fun to you?”', ar: 'رسالة خاصة قصيرة بسؤال واحد سهل: «أيّ جزء يبدو ممتعًا لك؟»' },
    tip: { en: 'Agree on chat rules early — for example: reply within 24 hours, and keep decisions in one pinned message.', ar: { m: 'اتفق مبكرًا على قواعد المحادثة، مثل: الردّ خلال 24 ساعة، وحفظ القرارات في رسالة مثبّتة واحدة.', f: 'اتفقي مبكرًا على قواعد المحادثة، مثل: الردّ خلال 24 ساعة، وحفظ القرارات في رسالة مثبّتة واحدة.' } },
  },
  'd2': {
    who: 'sara', face: 'worried',
    side: { en: 'I was scared we’d fail like my last team, so I tried to control everything. I gave Omar the hard parts because I didn’t know how to ask what he wanted.', ar: 'كنت أخاف أن نفشل مثل فريقي السابق، فحاولت التحكّم في كل شيء. وأعطيت عمر الأجزاء الصعبة لأنني لم أعرف كيف أسأله عمّا يريد.' },
    lesson: { en: 'Split work by strengths and by learning goals. Ask before you assign, and write it down in a team contract.', ar: { m: 'قسّم العمل حسب نقاط القوة وأهداف التعلّم معًا. اسأل قبل أن تكلّف أحدًا، ودوِّن ذلك في عقد للفريق.', f: 'قسّمي العمل حسب نقاط القوة وأهداف التعلّم معًا. اسألي قبل أن تكلّفي أحدًا، ودوّني ذلك في عقد للفريق.' } },
    better: { en: 'Go round the table: “What are you good at? What do you want to learn?” Then split.', ar: { m: 'اسأل كل فرد: «ما الذي تجيده؟ وما الذي تريد تعلّمه؟» ثم قسّم العمل.', f: 'اسألي كل فرد: «ما الذي تجيده؟ وما الذي تريد تعلّمه؟» ثم قسّمي العمل.' } },
    tip: { en: 'A simple team contract has three parts: roles, how you communicate, and a shared “definition of done”.', ar: 'لعقد الفريق البسيط ثلاثة أجزاء: الأدوار، وطريقة التواصل، وتعريف مشترك لكلمة «انتهى».' },
  },
  'd3': {
    who: 'omar', face: 'neutral',
    side: { en: 'At my first internship, someone pushed a cloud key to GitHub. Within an hour, bots had found it and run up a huge bill. I still check every commit for secrets.', ar: 'في أول تدريب لي، رفع أحدهم مفتاحًا سحابيًا إلى GitHub، وخلال ساعة وجدته برامج آلية وتراكمت فاتورة ضخمة. ما زلت أفحص كل commit بحثًا عن الأسرار.' },
    lesson: { en: 'Secrets, huge data and personal files never go into the repository. List them in [[.gitignore]] and share an example file instead.', ar: { m: 'الأسرار والبيانات الضخمة والملفات الشخصية لا تدخل المستودع أبدًا. أضفها إلى [[.gitignore]] وشارِك ملف مثال بدلًا منها.', f: 'الأسرار والبيانات الضخمة والملفات الشخصية لا تدخل المستودع أبدًا. أضيفيها إلى [[.gitignore]] وشاركي ملف مثال بدلًا منها.' } },
    better: { en: 'Ignore the real file and keep a safe example (like .env.example) in the repository.', ar: { m: 'تجاهل الملف الحقيقي، واحتفظ في المستودع بمثال آمن مثل ‎.env.example.', f: 'تجاهلي الملف الحقيقي، واحتفظي في المستودع بمثال آمن مثل ‎.env.example.' } },
    tip: { en: 'Write commit messages as “what this commit does”: “Add booking form validation”, not “stuff”.', ar: { m: 'اكتب رسالة الـ commit بصيغة «ماذا يفعل هذا الـ commit»: «Add booking form validation» لا «stuff».', f: 'اكتبي رسالة الـ commit بصيغة «ماذا يفعل هذا الـ commit»: «Add booking form validation» لا «stuff».' } },
  },
  'd4': {
    who: 'sara', face: 'worried',
    side: { en: 'I wasn’t against safety. I was scared we’d fall behind and Eng. Nour would think we’re the weak team. I just wanted to see things moving.', ar: 'لم أكن ضد الأمان. كنت خائفة أن نتأخّر فتظن المهندسة نور أننا الفريق الأضعف. أردت فقط أن أرى العمل يتقدّم.' },
    lesson: { en: 'Work on a [[branch]] and keep [[main]] working. When someone pushes back, answer the worry behind their request.', ar: { m: 'اعمل على [[branch]] وأبقِ [[main]] سليمًا. وعندما يعترض أحد، أجب عن القلق الكامن خلف طلبه.', f: 'اعملي على [[branch]] وأبقي [[main]] سليمًا. وعندما يعترض أحد، أجيبي عن القلق الكامن خلف طلبه.' } },
    better: { en: 'Say yes to the goal (“you’ll see progress”) and no to the risk (“not on main”).', ar: { m: 'وافق على الهدف («سترين التقدّم») وارفض الخطر («ليس على main»).', f: 'وافقي على الهدف («سترين التقدّم») وارفضي الخطر («ليس على main»).' } },
    tip: { en: 'Name branches by purpose, like feature/booking-form or fix/login-crash, so everyone can tell what’s inside.', ar: { m: 'سمِّ الفروع حسب الغرض، مثل feature/booking-form أو fix/login-crash، فيعرف الجميع ما بداخلها.', f: 'سمّي الفروع حسب الغرض، مثل feature/booking-form أو fix/login-crash، فيعرف الجميع ما بداخلها.' } },
  },
  'd5': {
    who: 'mira', face: 'worried',
    side: { en: 'It was my first pull request. I refreshed the page every minute. I was sure everyone would find out I’m not a “real” developer.', ar: 'كان أول pull request لي، وكنت أحدّث الصفحة كل دقيقة. كنت متأكدة أن الجميع سيكتشف أنني لست مبرمجة «حقيقية».' },
    lesson: { en: 'In a [[code review]], comment on the code, not the person. Be specific, explain why, and suggest a fix.', ar: { m: 'في الـ[[code review]] علّق على الكود لا على الشخص. كن محدّدًا، واشرح السبب، واقترح حلًا.', f: 'في الـ[[code review]] علّقي على الكود لا على الشخص. كوني محدّدة، واشرحي السبب، واقترحي حلًا.' } },
    better: { en: 'Start with something genuinely good, then make one clear request and give the reason.', ar: { m: 'ابدأ بشيء جيد فعلًا، ثم اطلب تغييرًا واحدًا واضحًا مع ذكر السبب.', f: 'ابدئي بشيء جيد فعلًا، ثم اطلبي تغييرًا واحدًا واضحًا مع ذكر السبب.' } },
    tip: { en: 'Phrase requests as questions: “Could we…?” starts a conversation; “Redo it” ends one.', ar: { m: 'صُغ طلباتك كأسئلة: «هل يمكننا…؟» تفتح حوارًا، و«أعيدي كتابته» تُنهيه.', f: 'صوغي طلباتك كأسئلة: «هل يمكننا…؟» تفتح حوارًا، و«أعيدي كتابته» تُنهيه.' } },
  },
  'd6a': {
    who: 'sara', face: 'worried',
    side: { en: 'Group chats feel loud. When someone gets called out there, everyone else freezes. I never know whether to defend them or stay out of it.', ar: 'تبدو مجموعات المحادثة صاخبة. عندما يُنتقد أحد فيها يتجمّد الآخرون، ولا أعرف أبدًا هل أدافع عنه أم أبقى بعيدة.' },
    lesson: { en: 'Raise problems privately first. Describe what happened (“I’m getting a conflict”), not who is to blame (“you overwrote my work”).', ar: { m: 'اطرح المشكلات على انفراد أولًا. صِف ما حدث («يظهر لي تعارض») لا من المخطئ («لقد مسحتِ عملي»).', f: 'اطرحي المشكلات على انفراد أولًا. صِفي ما حدث («يظهر لي تعارض») لا من المخطئ («لقد مسحتِ عملي»).' } },
    better: { en: 'A short private message: what you see, how it affects you, and an invitation to fix it together.', ar: { m: 'رسالة خاصة قصيرة: ما تراه، وكيف يؤثّر عليك، ودعوة لإصلاحه معًا.', f: 'رسالة خاصة قصيرة: ما ترينه، وكيف يؤثّر عليكِ، ودعوة لإصلاحه معًا.' } },
    tip: { en: 'Before sending an angry message, wait ten minutes and reread it as if you were the one receiving it.', ar: { m: 'قبل إرسال رسالة غاضبة، انتظر عشر دقائق ثم أعِد قراءتها كأنك أنت من يستلمها.', f: 'قبل إرسال رسالة غاضبة، انتظري عشر دقائق ثم أعيدي قراءتها كأنكِ أنتِ من تستلمها.' } },
  },
  'd6b': {
    who: 'mira', face: 'worried', useMerge: true,
    side: { en: 'When Git said “rejected”, my heart dropped. The deadline, the group chat, everyone counting on my UI… I used [[force push]] so nobody would see I was stuck. I didn’t think about whose work was underneath.', ar: 'عندما قال Git «مرفوض» انقبض قلبي. الموعد النهائي، ومجموعة المحادثة، والجميع يعتمد على واجهتي… فاستخدمتُ [[force push]] حتى لا يرى أحد أنني عالقة. لم أفكّر في عمل مَن كان تحته.' },
    lesson: { en: 'A [[merge conflict]] is normal when two people edit the same lines. Resolve it together, block by block: sometimes keep yours, sometimes theirs, often combine. Never force-push to a shared [[branch]].', ar: { m: 'الـ[[merge conflict]] أمر طبيعي عندما يعدّل شخصان الأسطر نفسها. حُلّه معًا، جزءًا جزءًا: أحيانًا تحتفظ بنسختك، وأحيانًا بنسختهم، وكثيرًا ما تدمج الاثنتين. لا تستخدم [[force push]] أبدًا على [[branch]] مشترك.', f: 'الـ[[merge conflict]] أمر طبيعي عندما يعدّل شخصان الأسطر نفسها. حُلّيه معًا، جزءًا جزءًا: أحيانًا تحتفظين بنسختك، وأحيانًا بنسختهم، وكثيرًا ما تدمجين الاثنتين. لا تستخدمي [[force push]] أبدًا على [[branch]] مشترك.' } },
    better: { en: 'Combine when both sides add value; keep theirs when their version is simply better. Read each block before choosing.', ar: { m: 'ادمج عندما يضيف الطرفان قيمة، واحتفظ بنسختهم عندما تكون أفضل ببساطة. اقرأ كل جزء قبل أن تختار.', f: 'ادمجي عندما يضيف الطرفان قيمة، واحتفظي بنسختهم عندما تكون أفضل ببساطة. اقرئي كل جزء قبل أن تختاري.' } },
    tip: { en: 'Pull before you start, push small commits often, and use a [[pull request]] so changes are reviewed before they reach [[main]].', ar: { m: 'اسحب التحديثات قبل أن تبدأ، وارفع commits صغيرة باستمرار، واستخدم [[pull request]] حتى تُراجَع التعديلات قبل وصولها إلى [[main]].', f: 'اسحبي التحديثات قبل أن تبدئي، وارفعي commits صغيرة باستمرار، واستخدمي [[pull request]] حتى تُراجَع التعديلات قبل وصولها إلى [[main]].' } },
  },
};

/* ------------------------------------------------------------------
   Story
   ------------------------------------------------------------------ */
const L = (who, en, ar, extra = {}) => ({ t: 'line', who, text: { en, ar }, ...extra });
const N = (en, ar, extra = {}) => ({ t: 'line', who: null, text: { en, ar }, ...extra });

export const STORY = {
  P: {
    start: 'p1',
    scenes: {
      p1: {
        bg: 'cafe-morning',
        steps: [
          N('Week 1. The campus café smells of cardamom coffee and printer paper.', 'الأسبوع الأول. تفوح من مقهى الجامعة رائحة القهوة بالهيل وورق الطابعة.'),
          N('Eng. Nour has just posted the project teams. Yours is waiting at the corner table.', 'نشرت المهندسة نور للتو فرق المشروع، وفريقك ينتظر عند الطاولة في الزاوية.'),
          { t: 'cast', cast: [{ who: 'mira', at: 'left', face: 'worried' }, { who: 'sara', at: 'center', face: 'happy' }, { who: 'omar', at: 'right', face: 'neutral' }] },
          L('sara', 'You must be {name}! I’m Sara. I already made us a group chat. And a colour-coded plan.', { m: 'لا بدّ أنكَ {name}! أنا سارة. أنشأتُ لنا مجموعة محادثة بالفعل، وخطة ملوّنة أيضًا.', f: 'لا بدّ أنكِ {name}! أنا سارة. أنشأتُ لنا مجموعة محادثة بالفعل، وخطة ملوّنة أيضًا.' }, { face: 'happy', emote: 'sparkle' }),
          L('mira', 'Hi… I’m Mira. I’ll do the UI. I want it to look perfect. Well — nice. Nice is fine.', 'مرحبًا… أنا ميرا. سأتولّى الواجهة. أريدها أن تبدو مثالية… أقصد جميلة. الجميلة تكفي.', { face: 'worried', emote: 'sweat' }),
          L('omar', 'Omar.', 'عمر.', { face: 'neutral', emote: 'ellipsis' }),
          L('sara', 'He’s quiet. He’s also the best coder in our year.', 'إنه هادئ، لكنه أفضل مبرمج في دفعتنا.', { face: 'proud' }),
          L('omar', '…Thanks.', '…شكرًا.', { face: 'surprised' }),
          L('sara', 'Our project is StudySpot, and we’re building it on the {stack} track.', 'مشروعنا هو StudySpot، وسنبنيه في مسار {stack}.', { face: 'happy' }),
          {
            t: 'choice', id: 'p-intro', key: true, via: 'dialogue', debrief: 'd-p',
            prompt: { en: 'How do you introduce yourself?', ar: { m: 'كيف تقدّم نفسك؟', f: 'كيف تقدّمين نفسكِ؟' } },
            hint: { en: 'A team runs on trust before it runs on tasks.', ar: 'يعمل الفريق بالثقة قبل أن يعمل بالمهام.' },
            options: [
              {
                text: { en: 'Hi! I like {stack}, and I’d love to learn from all of you.', ar: 'مرحبًا! أحبّ {stack}، ويسعدني أن أتعلّم منكم جميعًا.' },
                quality: 2, style: 'empathy', fx: { trust: 6, bond: { mira: 1, sara: 1, omar: 1 } },
                happened: { en: 'You opened with curiosity, not a résumé. Everyone relaxed a little.', ar: { m: 'بدأتَ بالفضول لا بسرد إنجازاتك، فارتاح الجميع قليلًا.', f: 'بدأتِ بالفضول لا بسرد إنجازاتك، فارتاح الجميع قليلًا.' } },
                reply: [
                  L('sara', 'That’s the spirit!', 'هذه هي الروح!', { face: 'happy', emote: 'heart' }),
                  L('mira', 'Okay… I think this team will be fine.', 'حسنًا… أظن أن هذا الفريق سيكون بخير.', { face: 'happy' }),
                ],
              },
              {
                text: { en: 'Let’s split the tasks right now so we don’t waste time.', ar: 'لنقسّم المهام الآن حتى لا نضيّع الوقت.' },
                quality: 1, style: 'structure', fx: { health: 5, trust: 1, bond: { sara: 1 } },
                happened: { en: 'Fast and organised — but nobody really got to know each other yet.', ar: 'سريع ومنظّم، لكن لم يتعرّف أحد على الآخر فعلًا بعد.' },
                reply: [
                  L('sara', 'Finally, someone who likes plans!', 'أخيرًا، شخص يحب الخطط!', { face: 'proud' }),
                  L('omar', '…Can we at least order coffee first?', '…هل يمكننا على الأقل أن نطلب القهوة أولًا؟', { face: 'neutral', emote: 'ellipsis' }),
                ],
              },
              {
                text: { en: 'Honestly? I usually end up doing everything myself.', ar: 'بصراحة؟ عادةً ينتهي بي الأمر إلى أن أفعل كل شيء بنفسي.' },
                quality: 0, style: 'solo', fx: { health: 2, trust: -5, bond: { mira: -1, omar: -1 } },
                happened: { en: 'It sounded like you don’t trust them yet. They noticed.', ar: { m: 'بدا كأنك لا تثق بهم بعد، وقد لاحظوا ذلك.', f: 'بدا كأنكِ لا تثقين بهم بعد، وقد لاحظوا ذلك.' } },
                reply: [
                  L('mira', 'Oh… okay.', 'آه… حسنًا.', { face: 'worried', emote: 'sweat' }),
                  L('sara', 'Not this time. We’re a team!', 'ليس هذه المرة. نحن فريق!', { face: 'worried' }),
                ],
              },
            ],
          },
          { t: 'cast', cast: [] },
          N('The first week ends with a group chat, a colour-coded plan and a lot of coffee. Next week, the real work begins.', 'ينتهي الأسبوع الأول بمجموعة محادثة، وخطة ملوّنة، والكثير من القهوة. وفي الأسبوع القادم يبدأ العمل الحقيقي.'),
          { t: 'cast', cast: [{ who: 'pixel', at: 'center', face: 'happy' }] },
          L('pixel', 'Meow. I’m Pixel. I live in your study room and I give hints. Come find me!', { m: 'مياو. أنا بيكسل، أعيش في غرفة المذاكرة وأقدّم التلميحات. تعالَ وابحث عني!', f: 'مياو. أنا بيكسل، أعيش في غرفة المذاكرة وأقدّم التلميحات. تعالي وابحثي عني!' }, { face: 'happy', emote: 'heart' }),
          { t: 'end' },
        ],
      },
    },
  },

  /* ================= Week 2 — Strangers in a Group Chat ================= */
  '1': {
    start: 'w2a',
    scenes: {
      w2a: {
        bg: 'room-evening',
        steps: [
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'neutral' }] },
          N('Week 2. The group chat is two days old, and it already has 214 messages.', 'الأسبوع الثاني. عمر مجموعة المحادثة يومان فقط، وفيها بالفعل 214 رسالة.'),
          {
            t: 'chat', msgs: [
              { id: 'c1m1', who: 'sara', text: { en: 'Reminder!! Everyone install Git and set your name before Thursday 🙏', ar: 'تذكير!! ليثبّت الجميع Git ويضبط اسمه قبل يوم الخميس 🙏' } },
              { id: 'c1m2', who: 'mira', text: { en: 'Done! I think… it said something about “config”? 😅', ar: 'تم! أظن ذلك… ظهرت كلمة «config»؟ 😅' } },
              { id: 'c1m3', who: 'sara', text: { en: 'Omar, are you there?', ar: 'عمر، هل أنت هنا؟' } },
              { id: 'c1m4', sys: true, text: { en: 'Seen by Omar', ar: 'شاهدها عمر' } },
            ],
          },
          { t: 'closeChat' },
          N('Omar has read everything and answered nothing. Before worrying about him, you set up your own tools.', { m: 'قرأ عمر كل شيء ولم يردّ على شيء. قبل أن تقلق بشأنه، تجهّز أدواتك أولًا.', f: 'قرأ عمر كل شيء ولم يردّ على شيء. قبل أن تقلقي بشأنه، تجهّزين أدواتك أولًا.' }),
          {
            t: 'terminal', id: 't1', ps: '~ $',
            task: { en: 'Check that Git is installed, then tell Git your name and email.', ar: { m: 'تأكّد من تثبيت Git، ثم أخبر Git باسمك وبريدك الإلكتروني.', f: 'تأكّدي من تثبيت Git، ثم أخبري Git باسمك وبريدك الإلكتروني.' } },
            steps: [
              { accept: ['git --version'], hint: 'git --version', out: ['git version 2.45.1'] },
              { acceptRe: '^git config --global user\\.name\\s+(["\'])(.{1,40})\\1$', hint: 'git config --global user.name "{name}"', term: 'git config', out: [] },
              { acceptRe: '^git config --global user\\.email\\s+(["\']?)([^\\s"\']+@[^\\s"\']+)\\1$', hint: 'git config --global user.email "you@example.com"', out: [] },
            ],
          },
          N('[[git config]] saved your name and email. Every [[commit]] you make will carry them, so the team knows who changed what.', { m: 'حفظ [[git config]] اسمك وبريدك الإلكتروني. سيحمل كل [[commit]] تنفّذه هذه البيانات، فيعرف الفريق مَن غيّر ماذا.', f: 'حفظ [[git config]] اسمك وبريدك الإلكتروني. سيحمل كل [[commit]] تنفّذينه هذه البيانات، فيعرف الفريق مَن غيّر ماذا.' }),
          {
            t: 'chat', msgs: [
              { id: 'c1m5', who: 'sara', text: { en: 'Omar, if you don’t answer, we’ll just give you the database part 😬', ar: 'عمر، إن لم تردّ فسنعطيك جزء قاعدة البيانات 😬' } },
              { id: 'c1m6', who: 'mira', text: { en: 'Maybe he’s just busy?', ar: 'ربما هو مشغول فقط؟' } },
            ],
          },
          {
            t: 'choice', id: 'c1-omar', key: true, via: 'chat', debrief: 'd1',
            hint: { en: 'Quiet doesn’t always mean lazy. What would make it easy for Omar to answer?', ar: 'الصمت لا يعني الكسل دائمًا. ما الذي يجعل الردّ سهلًا على عمر؟' },
            options: [
              {
                text: { en: 'Omar, are you even part of this team? 🙄', ar: 'عمر، هل أنت جزء من هذا الفريق أصلًا؟ 🙄' },
                quality: 0, style: 'direct', fx: { trust: -8, bond: { omar: -2 }, flags: { omarCalledOut: true } },
                happened: { en: 'You put Omar on the spot in front of everyone. Being called out in public makes quiet people go even quieter.', ar: { m: 'وضعتَ عمر في موقف محرج أمام الجميع. الانتقاد العلني يجعل الهادئين أكثر صمتًا.', f: 'وضعتِ عمر في موقف محرج أمام الجميع. الانتقاد العلني يجعل الهادئين أكثر صمتًا.' } },
                reply: [{ t: 'chat', msgs: [
                  { id: 'c1r1', who: 'omar', text: { en: 'yes.', ar: 'نعم.' } },
                  { id: 'c1r2', who: 'mira', text: { en: '😶', ar: '😶' } },
                ] }],
              },
              {
                text: { en: '(Private message to Omar) Hey! No pressure — which part of StudySpot sounds fun to you? I can share the setup steps if you need them.', ar: '(رسالة خاصة إلى عمر) مرحبًا! لا ضغط عليك؛ أيّ جزء من StudySpot يبدو ممتعًا لك؟ يمكنني مشاركة خطوات الإعداد إن احتجت إليها.' },
                quality: 2, style: 'empathy', fx: { trust: 5, bond: { omar: 3 }, flags: { omarDM: true } },
                happened: { en: 'You checked on Omar privately, with one short, easy question. He didn’t have to answer in front of the whole group.', ar: { m: 'سألتَ عن عمر على انفراد بسؤال واحد قصير وسهل، فلم يضطر إلى الردّ أمام المجموعة كلها.', f: 'سألتِ عن عمر على انفراد بسؤال واحد قصير وسهل، فلم يضطر إلى الردّ أمام المجموعة كلها.' } },
                reply: [{ t: 'chat', dm: 'omar', msgs: [
                  { id: 'c1r3', who: 'omar', text: { en: 'hey. sorry. new semester + a part-time job. I’d like the part that makes the app actually run.', ar: 'أهلًا. آسف. فصل جديد وعمل بدوام جزئي. أودّ الجزء الذي يجعل التطبيق يعمل فعلًا.' } },
                  { id: 'c1r4', who: 'omar', text: { en: 'thanks for asking.', ar: 'شكرًا على السؤال.' } },
                ] }],
              },
              {
                text: { en: 'Let’s just give him the leftover tasks. He can complain later.', ar: 'لنعطه المهام المتبقية فقط، ويمكنه أن يعترض لاحقًا.' },
                quality: 0, style: 'avoid', fx: { health: 2, trust: -4, bond: { omar: -1 } },
                happened: { en: 'Fast — but Omar got the tasks nobody wanted, without being asked. That’s how quiet teammates stop caring.', ar: 'كان ذلك سريعًا، لكن عمر حصل على المهام التي لم يردها أحد دون أن يُسأل. هكذا يفقد الزملاء الهادئون اهتمامهم.' },
                reply: [{ t: 'chat', msgs: [
                  { id: 'c1r5', who: 'sara', text: { en: 'Hmm… okay, I’ll add it to the plan.', ar: 'همم… حسنًا، سأضيف ذلك إلى الخطة.' } },
                ] }],
              },
              {
                text: { en: 'Omar, no worries if you’re busy! Just tell us which part you’d like 🙂', ar: 'عمر، لا بأس إن كنت مشغولًا! أخبرنا فقط بالجزء الذي تفضّله 🙂' },
                quality: 1, style: 'direct', fx: { trust: 3, bond: { omar: 1 } },
                happened: { en: 'Friendly and clear. Still, a public mention can feel like pressure for someone who is already overwhelmed.', ar: 'رسالة ودّية وواضحة، لكن مخاطبته أمام الجميع قد تبدو ضغطًا على شخص مُثقل أصلًا.' },
                reply: [{ t: 'chat', msgs: [
                  { id: 'c1r6', who: 'omar', text: { en: 'the part that makes it run, I guess. sorry, busy week.', ar: 'الجزء الذي يجعله يعمل، على ما أظن. آسف، أسبوع مزدحم.' } },
                ] }],
              },
            ],
          },
          { t: 'closeChat' },
          { t: 'if', cond: { flag: 'omarDM' }, then: [
            N('Later, Omar sends one more line: “I’ll be at the café on Thursday.” From Omar, that’s a whole speech.', 'لاحقًا يرسل عمر سطرًا آخر: «سأكون في المقهى يوم الخميس». بالنسبة إلى عمر، هذه خطبة كاملة.'),
          ] },
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'happy' }, { who: 'pixel', at: 'right', face: 'happy' }] },
          L('pixel', 'Meow. A team isn’t a group chat. It’s who feels safe enough to talk in it.', 'مياو. الفريق ليس مجموعة محادثة، بل هو مَن يشعر بالأمان ليتكلم فيها.', { face: 'happy' }),
          { t: 'end' },
        ],
      },
    },
  },

  /* ================= Week 3 — The Team Contract ================= */
  '2': {
    start: 'w3a',
    scenes: {
      w3a: {
        bg: 'lecture',
        steps: [
          N('Week 3. Lecture hall B. Eng. Nour writes one word on the board: CONTRACT.', 'الأسبوع الثالث. في القاعة B تكتب المهندسة نور كلمة واحدة على السبورة: «عقد».'),
          { t: 'cast', cast: [{ who: 'nour', at: 'center', face: 'happy' }] },
          L('nour', 'Every team writes a contract this week: who does what, how you talk, and what “done” means.', 'سيكتب كل فريق عقدًا هذا الأسبوع: مَن يفعل ماذا، وكيف تتواصلون، وماذا تعني كلمة «انتهى».', { face: 'happy' }),
          L('nour', 'Teams that skip this step usually argue about it in Week 9. Loudly.', 'الفرق التي تتجاوز هذه الخطوة تتجادل حولها عادةً في الأسبوع التاسع، وبصوت عالٍ.', { face: 'proud' }),
          { t: 'goto', to: 'w3b' },
        ],
      },
      w3b: {
        bg: 'cafe-morning',
        steps: [
          { t: 'cast', cast: [{ who: 'mira', at: 'left', face: 'neutral' }, { who: 'sara', at: 'center', face: 'happy' }, { who: 'omar', at: 'right', face: 'neutral' }] },
          N('Café Commit. Sara unrolls her plan. It has forty rows and five colours.', 'في مقهى Café Commit تفرد سارة خطتها: أربعون صفًا وخمسة ألوان.'),
          L('sara', 'I split everything by hours! Omar takes all the hard parts, because he’s the fastest.', 'قسّمتُ كل شيء بالساعات! يأخذ عمر كل الأجزاء الصعبة لأنه الأسرع.', { face: 'happy', emote: 'sparkle' }),
          { t: 'if', cond: { flag: 'omarDM' }, then: [
            L('omar', 'I said I like making things run. Not… everything.', 'قلتُ إنني أحب أن أجعل الأشياء تعمل، لا… كل شيء.', { face: 'surprised', emote: 'sweat' }),
          ], else: [
            L('omar', '…All of them?', '…كلها؟', { face: 'surprised', emote: 'sweat' }),
          ] },
          L('mira', 'And I only do the colours?', 'وأنا أتولّى الألوان فقط؟', { face: 'worried' }),
          {
            t: 'choice', id: 'c2-split', key: true, via: 'dialogue', debrief: 'd2',
            prompt: { en: 'How should the team split the work?', ar: 'كيف يقسّم الفريق العمل؟' },
            hint: { en: 'A good split uses strengths and gives everyone room to grow. Ask before you assign.', ar: { m: 'التقسيم الجيد يستفيد من نقاط القوة ويمنح الجميع فرصة للنمو. اسأل قبل أن تكلّف أحدًا.', f: 'التقسيم الجيد يستفيد من نقاط القوة ويمنح الجميع فرصة للنمو. اسألي قبل أن تكلّفي أحدًا.' } },
            options: [
              {
                text: { en: 'Let’s each say what we’re good at and what we want to learn, then split from there.', ar: 'ليقل كلٌّ منا ما يجيده وما يريد تعلّمه، ثم نقسّم العمل على هذا الأساس.' },
                quality: 2, style: 'empathy', fx: { trust: 6, health: 3, bond: { mira: 1, sara: 1, omar: 1 }, flags: { splitByInterest: true } },
                happened: { en: 'Everyone got a say. The split now matches strengths and what each person wants to learn.', ar: 'صار لكل شخص رأي، وأصبح التقسيم يناسب نقاط القوة وما يريد كل فرد تعلّمه.' },
                reply: [
                  L('mira', 'Then… I’d like to learn some real logic too, not only colours.', 'إذن… أودّ أن أتعلّم شيئًا من المنطق البرمجي أيضًا، لا الألوان فقط.', { face: 'happy' }),
                  L('omar', 'I’ll take the part that makes it run. And I can pair with Mira sometimes.', 'سآخذ الجزء الذي يجعله يعمل، ويمكنني أن أعمل مع ميرا أحيانًا.', { face: 'happy' }),
                ],
              },
              {
                text: { en: 'Sara’s plan is great. Let’s follow it exactly.', ar: 'خطة سارة رائعة، لنتبعها كما هي تمامًا.' },
                quality: 0, style: 'avoid', fx: { health: 2, trust: -3, bond: { sara: 1, omar: -2, mira: -1 } },
                happened: { en: 'Sara felt supported — but Omar got buried in work and Mira was boxed into “colours”. Agreeing just to avoid friction only stores it up for later.', ar: 'شعرت سارة بالدعم، لكن عمر غرق في العمل وحُصرت ميرا في «الألوان». الموافقة لمجرد تجنّب الخلاف تؤجّله فقط.' },
                reply: [L('omar', '…Fine.', '…حسنًا.', { face: 'upset', emote: 'ellipsis' })],
              },
              {
                text: { en: 'I’ll take the hardest parts myself. It’s faster than explaining.', ar: 'سآخذ الأجزاء الأصعب بنفسي، فهذا أسرع من الشرح.' },
                quality: 0, style: 'solo', fx: { health: 4, trust: -5, bond: { omar: -1, mira: -1 }, flags: { tookHardParts: true } },
                happened: { en: 'You took the load off the others — and their chance to learn with it. Carrying everything looks strong in Week 3 and hurts by Week 9.', ar: { m: 'حملتَ العبء عن الآخرين، ومعه فرصتهم في التعلّم. حمل كل شيء يبدو قوة في الأسبوع الثالث، ويؤلم في الأسبوع التاسع.', f: 'حملتِ العبء عن الآخرين، ومعه فرصتهم في التعلّم. حمل كل شيء يبدو قوة في الأسبوع الثالث، ويؤلم في الأسبوع التاسع.' } },
                reply: [L('sara', 'Oh… okay. If you’re sure.', { m: 'آه… حسنًا، إن كنتَ متأكدًا.', f: 'آه… حسنًا، إن كنتِ متأكدة.' }, { face: 'worried' })],
              },
            ],
          },
          { t: 'cast', cast: [{ who: 'sara', at: 'center', face: 'worried' }] },
          N('Later, everyone has left except Sara. She is colouring row 41.', 'لاحقًا يغادر الجميع إلا سارة؛ إنها تلوّن الصف الحادي والأربعين.'),
          L('sara', 'Sorry. When I’m nervous, I make plans. Lots of plans.', 'آسفة. عندما أتوتّر أضع الخطط… الكثير من الخطط.', { face: 'worried', emote: 'sweat' }),
          {
            t: 'choice', id: 'c2-sara', via: 'dialogue',
            prompt: { en: 'What do you say to Sara?', ar: { m: 'ماذا تقول لسارة؟', f: 'ماذا تقولين لسارة؟' } },
            hint: { en: 'Sara carries a lot quietly. What would actually make her load lighter?', ar: 'تحمل سارة الكثير بصمت. ما الذي يخفّف حملها فعلًا؟' },
            options: [
              {
                text: { en: 'Your plan helped a lot. What can I take off your plate?', ar: 'خطتك ساعدتنا كثيرًا. ما الذي يمكنني أن أحمله عنكِ؟' },
                quality: 2, style: 'empathy', fx: { trust: 4, bond: { sara: 2 }, flags: { askedSara: true } },
                reply: [L('sara', 'Really? Could you own the team contract document? That would help so much.', 'حقًا؟ هل يمكنك أن تتولّى وثيقة عقد الفريق؟ سيساعدني ذلك كثيرًا.', { face: 'happy', emote: 'heart' })],
              },
              {
                text: { en: 'You should relax. It’s just a uni project.', ar: 'عليكِ أن تهدئي، إنه مجرد مشروع جامعي.' },
                quality: 0, style: 'direct', fx: { trust: -3, bond: { sara: -1 } },
                reply: [L('sara', 'Right. Sure.', 'صحيح. بالتأكيد.', { face: 'upset', emote: 'ellipsis' })],
              },
              {
                text: { en: 'Let’s shorten the plan together — maybe ten rows?', ar: 'لنختصر الخطة معًا، ربما إلى عشرة صفوف؟' },
                quality: 1, style: 'structure', fx: { health: 2, trust: 2, bond: { sara: 1 } },
                reply: [L('sara', 'Ten rows? I can try. Eleven?', 'عشرة صفوف؟ سأحاول. ما رأيك في أحد عشر؟', { face: 'happy' })],
              },
            ],
          },
          { t: 'cast', cast: [] },
          N('By evening, the contract is pinned in the chat: roles, a 24-hour reply rule, and what “done” means.', 'بحلول المساء تُثبَّت الوثيقة في المحادثة: الأدوار، وقاعدة الردّ خلال 24 ساعة، وتعريف كلمة «انتهى».'),
          { t: 'cast', cast: [{ who: 'pixel', at: 'center', face: 'happy' }] },
          L('pixel', 'Meow! Contracts aren’t really about rules. They’re about fewer surprises.', 'مياو! العقود لا تتعلّق بالقواعد حقًا، بل بمفاجآت أقل.', { face: 'happy' }),
          { t: 'end' },
        ],
      },
    },
  },

  /* ================= Week 4 — Hello, Repo ================= */
  '3': {
    start: 'w4a',
    scenes: {
      w4a: {
        bg: 'room-evening',
        steps: [
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'neutral' }] },
          N('Week 4. Omar has created the StudySpot repository on GitHub. Time to get your own copy.', 'الأسبوع الرابع. أنشأ عمر مستودع StudySpot على GitHub، وحان وقت الحصول على نسختك الخاصة.'),
          {
            t: 'terminal', id: 't3a', ps: '~ $',
            task: { en: 'Clone the team repository, then move into its folder.', ar: { m: 'انسخ مستودع الفريق بالأمر clone، ثم انتقل إلى مجلده.', f: 'انسخي مستودع الفريق بالأمر clone، ثم انتقلي إلى مجلده.' } },
            steps: [
              { acceptRe: '^git clone (https://github\\.com/|git@github\\.com:)studyspot/studyspot(\\.git)?$', hint: 'git clone https://github.com/studyspot/studyspot.git', term: 'git clone', out: ["Cloning into 'studyspot'...", 'remote: Enumerating objects: 12, done.', 'Receiving objects: 100% (12/12), done.'] },
              { accept: ['cd studyspot', 'cd studyspot/'], hint: 'cd studyspot', ps: 'studyspot (main) $', out: [] },
            ],
          },
          N('A [[repository]] is the project’s shared home: every file and its whole history. [[git clone]] gave you a full copy.', 'الـ[[repository]] هو البيت المشترك للمشروع: كل ملف وتاريخه الكامل، وقد أعطاك [[git clone]] نسخة كاملة منه.'),
          N('You run the project for the first time, and a new file appears: {secret}.', { m: 'تشغّل المشروع لأول مرة، فيظهر ملف جديد: {secret}.', f: 'تشغّلين المشروع لأول مرة، فيظهر ملف جديد: {secret}.' }),
          { t: 'if', cond: { track: 'web' }, then: [N('It holds the team’s API key. Anyone who sees it can use your account.', 'يحتوي على مفتاح API الخاص بالفريق، وأي شخص يراه يستطيع استخدام حسابكم.')] },
          { t: 'if', cond: { track: 'mobile' }, then: [N('It holds the signing key that proves the app is really yours.', 'يحتوي على مفتاح التوقيع الذي يثبت أن التطبيق لكم فعلًا.')] },
          { t: 'if', cond: { track: 'ai' }, then: [N('It holds 2 GB of raw check-in data — with real student IDs.', 'يحتوي على 2 جيجابايت من بيانات الحضور الخام، ومعها أرقام طلاب حقيقية.')] },
          {
            t: 'chat', msgs: [
              { id: 'c3m1', who: 'mira', text: { en: 'Should we just commit everything, so nobody is missing files? 🤔', ar: 'هل نرفع كل شيء في commit حتى لا تنقص أحدًا أي ملفات؟ 🤔' } },
            ],
          },
          { t: 'closeChat' },
          {
            t: 'choice', id: 'c3-secret', key: true, via: 'dialogue', debrief: 'd3', hintKind: 'tech',
            prompt: { en: 'What do you do with {secret}?', ar: { m: 'ماذا تفعل بالملف {secret}؟', f: 'ماذا تفعلين بالملف {secret}؟' } },
            hint: { en: 'Git remembers everything, forever. What should never enter the shared history?', ar: 'يتذكّر Git كل شيء إلى الأبد. ما الذي يجب ألّا يدخل التاريخ المشترك أبدًا؟' },
            options: [
              {
                text: { en: 'Add it to .gitignore, and share a safe example file instead.', ar: 'سأضيفه إلى .gitignore، وأشارك بدلًا منه ملف مثال آمنًا.' },
                quality: 2, style: 'structure', fx: { health: 6, trust: 2, flags: { gitignoreDone: true } },
                happened: { en: 'Git will now ignore {secret}. The team gets an example file showing what to fill in — without the real secret.', ar: 'سيتجاهل Git الآن الملف {secret}، ويحصل الفريق على ملف مثال يوضّح ما يجب ملؤه، دون السرّ الحقيقي.' },
                reply: [{ t: 'chat', msgs: [{ id: 'c3r1', who: 'mira', text: { en: 'Ohh, so THAT’s what .gitignore is for! Learned something 📝', ar: 'آه، هذه إذن وظيفة .gitignore! تعلّمتُ شيئًا جديدًا 📝' } }] }],
              },
              {
                text: { en: 'Commit it. The repo is private anyway.', ar: 'سأرفعه في commit، فالمستودع خاص على أي حال.' },
                quality: 0, style: 'solo', fx: { health: -6, flags: { secretCommitted: true } },
                happened: { en: 'Private repos get shared, copied and sometimes made public. Once a secret is in the history, deleting the file later doesn’t remove it.', ar: 'المستودعات الخاصة تُشارَك وتُنسَخ، وقد تصبح عامة أحيانًا. وبمجرد دخول السرّ إلى التاريخ، لا يزيله حذف الملف لاحقًا.' },
                reply: [{ t: 'chat', msgs: [{ id: 'c3r2', who: 'omar', text: { en: '…please don’t. the history keeps it forever.', ar: '…أرجوك لا. التاريخ يحتفظ به إلى الأبد.' } }] }],
              },
              {
                text: { en: 'Delete the file so it can’t be committed.', ar: 'سأحذف الملف حتى لا يُرفع.' },
                quality: 1, style: 'avoid', fx: { health: -1, trust: 1 },
                happened: { en: 'Safe for now — but the project needs that file to run, and nothing stops the next person from committing theirs.', ar: 'آمن الآن، لكن المشروع يحتاج إلى هذا الملف ليعمل، ولا شيء يمنع الشخص التالي من رفع نسخته.' },
                reply: [{ t: 'chat', msgs: [{ id: 'c3r3', who: 'sara', text: { en: 'Wait, now the app won’t start 😅', ar: 'مهلًا، التطبيق لا يعمل الآن 😅' } }] }],
              },
            ],
          },
          {
            t: 'terminal', id: 't3b',
            task: { en: 'Make your first commit and push it.', ar: { m: 'نفّذ أول commit لك، ثم ارفعه بالأمر push.', f: 'نفّذي أول commit لكِ، ثم ارفعيه بالأمر push.' } },
            steps: [
              { accept: ['git add .gitignore', 'git add .', 'git add -a', 'git add --all'], hint: 'git add .gitignore', term: 'git add', out: [] },
              { acceptRe: '^git commit -m\\s+(["\'])(.{5,72})\\1$', hint: 'git commit -m "Add .gitignore for local secrets"', term: 'commit', out: ['[main 1a2b3c4] {msg}', ' 1 file changed, 3 insertions(+)'] },
              { accept: ['git push', 'git push origin main'], hint: 'git push', term: 'push', out: ['To github.com:studyspot/studyspot.git', '   0f9e8d7..1a2b3c4  main -> main'] },
            ],
          },
          N('Your first [[commit]] is on GitHub: small, clear and explained — the way commits should be.', 'أول [[commit]] لك موجود الآن على GitHub: صغير وواضح ومشروح، كما يجب أن تكون الـ commits.'),
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'happy' }, { who: 'pixel', at: 'right', face: 'happy' }] },
          L('pixel', 'Meow. A good commit message tells future-you what you were thinking today.', { m: 'مياو. رسالة الـ commit الجيدة تخبرك في المستقبل بما كنت تفكّر فيه اليوم.', f: 'مياو. رسالة الـ commit الجيدة تخبركِ في المستقبل بما كنتِ تفكّرين فيه اليوم.' }, { face: 'happy' }),
          { t: 'end' },
        ],
      },
    },
  },

  /* ================= Week 5 — Branch Out ================= */
  '4': {
    start: 'w5a',
    scenes: {
      w5a: {
        bg: 'room-morning',
        steps: [
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'neutral' }, { who: 'sara', at: 'right', face: 'worried' }] },
          N('Week 5. Sara drops by the study room with two coffees and a worried face.', 'الأسبوع الخامس. تمرّ سارة على غرفة المذاكرة ومعها كوبا قهوة ووجه قلق.'),
          { t: 'if', cond: { flag: 'askedSara' }, then: [
            L('sara', 'Thanks again for taking the contract document. I actually slept this week.', { m: 'شكرًا مرة أخرى لأنك تولّيتَ وثيقة العقد. نمتُ فعلًا هذا الأسبوع.', f: 'شكرًا مرة أخرى لأنكِ تولّيتِ وثيقة العقد. نمتُ فعلًا هذا الأسبوع.' }, { face: 'happy', emote: 'heart' }),
          ] },
          L('sara', 'Eng. Nour wants a working {feature} by Friday. Can you just push it straight to [[main]]? Branches feel slow.', 'تريد المهندسة نور أن يعمل {feature} بحلول الجمعة. هل يمكنك أن ترفعه مباشرة إلى [[main]]؟ الفروع تبدو بطيئة.', { face: 'worried', emote: 'sweat' }),
          N('If half-finished work lands on [[main]], everyone who pulls gets your bugs too.', 'إذا وصل عمل غير مكتمل إلى [[main]]، فسيحصل كل من يسحب التحديثات على أخطائك أيضًا.'),
          {
            t: 'choice', id: 'c4-branch', key: true, via: 'dialogue', debrief: 'd4',
            prompt: { en: 'What do you tell Sara?', ar: { m: 'ماذا تقول لسارة؟', f: 'ماذا تقولين لسارة؟' } },
            hint: { en: 'Speed today versus a broken main tomorrow. Is there a way to give Sara both?', ar: 'السرعة اليوم مقابل main معطّل غدًا. هل توجد طريقة تمنح سارة الأمرين؟' },
            options: [
              {
                text: { en: 'A branch takes ten seconds. Let me show you — and you’ll see my progress the whole time.', ar: 'إنشاء branch يستغرق عشر ثوانٍ. دعيني أريكِ، وسترين تقدّمي طوال الوقت.' },
                quality: 2, style: 'structure', fx: { health: 6, trust: 3, bond: { sara: 1 }, flags: { usesBranches: true } },
                happened: { en: 'You kept main safe and answered Sara’s real worry: she wanted to see progress, not to skip safety.', ar: { m: 'حافظتَ على main آمنًا وأجبتَ عن قلق سارة الحقيقي: كانت تريد أن ترى التقدّم، لا أن تتجاوز الأمان.', f: 'حافظتِ على main آمنًا وأجبتِ عن قلق سارة الحقيقي: كانت تريد أن ترى التقدّم، لا أن تتجاوز الأمان.' } },
                reply: [L('sara', 'Ten seconds? Okay, show me.', 'عشر ثوانٍ؟ حسنًا، أرني.', { face: 'happy' })],
              },
              {
                text: { en: 'Sure, I’ll push straight to main. Deadline first.', ar: 'حسنًا، سأرفعه مباشرة إلى main. الموعد النهائي أولًا.' },
                quality: 0, style: 'avoid', fx: { health: -6, trust: 1, bond: { sara: 1 }, flags: { pushedToMain: true } },
                happened: { en: 'Sara was relieved — until Mira pulled your half-done code and her screens stopped working.', ar: 'ارتاحت سارة، إلى أن سحبت ميرا الكود غير المكتمل فتوقّفت شاشاتها عن العمل.' },
                reply: [{ t: 'chat', msgs: [{ id: 'c4r1', who: 'mira', text: { en: 'Why is everything red?? 😭 I just pulled main', ar: 'لماذا كل شيء أحمر؟؟ 😭 سحبتُ main للتو' } }] }],
              },
              {
                text: { en: 'No. Rules are rules. Branches are best practice, end of discussion.', ar: 'لا. القواعد قواعد، والفروع هي الممارسة الصحيحة. انتهى النقاش.' },
                quality: 1, style: 'direct', fx: { health: 4, trust: -3, bond: { sara: -1 } },
                happened: { en: 'Right call, wrong delivery. Sara heard “end of discussion” instead of “here’s how this protects you”.', ar: 'القرار صحيح لكن الأسلوب خاطئ؛ سمعت سارة «انتهى النقاش» بدل «إليكِ كيف يحميكِ هذا».' },
                reply: [L('sara', 'Fine. I was only asking.', 'حسنًا. كنتُ أسأل فقط.', { face: 'upset', emote: 'ellipsis' })],
              },
            ],
          },
          { t: 'if', cond: { flag: 'pushedToMain' }, then: [
            N('Lesson learned. You move your work onto a branch and put main back the way it was.', { m: 'درس مفيد. تنقل عملك إلى branch وتعيد main إلى ما كان عليه.', f: 'درس مفيد. تنقلين عملك إلى branch وتعيدين main إلى ما كان عليه.' }),
          ] },
          {
            t: 'terminal', id: 't4',
            task: { en: 'Create a branch for your feature, switch to it, and push it to GitHub.', ar: { m: 'أنشئ branch لميزتك وانتقل إليه، ثم ارفعه إلى GitHub.', f: 'أنشئي branch لميزتك وانتقلي إليه، ثم ارفعيه إلى GitHub.' } },
            steps: [
              { accept: ['git switch -c feature/{feature}', 'git checkout -b feature/{feature}'], hint: 'git switch -c feature/{feature}', term: 'git switch', ps: 'studyspot (feature/{feature}) $', out: ["Switched to a new branch 'feature/{feature}'"] },
              { accept: ['git push -u origin feature/{feature}', 'git push --set-upstream origin feature/{feature}'], hint: 'git push -u origin feature/{feature}', term: 'push', out: ['To github.com:studyspot/studyspot.git', ' * [new branch]      feature/{feature} -> feature/{feature}', "branch 'feature/{feature}' set up to track 'origin/feature/{feature}'."] },
            ],
          },
          N('Your work now lives on its own [[branch]]. [[main]] stays clean until the feature is ready.', 'يعيش عملك الآن على [[branch]] خاص به، ويبقى [[main]] نظيفًا حتى تجهز الميزة.'),
          L('sara', 'Wait, I can see your branch on GitHub. And main still works. Okay… I’m convinced.', 'مهلًا، أستطيع رؤية فرعك على GitHub، وما زال main يعمل. حسنًا… لقد اقتنعت.', { face: 'happy', emote: 'sparkle' }),
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'happy' }, { who: 'pixel', at: 'right', face: 'happy' }] },
          L('pixel', 'Meow! Branches are like drafts. You don’t hand in a draft — you polish it first.', { m: 'مياو! الفروع مثل المسوّدات؛ لا تسلّم المسوّدة، بل تحسّنها أولًا.', f: 'مياو! الفروع مثل المسوّدات؛ لا تسلّمين المسوّدة، بل تحسّنينها أولًا.' }, { face: 'happy' }),
          { t: 'end' },
        ],
      },
    },
  },

  /* ================= Week 6 — Review Me Gently ================= */
  '5': {
    start: 'w6a',
    scenes: {
      w6a: {
        bg: 'room-evening',
        steps: [
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'neutral' }] },
          N('Week 6. A notification: Mira opened her first [[pull request]] — and asked you to review it.', 'الأسبوع السادس. يصلك إشعار: فتحت ميرا أول [[pull request]] لها، وطلبت منك مراجعته.'),
          {
            t: 'chat', dm: 'mira', msgs: [
              { id: 'c5m1', who: 'mira', text: { en: 'I opened a PR for the booking button 🙈 please be honest. but also gentle. mostly gentle', ar: { m: 'فتحتُ PR لزر الحجز 🙈 كن صريحًا من فضلك… لكن لطيفًا أيضًا. لطيفًا في الغالب', f: 'فتحتُ PR لزر الحجز 🙈 كوني صريحة من فضلك… لكن لطيفة أيضًا. لطيفة في الغالب' } } },
            ],
          },
          { t: 'closeChat' },
          N('You read her changes. The new button looks lovely — but it can be tapped twice, which books the same room twice.', { m: 'تقرأ تعديلاتها. يبدو الزر الجديد جميلًا، لكن يمكن النقر عليه مرتين، فيُحجز المكان نفسه مرتين.', f: 'تقرئين تعديلاتها. يبدو الزر الجديد جميلًا، لكن يمكن النقر عليه مرتين، فيُحجز المكان نفسه مرتين.' }),
          N('A [[code review]] is where teammates check a change before it reaches [[main]]. It’s about the code — and about the person who reads your comment.', 'الـ[[code review]] هو المرحلة التي يفحص فيها الزملاء التعديل قبل وصوله إلى [[main]]. وهي تتعلّق بالكود، وبالشخص الذي سيقرأ تعليقك أيضًا.'),
          {
            t: 'choice', id: 'c5-review', key: true, via: 'dialogue', debrief: 'd5',
            prompt: { en: 'Which review comment do you leave?', ar: { m: 'أيّ تعليق مراجعة تكتب؟', f: 'أيّ تعليق مراجعة تكتبين؟' } },
            hint: { en: 'A good review is specific and kind, and says what to change — not only what’s wrong.', ar: 'المراجعة الجيدة محدّدة ولطيفة، وتقول ما يجب تغييره لا ما هو خاطئ فقط.' },
            options: [
              {
                text: { en: '“Love the new colours! One thing: the button can be tapped twice. Could we disable it while it’s loading?”', ar: '«أحببتُ الألوان الجديدة! ملاحظة واحدة: يمكن النقر على الزر مرتين. هل يمكننا تعطيله أثناء التحميل؟»' },
                quality: 2, style: 'empathy', fx: { health: 5, trust: 4, bond: { mira: 2 }, flags: { goodReview: true } },
                happened: { en: 'Specific, kind and actionable. Mira fixed it in ten minutes and added a “Booking…” state.', ar: 'تعليق محدّد ولطيف وقابل للتنفيذ. أصلحت ميرا المشكلة في عشر دقائق وأضافت حالة «Booking…».' },
                reply: [{ t: 'chat', dm: 'mira', msgs: [{ id: 'c5r1', who: 'mira', text: { en: 'omg you’re right!! fixed + added a loading state. thank you for being nice about it 💗', ar: { m: 'يا إلهي، معك حق!! أصلحتُه وأضفتُ حالة تحميل. شكرًا لأنك كنتَ لطيفًا 💗', f: 'يا إلهي، معكِ حق!! أصلحتُه وأضفتُ حالة تحميل. شكرًا لأنكِ كنتِ لطيفة 💗' } } }] }],
              },
              {
                text: { en: '“LGTM 👍” (approve without testing it)', ar: '«LGTM 👍» (موافقة دون تجربة التعديل)' },
                quality: 0, style: 'avoid', fx: { health: -5, bond: { mira: 1 }, flags: { rubberStamp: true } },
                happened: { en: 'Mira felt good for a day. Then a tester booked the same room twice, and the bug landed on her name.', ar: 'شعرت ميرا بالرضا ليوم واحد، ثم حجز أحد المختبِرين المكان نفسه مرتين، ونُسب الخطأ إليها.' },
                reply: [{ t: 'chat', dm: 'mira', msgs: [{ id: 'c5r2', who: 'mira', text: { en: 'yay!! merging 🎉', ar: 'رائع!! سأدمجه الآن 🎉' } }] }],
              },
              {
                text: { en: '“This is wrong. The button breaks on double tap. Redo it.”', ar: '«هذا خطأ. الزر يتعطّل عند النقر المزدوج. أعيدي كتابته.»' },
                quality: 1, style: 'direct', fx: { health: 4, trust: -4, bond: { mira: -2 }, flags: { harshReview: true } },
                happened: { en: 'The bug got fixed — but Mira read “this is wrong” as “you are wrong”. She stopped asking you for reviews.', ar: 'أُصلح الخطأ، لكن ميرا قرأت «هذا خطأ» على أنه «أنتِ مخطئة»، فتوقّفت عن طلب المراجعة منك.' },
                reply: [{ t: 'chat', dm: 'mira', msgs: [{ id: 'c5r3', who: 'mira', text: { en: 'ok. sorry.', ar: 'حسنًا. آسفة.' } }] }],
              },
              {
                text: { en: '(Fix it myself on her branch without telling her.)', ar: '(سأصلحه بنفسي على فرعها دون أن أخبرها.)' },
                quality: 0, style: 'solo', fx: { health: 3, trust: -3, bond: { mira: -1 } },
                happened: { en: 'The code works, but Mira never learned what was wrong — and found surprise changes on her branch.', ar: 'صار الكود يعمل، لكن ميرا لم تعرف ما كان خاطئًا، ووجدت تعديلات مفاجئة على فرعها.' },
                reply: [{ t: 'chat', dm: 'mira', msgs: [{ id: 'c5r4', who: 'mira', text: { en: 'wait, who changed my branch? 😟', ar: 'مهلًا، مَن عدّل فرعي؟ 😟' } }] }],
              },
            ],
          },
          {
            t: 'chat', msgs: [
              { id: 'c5m2', who: 'sara', text: { en: 'Demo prep starts next week! Everyone push your work by Thursday night 😬', ar: 'يبدأ التحضير للعرض الأسبوع القادم! ليرفع الجميع أعمالهم قبل مساء الخميس 😬' } },
              { id: 'c5m3', who: 'mira', text: { en: 'Git still scares me when it says “rejected” 🫣', ar: 'ما زال Git يخيفني عندما يقول «rejected» 🫣' } },
            ],
          },
          { t: 'closeChat' },
          N('Nobody answers Mira’s last message. Everyone is busy. Next week, that will matter.', 'لا يردّ أحد على رسالة ميرا الأخيرة؛ فالجميع مشغولون. وفي الأسبوع القادم سيكون لذلك أثر.'),
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'worried' }, { who: 'pixel', at: 'right', face: 'neutral' }] },
          L('pixel', 'Meow… keep an eye on Mira. Fear makes people take shortcuts.', { m: 'مياو… انتبه لميرا. الخوف يدفع الناس إلى الطرق المختصرة.', f: 'مياو… انتبهي لميرا. الخوف يدفع الناس إلى الطرق المختصرة.' }),
          { t: 'end' },
        ],
      },
    },
  },

  '6': {
    start: 's1',
    scenes: {
      s1: {
        bg: 'room-evening',
        steps: [
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'neutral' }] },
          N('Week 7. Evening in the study room. The demo is four weeks away.', 'الأسبوع السابع. مساءٌ في غرفة المذاكرة، والعرض التجريبي بعد أربعة أسابيع.'),
          {
            t: 'chat', msgs: [
              { id: 'c6m1', who: 'mira', text: { en: 'Pushed the new booking UI!! 🎉 sorry it’s late', ar: 'نفّذتُ push لواجهة الحجز الجديدة!! 🎉 آسفة على التأخير' } },
              { id: 'c6m2', who: 'sara', text: { en: 'Yaaay 💜 it looks SO good', ar: 'رائع 💜 تبدو جميلة جدًا' }, react: '💗' },
              { id: 'c6m3', who: 'omar', text: { en: '👍', ar: '👍' } },
            ],
          },
          { t: 'closeChat' },
          N('You open GitHub. Your [[commit]] from yesterday — the {feature} validation — is gone from [[main]].', { m: 'تفتح GitHub. الـ[[commit]] الذي رفعتَه أمس، أي التحقّق من صحة {feature}، اختفى من [[main]].', f: 'تفتحين GitHub. الـ[[commit]] الذي رفعتِه أمس، أي التحقّق من صحة {feature}، اختفى من [[main]].' }),
          L('you', 'Wait. Where did my code go?', 'مهلًا… أين ذهب الكود الخاص بي؟', { face: 'surprised', emote: 'alert' }),
          {
            t: 'terminal', id: 't6a',
            task: { en: 'Pull the latest main and ask Git what’s going on.', ar: { m: 'اسحب آخر نسخة من main واسأل Git عمّا يحدث.', f: 'اسحبي آخر نسخة من main واسألي Git عمّا يحدث.' } },
            steps: [
              { accept: ['git pull', 'git pull origin main'], hint: 'git pull', term: 'git pull',
                out: ['remote: Enumerating objects: 9, done.', 'From github.com:studyspot/studyspot', ' + 3f2a1c9...8be41d2 main -> origin/main  (forced update)', 'Auto-merging {file}', '!CONFLICT (content): Merge conflict in {file}', '!Automatic merge failed; fix conflicts and then commit the result.'] },
              { accept: ['git status'], hint: 'git status', term: 'git status',
                out: ['On branch main', 'You have unmerged paths.', '  (fix conflicts and run "git commit")', '', 'Unmerged paths:', '!\tboth modified:   {file}'] },
            ],
          },
          N('A [[merge conflict]]: your version and Mira’s changed the same lines, so Git can’t decide alone.', 'هذا [[merge conflict]]: نسختك ونسخة ميرا غيّرتا الأسطر نفسها، فلا يستطيع Git أن يقرّر وحده.', { term: 'merge conflict' }),
          N('The log says “forced update”. Someone used [[force push]].', 'يقول السجل «forced update»؛ أي أن أحدهم استخدم [[force push]].', { term: 'force push' }),
          L('you', 'She pushed right over my work…', 'لقد رفعت نسختها فوق عملي مباشرة…', { face: 'upset', emote: 'anger' }),
          {
            t: 'choice', id: 'c6-react', key: true, via: 'chat', debrief: 'd6a',
            hint: { en: 'How would you feel reading each message if you were Mira?', ar: { m: 'كيف ستشعر لو كنتَ ميرا وقرأتَ كل رسالة؟', f: 'كيف ستشعرين لو كنتِ ميرا وقرأتِ كل رسالة؟' } },
            options: [
              {
                text: { en: 'Mira, you overwrote my work. AGAIN?? 😡', ar: 'ميرا، لقد مسحتِ عملي. مرة أخرى؟؟ 😡' },
                quality: 0, style: 'direct', fx: { trust: -10, bond: { mira: -2 }, flags: { blamedMiraPublicly: true } },
                happened: { en: 'You called Mira out in front of the whole team. She felt ashamed, and the chat went cold.', ar: { m: 'انتقدتَ ميرا أمام الفريق كله، فشعرت بالحرج وبرد جو المحادثة.', f: 'انتقدتِ ميرا أمام الفريق كله، فشعرت بالحرج وبرد جو المحادثة.' } },
                reply: [
                  { t: 'chat', msgs: [
                    { id: 'c6r1', who: 'mira', text: { en: '…sorry', ar: '…آسفة' } },
                    { id: 'c6r2', who: 'sara', text: { en: 'Hey, let’s keep it calm please 😟', ar: 'مهلًا، لنحافظ على هدوئنا من فضلكم 😟' } },
                    { id: 'c6r3', who: 'omar', text: { en: '…', ar: '…' } },
                    { id: 'c6r4', sys: true, text: { en: 'Mira is offline', ar: 'ميرا غير متصلة' } },
                  ] },
                ],
              },
              {
                text: { en: 'Hey Mira, I’m getting a conflict in {file} after your push. Can we look at it together?', ar: 'مرحبًا ميرا، يظهر لي تعارض في {file} بعد الـ push الأخير. هل يمكننا النظر فيه معًا؟' },
                quality: 1, style: 'direct', fx: { trust: 3, bond: { mira: 1 } },
                happened: { en: 'You named the problem, not the person — but in front of everyone, so Mira still felt a little exposed.', ar: { m: 'وصفتَ المشكلة لا الشخص، لكن أمام الجميع، فشعرت ميرا ببعض الإحراج.', f: 'وصفتِ المشكلة لا الشخص، لكن أمام الجميع، فشعرت ميرا ببعض الإحراج.' } },
                reply: [
                  { t: 'chat', msgs: [
                    { id: 'c6r5', who: 'mira', text: { en: 'Oh no 😣 yes of course. Café tomorrow at 9?', ar: 'يا إلهي 😣 نعم بالطبع. في المقهى غدًا الساعة التاسعة؟' } },
                    { id: 'c6r6', who: 'sara', text: { en: 'Good call 👏', ar: 'تصرّف جيد 👏' } },
                  ] },
                ],
              },
              {
                text: { en: '(Say nothing. Fix it alone tonight and keep my version.)', ar: '(لن أقول شيئًا. سأصلح الأمر وحدي الليلة وأحتفظ بنسختي.)' },
                quality: 0, style: 'avoid', fx: { health: 3, trust: -6, bond: { mira: -2 }, flags: { silentFix: true } },
                happened: { en: 'You avoided the talk and planned to drop Mira’s work quietly. Avoiding a conversation only delays it.', ar: { m: 'تجنّبتَ الحديث وخطّطتَ للتخلّص من عمل ميرا بصمت. تجنّب المحادثة يؤجّلها فقط.', f: 'تجنّبتِ الحديث وخطّطتِ للتخلّص من عمل ميرا بصمت. تجنّب المحادثة يؤجّلها فقط.' } },
                reply: [
                  N('You type nothing. The chat moves on to memes.', { m: 'لا تكتب شيئًا، وتنتقل المحادثة إلى الصور المضحكة.', f: 'لا تكتبين شيئًا، وتنتقل المحادثة إلى الصور المضحكة.' }),
                ],
              },
              {
                text: { en: '(Private message to Mira) Hey, I think our changes collided in {file}. Fix it together tomorrow? 🙂', ar: '(رسالة خاصة إلى ميرا) مرحبًا، أظن أن تعديلاتنا تصادمت في {file}. هل نصلحها معًا غدًا؟ 🙂' },
                quality: 2, style: 'empathy', fx: { trust: 5, health: 1, bond: { mira: 3 }, flags: { privateMsg: true } },
                happened: { en: 'You raised it privately and kindly. Mira could admit the mistake without an audience.', ar: { m: 'طرحتَ الأمر على انفراد وبلطف، فاستطاعت ميرا الاعتراف بالخطأ دون جمهور.', f: 'طرحتِ الأمر على انفراد وبلطف، فاستطاعت ميرا الاعتراف بالخطأ دون جمهور.' } },
                reply: [
                  { t: 'chat', dm: 'mira', msgs: [
                    { id: 'c6r7', who: 'mira', text: { en: 'Oh no… was it my push? I’m so sorry 😣 Café at 9?', ar: 'يا إلهي… هل هو الـ push الخاص بي؟ أنا آسفة جدًا 😣 في المقهى الساعة التاسعة؟' } },
                  ] },
                ],
              },
            ],
          },
          { t: 'closeChat' },
          { t: 'goto', to: 's2' },
        ],
      },

      s2: {
        bg: 'cafe-morning',
        steps: [
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'neutral' }, { who: 'mira', at: 'right', face: 'worried' }] },
          N('Next morning, Café Commit.', 'صباح اليوم التالي، في مقهى Café Commit.'),
          { t: 'if', cond: { flag: 'silentFix' }, then: [
            L('mira', '{name}… my changes were rejected last night. Can we talk before you push anything?', { m: '{name}… رُفضت تعديلاتي الليلة الماضية. هل يمكننا التحدث قبل أن ترفع أي شيء؟', f: '{name}… رُفضت تعديلاتي الليلة الماضية. هل يمكننا التحدث قبل أن ترفعي أي شيء؟' }, { face: 'worried', emote: 'question' }),
          ] },
          { t: 'if', cond: { flag: 'blamedMiraPublicly' }, then: [
            L('mira', 'You didn’t have to say it in front of everyone.', { m: 'لم يكن عليكَ أن تقول ذلك أمام الجميع.', f: 'لم يكن عليكِ أن تقولي ذلك أمام الجميع.' }, { face: 'upset', emote: 'crack' }),
          ] },
          L('mira', 'Last night Git said my push was “rejected”. I panicked… and used [[force push]].', 'الليلة الماضية قال Git إن الـ push الخاص بي «مرفوض». ارتبكتُ… واستخدمتُ [[force push]].', { face: 'worried', emote: 'sweat' }),
          L('mira', 'I didn’t know it would erase your [[commit]] from GitHub. I’m really sorry.', { m: 'لم أكن أعرف أنه سيمسح الـ[[commit]] الخاص بكَ من GitHub. أنا آسفة حقًا.', f: 'لم أكن أعرف أنه سيمسح الـ[[commit]] الخاص بكِ من GitHub. أنا آسفة حقًا.' }, { face: 'worried' }),
          { t: 'if', cond: { flag: 'goodReview' }, then: [
            L('mira', 'And the button I was scared to lose… it’s the one you helped me fix last week.', { m: 'والزر الذي كنتُ أخاف أن أخسره… هو نفسه الذي ساعدتني في إصلاحه الأسبوع الماضي.', f: 'والزر الذي كنتُ أخاف أن أخسره… هو نفسه الذي ساعدتِني في إصلاحه الأسبوع الماضي.' }, { face: 'worried' }),
          ] },
          { t: 'if', cond: { flag: 'harshReview' }, then: [
            L('mira', 'After last week’s review, I didn’t want to ask you for help again.', 'بعد مراجعة الأسبوع الماضي، لم أرد أن أطلب منك المساعدة مرة أخرى.', { face: 'upset' }),
          ] },
          {
            t: 'choice', id: 'c6-talk', key: true, via: 'dialogue',
            prompt: { en: 'What do you say?', ar: { m: 'ماذا تقول؟', f: 'ماذا تقولين؟' } },
            hint: { en: 'Fix the problem, then fix what caused it.', ar: 'أصلح المشكلة، ثم أصلح ما سبّبها.' },
            options: [
              {
                text: { en: 'It’s okay. Let’s fix it together — and agree as a team never to force-push to main.', ar: 'لا بأس. لنصلحه معًا، ونتفق كفريق على ألّا نستخدم force push على main أبدًا.' },
                quality: 2, style: 'structure', fx: { trust: 6, health: 3, bond: { mira: 2 }, flags: { noForcePushRule: true } },
                happened: { en: 'You forgave the mistake and turned it into a team rule. That fixes the cause, not just this bug.', ar: { m: 'سامحتَ الخطأ وحوّلتَه إلى قاعدة للفريق، وهذا يعالج السبب لا هذه المشكلة فقط.', f: 'سامحتِ الخطأ وحوّلتِه إلى قاعدة للفريق، وهذا يعالج السبب لا هذه المشكلة فقط.' } },
                reply: [L('mira', 'Deal. Thank you for not making me feel stupid.', { m: 'اتفقنا. شكرًا لأنكَ لم تجعلني أشعر بالغباء.', f: 'اتفقنا. شكرًا لأنكِ لم تجعليني أشعر بالغباء.' }, { face: 'happy', emote: 'heart' })],
              },
              {
                text: { en: 'Just take my version. Mine was finished first.', ar: 'خذي نسختي فقط. نسختي انتهت أولًا.' },
                quality: 0, style: 'solo', fx: { health: -3, trust: -6, bond: { mira: -2 } },
                happened: { en: '“First” doesn’t mean “better”. Mira’s part of the file had real improvements you were about to throw away.', ar: { m: '«الأول» لا يعني «الأفضل». كان في جزء ميرا من الملف تحسينات حقيقية كنتَ على وشك التخلّص منها.', f: '«الأول» لا يعني «الأفضل». كان في جزء ميرا من الملف تحسينات حقيقية كنتِ على وشك التخلّص منها.' } },
                reply: [L('mira', '…Fine. But my button redesign took me two nights.', '…حسنًا. لكن إعادة تصميم الزر أخذت مني ليلتين.', { face: 'upset', emote: 'ellipsis' })],
              },
              {
                text: { en: 'Why didn’t you ask anyone before forcing it?!', ar: 'لماذا لم تسألي أحدًا قبل أن تفرضي نسختك؟!' },
                quality: 1, style: 'direct', fx: { trust: -2, health: 1, bond: { mira: -1 } },
                happened: { en: 'Your question was fair, but the tone made Mira defensive. The real reason was her fear of looking clueless.', ar: 'كان سؤالك منطقيًا، لكن النبرة جعلت ميرا تدافع عن نفسها. السبب الحقيقي كان خوفها من أن تبدو جاهلة.' },
                reply: [L('mira', 'Because everyone was busy… and I didn’t want to look like I don’t understand Git.', 'لأن الجميع كانوا مشغولين… ولم أرد أن أبدو كأنني لا أفهم Git.', { face: 'worried', emote: 'sweat' })],
              },
            ],
          },
          L('mira', 'Let’s open the [[merge conflict]] together. Block by block.', 'لنفتح الـ[[merge conflict]] معًا، جزءًا جزءًا.', { face: 'neutral' }),
          { t: 'merge', id: 'm6', hint: { en: 'Read what each side adds. Sometimes the answer is “both”, sometimes “theirs”.', ar: 'اقرأ ما يضيفه كل طرف. أحيانًا يكون الجواب «الاثنين»، وأحيانًا «نسختهم».' } },
          {
            t: 'terminal', id: 't6b',
            task: { en: 'Mark the file as resolved, commit, and push.', ar: { m: 'علِّم الملف كمحلول، ثم نفّذ commit وpush.', f: 'علِّمي الملف كمحلول، ثم نفّذي commit وpush.' } },
            steps: [
              { accept: ['git add {file}', 'git add .', 'git add -a', 'git add --all'], hint: 'git add {file}', term: 'git add', out: [] },
              { acceptRe: '^git commit -m\\s+(["\'])(.{5,72})\\1$', hint: 'git commit -m "Resolve booking conflict"', term: 'commit', out: ['[main 9c1d7e0] {msg}', ' 1 file changed, 9 insertions(+), 5 deletions(-)'] },
              { accept: ['git push', 'git push origin main'], hint: 'git push', term: 'push', out: ['To github.com:studyspot/studyspot.git', '   8be41d2..9c1d7e0  main -> main'] },
            ],
          },
          { t: 'if', cond: { flag: 'mergeGood' }, then: [
            L('mira', 'It works! Your validation and my button. Best of both.', 'إنه يعمل! تحقّقك من الصحة وزرّي معًا. أفضل ما في النسختين.', { face: 'proud', emote: 'sparkle' }),
          ], else: [
            { t: 'if', cond: { flag: 'mergeOk' }, then: [
              L('mira', 'Almost! One part still looks off, but we can polish it before the demo.', 'تقريبًا! ما زال جزء واحد غير صحيح، لكن يمكننا تحسينه قبل العرض.', { face: 'happy' }),
            ], else: [
              L('mira', 'Hmm… the app still breaks in a couple of places. We’ll fix it before the demo.', 'همم… ما زال التطبيق يتعطّل في موضعين. سنصلحه قبل العرض.', { face: 'worried', emote: 'sweat' }),
            ] },
          ] },
          { t: 'debrief', id: 'd6b' },
          { t: 'goto', to: 's3' },
        ],
      },

      s3: {
        bg: 'room-evening',
        steps: [
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'neutral' }] },
          {
            t: 'chat', msgs: [
              { id: 'c6e1', who: 'sara', text: { en: 'Team rule proposal: no force push to main. Everything goes through a pull request. 👍?', ar: 'اقتراح لقاعدة الفريق: لا force push على main، وكل شيء يمرّ عبر pull request. 👍؟' } },
              { id: 'c6e2', who: 'omar', text: { en: '👍 finally', ar: '👍 أخيرًا' } },
              { id: 'c6e3', who: 'mira', if: { bond: 'mira', gte: 2 }, text: { en: '👍 and thank you {name} 💗', ar: '👍 وشكرًا يا {name} 💗' } },
              { id: 'c6e4', who: 'mira', if: { bond: 'mira', lt: 2 }, text: { en: '👍', ar: '👍' } },
            ],
          },
          { t: 'closeChat' },
          { t: 'cast', cast: [{ who: 'you', at: 'left', face: 'happy' }, { who: 'pixel', at: 'right', face: 'happy' }] },
          L('pixel', 'Meow! You survived your first big conflict. Let’s see how the week went.', { m: 'مياو! نجوتَ من أول تعارض كبير. لنرَ كيف كان أسبوعك.', f: 'مياو! نجوتِ من أول تعارض كبير. لنرَ كيف كان أسبوعك.' }, { face: 'happy', emote: 'sparkle' }),
          { t: 'end' },
        ],
      },
    },
  },
};
