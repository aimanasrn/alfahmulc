# Hero Grainient Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a branded ReactBits-inspired Grainient background to the homepage hero section and visually integrate it with the existing hero panel while keeping the section readable and responsive.

**Architecture:** Introduce a focused `HeroGrainient` UI component that renders decorative ambient layers behind the hero content, then update the existing `HeroSection` to include that layer without changing the overall content structure. Keep the visual system primarily CSS-driven, with only lightweight React markup for the background layer and motion hooks limited to CSS animations plus reduced-motion fallbacks.

**Tech Stack:** React 19, TypeScript, Vite, CSS, react-i18next, lucide-react

---

## File Structure

### Hero background component

- Create: `src/components/ui/HeroGrainient.tsx`

### Hero composition

- Modify: `src/sections/HeroSection.tsx`

### Hero styling and motion

- Modify: `src/styles/index.css`

### Verification

- Test: `npm run build`

## Task 1: Create the dedicated Grainient background component

**Files:**
- Create: `src/components/ui/HeroGrainient.tsx`

- [ ] **Step 1: Create the decorative hero background component**

Create `src/components/ui/HeroGrainient.tsx`:

```tsx
export function HeroGrainient() {
  return (
    <div className="hero-grainient" aria-hidden="true">
      <div className="hero-grainient__blob hero-grainient__blob--blue" />
      <div className="hero-grainient__blob hero-grainient__blob--gold" />
      <div className="hero-grainient__blob hero-grainient__blob--light" />
      <div className="hero-grainient__mesh" />
      <div className="hero-grainient__noise" />
      <div className="hero-grainient__ring hero-grainient__ring--one" />
      <div className="hero-grainient__ring hero-grainient__ring--two" />
    </div>
  );
}
```

This component stays presentation-only, does not receive props, and is marked `aria-hidden` so it remains decorative.

- [ ] **Step 2: Commit the new component checkpoint**

Run:

```bash
git add src/components/ui/HeroGrainient.tsx
git commit -m "feat: add hero grainient background component"
```

Expected: a small focused commit containing only the new reusable background layer component.

## Task 2: Integrate the Grainient layer into the existing hero section

**Files:**
- Modify: `src/sections/HeroSection.tsx`

- [ ] **Step 1: Import the new background component into the hero section**

Update the imports in `src/sections/HeroSection.tsx`:

```tsx
import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { HeroGrainient } from "../components/ui/HeroGrainient";
import { buttonVariants } from "../components/ui/Button";
```

- [ ] **Step 2: Wrap the existing hero content with the Grainient layer**

Update `src/sections/HeroSection.tsx` to this structure:

```tsx
import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { HeroGrainient } from "../components/ui/HeroGrainient";
import { buttonVariants } from "../components/ui/Button";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero-section" id="home">
      <HeroGrainient />
      <div className="container hero-section__grid">
        <ScrollReveal className="hero-copy">
          <span className="hero-copy__badge">{t("hero.badge")}</span>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
          <div className="hero-copy__actions">
            <a className={buttonVariants("primary")} href="#contact">
              {t("hero.primaryCta")}
            </a>
            <a className={buttonVariants("secondary")} href="#about">
              {t("hero.secondaryCta")}
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal className="hero-visual" delay={0.08}>
          <div className="hero-visual__panel">
            <div className="hero-visual__floating hero-visual__floating--one">
              <BookOpen aria-hidden="true" />
            </div>
            <div className="hero-visual__floating hero-visual__floating--two">
              <GraduationCap aria-hidden="true" />
            </div>
            <div className="hero-visual__shape" />
            <div className="hero-visual__card">
              <Sparkles aria-hidden="true" />
              <h2>{t("hero.cardTitle")}</h2>
              <p>{t("hero.cardDescription")}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

The hero copy, buttons, and visual panel remain unchanged in meaning; only the background composition changes.

- [ ] **Step 3: Commit the hero integration checkpoint**

Run:

```bash
git add src/sections/HeroSection.tsx
git commit -m "feat: integrate grainient layer into hero section"
```

Expected: a clean checkpoint showing only the hero markup integration.

## Task 3: Apply branded Grainient styling, motion, and responsive behavior

**Files:**
- Modify: `src/styles/index.css`

- [ ] **Step 1: Update the hero section container to support layered backgrounds**

In `src/styles/index.css`, replace the existing `.hero-section` block with:

```css
.hero-section {
  position: relative;
  padding: 5rem 0 6rem;
  overflow: clip;
  isolation: isolate;
}
```

This keeps the new decorative layers clipped to the hero bounds and prevents blend effects from leaking into neighboring sections.

- [ ] **Step 2: Add the new Grainient layer styles**

Add these blocks near the hero styles in `src/styles/index.css`:

```css
.hero-grainient {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.78), transparent 32rem),
    linear-gradient(135deg, rgba(8, 34, 82, 0.96), rgba(11, 77, 162, 0.82) 52%, rgba(247, 250, 252, 0.92) 100%);
}

