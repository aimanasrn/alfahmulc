# Al-Fahmu Learning Centre Website Design

Date: 2026-05-27
Phase: 1
Scope: Public bilingual landing page plus placeholder future portal routes

## Goal

Build a modern, premium, bilingual website for Al-Fahmu Learning Centre using React, Vite, TailwindCSS, Framer Motion, and Lucide React icons.

Phase 1 focuses on a polished public landing page that feels ready for future platform expansion. The codebase should already support the next phase, where authentication, portal dashboards, protected routes, and API-backed features will be added for student, teacher, and admin roles.

## Product Intent

The website should feel like a modern education SaaS landing page rather than a traditional tuition website. It should communicate trust, structure, academic quality, and a welcoming brand personality.

Primary conversion path:
- WhatsApp-first inquiry flow

Secondary conversion path:
- Contact form submission

Primary audience:
- Parents evaluating tuition and enrichment support
- Students discovering class offerings

## Phase 1 Scope

Included:
- Responsive bilingual landing page
- Bahasa Melayu as the default language
- English language switching
- Sticky navigation with section links
- Hero, About, Subjects, Future Portal, Contact, and Footer sections
- Floating WhatsApp action button
- Client-side validated contact form with backend-ready submission structure
- Placeholder routes and pages for future student, teacher, and admin portals
- Reusable UI and layout architecture for future growth

Excluded:
- Real authentication
- Protected routes with live auth state
- Backend API integration
- CMS or admin editing tools
- Database or dashboard functionality

## Technical Architecture

## App Stack

- React with Vite
- TailwindCSS for styling
- Framer Motion for motion and reveal effects
- Lucide React for iconography
- React Router for route structure
- react-i18next for translation architecture

## Routing Model

Phase 1 should use route structure that supports immediate marketing needs and future expansion:

- `/` for the public landing page
- `/portal/student` placeholder page
- `/portal/teacher` placeholder page
- `/portal/admin` placeholder page

The public landing page should support smooth-scroll navigation between sections while portal placeholders use standard route navigation.

## Layout Model

- `MarketingLayout` for the public site
- `PortalLayout` for future portal pages

This separation keeps public and internal application experiences visually aligned but structurally independent. Future auth and dashboard concerns can be attached to portal routes without disturbing the landing page code.

## Folder Structure

```text
src/
  assets/
  components/
    common/
    navigation/
    ui/
  data/
  hooks/
  i18n/
  layouts/
  locales/
    en/
      common.json
    ms/
      common.json
  pages/
  sections/
  routes/
  utils/
```

Guidance:
- `components` holds reusable UI and shared interface elements
- `sections` holds landing-page-specific content blocks
- `pages` holds top-level route pages
- `layouts` holds route shells
- `data` holds structured card definitions, navigation metadata, and configuration driven by translation keys
- `i18n` holds translation initialization
- `routes` prepares route definitions for future scaling

## Internationalization Design

All visible UI text must be translatable. Use `react-i18next` with JSON translation files so future sections, portal UIs, and validation messages can be localized consistently.

Default language:
- Bahasa Melayu

Supported languages:
- `ms`
- `en`

Requirements:
- Language switcher in navbar
- Smooth UI updates when toggling language
- Translation keys for navigation, section headings, body copy, buttons, form labels, validation text, and placeholder portal content
- Structure that can scale to future dashboard and auth screens without rework

Recommended translation organization:

```text
src/locales/en/common.json
src/locales/ms/common.json
```

If the app grows later, additional namespaces such as `portal.json`, `auth.json`, or `dashboard.json` can be added without changing the core i18n setup.

## Visual Design System

## Brand Direction

Theme:
- Modern Premium Education SaaS

The interface should feel:
- Professional
- Trustworthy
- Friendly
- Clean
- Premium
- Organized
- Future-ready

The site must avoid looking like an old-school tuition site, generic WordPress template, or cartoon-style school page.

## Colors

Core palette:
- Royal blue
- Deep navy blue
- Warm yellow or gold accent
- White
- Soft gray neutrals

Usage:
- White and soft gray should dominate the page background and readable content surfaces
- Blue tones should carry trust, structure, and visual hierarchy
- Yellow or gold should be used selectively for high-value highlights and calls to action
- Dark backgrounds should be reserved for emphasis sections such as the Future Portal preview

## Typography

Preferred font direction:
- Plus Jakarta Sans

Fallback acceptable alternatives:
- Inter
- Poppins

Typography should use generous spacing, strong heading contrast, and highly readable paragraph styles to create a polished startup-like tone.

## Surfaces and Effects

- Rounded `2xl` corners on key cards and panels
- Soft shadows instead of harsh outlines
- Glassmorphism treatment on selected highlight cards
- Gentle gradients and blurred background blobs
- Subtle hover lift effects on cards and buttons

## Motion System

Animations should feel smooth and premium, not decorative for their own sake.

Use:
- Hero entrance animation
- Scroll reveal for sections
- Blob or gradient ambient motion in hero
- Gentle hover transitions
- Sticky navbar state transition

Motion must remain lightweight and not interfere with readability or accessibility.

## Page Structure

## Navbar

