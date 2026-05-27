# Al-Fahmu Learning Centre Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual React landing page for Al-Fahmu Learning Centre with premium SaaS styling, WhatsApp-first conversion, and placeholder future portal routes.

**Architecture:** Use a Vite React app with TailwindCSS, Framer Motion, React Router, and react-i18next. Keep public marketing screens and future portal screens separated through `MarketingLayout` and `PortalLayout`, while driving display content from translation files and small data modules for long-term scalability.

**Tech Stack:** React, Vite, TypeScript, TailwindCSS, Framer Motion, Lucide React, React Router, react-i18next, Vitest, React Testing Library

---

## Planned File Structure

Create these files during implementation:

- `package.json` - app scripts and frontend dependencies
- `vite.config.ts` - Vite config with React plugin
- `tsconfig.json` - TypeScript compiler settings
- `tsconfig.app.json` - app-specific TypeScript settings
- `tsconfig.node.json` - Vite/node TypeScript settings
- `index.html` - page shell and metadata
- `postcss.config.js` - Tailwind PostCSS pipeline
- `tailwind.config.ts` - theme colors, fonts, shadows, and content config
- `src/main.tsx` - app bootstrap
- `src/App.tsx` - root app wrapper
- `src/styles/index.css` - Tailwind layers and theme utilities
- `src/i18n/index.ts` - i18next initialization
- `src/locales/ms/common.json` - Malay translations
- `src/locales/en/common.json` - English translations
- `src/routes/AppRouter.tsx` - route definitions
- `src/layouts/MarketingLayout.tsx` - public layout wrapper
- `src/layouts/PortalLayout.tsx` - future portal placeholder shell
- `src/pages/HomePage.tsx` - landing page assembly
- `src/pages/portal/StudentPortalPage.tsx` - student portal placeholder
- `src/pages/portal/TeacherPortalPage.tsx` - teacher portal placeholder
- `src/pages/portal/AdminPortalPage.tsx` - admin portal placeholder
- `src/components/ui/Button.tsx` - shared button component
- `src/components/ui/SectionTitle.tsx` - reusable section heading block
- `src/components/ui/ScrollReveal.tsx` - reveal animation wrapper
- `src/components/ui/LanguageSwitcher.tsx` - BM/EN toggle
- `src/components/ui/FormField.tsx` - text input wrapper
- `src/components/ui/TextAreaField.tsx` - textarea wrapper
- `src/components/navigation/Navbar.tsx` - sticky navbar and mobile navigation
- `src/components/common/FloatingWhatsAppButton.tsx` - fixed WhatsApp CTA
- `src/components/common/Footer.tsx` - footer content
- `src/sections/HeroSection.tsx` - hero area
- `src/sections/AboutSection.tsx` - about cards
- `src/sections/SubjectsSection.tsx` - subjects grid
- `src/sections/FuturePortalSection.tsx` - dark portal preview
- `src/sections/ContactSection.tsx` - split contact area and form
- `src/data/navigation.ts` - nav items and anchors
- `src/data/aboutFeatures.ts` - about card metadata
- `src/data/subjects.ts` - subject card metadata
- `src/data/portalCards.ts` - future portal metadata
- `src/hooks/useContactForm.ts` - form state and validation logic
- `src/utils/cn.ts` - class merging helper
- `src/utils/contact.ts` - placeholder contact submission function
- `src/test/setup.ts` - test setup
- `src/components/navigation/Navbar.test.tsx` - language switch and CTA test
- `src/pages/HomePage.test.tsx` - landing page render test
- `src/hooks/useContactForm.test.ts` - form validation test

## Task 1: Scaffold the Vite React foundation

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`

- [ ] **Step 1: Write the failing package manifest review note**

Create `package.json` with scripts and dependencies that intentionally reference a missing `src/main.tsx` entry:

```json
{
  "name": "alfahmulc",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "framer-motion": "^12.17.0",
    "i18next": "^25.2.1",
    "lucide-react": "^0.511.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-i18next": "^15.5.2",
    "react-router-dom": "^7.6.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.8",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/react": "^19.1.6",
    "@types/react-dom": "^19.1.5",
    "@vitejs/plugin-react": "^4.5.0",
    "autoprefixer": "^10.4.21",
    "jsdom": "^26.1.0",
    "postcss": "^8.5.4",
    "tailwindcss": "^4.1.8",
    "typescript": "~5.8.3",
    "vite": "^6.3.5",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Run the install command to create the lockfile**

Run: `npm install`
Expected: packages install successfully and `package-lock.json` is created

- [ ] **Step 3: Write minimal Vite and TypeScript config**

Create these files:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
  },
});
```

```json
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

