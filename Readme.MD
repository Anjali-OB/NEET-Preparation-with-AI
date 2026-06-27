# 🧬 NEET Prep AI — v3.0

An all-in-one AI-powered NEET preparation platform built with **Next.js 14**. Features interactive SVG diagrams, quiz engine, AI mentor, mock tests, flashcards, games, and analytics — all in a sleek dark-mode UI.

---

## 🚀 Quick Start (3 Steps)

### Step 1 — Fix npm network (Windows — paste all 3 lines in PowerShell first)
```bash
npm config set registry https://registry.npmmirror.com
npm config set legacy-peer-deps true
npm config set fetch-timeout 600000
```

### Step 2 — Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Step 3 — Add FREE Groq AI Key (for AI Mentor chat)
1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up FREE (no credit card needed)
3. Click **API Keys → Create API Key**
4. Copy the key (starts with `gsk_...`)
5. Open `.env.local` and set:
```env
GROQ_API_KEY=gsk_your-actual-key-here
```

---


## ✨ Features

### 📊 Dashboard
- XP system, streaks, and progress tracking
- Live activity feed
- Quick-access cards for all modules

### 📚 Syllabus Explorer
- Full Class 11 & 12 syllabus for Physics, Chemistry, Biology
- Click any chapter → get concept notes → start quiz

### ⚡ Quiz Engine
- 55+ NEET/MHT-CET PYQ questions
- Timed quizzes with explanations
- Subject and chapter filters

### 🔭 3D Interactive Diagrams (11 total)

**Biology (7)**
| Diagram | Key Concepts |
|---------|-------------|
| Animal Cell | Organelles, fluid mosaic model |
| Human Heart | 4 chambers, SA/AV node, blood flow |
| Neuron | Myelin sheath, saltatory conduction |
| Chloroplast | Grana, stroma, light/dark reactions |
| DNA Double Helix | Base pairs (A-T, G-C), antiparallel strands |
| Human Kidney | Cortex, medulla, nephron, GFR |
| Digestive System | Stomach to rectum, liver, pancreas |

**Chemistry (3)**
| Diagram | Key Concepts |
|---------|-------------|
| Atom Structure | Protons, neutrons, electron shells |
| Benzene C₆H₆ | sp² hybridisation, delocalized π electrons |
| Methane sp³ Orbital | Tetrahedral geometry, 109.5° bond angle |

**Physics (4)**
| Diagram | Key Concepts |
|---------|-------------|
| Human Eye | Cornea, retina, fovea, optic nerve |
| EM Spectrum | Radio to γ-rays, E=hf |
| Mirror & Lens Optics | Mirror formula, magnification |
| Young's Double Slit | Fringe width β=λD/d, interference |

### 🃏 Flashcards
- Flip-card memory system for key concepts

### 🎮 Learning Games
- Quiz Blitz (30-sec rapid fire)
- Chapter Boss Battle (+500 XP)
- Speed Recall leaderboard
- Bio Diagram Labeling Quiz
- Equation Balancer

### 📝 Mock Tests & PYQs
- Full-length timed mock tests
- Previous Year Questions (NEET/MHT-CET)

### 🤖 AI Mentor
- Powered by Groq (Llama 3.3 70B — free & fast)
- Chapter-aware context
- Explains concepts, solves problems, gives mnemonics

### 🔄 Revision Scheduler
- Spaced repetition reminders
- Chapter-wise revision tracker

### 📈 Analytics
- Time spent per subject
- Quiz performance trends
- Weak area identification

---

## 🗂 Project Structure

```
neet-prep-ai/
├── app/
│   ├── api/
│   │   ├── chat/route.ts       # Groq AI chat endpoint
│   │   └── results/route.ts    # Quiz results API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Entry point (renders PlatformV3)
├── components/
│   └── PlatformV3.jsx          # ⭐ Main app (all UI, diagrams, logic)
├── .env.local                  # API keys (never commit this!)
├── .env.example                # Template for env vars
├── next.config.js
└── package.json
```

---


## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| UI | React 18, custom CSS (dark theme) |
| Diagrams | Pure SVG (no dependencies) |
| AI Chat | Groq API — Llama 3.3 70B |
| Styling | CSS Variables + inline styles |
| Auth | LocalStorage-based (client-side) |

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| `ECONNRESET` during npm install | Run the 3 `npm config` lines in Step 1 |
| `next is not recognized` | Run `npm install` first |
| White screen | Press F12 → Console → check red errors |
| AI chat not working | Check `GROQ_API_KEY` in `.env.local` |
| Port 3000 in use | Run `npm run dev -- -p 3001` |

---

## 📄 Environment Variables

```env
# .env.local
GROQ_API_KEY=gsk_your_groq_key_here
```

Get your free Groq key at [console.groq.com](https://console.groq.com)

---

## 📌 Version History

| Version | Changes |
|---------|---------|
| v3.0 | 11 interactive SVG diagrams, AI mentor, games, analytics, dark mode fix |
| v2.0 | Quiz engine, flashcards, mock tests |
| v1.0 | Initial platform |

---

*Built for NEET 2025–2026 aspirants 🎯*