.hero-grainient__blob,
.hero-grainient__ring,
.hero-grainient__mesh,
.hero-grainient__noise {
  position: absolute;
}

.hero-grainient__blob {
  border-radius: 50%;
  filter: blur(24px);
  opacity: 0.95;
  animation: hero-grainient-drift 18s ease-in-out infinite alternate;
}

.hero-grainient__blob--blue {
  top: -6rem;
  right: -4rem;
  width: 24rem;
  height: 24rem;
  background: radial-gradient(circle, rgba(11, 77, 162, 0.74), rgba(11, 77, 162, 0.08) 72%);
}

.hero-grainient__blob--gold {
  left: 36%;
  bottom: -7rem;
  width: 20rem;
  height: 20rem;
  background: radial-gradient(circle, rgba(244, 194, 13, 0.42), rgba(244, 194, 13, 0.06) 72%);
  animation-delay: -6s;
}

.hero-grainient__blob--light {
  left: -5rem;
  top: 4rem;
  width: 18rem;
  height: 18rem;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.04) 70%);
  animation-delay: -10s;
}

.hero-grainient__mesh {
  inset: 0;
  background:
    radial-gradient(circle at 18% 28%, rgba(255, 255, 255, 0.24), transparent 18rem),
    radial-gradient(circle at 72% 18%, rgba(244, 194, 13, 0.12), transparent 16rem),
    radial-gradient(circle at 64% 72%, rgba(11, 77, 162, 0.16), transparent 18rem);
  mix-blend-mode: screen;
}

.hero-grainient__noise {
  inset: 0;
  opacity: 0.12;
  background-image:
    radial-gradient(rgba(255, 255, 255, 0.46) 0.7px, transparent 0.7px),
    radial-gradient(rgba(8, 34, 82, 0.18) 0.7px, transparent 0.7px);
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
  mix-blend-mode: soft-light;
}

.hero-grainient__ring {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.55;
}

.hero-grainient__ring--one {
  top: 4.5rem;
  right: 16%;
  width: 18rem;
  height: 18rem;
}

.hero-grainient__ring--two {
  left: 8%;
  bottom: 2rem;
  width: 11rem;
  height: 11rem;
  border-color: rgba(244, 194, 13, 0.28);
}

@keyframes hero-grainient-drift {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  100% {
    transform: translate3d(1.2rem, -1rem, 0) scale(1.08);
  }
}
```

- [ ] **Step 3: Tune the hero foreground styles to sit on the new background**

Update the existing hero-related blocks in `src/styles/index.css` to:

```css
.hero-section__grid {
  position: relative;
  z-index: 1;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
}

.hero-copy {
  max-width: 40rem;
}

.hero-copy__badge {
  background: rgba(244, 194, 13, 0.9);
  color: var(--color-primary-dark);
  box-shadow: 0 10px 30px rgba(244, 194, 13, 0.22);
}