```json
// tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

```html
<!-- index.html -->
<!doctype html>
<html lang="ms">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Al-Fahmu Learning Centre membantu pelajar belajar dengan lebih yakin melalui kelas yang tersusun dan mudah difahami."
    />
    <title>Al-Fahmu Learning Centre</title>
    <link rel="icon" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Run the build to verify the app fails for the expected missing entry**

Run: `npm run build`
Expected: FAIL because `src/main.tsx` and `src/test/setup.ts` do not exist yet

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html
git commit -m "chore: scaffold vite react foundation"
```

## Task 2: Add Tailwind theme, app bootstrap, and test setup

**Files:**
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/index.css`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Write the failing build expectation**

Run: `npm run build`
Expected: FAIL because the CSS pipeline and root app files are still missing or incomplete

- [ ] **Step 2: Create the bootstrap and style foundation**

Create these files:

```js
// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          700: "#1d4ed8",
          900: "#0f172a",
        },
        accent: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(37, 99, 235, 0.18)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 36%), radial-gradient(circle at bottom right, rgba(245,158,11,0.14), transparent 28%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

```tsx
// src/App.tsx
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return <AppRouter />;
}
```

```css
/* src/styles/index.css */
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background:
    radial-gradient(circle at top, rgba(37, 99, 235, 0.08), transparent 30%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  color: #0f172a;
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
}

#root {
  min-height: 100vh;
}
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom";
```

- [ ] **Step 3: Run the build to verify the next missing dependency is routing**

Run: `npm run build`
Expected: FAIL because `src/i18n/index.ts` and `src/routes/AppRouter.tsx` are not defined yet

- [ ] **Step 4: Commit**

```bash
git add postcss.config.js tailwind.config.ts src/main.tsx src/App.tsx src/styles/index.css src/test/setup.ts
git commit -m "feat: add app bootstrap and tailwind theme"
```

## Task 3: Add translation architecture and route shells

**Files:**
- Create: `src/i18n/index.ts`
- Create: `src/locales/ms/common.json`
- Create: `src/locales/en/common.json`
- Create: `src/routes/AppRouter.tsx`
- Create: `src/layouts/MarketingLayout.tsx`
- Create: `src/layouts/PortalLayout.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/portal/StudentPortalPage.tsx`
- Create: `src/pages/portal/TeacherPortalPage.tsx`
- Create: `src/pages/portal/AdminPortalPage.tsx`

- [ ] **Step 1: Write the first route-level failing test**

Create `src/pages/HomePage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import "../i18n";

