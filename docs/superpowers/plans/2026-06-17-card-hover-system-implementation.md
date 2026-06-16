# Card Hover System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a unified, medium-strength hover system to the site’s major card surfaces so they feel more interactive and polished while staying calm and readable.

**Architecture:** Implement the hover system primarily in `src/styles/index.css` by introducing a shared card-hover language and then layering small card-specific accent rules on top of the current selectors. Keep component markup changes minimal and only touch TSX files if selector targeting or structure cleanup is required for hover parity.

**Tech Stack:** React 19, TypeScript, Vite, CSS, react-i18next, lucide-react, framer-motion

---

## File Structure

### Shared hover styling

- Modify: `src/styles/index.css`

### Section markup cleanup only if selector targeting needs it

- Modify: `src/sections/ProgramsSection.tsx`
- Modify: `src/sections/GallerySection.tsx`
- Modify: `src/sections/TestimonialsSection.tsx`
- Modify: `src/sections/AboutSection.tsx`

### Verification

- Test: `npm run build`

## Task 1: Add the shared base hover system to all major card surfaces

**Files:**
- Modify: `src/styles/index.css`

- [ ] **Step 1: Add a shared transition baseline to the supported card surfaces**

In `src/styles/index.css`, update the shared card blocks so they include transition properties. Extend the existing grouped selector:

```css
.stat-card,
.program-card,
.about-card,
.method-card,
.testimonial-card,
.contact-form-card {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease;
}
```

Add the same transition pattern to these existing blocks as well:

```css
.about-objectives,
.gallery-card,
.testimonial-marquee-card {
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease;
}
```

- [ ] **Step 2: Add the shared hover and focus-within motion language**

Add this new grouped block near the card styles in `src/styles/index.css`:

```css
.stat-card:hover,
.stat-card:focus-within,
.program-card:hover,
.program-card:focus-within,
.about-card:hover,
.about-card:focus-within,
.about-objectives:hover,
.about-objectives:focus-within,
.method-card:hover,
.method-card:focus-within,
.testimonial-card:hover,
.testimonial-card:focus-within,
.testimonial-marquee-card:hover,
.testimonial-marquee-card:focus-within,
.contact-form-card:hover,
.contact-form-card:focus-within,
.gallery-card:hover,
.gallery-card:focus-within {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 24px 48px rgba(10, 40, 90, 0.14);
  border-color: rgba(11, 77, 162, 0.22);
}
```

This is the shared “medium” hover language: small lift, deeper shadow, subtle scale, stronger border.

- [ ] **Step 3: Add a reduced-motion guard for card hover movement**

Add this accessibility block near the existing reduced-motion media query:

```css
@media (prefers-reduced-motion: reduce) {
  .stat-card,
  .program-card,
  .about-card,
  .about-objectives,
  .method-card,
  .testimonial-card,
  .testimonial-marquee-card,
  .contact-form-card,
  .gallery-card {
    transition:
      box-shadow 220ms ease,
      border-color 220ms ease,
      background-color 220ms ease;
  }

  .stat-card:hover,
  .stat-card:focus-within,
  .program-card:hover,
  .program-card:focus-within,
  .about-card:hover,
  .about-card:focus-within,
  .about-objectives:hover,
  .about-objectives:focus-within,
  .method-card:hover,
  .method-card:focus-within,
  .testimonial-card:hover,
  .testimonial-card:focus-within,
  .testimonial-marquee-card:hover,
  .testimonial-marquee-card:focus-within,
  .contact-form-card:hover,
  .contact-form-card:focus-within,
  .gallery-card:hover,
  .gallery-card:focus-within {
    transform: none;
  }
}
```

- [ ] **Step 4: Commit the shared hover baseline**

Run:

```bash
git add src/styles/index.css
git commit -m "feat: add shared card hover baseline"
```

Expected: one focused commit containing only the shared hover transition and motion system.

## Task 2: Add card-specific accent behaviors without breaking readability

**Files:**
- Modify: `src/styles/index.css`

- [ ] **Step 1: Add icon and number emphasis for stat, program, about, and method cards**

Add these accent selectors to `src/styles/index.css`:

```css
.stat-card__icon,
.program-card__icon,
.method-card__number,
.about-card svg {
  transition:
    transform 220ms ease,
    background-color 220ms ease,
    color 220ms ease,
    box-shadow 220ms ease;
}

.stat-card:hover .stat-card__icon,
.stat-card:focus-within .stat-card__icon,
.program-card:hover .program-card__icon,
.program-card:focus-within .program-card__icon,
.method-card:hover .method-card__number,
.method-card:focus-within .method-card__number,
.about-card:hover svg,
.about-card:focus-within svg {
  transform: translateY(-2px) scale(1.06);
  color: var(--color-primary-dark);
  box-shadow: 0 12px 24px rgba(244, 194, 13, 0.18);
}

.stat-card:hover .stat-card__icon,
.stat-card:focus-within .stat-card__icon,
.program-card:hover .program-card__icon,
.program-card:focus-within .program-card__icon,
.method-card:hover .method-card__number,
.method-card:focus-within .method-card__number {
  background: linear-gradient(135deg, rgba(244, 194, 13, 0.24), rgba(11, 77, 162, 0.16));
}
```

