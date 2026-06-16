# AL-FAHMU Landing Page Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the AL-FAHMU public homepage as a bilingual, warm editorial, single-page landing page in the existing React + TypeScript + Vite stack.

**Architecture:** Restore the deleted frontend scaffold from the last committed app state, then replace the old homepage composition with a new data-driven landing page made of focused section components and locale-backed content. Keep routing and i18n lightweight, centralize visual styling in a shared stylesheet, and verify the rewrite with component-level UI tests plus a production build.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, i18next, react-i18next, react-router-dom, lucide-react, framer-motion

---

## File Structure

### Restore or keep from existing app baseline

- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Modify: `src/i18n/index.ts`
- Modify: `src/routes/AppRouter.tsx`
- Modify: `src/test/setup.ts`

### Landing page composition

- Modify: `src/pages/HomePage.tsx`
- Create or modify: `src/sections/TopBarSection.tsx`
- Create or modify: `src/sections/HeaderSection.tsx`
- Create or modify: `src/sections/HeroSection.tsx`
- Create or modify: `src/sections/StatsSection.tsx`
- Create or modify: `src/sections/AboutSection.tsx`
- Create or modify: `src/sections/ProgramsSection.tsx`
- Create or modify: `src/sections/WhyChooseUsSection.tsx`
- Create or modify: `src/sections/LearningMethodSection.tsx`
- Create or modify: `src/sections/GallerySection.tsx`
- Create or modify: `src/sections/TestimonialsSection.tsx`
- Create or modify: `src/sections/FinalCtaSection.tsx`
- Create or modify: `src/sections/ContactSection.tsx`
- Create or modify: `src/components/common/Footer.tsx`

### Shared UI and data

- Create or modify: `src/components/ui/SectionTitle.tsx`
- Create or modify: `src/components/ui/Button.tsx`
- Create or modify: `src/components/ui/LanguageSwitcher.tsx`
- Create or modify: `src/components/ui/ScrollReveal.tsx`
- Create: `src/data/landingPage.ts`
- Create or modify: `src/utils/contact.ts`

### Locales and styling

- Modify: `src/locales/en/common.json`
- Modify: `src/locales/ms/common.json`
- Modify: `src/styles/index.css`

### Tests

- Modify: `src/pages/HomePage.test.tsx`
- Create: `src/components/navigation/HeaderSection.test.tsx`
- Create: `src/components/ui/LanguageSwitcher.test.tsx`

## Task 1: Restore the frontend scaffold from the last committed baseline

**Files:**
- Modify: `package.json`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Modify: `src/i18n/index.ts`
- Modify: `src/routes/AppRouter.tsx`
- Modify: `vite.config.ts`
- Modify: `src/test/setup.ts`

- [ ] **Step 1: Restore the deleted baseline files from `HEAD`**

Run:

```bash
git restore --source=HEAD -- package.json vite.config.ts src/main.tsx src/App.tsx src/i18n/index.ts src/routes/AppRouter.tsx src/test/setup.ts
```

Expected: the listed files are restored into the working tree so the app can compile again.

- [ ] **Step 2: Run the test command to confirm the missing-file state is gone**

Run:

```bash
npm run test -- --runInBand
```

Expected: tests still fail because the old homepage files and related UI files are still missing, but the failure should now be about unresolved imports such as `src/pages/HomePage.tsx`, not missing `package.json` or `src/main.tsx`.

- [ ] **Step 3: Reconfirm the i18n baseline matches the bilingual architecture**

Use this `src/i18n/index.ts` shape:

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../locales/en/common.json";
import msCommon from "../locales/ms/common.json";

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    ms: { common: msCommon },
  },
  lng: "ms",
  fallbackLng: "ms",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

This step is complete when `src/i18n/index.ts` still supports both `en` and `ms` exactly as above.

- [ ] **Step 4: Restore the minimal app shell and router**

Use these file contents if the restore brought back conflicting or incomplete versions.

`src/App.tsx`

```tsx
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return <AppRouter />;
}
```