test("renders the hero headline in default Malay", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(
    screen.getByText("Bantu Anak Lebih Faham, Yakin & Fokus Dalam Pelajaran"),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm run test -- src/pages/HomePage.test.tsx`
Expected: FAIL because `HomePage` and i18n resources are not implemented

- [ ] **Step 3: Create i18n resources and minimal route shells**

Create these files with minimal working content:

```ts
// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../locales/en/common.json";
import msCommon from "../locales/ms/common.json";

i18n.use(initReactI18next).init({
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

```json
// src/locales/ms/common.json
{
  "brand": {
    "name": "Al-Fahmu Learning Centre",
    "tagline": "Kelas bimbingan yang tersusun dan mudah difahami"
  },
  "hero": {
    "title": "Bantu Anak Lebih Faham, Yakin & Fokus Dalam Pelajaran",
    "subtitle": "Al-Fahmu Learning Centre menyediakan kelas bimbingan yang tersusun dan mudah difahami."
  },
  "portal": {
    "student": "Portal Pelajar",
    "teacher": "Portal Guru",
    "admin": "Dashboard Admin"
  }
}
```

```json
// src/locales/en/common.json
{
  "brand": {
    "name": "Al-Fahmu Learning Centre",
    "tagline": "Structured learning built for confidence and growth"
  },
  "hero": {
    "title": "Helping Students Learn Better With Confidence",
    "subtitle": "Structured learning programs designed to improve understanding and academic performance."
  },
  "portal": {
    "student": "Student Portal",
    "teacher": "Teacher Portal",
    "admin": "Admin Dashboard"
  }
}
```

```tsx
// src/layouts/MarketingLayout.tsx
import { Outlet } from "react-router-dom";

export function MarketingLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Outlet />
    </div>
  );
}
```

```tsx
// src/layouts/PortalLayout.tsx
import { Outlet } from "react-router-dom";

export function PortalLayout() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
        <Outlet />
      </div>
    </div>
  );
}
```

```tsx
// src/pages/HomePage.tsx
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main>
      <section className="px-6 py-24">
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.subtitle")}</p>
      </section>
    </main>
  );
}
```

```tsx
// src/pages/portal/StudentPortalPage.tsx
import { useTranslation } from "react-i18next";

export default function StudentPortalPage() {
  const { t } = useTranslation();
  return <h1>{t("portal.student")}</h1>;
}
```

```tsx
// src/pages/portal/TeacherPortalPage.tsx
import { useTranslation } from "react-i18next";

export default function TeacherPortalPage() {
  const { t } = useTranslation();
  return <h1>{t("portal.teacher")}</h1>;
}
```

```tsx
// src/pages/portal/AdminPortalPage.tsx
import { useTranslation } from "react-i18next";

export default function AdminPortalPage() {
  const { t } = useTranslation();
  return <h1>{t("portal.admin")}</h1>;
}
```

```tsx
// src/routes/AppRouter.tsx
import { Route, Routes } from "react-router-dom";
import { MarketingLayout } from "../layouts/MarketingLayout";
import { PortalLayout } from "../layouts/PortalLayout";
import HomePage from "../pages/HomePage";
import AdminPortalPage from "../pages/portal/AdminPortalPage";
import StudentPortalPage from "../pages/portal/StudentPortalPage";
import TeacherPortalPage from "../pages/portal/TeacherPortalPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/portal" element={<PortalLayout />}>
        <Route path="student" element={<StudentPortalPage />} />
        <Route path="teacher" element={<TeacherPortalPage />} />
        <Route path="admin" element={<AdminPortalPage />} />
      </Route>
    </Routes>
  );
}
```

- [ ] **Step 4: Run the targeted test to verify it passes**

Run: `npm run test -- src/pages/HomePage.test.tsx`
Expected: PASS

- [ ] **Step 5: Run the build to verify route shells compile**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/i18n/index.ts src/locales/ms/common.json src/locales/en/common.json src/routes/AppRouter.tsx src/layouts/MarketingLayout.tsx src/layouts/PortalLayout.tsx src/pages/HomePage.tsx src/pages/HomePage.test.tsx src/pages/portal/StudentPortalPage.tsx src/pages/portal/TeacherPortalPage.tsx src/pages/portal/AdminPortalPage.tsx
git commit -m "feat: add i18n foundation and route shells"
```

## Task 4: Build shared UI primitives and content metadata

**Files:**
- Create: `src/utils/cn.ts`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionTitle.tsx`
- Create: `src/components/ui/ScrollReveal.tsx`
- Create: `src/components/ui/LanguageSwitcher.tsx`
- Create: `src/data/navigation.ts`
- Create: `src/data/aboutFeatures.ts`
- Create: `src/data/subjects.ts`
- Create: `src/data/portalCards.ts`

- [ ] **Step 1: Write the failing navbar interaction test**

Create `src/components/navigation/Navbar.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import { Navbar } from "./Navbar";

test("switches language from Malay to English", async () => {
  const user = userEvent.setup();

  render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </I18nextProvider>,
  );

  await user.click(screen.getByRole("button", { name: "EN" }));

  expect(
    screen.getByRole("link", { name: "Register Now" }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm run test -- src/components/navigation/Navbar.test.tsx`
Expected: FAIL because `Navbar` and reusable UI components do not exist yet

- [ ] **Step 3: Create shared UI primitives and metadata**

Create these files:

```ts
// src/utils/cn.ts
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
```

```tsx
// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-brand-500 text-white shadow-glow hover:bg-brand-700"
      : variant === "secondary"
        ? "border border-slate-200 bg-white text-slate-900 hover:border-brand-200 hover:bg-brand-50"
        : "bg-transparent text-slate-700 hover:bg-slate-100";

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300",
        variantClass,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

```tsx
// src/components/ui/SectionTitle.tsx
type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
```

```tsx
// src/components/ui/ScrollReveal.tsx
import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export function ScrollReveal({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

`src/components/ui/LanguageSwitcher.tsx` should:
- read the active language from `i18n.resolvedLanguage`
- call `i18n.changeLanguage("ms")` and `i18n.changeLanguage("en")`
- render `BM` and `EN` buttons with active styling

`src/data/navigation.ts` should export:

```ts
export const navigationItems = [
  { labelKey: "nav.home", href: "#home" },
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.subjects", href: "#subjects" },
  { labelKey: "nav.futurePortal", href: "#future-portal" },
  { labelKey: "nav.contact", href: "#contact" },
];
```

`src/data/aboutFeatures.ts`, `src/data/subjects.ts`, and `src/data/portalCards.ts` should export arrays with `titleKey`, `descriptionKey`, and icon name keys so the section components can stay small.

- [ ] **Step 4: Expand translations for nav and reusable text**

Add these keys to both locale files:

```json
"nav": {
  "home": "Laman Utama",
  "about": "Tentang",
  "subjects": "Subjek",
  "futurePortal": "Portal Masa Depan",
  "contact": "Hubungi"
},
"cta": {
  "register": "Daftar Sekarang",
  "registerEn": "Register Now"
}
```

For English:

```json
"nav": {
  "home": "Home",
  "about": "About",
  "subjects": "Subjects",
  "futurePortal": "Future Portal",
  "contact": "Contact"
},
"cta": {
  "register": "Register Now"
}
```

- [ ] **Step 5: Create `src/components/navigation/Navbar.tsx` with the new primitives**

The component should:
- render brand text with optional image slot wrapper
- map `navigationItems`
- include `LanguageSwitcher`
- render a CTA link labeled with `t("cta.register")`
- show a mobile menu toggle button
- keep a sticky translucent navbar container

- [ ] **Step 6: Run the targeted test to verify language switching passes**

Run: `npm run test -- src/components/navigation/Navbar.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/utils/cn.ts src/components/ui/Button.tsx src/components/ui/SectionTitle.tsx src/components/ui/ScrollReveal.tsx src/components/ui/LanguageSwitcher.tsx src/components/navigation/Navbar.tsx src/components/navigation/Navbar.test.tsx src/data/navigation.ts src/data/aboutFeatures.ts src/data/subjects.ts src/data/portalCards.ts src/locales/ms/common.json src/locales/en/common.json
git commit -m "feat: add shared ui primitives and navbar foundation"
```

## Task 5: Build the landing-page sections and composition

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Create: `src/sections/HeroSection.tsx`
- Create: `src/sections/AboutSection.tsx`
- Create: `src/sections/SubjectsSection.tsx`
- Create: `src/sections/FuturePortalSection.tsx`
- Create: `src/components/common/Footer.tsx`
- Create: `src/components/common/FloatingWhatsAppButton.tsx`

- [ ] **Step 1: Write the failing landing-page composition test**

Update `src/pages/HomePage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import "../i18n";

test("renders core landing page sections", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Bantu Anak/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Subjek/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Portal/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm run test -- src/pages/HomePage.test.tsx`
Expected: FAIL because the composed sections are not implemented yet

- [ ] **Step 3: Create the page sections**

Implement:
- `HeroSection.tsx` with animated gradient blobs, headline, subtitle, WhatsApp CTA, and subject CTA
- `AboutSection.tsx` with four feature cards
- `SubjectsSection.tsx` with six responsive subject cards
- `FuturePortalSection.tsx` with a dark premium background and three portal cards
- `Footer.tsx` with quick links and placeholder socials
- `FloatingWhatsAppButton.tsx` linking to `https://wa.me/60123456789`

`src/pages/HomePage.tsx` should compose them in this order:

```tsx
import { Navbar } from "../components/navigation/Navbar";
import Footer from "../components/common/Footer";
import { FloatingWhatsAppButton } from "../components/common/FloatingWhatsAppButton";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { FuturePortalSection } from "../sections/FuturePortalSection";
import { HeroSection } from "../sections/HeroSection";
import { SubjectsSection } from "../sections/SubjectsSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SubjectsSection />
        <FuturePortalSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
```

- [ ] **Step 4: Expand translations for all section copy**

Add keys for:
- hero buttons
- about eyebrow, title, description, and four features
- subjects eyebrow, title, description, and six subjects
- future portal eyebrow, title, description, and three cards
- footer tagline and quick links

- [ ] **Step 5: Run the targeted page test**

Run: `npm run test -- src/pages/HomePage.test.tsx`
Expected: PASS

- [ ] **Step 6: Run the build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/pages/HomePage.tsx src/sections/HeroSection.tsx src/sections/AboutSection.tsx src/sections/SubjectsSection.tsx src/sections/FuturePortalSection.tsx src/components/common/Footer.tsx src/components/common/FloatingWhatsAppButton.tsx src/locales/ms/common.json src/locales/en/common.json
git commit -m "feat: build premium bilingual landing page sections"
```

## Task 6: Add contact form logic, validation, and split-layout UI

**Files:**
- Create: `src/hooks/useContactForm.ts`
- Create: `src/hooks/useContactForm.test.ts`
- Create: `src/utils/contact.ts`
- Create: `src/components/ui/FormField.tsx`
- Create: `src/components/ui/TextAreaField.tsx`
- Create: `src/sections/ContactSection.tsx`

- [ ] **Step 1: Write the failing form validation test**

Create `src/hooks/useContactForm.test.ts`:

```ts
import { renderHook, act } from "@testing-library/react";
import { useContactForm } from "./useContactForm";

test("validates required fields before submit", async () => {
  const { result } = renderHook(() => useContactForm());

  await act(async () => {
    await result.current.handleSubmit({
      preventDefault: () => undefined,
    } as React.FormEvent<HTMLFormElement>);
  });

  expect(result.current.errors.name).toBe("Nama diperlukan");
  expect(result.current.errors.phone).toBe("Nombor telefon diperlukan");
  expect(result.current.errors.email).toBe("Emel diperlukan");
  expect(result.current.errors.message).toBe("Mesej diperlukan");
});
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm run test -- src/hooks/useContactForm.test.ts`
Expected: FAIL because the hook does not exist yet

- [ ] **Step 3: Create the form hook and submit stub**

`src/utils/contact.ts`:

```ts
export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export async function submitContactForm(payload: ContactPayload) {
  await Promise.resolve(payload);

  return {
    ok: true,
    message: "stub-success",
  };
}
```

`src/hooks/useContactForm.ts` should:
- keep controlled state for `name`, `phone`, `email`, `message`
- expose `errors`, `isSubmitting`, and `submitState`
- validate required fields and a basic email format
- call `submitContactForm`
- reset fields after successful submit

- [ ] **Step 4: Create the contact section UI**

`src/components/ui/FormField.tsx` and `src/components/ui/TextAreaField.tsx` should:
- render accessible labels
- render input/textarea controls
- render inline error text when present

`src/sections/ContactSection.tsx` should:
- render phone, placeholder email, and placeholder address on the left
- render the form on the right
- keep WhatsApp messaging prominent in the supporting copy

- [ ] **Step 5: Expand translations for form labels, errors, and contact copy**

Add keys for:
- `contact.eyebrow`
- `contact.title`
- `contact.description`
- `contact.phoneLabel`
- `contact.emailLabel`
- `contact.addressLabel`
- `contact.form.name`
- `contact.form.phone`
- `contact.form.email`
- `contact.form.message`
- `contact.form.submit`
- `contact.form.success`
- `contact.form.errors.requiredName`
- `contact.form.errors.requiredPhone`
- `contact.form.errors.requiredEmail`
- `contact.form.errors.requiredMessage`
- `contact.form.errors.invalidEmail`

- [ ] **Step 6: Run the targeted form test**

Run: `npm run test -- src/hooks/useContactForm.test.ts`
Expected: PASS

- [ ] **Step 7: Run the landing page test and build**

Run: `npm run test -- src/pages/HomePage.test.tsx`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/hooks/useContactForm.ts src/hooks/useContactForm.test.ts src/utils/contact.ts src/components/ui/FormField.tsx src/components/ui/TextAreaField.tsx src/sections/ContactSection.tsx src/locales/ms/common.json src/locales/en/common.json
git commit -m "feat: add backend-ready contact form flow"
```

## Task 7: Polish portal placeholders, metadata, and responsive behavior

**Files:**
- Modify: `src/pages/portal/StudentPortalPage.tsx`
- Modify: `src/pages/portal/TeacherPortalPage.tsx`
- Modify: `src/pages/portal/AdminPortalPage.tsx`
- Modify: `src/layouts/PortalLayout.tsx`
- Modify: `src/locales/ms/common.json`
- Modify: `src/locales/en/common.json`

- [ ] **Step 1: Write the failing portal route rendering test**

Create `src/routes/AppRouter.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import "../i18n";

test("renders the student portal placeholder route", () => {
  render(
    <MemoryRouter initialEntries={["/portal/student"]}>
      <AppRouter />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: /Portal Pelajar/i })).toBeInTheDocument();
  expect(screen.getByText(/jadual/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm run test -- src/routes/AppRouter.test.tsx`
Expected: FAIL because portal placeholder content is too minimal

- [ ] **Step 3: Expand portal placeholder pages**

Each portal page should render:
- localized heading
- short future-facing description
- a list of planned capabilities
- a return link to `/`

Update locale files with:
- portal descriptions
- capability labels for schedule, assignments, reports, attendance, and class management
- a shared “back to home” label

- [ ] **Step 4: Run the targeted route test**

Run: `npm run test -- src/routes/AppRouter.test.tsx`
Expected: PASS

- [ ] **Step 5: Run the full test suite and production build**

Run: `npm run test`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/routes/AppRouter.test.tsx src/pages/portal/StudentPortalPage.tsx src/pages/portal/TeacherPortalPage.tsx src/pages/portal/AdminPortalPage.tsx src/layouts/PortalLayout.tsx src/locales/ms/common.json src/locales/en/common.json
git commit -m "feat: polish future portal placeholders"
```

## Task 8: Final QA, accessibility checks, and cleanup

**Files:**
- Modify: `src/styles/index.css`
- Modify: `src/components/navigation/Navbar.tsx`
- Modify: `src/sections/HeroSection.tsx`
- Modify: `src/sections/ContactSection.tsx`

- [ ] **Step 1: Run a manual QA pass in the browser**

Run: `npm run dev`
Expected: local dev server starts successfully

Verify manually:
- sticky navbar behavior
- mobile menu layout
- BM and EN switching across every section
- WhatsApp links open the correct `wa.me` URL
- subject cards remain readable on mobile
- dark portal section contrast remains accessible

- [ ] **Step 2: Make targeted fixes for any accessibility or responsive issues**

Focus fixes on:
- button focus states
- heading hierarchy
- mobile spacing
- form error visibility
- reduced clutter around hero animation layers

- [ ] **Step 3: Run final verification**

Run: `npm run test`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/styles/index.css src/components/navigation/Navbar.tsx src/sections/HeroSection.tsx src/sections/ContactSection.tsx
git commit -m "fix: finalize landing page polish and accessibility"
```

## Self-Review

Spec coverage check:
- bilingual landing page: covered by Tasks 3 through 6
- sticky navbar and language switcher: covered by Tasks 4 and 8
- hero, about, subjects, future portal, contact, footer, WhatsApp button: covered by Tasks 5 and 6
- placeholder future portal routes: covered by Tasks 3 and 7
- scalable architecture, layouts, routes, i18n, reusable UI: covered by Tasks 2 through 4
- responsive QA, accessibility, SEO-ready page shell, and final verification: covered by Tasks 1, 2, and 8

Placeholder scan:
- no `TBD`, `TODO`, or deferred “implement later” steps remain
- every code-writing task names exact files and target behavior

Type consistency check:
- routing names consistently use `AppRouter`, `MarketingLayout`, and `PortalLayout`
- translation resources consistently use the `common` namespace
- contact form state consistently uses `name`, `phone`, `email`, and `message`
