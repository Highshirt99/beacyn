<!-- Project-specific Copilot guidance for Beacyn (Vite + React + Tailwind) -->
# Beacyn — quick instructions for AI coding agents

This repository is a minimal Vite + React single-page app that now uses Tailwind CSS for styling.

Quick facts
- Entry: `index.html` -> `src/main.jsx` -> `src/App.jsx` (which currently mounts `src/views/Home.jsx`).
- Build tooling: Vite (`vite.config.js`).
- Tailwind: `tailwind.config.cjs` + `postcss.config.cjs`. Main CSS file is `src/index.css` and uses Tailwind directives.
- Scripts: run `npm run dev`, `npm run build`, `npm run preview`, `npm run lint` (see `package.json`).

What to look at first
- `src/main.jsx` — app bootstrap and any global providers you might add.
- `src/App.jsx` — top-level app; currently renders `src/views/Home.jsx`.
- `src/views/` — page-level components (co-located styles were replaced with Tailwind classes).
- `tailwind.config.cjs` and `postcss.config.cjs` — Tailwind + PostCSS setup.

Tailwind-specific notes
- `src/index.css` uses `@tailwind base; @tailwind components; @tailwind utilities;` and small base overrides using `@layer base`.
- Ensure Tailwind is installed locally (devDeps): `tailwindcss`, `postcss`, `autoprefixer`.
- Typical local setup commands (run these from the repo root):

```powershell
# install (if not already installed)
npm install -D tailwindcss postcss autoprefixer
# initialize (one-time):
npx tailwindcss init -p
# start dev server with Vite (Tailwind will compile via PostCSS plugin):
npm run dev
```

Project conventions you should follow
- Use ESM imports/exports everywhere (`type: "module"` in `package.json`).
- Add page components under `src/views` as default exports and use Tailwind utility classes directly in JSX (no CSS files by default).
- For shared components, create `src/components/` and prefer composition with utility classes and small component-level styles only when necessary.

Examples
- Replace a block with Tailwind utilities (example used in `src/views/Home.jsx`):
  - `<main className="max-w-3xl mx-auto p-8 text-left">` — centers content, adds padding and left text alignment.

Build and debug tips
- Dev server: `npm run dev` — Vite serves HMR on a local port (default 5173). Check console for Tailwind/PostCSS errors if your classes don’t appear.
- If Tailwind classes are not applied, ensure `tailwind.config.cjs` content globs include the file where the classes are used (currently: `index.html`, `src/**/*.{js,jsx,ts,tsx}`).

What not to assume
- There is no backend code or CI configuration in this repo. If adding tests or CI, confirm maintainers’ preferences first.

If anything missing
- Tell me which workflows you use (CI provider, preferred test runner, design tokens), and I’ll expand this file with exact commands and examples.
