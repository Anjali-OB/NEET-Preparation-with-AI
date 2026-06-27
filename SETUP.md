# NEET Prep AI v3 — Setup Guide

## Quick Start (3 steps)

### Step 1 — Fix npm network (paste all 3 lines in PowerShell FIRST)
```
npm config set registry https://registry.npmmirror.com
npm config set legacy-peer-deps true
npm config set fetch-timeout 600000
```

### Step 2 — Install and run
```
npm install
npm run dev
```
Open http://localhost:3000

### Step 3 — Add FREE Groq AI key (for chat to work)
1. Go to https://console.groq.com
2. Sign up FREE (no credit card needed)
3. Click "API Keys" → "Create API Key"
4. Copy the key (starts with gsk_...)
5. Open .env.local in your project folder
6. Replace: GROQ_API_KEY=your-groq-api-key-here
   With:    GROQ_API_KEY=gsk_your-actual-key

---

## Login Credentials
- **Pallavi (Student)**: password is `pallavi2025`
- **Admin**: password is `admin123`

---

## Why Groq instead of Anthropic?
- Groq is completely FREE (no credit card)
- Groq is FASTER (runs Llama 3.3 70B at 750 tokens/sec)
- Same quality answers for NEET study help

---

## What's Fixed in v3
- Login system: Pallavi + Admin accounts (persistent)
- Pallavi starts from scratch (0 progress, no fake data)
- Admin sees real-time activity log as Pallavi uses app
- Quiz count bug FIXED (55 questions, shows available count)
- Dark mode toggle FIXED (updates all CSS variables)
- Notifications "Clear all" FIXED (actually clears)
- No more browser alert() popups in Games
- Study Planner shows live real-time clock
- Syllabus: click chapter → concept notes first → "Start Quiz" button
- Revision Scheduler: "Revise" opens modal, not redirect
- 3D Diagrams: 9 interactive diagrams (Bio/Chem/Physics)
- Notes: "Generate with AI" auto-creates notes from topic name

## Troubleshooting
| Error | Fix |
|---|---|
| ECONNRESET during npm install | Run the 3 npm config lines in Step 1 |
| next is not recognized | Run npm install first |
| White screen | Press F12 → Console → send me the red error |
| AI chat not working | Check GROQ_API_KEY in .env.local |
| Port 3000 in use | Run: npm run dev -- -p 3001 |