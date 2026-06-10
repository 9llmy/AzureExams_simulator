# Azure Certification Exam Simulator

A multi-certification exam simulator built with React, Vite, Tailwind CSS, and
lucide-react. Ships with a full AI-900 bank (82 verified questions) and an
AZ-900 preview bank, and is designed so any Azure certification can be added
with one bank file and one registry entry.

## Develop

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

Open the folder in **VS Code** (recommended extensions will be suggested
automatically) or in **Visual Studio 2022** via *File → Open → Folder*.
This is a plain Vite project — no solution file is required.

## Architecture

```
src/
├── config/        Exam definitions (the extension point for new certs)
├── data/          Data-access layer: question banks + repository
├── logic/         Pure business logic: grading, shuffle, time (no React)
├── hooks/         Stateful logic: exam session + countdown timer
└── components/    Presentational UI: screens, exam widgets, review cards
```

Dependency direction: `components → hooks → data/logic → config`.
Components never touch banks directly; everything flows through
`data/examRepository.js`, so moving questions to an API or database later
means changing only that one module.

## Add a certification (e.g. DP-900)

1. Create `src/data/banks/dp900.js` exporting a question array. Three
   question shapes are supported (see any existing bank):
   - `single`  — radio buttons, `correct: [index]`
   - `multi`   — checkboxes, `pick: N`, `correct: [i, j, ...]`
   - `matrix`  — Yes/No statements, `matrixAnswers` with `0 = Yes, 1 = No`
2. Add one entry to the `EXAMS` array in `src/config/examRegistry.js`.

If the bank is smaller than the exam's `questionCount`, the simulator runs
in preview mode with every available question and labels it as such.

## Push to GitHub

This folder already contains an initialized git repository with an initial
commit. To publish it:

```bash
# 1. Create an empty repository on github.com (no README/license), then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Optional: make the initial commit yours before pushing:

```bash
git config user.name  "Your Name"
git config user.email "you@example.com"
git commit --amend --reset-author --no-edit
```

## Deploy

This is a fully static SPA (no backend), so any static host works.

| Platform | Effort | Notes |
|---|---|---|
| **GitHub Pages** | Zero — workflow included | Push to `main`, then enable *Settings → Pages → Source: GitHub Actions*. The included `.github/workflows/deploy-pages.yml` builds and publishes automatically. |
| **Vercel** | ~2 minutes | Import the GitHub repo at vercel.com; Vite is auto-detected. Free hobby tier, preview deployments per branch. |
| **Netlify** | ~2 minutes | Same flow; build command `npm run build`, publish directory `dist`. |
| **Azure Static Web Apps** | ~5 minutes | Thematically perfect for this project. Create a Static Web App in the Azure portal, connect the GitHub repo (app location `/`, output `dist`) — Azure adds its own workflow. Free tier available. |

## Scoring

A question counts as correct only when fully correct (exact multi-select
set, every matrix statement), mirroring Microsoft's item scoring. Scores
scale to 1000; passing is `passPercent` (700/1000 by default).
