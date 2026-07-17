# DESIGN.md — Rotaract Club of Thane North End
### Theme: "Aagaz" — Every beginning holds endless possibilities.

Project type: **Type 2 — Content-driven frontend, multi-route** (per AGENTS.md).
Home is a single continuous-scroll page. Projects and Team are separate routes
for immersive scroll experiences. No auth, no transactional backend. Content
ships from `src/data/*.data.ts` first, moves to Firestore later via the `services/`
layer (see AGENTS.md → Content Data).

**Version:** V2 (as of July 2026) — Creative upgrade pass with Magic UI + Lenis.

This file overrides AGENTS.md wherever explicitly stated below, per
AGENTS.md → Override Policy. Folder structure, component rules, backend
contract, and TypeScript discipline are Fixed and apply unchanged.

---

## 1. What I want — Design Intent

- **Not** a dark, corporate design-agency look (superseded — an earlier
  direction explored this, fully replaced now).
- **Minimal, pastel, cream-first.** Light is the native surface, not an
  afterthought. The site should feel warm, optimistic, and human — like
  first light at dawn, echoing "Aagaz."
- **Content does the talking, not color.** A near-empty cream canvas with
  one bold, confidently-sized headline says more than a busy colorful one.
  Color is a small, deliberate accent — never a fill.
- **Bold, creative, youthful typography** carries personality — big
  rounded display type with real character, not a stiff corporate sans.
- **Photography presented like it matters** — real event/team photos in
  frames with strong borders, slight tilt, sticker/patterned accents —
  a scrapbook-meets-editorial feel, not plain rectangular cards.
- **Scroll should feel alive** — not just fade-ins, but a sense of the
  page unfolding as you move through it, matching "every beginning" as
  a narrative arc from hero to closing CTA.
- **Team page must breathe.** A club has real organizational depth
  (District reps down to General Body). Cramming that into the home
  scroll makes the page heavy and buries the hierarchy. It gets its
  own page, its own pacing.

---

## 2. How I want it — Overrides & Specification

### 2.1 Color System
**Overrides AGENTS.md → Styling (token values):** AGENTS.md leaves token
values to DESIGN.md. Previous draft used a dark-first near-black system;
this replaces it entirely with a light-native pastel system called
**"Sunrise"** — coral/terracotta on cream, chosen over a cooler blue/lavender
alternative because it reads warmer and more energetic, matching a youth
action club's tone better than a calm/contemplative palette.

```css
@import "tailwindcss";

@theme {
  --color-background: oklch(96% 0.015 75);       /* soft cream, native surface */
  --color-surface: oklch(93% 0.02 70);            /* card/section surface */
  --color-surface-hover: oklch(90% 0.025 65);
  --color-text: oklch(22% 0.02 50);               /* warm near-black, not pure black */
  --color-text-muted: oklch(48% 0.02 50);
  --color-accent: oklch(74% 0.13 40);             /* soft coral — CTAs, active states */
  --color-accent-secondary: oklch(64% 0.14 45);   /* terracotta — borders, frames, highlights */
  --radius: 0.75rem;
}

.dark {
  /* Secondary surface, still first-class per AGENTS.md — inverted Sunrise,
     not a separate identity. Dawn becomes dusk. */
  --color-background: oklch(18% 0.015 50);
  --color-surface: oklch(23% 0.018 48);
  --color-surface-hover: oklch(27% 0.02 45);
  --color-text: oklch(94% 0.01 70);
  --color-text-muted: oklch(70% 0.015 60);
  --color-accent: oklch(78% 0.13 40);
  --color-accent-secondary: oklch(70% 0.14 45);
}
```

**Accent usage rule (unchanged principle from prior draft):** accents are
for CTAs, hover states, borders, and small highlight moments only — never
a full-section fill. The base stays cream/near-black-warm at all times.

### 2.2 Typography
**Overrides AGENTS.md → (typography, negotiable):** proposing a swap from a
stiff geometric sans to a rounded, bold, friendly display face — this is a
default pick matching your "bold, creative, cartoon-adjacent" direction; it's
one line in this file, easy to swap later if it doesn't test well.

