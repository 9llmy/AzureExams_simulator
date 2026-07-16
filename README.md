<div align="center">

# ☁️ Azure Exams Simulator

### Professional Certification Testing Engine for Microsoft Azure Exams

<!-- Uncomment after enabling GitHub Pages (Settings → Pages → Source: GitHub Actions):
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Try_It-brightgreen?style=for-the-badge)](https://9llmy.github.io/AzureExams_simulator/)
-->

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)](.github/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A Pearson VUE–style exam simulator for Azure certifications — timed, scored, and fully reviewable**

</div>

---

## 🌟 Overview

Azure Exams Simulator is a single-page application that recreates the real Microsoft certification testing experience: a countdown timer, a question navigator with flagging, strict item scoring, and a full performance dashboard with per-question explanations.

It ships with a **complete AI-900 bank (over 100 verified questions)** and a **complete AZ-900 bank (485 questions)**, and its plugin architecture means any Azure certification — DP-900, SC-900, AZ-104 — can be added with **one bank file and one registry entry**. No engine changes required.

---

## ✨ Features

- ⏱️ **Real Exam Timer** — HH:MM:SS countdown with amber/red warnings, pause mode, and auto-submit on expiry
- 🧩 **Three Question Types** — Single choice, multiple choice (exact-count validation), and Yes/No statement matrices
- 🗺️ **Question Navigator** — Jump anywhere; color-coded answered/unanswered states with flag-for-review markers
- 📋 **Pre-Submit Review** — Full overview of unanswered and flagged questions before final submission
- 🎯 **Authentic Scoring** — All-or-nothing item scoring scaled to 1000, passing at 700, just like the real exam
- 📊 **Performance Dashboard** — Pass/fail ring, time taken, and a per-skill-domain breakdown
- 📖 **Full Answer Review** — Every question with your answer vs. the correct one, plus a written explanation
- 🔀 **Random Draws** — Each attempt pulls a fresh random set from the bank, so retakes never repeat
- 🧱 **Multi-Certification Architecture** — Exam picker driven by a registry; preview mode for growing banks

---

## 📊 Project Stats

| Metric | Value |
| --- | --- |
| 🎓 Certifications | **2** (AI-900 full · AZ-900 full) |
| ❓ Questions in Banks | **596** (AI-900: 111 · AZ-900: 485) |
| 🧩 Question Types | **3** |
| 📚 Skill Domains | **AI-900: 5 · AZ-900: 3** |
| ⏱️ AI-900 Exam | **60 questions / 80 min** |
| ⏱️ AZ-900 Exam | **40–50 questions / 45 min** |
| 🏆 Passing Score | **700 / 1000** |

---

## 🎓 Certification Banks

| Exam | Questions | Status | Skill Domains |
| --- | --- | --- | --- |
| **AI-900** — Azure AI Fundamentals | 111 | ✅ Full | 5 |
| **AZ-900** — Azure Fundamentals | 485 | ✅ Full | 3 |

### AZ-900 domain coverage

The AZ-900 bank spans all three official skill domains. Distribution reflects the source material and can be sampled per-domain by the engine to build balanced mock exams.

| Domain | Questions | Share | Official exam weighting |
| --- | --- | --- | --- |
| Cloud Concepts | 56 | 11.5% | 25–30% |
| Azure Architecture & Services | 283 | 58.4% | 35–40% |
| Management & Governance | 146 | 30.1% | 30–35% |

> The imported AZ-900 bank skews toward Architecture & Services. Availability-zone / region / core-component questions legitimately fall under that domain per the AZ-900 skills outline, so this reflects the source rather than a mislabel. Per-question explanations for AZ-900 are being populated progressively.

---

## 🏗️ Architecture

Strict one-way dependency flow — UI never touches question banks directly:

```
components (screens, widgets)
        │
        ▼
hooks (useExamSession, useCountdown)
        │
        ▼
logic (grading, shuffle, time)   data (examRepository)
                                        │
                                        ▼
                              config (examRegistry)
                                        │
                                        ▼
                            banks (ai900.js, az900.js)
```

Swapping the in-memory banks for an API or database later means changing **one file**: `src/data/examRepository.js`.

---

## 🛠️ Tech Stack

- **React 18** — UI with hooks-based state management
- **Vite 5** — Dev server and production builds
- **Tailwind CSS 3** — Utility-first styling
- **lucide-react** — Icon library
- **GitHub Actions** — CI workflow for automatic GitHub Pages deployment

---

## 📂 Project Structure

```
AzureExams_simulator/
├── .github/workflows/     # Auto-deploy to GitHub Pages
├── src/
│   ├── config/            # Exam registry — add new certifications here
│   ├── data/
│   │   ├── banks/         # Question banks (ai900.js, az900.js, ...)
│   │   └── examRepository.js
│   ├── logic/             # Pure functions: grading, shuffle, time
│   ├── hooks/             # useExamSession, useCountdown
│   └── components/
│       ├── screens/       # Select · Welcome · Exam · Overview · Results
│       ├── exam/          # TopBar, NavGrid, question renderers
│       ├── review/        # Post-exam answer review
│       └── common/        # ScoreRing, ConfirmModal, ...
└── index.html
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/9llmy/AzureExams_simulator.git
cd AzureExams_simulator
npm install
npm run dev      # → http://localhost:5173
```

Production build: `npm run build` (output in `dist/`).

---

## ➕ Add a New Certification

1. Create `src/data/banks/dp900.js` exporting a question array. Three question shapes are supported:

   ```js
   // single → radio buttons; one correct answer
   { id: 1, domain: "Cloud Concepts", type: "single",
     q: "...", options: ["Yes", "No"], correct: [0], explanation: "..." }

   // multi → checkboxes; must pick exactly `pick` answers
   { id: 2, domain: "Azure Architecture and Services", type: "multi", pick: 2,
     q: "...", options: ["A", "B", "C", "D"], correct: [0, 1], explanation: "..." }

   // matrix → grouped Yes/No statements (0 = Yes, 1 = No)
   { id: 3, domain: "Management and Governance", type: "matrix",
     statements: ["Statement 1", "Statement 2"], matrixAnswers: [0, 1], explanation: "..." }
   ```

2. Register it with one entry in `src/config/examRegistry.js`.

The exam picker, timer, grading, and dashboard adapt automatically. Banks smaller than the target question count run in **preview mode**.

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ☁️ by [Suliman Saleh (9llmy)](https://github.com/9llmy)**

[📦 Repository](https://github.com/9llmy/AzureExams_simulator) • [💼 LinkedIn](https://www.linkedin.com/in/9llmy) • [🎓 Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/)

</div>