- [ ] **Step 2: Add link and title emphasis for program and gallery cards**

Add these rules:

```css
.program-card a,
.gallery-card h3 {
  transition: transform 220ms ease, color 220ms ease;
}

.program-card:hover a,
.program-card:focus-within a {
  transform: translateX(4px);
  color: var(--color-primary-dark);
}

.gallery-card:hover h3,
.gallery-card:focus-within h3 {
  color: var(--color-primary);
}
```

- [ ] **Step 3: Add calmer hover behavior for testimonial cards and marquee cards**

Add these rules:

```css
.testimonial-card:hover,
.testimonial-card:focus-within {
  transform: translateY(-4px) scale(1.005);
}

.testimonial-marquee-card:hover,
.testimonial-marquee-card:focus-within {
  transform: translateY(-4px) scale(1.008);
  box-shadow: 0 20px 40px rgba(10, 40, 90, 0.12);
}

.testimonial-card__avatar,
.testimonial-marquee-card__stars,
.testimonial-card__stars {
  transition: transform 220ms ease, color 220ms ease;
}

.testimonial-card:hover .testimonial-card__avatar,
.testimonial-card:focus-within .testimonial-card__avatar {
  transform: scale(1.05);
}

.testimonial-marquee-card:hover .testimonial-marquee-card__stars,
.testimonial-marquee-card:focus-within .testimonial-marquee-card__stars,
.testimonial-card:hover .testimonial-card__stars,
.testimonial-card:focus-within .testimonial-card__stars {
  color: #e7b700;
}
```

- [ ] **Step 4: Add gentle emphasis for the contact form card and about objectives panel**

Add these rules:

```css
.contact-form-card:hover,
.contact-form-card:focus-within,
.about-objectives:hover,
.about-objectives:focus-within {
  background: rgba(255, 255, 255, 0.96);
}
```

- [ ] **Step 5: Commit the card-specific hover accents**

Run:

```bash
git add src/styles/index.css
git commit -m "feat: add card-specific hover accents"
```

Expected: this commit should contain the per-card polish on top of the shared hover baseline.

## Task 3: Verify selector coverage and only adjust section markup if necessary

**Files:**
- Modify: `src/sections/ProgramsSection.tsx`
- Modify: `src/sections/GallerySection.tsx`
- Modify: `src/sections/TestimonialsSection.tsx`
- Modify: `src/sections/AboutSection.tsx`

- [ ] **Step 1: Check whether current class names already match the hover selectors**

Verify these current class hooks exist and are sufficient:

- `program-card__icon` in `src/sections/ProgramsSection.tsx`
- `gallery-card__image` and `gallery-card` in `src/sections/GallerySection.tsx`
- `testimonial-card__avatar`, `testimonial-card__stars`, and `testimonial-marquee-card__stars` in `src/sections/TestimonialsSection.tsx`
- `about-card` and `about-objectives` in `src/sections/AboutSection.tsx`

Expected: no TSX changes are needed because the current markup already exposes these classes.

- [ ] **Step 2: Only if a class hook is missing, add it with the minimal markup edit**

If and only if a hook is missing, update the affected section component with the smallest possible class-name change. Do not restructure the component.

- [ ] **Step 3: If no TSX changes were needed, do not create a commit for this task**

Expected: in the current codebase, this task should likely finish with no file changes because the required classes already exist.

## Task 4: Run build verification and confirm no regressions

**Files:**
- Modify: `src/styles/index.css`
- Test: `npm run build`

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS with a generated Vite production bundle and no CSS or TypeScript errors.

- [ ] **Step 2: Fix any hover-related regressions without expanding scope**

If the build or quick local validation reveals issues, limit fixes to:

- hover selector collisions in `src/styles/index.css`
- transition rules that are too broad
- hover intensity adjustments for testimonial or gallery cards

Do not redesign unrelated sections.

- [ ] **Step 3: Commit the verified finish state**

Run:

```bash
git add src/styles/index.css
git commit -m "build: verify card hover system"
```

Expected: the final commit reflects the working, build-verified hover system.

## Self-Review

### Spec coverage

- The shared base hover behavior is covered in Task 1.
- Card-specific accents for stats, programs, about, method, testimonial, gallery, contact, and objectives are covered in Task 2.
- Keyboard/focus parity is included through `:focus-within` selectors.
- Mobile and reduced-motion concerns are covered through the reduced-motion block and CSS-first implementation.
- Build verification is covered in Task 4.

### Placeholder scan

- Removed vague phrases like “improve as needed” and replaced them with concrete selectors and CSS blocks.
- The only conditional path is the TSX verification task, which is explicit about making no change unless a class hook is missing.

### Type consistency

- Selector names match the current codebase: `program-card__icon`, `gallery-card__image`, `testimonial-card__avatar`, `testimonial-card__stars`, `testimonial-marquee-card__stars`, and `about-objectives`.
- The implementation stays centered in `src/styles/index.css`, which matches the existing styling architecture.