- **Headings:** `Fredoka` (600–700). Rounded, confident, youthful — carries
  energy without tipping into unprofessional. Large scale via `clamp()`,
  hero headline can run 56–88px+ on desktop.
- **Body:** `Inter`. Stays clean and legible against the more expressive
  headline face — one expressive font, one quiet font, never two loud ones.
- Small example: hero headline "Every beginning holds endless possibilities"
  set in Fredoka 700 at large scale, deep warm-brown text on cream, reads
  as a confident poster statement — no color needed to make it pop.

### 2.3 Photography Treatment
**New section, no prior AGENTS.md equivalent — pure DESIGN.md territory.**

- Photos sit inside **framed cards**: 3–4px solid border in
  `--color-accent-secondary`, `--radius: 0.75rem`, soft pastel-tinted
  shadow (never pure black shadow — use a low-opacity accent color).
- Slight rotation on alternating cards (`-2deg` / `+2deg`) in grid layouts
  for a scrapbook feel — corrects to `0deg` on hover (Framer Motion).
- Optional corner accent: a small sticker-style badge (e.g. category tag)
  overlapping the frame's top-left corner, like a photo-album label.
- Background pattern option for photo-heavy sections: a very low-opacity
  dot-grid or halftone texture in `--color-surface`, never competing with
  the photo itself.

### 2.4 Scroll Infrastructure (Lenis + GSAP + Framer Motion)
**Overrides AGENTS.md → Animations (negotiable, library scope):** Three-layer
animation system:

- **Lenis** — smooth scroll for the whole site (`lerp: 0.1, duration: 1.4`).
  Configured in `SmoothScroller.tsx` using `ReactLenis`. A `ScrollTriggerBridge`
  component inside the Lenis context calls `ScrollTrigger.update()` on every
  Lenis frame, keeping GSAP in sync with Lenis's virtual scroll position.
- **GSAP + ScrollTrigger** — owns complex scroll-narrative: word reveals,
  pinned stacking cards, scrubbed parallax, count-up stats.
- **Framer Motion** — owns all discrete interactions: hover states, entrance
  fades (via Magic UI `BlurFade`), mobile drawer, scale/translate on buttons.
- **Magic UI components** — used for: `MorphingText` (hero cycling words),
  `NumberTicker` (stats count-up), `BlurFade` (section entrances), `Marquee`
  (partner strip), `BorderBeam` (project card hover highlight),
  `AnimatedShinyText` (eyebrow tags).

| Element | Library | Behavior |
|---|---|---|
| Hero headline | Framer Motion / BlurFade | Staggered line-by-line blur-fade in |
| Hero rotating word | Magic UI MorphingText | Cycles: Serve → Lead → Build → Connect → Change |
| Hero eyebrow tag | Magic UI AnimatedShinyText | Shimmer sweep across tag text |
| Section entrances | Magic UI BlurFade | Blur + fade-up, inView trigger, once |
| Partner marquee | Magic UI Marquee | Pause on hover built-in, pill chips |
| Stats count-up | Magic UI NumberTicker | Auto-triggers on inView |
| Project stacking | GSAP ScrollTrigger | Pinned section, cards slide up and stack |
| About word reveal | GSAP ScrollTrigger | Scrub opacity per-word |
| Card hover effects | Framer Motion | Scale/translate spring, BorderBeam |
| Navbar active pill | Framer Motion layoutId | Shared layout spring animation |

All reveal animations play `once: true`. Full `prefers-reduced-motion`
fallback: static final states, no stagger, no parallax, marquee static.

### 2.5 Site Structure — Routes

#### `/` — Home (continuous scroll, lightweight)
1. **Hero** — full-viewport. Fredoka 3-line headline with MorphingText rotating
   action word. AnimatedShinyText eyebrow. Two CTAs: `/projects` and `/#about`.
2. **Partner/sponsor marquee** — Magic UI Marquee with pill chips, pause on hover.
3. **About `(01)`** — two-column split: SectionHeader left, GSAP word-reveal body right.
4. **Projects Preview `(02)`** — 3 project cards teaser linking to `/projects`.
   Color-coded cards with number watermarks, hover lift.