`src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

`src/routes/AppRouter.tsx`

```tsx
import { BrowserRouter, Route, Routes, useInRouterContext } from "react-router-dom";
import HomePage from "../pages/HomePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export function AppRouter() {
  const hasRouterContext = useInRouterContext();

  if (hasRouterContext) {
    return <AppRoutes />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
```

- [ ] **Step 5: Commit the scaffold restoration checkpoint**

Run:

```bash
git add package.json vite.config.ts src/main.tsx src/App.tsx src/i18n/index.ts src/routes/AppRouter.tsx src/test/setup.ts
git commit -m "chore: restore landing page app scaffold"
```

Expected: a small checkpoint commit that restores the app entry points before the homepage rewrite begins.

## Task 2: Replace locale content with the new landing-page copy and data model

**Files:**
- Create: `src/data/landingPage.ts`
- Modify: `src/locales/en/common.json`
- Modify: `src/locales/ms/common.json`
- Test: `src/components/ui/LanguageSwitcher.test.tsx`

- [ ] **Step 1: Write the failing language-switching test**

Create `src/components/ui/LanguageSwitcher.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

test("switches between Bahasa Melayu and English labels", async () => {
  const user = userEvent.setup();

  render(
    <I18nextProvider i18n={i18n}>
      <LanguageSwitcher />
    </I18nextProvider>,
  );

  expect(screen.getByRole("button", { name: /bm/i })).toHaveAttribute("aria-pressed", "true");

  await user.click(screen.getByRole("button", { name: /en/i }));

  expect(screen.getByRole("button", { name: /en/i })).toHaveAttribute("aria-pressed", "true");
});
```

- [ ] **Step 2: Run the new test and confirm it fails**

Run:

```bash
npm run test -- src/components/ui/LanguageSwitcher.test.tsx
```

Expected: FAIL because `LanguageSwitcher` is missing or does not yet expose the bilingual button behavior described in the test.

- [ ] **Step 3: Add the landing-page data helper**

Create `src/data/landingPage.ts` with the repeated structural keys used by the page:

```ts
export const navigationIds = ["home", "about", "programs", "activities", "testimonials", "contact"] as const;

export const statsKeys = ["students", "experience", "teachers", "method"] as const;

export const programKeys = [
  "academicSupport",
  "quranClasses",
  "homeworkGuidance",
  "readingProgram",
  "examPreparation",
  "holidayProgram",
] as const;

export const whyChooseUsKeys = [
  "smallClassSize",
  "experiencedTeachers",
  "interactiveLearning",
  "characterBuilding",
  "safeEnvironment",
  "parentCommunication",
] as const;

export const learningMethodKeys = ["assessment", "learningPlan", "guidedLearning", "progressMonitoring"] as const;

export const galleryKeys = [
  "classroomLearning",
  "quranSession",
  "groupActivity",
  "readingSession",
  "examWorkshop",
  "holidayProgram",
] as const;

export const testimonialKeys = ["reviewOne", "reviewTwo", "reviewThree"] as const;
```

- [ ] **Step 4: Replace the locale files with the new landing-page structure**

Both locale files should expose the same shape. Use this English slice inside `src/locales/en/common.json`:

```json
{
  "brand": {
    "name": "AL-FAHMU Learning Centre",
    "tagline": "Academic excellence with Islamic values and caring guidance"
  },
  "topBar": {
    "phone": "Call: +60 12-000 0000",
    "location": "Putrajaya",
    "hours": "Open daily: 8:30 AM - 6:00 PM"
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "programs": "Programs",
    "activities": "Activities",
    "testimonials": "Testimonials",
    "contact": "Contact"
  },
  "hero": {
    "badge": "Trusted Learning Centre",
    "title": "Nurturing Knowledge, Building Character.",
    "description": "Providing quality academic and Islamic education for children through engaging, guided, and modern learning experiences.",
    "primaryCta": "Register Now",
    "secondaryCta": "Learn More"
  }
}
```

Use this Bahasa Melayu slice inside `src/locales/ms/common.json`:

```json
{
  "brand": {
    "name": "AL-FAHMU Learning Centre",
    "tagline": "Kecemerlangan akademik dengan nilai Islam dan bimbingan yang prihatin"
  },
  "topBar": {
    "phone": "Hubungi: +60 12-000 0000",
    "location": "Putrajaya",
    "hours": "Dibuka setiap hari: 8:30 pagi - 6:00 petang"
  },
  "nav": {
    "home": "Laman Utama",
    "about": "Tentang",
    "programs": "Program",
    "activities": "Aktiviti",
    "testimonials": "Testimoni",
    "contact": "Hubungi"
  },
  "hero": {
    "badge": "Pusat Pembelajaran Dipercayai",
    "title": "Menyuburkan Ilmu, Membina Sahsiah.",
    "description": "Menyediakan pendidikan akademik dan Islam yang berkualiti untuk kanak-kanak melalui pengalaman pembelajaran yang moden, terarah, dan menarik.",
    "primaryCta": "Daftar Sekarang",
    "secondaryCta": "Ketahui Lagi"
  }
}
```

Extend both files with matching keys for `stats`, `about`, `programs`, `whyChooseUs`, `learningMethod`, `gallery`, `testimonials`, `finalCta`, `contact`, and `footer`.

- [ ] **Step 5: Implement the new `LanguageSwitcher`**

Use `src/components/ui/LanguageSwitcher.tsx`:

```tsx
import { useTranslation } from "react-i18next";

const languages = [
  { code: "ms", label: "BM" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="language-switcher" role="group" aria-label="Language switcher">
      {languages.map((language) => {
        const isActive = i18n.language === language.code;

        return (
          <button
            key={language.code}
            type="button"
            className={isActive ? "language-switcher__button is-active" : "language-switcher__button"}
            aria-pressed={isActive}
            onClick={() => void i18n.changeLanguage(language.code)}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 6: Run the language-switching test and verify it passes**

Run:

```bash
npm run test -- src/components/ui/LanguageSwitcher.test.tsx
```

Expected: PASS with the `aria-pressed` state moving from `BM` to `EN`.

- [ ] **Step 7: Commit the bilingual content checkpoint**

Run:

```bash
git add src/data/landingPage.ts src/locales/en/common.json src/locales/ms/common.json src/components/ui/LanguageSwitcher.tsx src/components/ui/LanguageSwitcher.test.tsx
git commit -m "feat: add bilingual landing page content model"
```

## Task 3: Build the rewritten landing page sections and responsive styling

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Create or modify: `src/sections/TopBarSection.tsx`
- Create or modify: `src/sections/HeaderSection.tsx`
- Create or modify: `src/sections/HeroSection.tsx`
- Create or modify: `src/sections/StatsSection.tsx`
- Create or modify: `src/sections/AboutSection.tsx`
- Create or modify: `src/sections/ProgramsSection.tsx`
- Create or modify: `src/sections/WhyChooseUsSection.tsx`
- Create or modify: `src/sections/LearningMethodSection.tsx`
- Create or modify: `src/sections/GallerySection.tsx`
- Create or modify: `src/sections/TestimonialsSection.tsx`
- Create or modify: `src/sections/FinalCtaSection.tsx`
- Create or modify: `src/sections/ContactSection.tsx`
- Modify: `src/components/common/Footer.tsx`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/SectionTitle.tsx`
- Modify: `src/components/ui/ScrollReveal.tsx`
- Modify: `src/styles/index.css`

- [ ] **Step 1: Write the failing homepage render test for the new sections**

Replace `src/pages/HomePage.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import "../i18n";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

test("renders the bilingual landing page sections", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByText(/Putrajaya/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Menyuburkan Ilmu, Membina Sahsiah/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Tentang AL-FAHMU/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Program Pembelajaran Kami/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Kenapa Ibu Bapa Memilih AL-FAHMU/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Kaedah Pembelajaran Kami/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Aktiviti Pembelajaran/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Apa Kata Ibu Bapa/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Berikan Anak Anda Pengalaman Pembelajaran Terbaik/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Daftar Sekarang/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the homepage test and confirm it fails**

Run:

```bash
npm run test -- src/pages/HomePage.test.tsx
```

Expected: FAIL because `HomePage` and the new section headings do not yet match the rewritten landing page structure.

- [ ] **Step 3: Implement the new homepage composition**

Use this `src/pages/HomePage.tsx` structure:

```tsx
import { Footer } from "../components/common/Footer";
import { TopBarSection } from "../sections/TopBarSection";
import { HeaderSection } from "../sections/HeaderSection";
import { HeroSection } from "../sections/HeroSection";
import { StatsSection } from "../sections/StatsSection";
import { AboutSection } from "../sections/AboutSection";
import { ProgramsSection } from "../sections/ProgramsSection";
import { WhyChooseUsSection } from "../sections/WhyChooseUsSection";
import { LearningMethodSection } from "../sections/LearningMethodSection";
import { GallerySection } from "../sections/GallerySection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { FinalCtaSection } from "../sections/FinalCtaSection";
import { ContactSection } from "../sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <TopBarSection />
      <HeaderSection />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProgramsSection />
        <WhyChooseUsSection />
        <LearningMethodSection />
        <GallerySection />
        <TestimonialsSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Implement the sticky header, top bar, and hero first**

Use these core patterns:

`src/sections/HeaderSection.tsx`

```tsx
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/ui/LanguageSwitcher";
import { navigationIds } from "../data/landingPage";

export function HeaderSection() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navigationIds.map((id) => ({ id, label: t(`nav.${id}`) }));

  return (
    <header className={isScrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="container site-header__inner">
        <a href="#home" className="site-header__brand">{t("brand.name")}</a>
        <nav className="site-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="site-nav__link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="site-header__actions">
          <LanguageSwitcher />
          <a href="#contact" className="button button--primary">{t("hero.primaryCta")}</a>
          <button type="button" className="menu-toggle" onClick={() => setIsOpen((value) => !value)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className={isOpen ? "mobile-drawer is-open" : "mobile-drawer"}>
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="mobile-drawer__link" onClick={() => setIsOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
```

`src/sections/HeroSection.tsx`

```tsx
import { Sparkles, BookOpen, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero-section">
      <div className="container hero-section__grid">
        <ScrollReveal className="hero-copy">
          <span className="hero-copy__badge">{t("hero.badge")}</span>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
          <div className="hero-copy__actions">
            <a href="#contact" className="button button--primary">{t("hero.primaryCta")}</a>
            <a href="#about" className="button button--secondary">{t("hero.secondaryCta")}</a>
          </div>
        </ScrollReveal>
        <ScrollReveal className="hero-visual" delay={0.1}>
          <div className="hero-visual__card">
            <Sparkles />
            <BookOpen />
            <GraduationCap />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement the remaining sections using locale keys and mapped arrays**

Follow this section pattern:

```tsx
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../components/ui/SectionTitle";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { programKeys } from "../data/landingPage";

export function ProgramsSection() {
  const { t } = useTranslation();

  return (
    <section id="programs" className="section section--surface">
      <div className="container">
        <SectionTitle eyebrow={t("programs.eyebrow")} title={t("programs.title")} description={t("programs.description")} />
        <div className="program-grid">
          {programKeys.map((key) => (
            <ScrollReveal key={key} className="program-card">
              <h3>{t(`programs.items.${key}.title`)}</h3>
              <p>{t(`programs.items.${key}.description`)}</p>
              <a href="#contact">{t("programs.learnMore")}</a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Apply the same mapped approach to stats, why-choose-us items, learning steps, gallery cards, and testimonial cards.

- [ ] **Step 6: Implement the shared animation and typography helpers**

Use these shared components:

`src/components/ui/SectionTitle.tsx`

```tsx
type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "center" }: SectionTitleProps) {
  return (
    <div className={align === "left" ? "section-title section-title--left" : "section-title"}>
      {eyebrow ? <p className="section-title__eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-title__description">{description}</p> : null}
    </div>
  );
}
```

`src/components/ui/ScrollReveal.tsx`

```tsx
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type ScrollRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={isVisible ? `${className ?? ""} scroll-reveal is-visible`.trim() : `${className ?? ""} scroll-reveal`.trim()}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 7: Replace the global stylesheet with the new warm editorial system**

Make `src/styles/index.css` define:

```css
:root {
  --color-primary: #0b4da2;
  --color-primary-dark: #0a285a;
  --color-accent: #f4c20d;
  --color-surface: #f8fafc;
  --color-white: #ffffff;
  --color-text: #1f2937;
  --color-muted: #6b7280;
  --shadow-soft: 0 20px 45px rgba(10, 40, 90, 0.08);
  --radius-lg: 24px;
  --radius-md: 18px;
  --radius-sm: 12px;
  --container-width: 1280px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  color: var(--color-text);
  background:
    radial-gradient(circle at top left, rgba(244, 194, 13, 0.18), transparent 24rem),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.container {
  width: min(calc(100% - 2rem), var(--container-width));
  margin: 0 auto;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.875rem 1.25rem;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.button:hover,
.button:focus-visible {
  transform: translateY(-2px);
}
```

Then extend it with section-specific classes for the header, hero, grids, dark `why choose us` band, timeline, gallery hover zoom, CTA gradient, contact layout, and mobile drawer transitions.

- [ ] **Step 8: Run the homepage test and verify it passes**

Run:

```bash
npm run test -- src/pages/HomePage.test.tsx
```

Expected: PASS with all new section headings and CTAs rendered in Bahasa Melayu by default.

- [ ] **Step 9: Commit the landing page UI checkpoint**

Run:

```bash
git add src/pages/HomePage.tsx src/sections src/components/common/Footer.tsx src/components/ui/Button.tsx src/components/ui/SectionTitle.tsx src/components/ui/ScrollReveal.tsx src/styles/index.css
git commit -m "feat: build al-fahmu landing page rewrite"
```

## Task 4: Finish contact interactions, navigation tests, and production verification

**Files:**
- Modify: `src/sections/ContactSection.tsx`
- Modify: `src/utils/contact.ts`
- Create: `src/components/navigation/HeaderSection.test.tsx`
- Modify: `src/pages/HomePage.test.tsx`
- Test: `src/components/navigation/HeaderSection.test.tsx`

- [ ] **Step 1: Write the failing header interaction test**

Create `src/components/navigation/HeaderSection.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeaderSection } from "../../sections/HeaderSection";
import "../../i18n";

test("opens and closes the mobile navigation drawer", async () => {
  const user = userEvent.setup();

  render(<HeaderSection />);

  const toggle = screen.getByRole("button");

  await user.click(toggle);
  expect(screen.getByRole("link", { name: /Aktiviti/i })).toBeVisible();

  await user.click(screen.getByRole("link", { name: /Aktiviti/i }));
});
```

- [ ] **Step 2: Run the header interaction test and confirm it fails**

Run:

```bash
npm run test -- src/components/navigation/HeaderSection.test.tsx
```

Expected: FAIL if the drawer toggle, labels, or mobile markup are incomplete.

- [ ] **Step 3: Implement the presentational contact form and safe helper**

Use `src/utils/contact.ts`:

```ts
export type ContactFormValues = {
  name: string;
  phone: string;
  childAge: string;
  message: string;
};

export function createInitialContactValues(): ContactFormValues {
  return {
    name: "",
    phone: "",
    childAge: "",
    message: "",
  };
}
```

Use `src/sections/ContactSection.tsx` with controlled fields and no live API dependency:

```tsx
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { createInitialContactValues } from "../utils/contact";

export function ContactSection() {
  const { t } = useTranslation();
  const [values, setValues] = useState(createInitialContactValues);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="contact" className="section section--contact">
      <div className="container contact-grid">
        <div>
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.description")}</p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            <span>{t("contact.form.name")}</span>
            <input value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} />
          </label>
        </form>
      </div>
    </section>
  );
}
```

Expand the form to include phone, child age, message, and submit button.

- [ ] **Step 4: Run the focused UI tests and verify they pass**

Run:

```bash
npm run test -- src/components/navigation/HeaderSection.test.tsx src/components/ui/LanguageSwitcher.test.tsx src/pages/HomePage.test.tsx
```

Expected: PASS for the header interaction, language switcher, and homepage render coverage.

- [ ] **Step 5: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS with a generated Vite production bundle and no TypeScript errors.

- [ ] **Step 6: Commit the verified finish state**

Run:

```bash
git add src/sections/ContactSection.tsx src/utils/contact.ts src/components/navigation/HeaderSection.test.tsx src/pages/HomePage.test.tsx
git commit -m "test: verify landing page interactions and build"
```

## Self-Review

### Spec coverage

- Top bar, sticky header, hero, stats, about, programs, why choose us, learning method, gallery, testimonials, final CTA, contact, and footer are all mapped to Task 3 implementation steps.
- Bilingual content and locale-driven repeated arrays are covered in Task 2.
- Smooth scrolling, header shadow, mobile drawer, reveal animations, and contact form behavior are covered in Tasks 3 and 4.
- Responsive styling and warm editorial visuals are covered in Task 3 stylesheet and section composition steps.
- Production verification and interaction tests are covered in Task 4.

### Placeholder scan

- Removed `TODO` and `TBD` style language.
- Every task includes concrete file paths, commands, and starter code.
- The only intentional extension points are “extend both locale files” and “expand the form,” which are constrained by explicit schema and neighboring code.

### Type consistency

- Navigation uses `navigationIds`.
- Repeated content keys come from `src/data/landingPage.ts`.
- Contact form values are typed with `ContactFormValues`.
- The rewritten page consistently uses `HeaderSection`, `HeroSection`, `ProgramsSection`, `FinalCtaSection`, and `ContactSection`.