.hero-copy h1,
.hero-copy p {
  color: var(--color-white);
}

.hero-copy p {
  max-width: 38rem;
  color: rgba(255, 255, 255, 0.82);
}

.hero-visual__panel {
  min-height: 30rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.08)),
    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(11, 77, 162, 0.14));
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 24px 60px rgba(10, 40, 90, 0.26);
  backdrop-filter: blur(18px);
}

.hero-visual__card {
  background: rgba(255, 255, 255, 0.9);
}

.hero-visual__floating {
  background: rgba(255, 255, 255, 0.92);
}
```

- [ ] **Step 4: Add reduced-motion and mobile fallbacks**

Add these responsive and accessibility blocks near the existing media queries:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-grainient__blob {
    animation: none;
  }
}

@media (max-width: 1100px) {
  .hero-grainient__ring--one {
    right: 8%;
  }

  .hero-grainient__blob--gold {
    left: auto;
    right: -3rem;
    bottom: -4rem;
  }
}

@media (max-width: 720px) {
  .hero-grainient {
    background:
      radial-gradient(circle at top left, rgba(255, 255, 255, 0.68), transparent 18rem),
      linear-gradient(160deg, rgba(8, 34, 82, 0.98), rgba(11, 77, 162, 0.88) 58%, rgba(247, 250, 252, 0.9) 100%);
  }

  .hero-grainient__blob {
    filter: blur(18px);
    opacity: 0.72;
  }

  .hero-grainient__ring {
    opacity: 0.3;
  }

  .hero-copy p {
    color: rgba(255, 255, 255, 0.86);
  }
}
```

- [ ] **Step 5: Commit the branded styling checkpoint**

Run:

```bash
git add src/styles/index.css
git commit -m "feat: style branded grainient hero background"
```

Expected: the styling commit contains the visual treatment, reduced-motion fallback, and responsive tuning.

## Task 4: Verify the hero implementation in production build output

**Files:**
- Modify: `src/components/ui/HeroGrainient.tsx`
- Modify: `src/sections/HeroSection.tsx`
- Modify: `src/styles/index.css`
- Test: `npm run build`

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS with a generated Vite bundle and no TypeScript errors from the new hero background component.

- [ ] **Step 2: Fix any build or typing issues without changing the approved design**

If the build surfaces issues, limit fixes to:

- import paths in `HeroSection.tsx`
- decorative markup in `HeroGrainient.tsx`
- CSS syntax or selector collisions in `src/styles/index.css`

Do not expand scope into unrelated homepage refactors.

- [ ] **Step 3: Commit the verified finish state**

Run:

```bash
git add src/components/ui/HeroGrainient.tsx src/sections/HeroSection.tsx src/styles/index.css
git commit -m "build: verify grainient hero implementation"
```

Expected: the final checkpoint reflects the working hero Grainient implementation after build verification.

## Self-Review

### Spec coverage

- The plan adds a dedicated hero-only background layer rather than a site-wide background change.
- The design uses AL-FAHMU brand blue, accent yellow, and soft white haze through the new Grainient CSS layers.
- The existing hero panel is explicitly retuned so it integrates with the new background instead of competing with it.
- Accessibility and performance requirements are covered through decorative `aria-hidden` markup, reduced-motion fallbacks, CSS-driven motion, and a build verification step.
- Desktop, tablet, and mobile behavior are covered in the responsive styling task.

### Placeholder scan

- Removed vague implementation notes and replaced them with exact file paths, CSS blocks, TSX snippets, and commands.
- The only debugging step is constrained to build-safe fixes and does not leave open-ended follow-up work.

### Type consistency

- The new component is consistently named `HeroGrainient`.
- `HeroSection` imports `HeroGrainient` from `src/components/ui/HeroGrainient.tsx`.
- All verification commands reference the current Vite build command already used in the repo.
