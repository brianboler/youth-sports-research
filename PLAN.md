# Youth Sports Data Site — Build Plan

## Overview
A single-page GitHub Pages site serving as a research compendium for a thought-leadership article on the transformation of youth sports in America. Three data-heavy sections, all facts 100% attributable with live source links. Designed for a private equity / sports investment audience.

---

## Tech Stack
- **HTML/CSS/JS only** — no build tool, no backend, GitHub Pages native
- **Chart.js 4.4.4** (jsDelivr CDN) — interactive charts
- **Inter** (Google Fonts CDN) — typography
- **Canvas API** — PNG chart downloads
- **window.print() + @media print CSS** — PDF export (no external lib)

---

## File Structure
```
/Youth_Sports_Research/
├── index.html       ← Single-page app (~700 lines)
├── styles.css       ← Design system + all styles (~600 lines)
├── app.js           ← Chart.js + interactivity (~450 lines)
└── PLAN.md          ← This file
```

---

## Design System

### Colors
| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#080C10` | Page background |
| `--surface` | `#0E1420` | Card backgrounds |
| `--border` | `#1E2840` | Card borders |
| `--teal` | `#00E5C3` | Section 1 accent (Social Media) |
| `--orange` | `#FF6B35` | Section 2 accent (Costs) |
| `--blue` | `#4A9EFF` | Section 3 accent (NIL) |
| `--text` | `#FFFFFF` | Primary text |
| `--text-muted` | `#8B9BB4` | Secondary/captions |

### Typography
- Font: **Inter** via Google Fonts
- Hero title: 80px, weight 900
- Section title: 48px, weight 800
- Stat number: 56–72px, weight 900, tabular-nums
- Body: 16px, weight 400

### Spacing
8px base grid (8, 16, 24, 32, 48, 64, 96, 128)

---

## Page Architecture

### Top Nav (fixed)
- Brand: "Youth Sports | Data Research"
- Links: 01 Social Media / 02 Costs / 03 NIL
- Active state via IntersectionObserver scroll-spy
- "Export PDF" button → `window.print()`

### Hero Section
- Full-width dark gradient
- Title: "Youth Sports in America"
- Subtitle: Three forces reshaping the game
- 4 marquee stats (animate on load):
  - `$40B+` Annual family spending
  - `+46%` Cost surge since 2019
  - `$2.6B` NIL market size
  - `6 yrs` Youngest NIL deal age

---

## Sections

### Section 01 — Social Media & Culture (teal accent)

**Stat Cards (4):**
- 72% — TikTok motivates kids to play (Stagwell/NRG 2026)
- 62% — Prefer social media over TV for sports (Stagwell/NRG 2026)
- 80%+ — Athletes using social 2+ hrs/day (Sports Psychiatry 2023)
- 31% — Youth athletes measuring success by social presence (BSN 2025)

**Chart 1: "The Social Media Takeover"**
- Type: Horizontal bar chart
- Data: 5 percentage metrics
- Color: Teal gradient
- Download: PNG button

**Quote Cards (8):**
Pew Research (teen follow-athletes behavior), Stagwell (62%/72%/50%), Sports Psychiatry (4 hrs/day mean), Pathley (recruiting via social), Coach Dunne/NCSA (social discovery), Opendorse CEO (follower = $ formula), Aspen Institute (kids recorded from moment they join sports), Dr. Paul McCarthy ("highlight machine" quote)

---

### Section 02 — The Cost Crisis (orange accent)

**Stat Cards (5):**
- $1,016 — Average family spend 2024 (Aspen Institute)
- 46% — Cost increase since 2019 (Aspen Institute)
- 2× — Rate of U.S. inflation (Aspen Institute)
- $40B+ — Total U.S. youth sports economy (Aspen Institute)
- $25,000 — High end of reported spending (Aspen Institute)

**Chart 2: "Sport-by-Sport Cost Surge (2019 vs. 2024)"**
- Type: Grouped bar chart
- Sports: Basketball ($427→$876), Soccer ($537→$910), Baseball ($660→$1,113)
- Color: Muted 2019, vivid orange 2024
- Download: PNG button

**Chart 3: "Where Families Spend"**
- Type: Horizontal bar chart
- Categories: Travel $260, Private Lessons $183, Registration $168, Equipment $154, Camps $111
- Color: Orange gradient
- Download: PNG button

**Quote Cards (9):**
$1,016 + 46% stat, 2× inflation, $40B > NFL, range to $25K, basketball +105%, raw dollar jumps by sport, teens $2K/yr, travel baseball $4K–$15K, 75% parents considered quitting + 19% took debt, 20.2pp income participation gap, "youth sports industrial complex"

---

### Section 03 — The NIL Revolution (blue accent)

**Stat Cards (4):**
- +183% — NIL market growth (2021→2026)
- 45 states — Allow high school NIL (2aDays 2025)
- Age 9 — Youngest six-figure NIL deal (CleanKonnect 2023)
- Age 6 — Youngest NIL deal ever recorded (CleanKonnect 2023)

**Chart 4: "The NIL Market Explosion"**
- Type: Line/area chart with dashed projection segment
- Data: 2021-22 ($917M) → 2024-25 ($1.67B) → Projected ($2.5B+) → 2026 ($2.6B)
- Color: Blue fill
- Download: PNG button

**Chart 5: "Eye-Popping Individual Deals"**
- Type: Horizontal bar chart
- Athletes: Bryce Underwood $12M, Bronny James $7.5M, Mikey Williams $3.6M, Arch Manning $3.4M, NC HS Athlete $1M+, Ghalee Wadood Jr. (age 9) ~$100K
- Unit: Millions USD
- Color: Blue gradient
- Download: PNG button

**Quote Cards (9):**
NIL market explosion, $2.6B industry + "reaching HS sophomores", Bryce Underwood $12M, Bronny/Mikey/Arch valuations, McKenna Whitham age 13 Nike deal, Ghalee Wadood Jr. age 9 six figures, Baby Gronk $115K at age 8, "6th graders getting six-figure deals" (NPR), NC HS stats, "wild wild west" quote, Jordan Brand first HS deal

---

## Interactivity

### Charts
- All charts use dark theme styling matching the site
- Canvas background plugin ensures PNGs look great when downloaded
- "Download PNG" button per chart using `canvas.toDataURL()`

### Navigation
- IntersectionObserver scroll-spy → highlights active nav link
- Smooth scroll on anchor clicks

### Print / PDF
- `@media print` stylesheet:
  - White background
  - Remove nav, buttons, interactive elements
  - Each section starts on new page
  - Charts print correctly (they're canvas, rendered inline)
- Top nav "Export PDF" button → `window.print()`

### Animations
- Hero stat counter animation on page load
- Section cards fade/slide in on scroll (Intersection Observer)

---

## Data Integrity
Every fact on the page has:
1. The exact verbatim quote from the source
2. Source name + publication date inline
3. Clickable hyperlink to the original article
4. No data extrapolated, interpolated, or invented

Only data sourced from `ClaudeResearchPart1.md` is used, which contains pre-verified attributable citations.

---

## GitHub Pages Deployment
1. Push files to a GitHub repository
2. In repo Settings → Pages → Source: Deploy from branch `main`, folder `/` (root)
3. Site live at `https://{username}.github.io/{repo-name}/`

No Jekyll, no build step, no config files needed.