Content:
- Brand lockup on the left
- Support both text-based branding and future uploaded logo asset
- Navigation links: Home, About, Subjects, Future Portal, Contact
- Language switcher: BM and EN
- Primary CTA: Register Now / Daftar Sekarang

Behavior:
- Sticky on scroll
- Slight translucent or glassy treatment when scrolled
- Mobile menu for smaller screens

## Hero Section

Malay copy:
- Headline: "Bantu Anak Lebih Faham, Yakin & Fokus Dalam Pelajaran"
- Subheadline: "Al-Fahmu Learning Centre menyediakan kelas bimbingan yang tersusun dan mudah difahami."

English copy:
- Headline: "Helping Students Learn Better With Confidence"
- Subheadline: "Structured learning programs designed to improve understanding and academic performance."

Content requirements:
- Premium headline layout
- Supporting text
- WhatsApp-first CTA button
- Secondary subject exploration CTA
- Visual card or trust panel that reinforces structured learning
- Modern gradient background with animated blobs

## About Section

Purpose:
- Quickly communicate the centre's value proposition

Themes to explain:
- Online and physical classes
- Friendly teachers
- Structured learning
- Student-focused approach

Presentation:
- Feature cards with icons
- Clean grid layout
- Short, high-clarity copy blocks

## Subjects Section

Subjects to display:
- Bahasa Melayu
- English
- Matematik
- Sains
- Intensive Classes
- Homework Guidance

Each card should include:
- Icon
- Title
- Short description
- Hover interaction
- Entrance animation or reveal effect

The section should feel premium and organized, with strong scanning on mobile and desktop.

## Future Portal Section

This section should deliberately feel darker and more premium to preview the future platform.

Cards:
- Student Portal
- Teacher Portal
- Admin Dashboard

Each card should communicate future capabilities such as:
- Schedules
- Assignments
- Reports
- Attendance
- Class management

Purpose:
- Show long-term platform ambition
- Make the brand feel system-ready and modern

## Contact Section

Layout:
- Split layout on larger screens
- Stacked layout on mobile

Left side:
- Phone
- Email
- Address
- Short CTA copy

Right side:
- Contact form

Form fields:
- Name
- Phone
- Email
- Message

Behavior:
- Client-side validation
- Clear validation messaging
- Clean success and error state design
- Submission handler stub designed to support EmailJS, Resend, or Node backend integration later

Content policy for Phase 1:
- Use the provided WhatsApp number
- Use placeholders for email, address, and social links

## Floating WhatsApp Button

Requirements:
- Fixed bottom-right placement
- Branded green treatment
- Modern floating surface
- Hover animation
- Direct link to `https://wa.me/60123456789`

This element should remain visible but not intrusive.

## Footer

Content:
- Brand name
- Tagline
- Quick links
- Social icons
- Copyright

It should visually conclude the page cleanly and echo the same premium style language.

## Reusable Components

Expected shared components:
- Primary button
- Secondary button
- Section title
- Language switcher
- Navigation link group
- Mobile menu
- Feature card
- Subject card
- Portal preview card
- Form input and textarea
- Contact detail item
- Scroll reveal wrapper

These should be designed for reuse across both marketing and future portal surfaces.

## Data and Content Strategy

Use data-driven UI where practical. Structured arrays should define:
- Navigation items
- Subject cards
- About feature cards
- Future portal cards
- Contact metadata

These records should reference translation keys rather than hardcoded display text whenever possible.

This keeps content scalable, enables localization, and supports later API or CMS replacement if needed.

## Future-Ready Frontend Preparation

Phase 1 should prepare the codebase for:
- Authentication flow integration
- Protected route logic
- Role-based access
- Dashboard layouts
- API service modules
- Student, teacher, and admin feature expansion

Preparation should be architectural rather than fully implemented. Examples:
- Separate layouts for public and portal experiences
- Route organization that can support guards later
- Shared theme consistency between marketing and portal pages
- Clear directories for hooks, data, routes, and reusable UI

Do not implement live auth, stateful sessions, or backend logic in this phase.

## Accessibility and Quality

Requirements:
- Good color contrast
- Keyboard-accessible navigation
- Button and link states that remain clear
- Semantic section structure
- Form labels and validation messages that are accessible
- Motion that can degrade gracefully

## SEO and Metadata

Phase 1 should include a basic SEO-ready structure:
- Meaningful page title
- Meta description
- Semantic headings
- Readable section hierarchy
- Clean public-facing content structure

More advanced SEO can be added later if needed.

## Testing and Verification Expectations

Implementation should verify:
- Responsive behavior across mobile and desktop
- Language switching across all visible text
- Smooth scroll behavior
- CTA link correctness
- Placeholder portal route rendering
- Form validation behavior
- No broken layout at common breakpoints

## Non-Goals for This Phase

- Backend contact delivery
- Real student or teacher functionality
- Login screens
- Database integration
- Full dashboard experiences

## Implementation Summary

The final Phase 1 result should be a production-ready React landing page with a premium bilingual SaaS aesthetic, strong WhatsApp-first conversion flow, clean reusable architecture, and clear route foundations for future student, teacher, and admin portals.