5. **Testimonial** — large Fredoka quote block, scroll fade-in.
6. **Calendar `(03)`** — event list, color-coded type dots, Framer hover slide.
7. **Testimonial 2** — second quote.
8. **Impact `(04)`** — stats block with NumberTicker, BlurFade entrance.
9. **Contact** — closing statement at poster scale + form + info column.
10. **Footer** — "Meet the Team →" link, social links, copyright.

#### `/projects` — Full Projects (immersive stacking scroll)
- Page header with project count and AnimatedShinyText eyebrow.
- GSAP-pinned stacking card section: N×100vh scroll distance.
  Cards slide up and stack as user scrolls — each card is a large
  `21:9` panel with color-coded bg, number watermark, project details.
  BorderBeam activates on hover. Pin + scrub driven by ScrollTrigger.

#### `/team` — Team Page (scroll, 5-tier hierarchy)
- 5 tiers: District Reps → Press/PR → Core → Board → General Body.
- Each tier numbered `(01)`–`(05)`, staggered GSAP card reveals.
- General Body uses compact grid (6-col desktop).
- Back to home link.

### 2.6 Team Page — New Separate Route
**Overrides AGENTS.md → (page structure, negotiable) + prior DESIGN.md
single-scroll mandate:** the team section made the home page too heavy and
buried the club's real organizational depth in a scroll users would skip.
Splitting it into `app/team/page.tsx` lets each tier get proper visual
weight and its own pacing, while keeping Home light and fast.

Hierarchy, top to bottom, confirmed order:

1. **District / Track Representatives** — most prominent placement, largest
   photo-frame size, first thing seen on the page.
2. **Press & PR Team** — second tier, medium frame size.
3. **Core Team** — grid layout, medium frame size.
4. **Board of Directors** — grid layout, medium frame size.
5. **General Body Members** — largest group, smallest frame size, dense
   grid (this tier can run into dozens of members — treat as a compact
   photo-grid, not individual feature cards).

Each tier gets its own numbered label `(01)`–`(05)` matching the home page's
visual language, so Team still feels like part of the same site, not a
bolted-on afterthought. Photo frame treatment (2.3) and reveal animation
(2.4, per-tier stagger) apply throughout.

---

## 3. Responsiveness
Unchanged principle from AGENTS.md mobile-first mandate:
- Hero headline scales via `clamp()`.
- Marquee: continuous on all breakpoints, shorter card width on mobile.
- Photo-frame grids: multi-column desktop → single column mobile (tilt
  effect disabled on mobile — flat, cleaner on small screens).
- Team page: General Body grid drops to 2 columns on mobile, all other
  tiers go single column.

---

## 4. Navbar
Re-themed per Sunrise palette: `bg-background/90` blur, `text-text`, active
link and hover use `--color-accent`. Nav items:
- Home `/#home`, About `/#about`, Projects `/projects`, Calendar `/#calendar`,
  Impact `/#more-about`, Contact `/#contact`, Team `/team`.

**V2 scroll detection:** Uses Lenis `useLenis` hook (not `window.scroll`) for
scrolled state. Active section tracked via `IntersectionObserver` on `data-section`
attributes — reliable with Lenis's virtual scroll position. Framer Motion
`layoutId="nav-pill"` creates a shared spring animation between active links.

## 5. Magic UI Component Registry

The following components from Magic UI are installed in `src/components/ui/`
(shadcn-managed — do not edit manually):

| Component | File | Used In |
|---|---|---|
| `MorphingText` | `morphing-text.tsx` | HomeHero — rotating action words |
| `BlurFade` | `blur-fade.tsx` | Section entrances site-wide |
| `Marquee` | `marquee.tsx` | Partner strip |
| `NumberTicker` | `number-ticker.tsx` | Impact stats |
| `BorderBeam` | `border-beam.tsx` | Project card hover |
| `AnimatedShinyText` | `animated-shiny-text.tsx` | Eyebrow tags |

To add more Magic UI components: `npx shadcn@latest add "https://magicui.design/r/<name>.json"`
Never manually create or edit files in `src/components/ui/` or `src/lib/`.