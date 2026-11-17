# Git Along

**Survive the semester. Keep the team.**
A cozy 2D story game (visual-novel style) that teaches CS students Git and teamwork through choices with consequences. English + Arabic (MSA), no backend, no build step.

## Run it

The game uses JavaScript modules, so it must be served over `http://` (opening `index.html` directly will show a blank page).

**Windows:** double-click `start.bat`
**Any OS:**

```bash
python start.py
```

The browser opens at `http://localhost:8080` (or the next free port). Press `Ctrl+C` in the terminal to stop.

Alternative in VS Code: install the **Live Server** extension, right-click `index.html` → *Open with Live Server*.

## What's playable (prototype)

- Language first, then title → avatar creator → track (Web / Mobile / AI)
- Weeks 1–7, unlocked in order on the semester map:
  1. *The Assignment* — first meeting at the café
  2. *Strangers in a Group Chat* — a silent teammate; `git config`
  3. *The Team Contract* — splitting work fairly
  4. *Hello, Repo* — `git clone`, `.gitignore`, first commit
  5. *Branch Out* — `git switch -c`, keeping `main` safe
  6. *Review Me Gently* — pull requests and kind code review
  7. *The Merge Conflict* — Terminal, Merge Tool, two points of view
- **Rethink:** after the first reply to a decision you can go back and choose again — once per decision
- **Pixel's hint** lights up at every decision with guiding questions
- Hub Room (every object is clickable), labelled meters, hidden Bond, stars, stickers, glossary, settings, auto-save
- Full English and Arabic (masculine / feminine address); male and female characters look different

## Tests

`tests/playthrough.js` plays the whole game through the real UI and reports problems
(story flow, Rethink, hint glow, chat layout, stray English in Arabic mode and the reverse, avatar page regressions, JS errors).
Start the server, open the game, then run in the browser console:

```js
const T = await import('/tests/playthrough.js');
await T.run({ lang: 'ar', address: 'f', track: 'web', policy: 'best', rewindAt: 'c1-omar' });
```

`policy` is `best`, `worst`, `middle` or `random`; `rewindAt` is a decision id to test Rethink on.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page shell; loads fonts, CSS and `js/app.js` |
| `start.py` / `start.bat` | Local server + opens the browser |
| `css/style.css` | Design tokens, components, animations (flat colours, no gradients) |
| `js/app.js` | Entry point: screens, hub room, sheets, settings |
| `js/engine.js` | Scene engine: dialogue, choices, chat, terminal, merge tool, debrief |
| `js/content.js` | Story data (Weeks 1–7), tracks, glossary, debriefs |
| `js/i18n.js` | UI strings in English and Arabic (masculine / feminine forms) |
| `js/store.js` | Single state store + localStorage save (`gitAlong.v2`) |
| `js/art.js` | All SVG art: characters with 6 expressions, Pixel, rooms, icons, stickers |
| `js/ui.js` | Transitions, sheets, modals, toasts |
| `tests/playthrough.js` | Automated playthrough scenarios |

To reset progress: Settings → *Reset everything*.
