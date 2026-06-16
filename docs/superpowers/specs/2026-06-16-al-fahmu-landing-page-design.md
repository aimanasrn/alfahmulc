# AL-FAHMU Landing Page Design

## Summary

Rebuild the public homepage for AL-FAHMU Learning Centre as a single-page bilingual landing page in React, TypeScript, and Vite. The new design should feel warm, family-friendly, professional, and trustworthy, with a modern Malaysian learning-centre aesthetic shaped by the AL-FAHMU blue and yellow palette.

## Goals

- Replace the current homepage experience with a fully rewritten marketing landing page.
- Support English and Bahasa Melayu as first-class languages.
- Present AL-FAHMU as academically strong, values-driven, and welcoming to parents.
- Improve conversion clarity with visible calls to action, contact details, and section-to-section narrative flow.
- Keep the implementation maintainable through reusable sections and data-driven content structures.

## Non-Goals

- Building a multi-page marketing site.
- Integrating a backend CRM or live form submission workflow in this phase.
- Creating a separate visual identity system beyond this landing page.
- Rebuilding teacher, student, or admin portal experiences.

## Audience

- Parents in Malaysia evaluating tuition and Islamic learning options for their children.
- Returning visitors comparing programs, teaching style, and trust indicators.
- Mobile-first users who may contact the centre through WhatsApp or phone.

## Product Direction

The landing page will use a "warm editorial" direction:

- Soft gradients, rounded cards, airy spacing, and layered decorative shapes.
- Clear academic structure without feeling cold or corporate.
- A family-friendly tone led by parent reassurance, student growth, and approachable CTAs.
- Strong contrast between bright surface sections and darker trust-building sections.

## Information Architecture

The page will be a single scrollable flow in this order:

1. Top announcement bar
2. Sticky header and navigation
3. Hero
4. Trust indicators
5. About
6. Programs
7. Why Choose Us
8. Learning Method
9. Activities / Gallery
10. Testimonials
11. Final CTA
12. Contact
13. Footer

Each navigation item will smooth-scroll to its section.

## Layout System

- Use a centered max-width container of 1280px.
- Desktop sections follow a 12-column layout with asymmetrical balance where useful, especially in the hero and about sections.
- Tablet collapses complex grids to 2 columns where appropriate.
- Mobile stacks all content to a single column with preserved spacing rhythm.
- Section spacing should feel generous, with consistent vertical padding and readable text widths.

## Visual System

### Color

- Primary Blue: `#0B4DA2`
- Dark Blue: `#0A285A`
- Secondary Yellow: `#F4C20D`
- Light Background: `#F8FAFC`
- White: `#FFFFFF`
- Dark Text: `#1F2937`
- Muted Text: `#6B7280`

Use CSS variables for all core tokens. Blue anchors structure and trust, yellow acts as a highlight and CTA accent, and light backgrounds keep the page bright and approachable.

### Typography

- Headings: `Poppins` or `Manrope`
- Body: `Inter` or system sans-serif fallback
- Headings should feel bold and optimistic, with comfortable line height and clear hierarchy.
- Body text should stay readable on mobile and avoid long line lengths on desktop.

### Surfaces

- Rounded cards with subtle shadows and gentle hover lift.
- Soft gradients and blurred background accents in the hero and final CTA.
- Selective dark-blue sections to create emphasis and pacing.

## Content Strategy

The messaging should balance academic quality, Islamic values, student confidence, and parent trust. Copy should avoid sounding overly formal; it should feel polished but caring.

The bilingual implementation should treat English and Bahasa Melayu equally:

- All user-facing text must come from locale-driven content.
- Repeated card content should be stored as arrays so both languages remain easy to maintain.
- Section ids stay language-agnostic for scrolling and navigation behavior.

## Section Design

### 1. Top Announcement Bar

- Compact horizontal bar using primary blue background.
- Includes placeholder phone number, Putrajaya location, and placeholder opening hours.
- Text uses white with yellow accents for separators or icons.

### 2. Header / Navigation

- Sticky header on a light surface with subtle blur or shadow treatment.
- Left side shows AL-FAHMU logo.
- Right side shows navigation links and a strong `Enroll Now` CTA.
- On scroll, header gains a slightly stronger shadow to reinforce stickiness.
- Mobile uses a hamburger button and slide-in menu panel.

### 3. Hero

- Two-column desktop layout.
- Left side: badge, headline, supporting paragraph, and two CTAs.
- Right side: education-themed visual area using a polished placeholder illustration/photo panel with floating icons, rounded frames, and blue/yellow decorative shapes.
- The visual should feel curated rather than generic.
- Primary CTA targets registration/contact; secondary CTA scrolls to About or Programs.

### 4. Trust Indicators

- Four statistic cards in a responsive grid.
- Cards use white backgrounds, rounded corners, blue iconography, and small yellow accents.
- Metrics: `300+ Students`, `10+ Years Experience`, `Certified Teachers`, `Modern Learning Method`.

### 5. About

- Split layout with image/illustration left and copy right on desktop.
- Main copy explains academic excellence, Islamic values, character building, and confidence.
- Include mission and vision mini cards below or beside the body copy.

### 6. Programs

- Section title and short intro above a responsive grid.
- Six cards: Academic Support, Quran Classes, Homework Guidance, Reading Program, Exam Preparation, Holiday Program.
- Cards include icon, title, description, and a small inline `Learn More` affordance.
- Grid uses 3 columns desktop, 2 tablet, 1 mobile.

### 7. Why Choose Us

- Dark blue background section for contrast and trust.
- White text with yellow check icons.
- Use either a split layout or feature-card grid, depending on implementation simplicity and clarity.
- Features: small class size, experienced teachers, interactive learning, character building, safe environment, parent communication.

### 8. Learning Method

- Four-step process: Assessment, Learning Plan, Guided Learning, Progress Monitoring.
- Desktop uses a horizontal step flow with connectors.
- Mobile converts to a vertical timeline.
- Each step uses a numbered circular badge.

### 9. Activities / Gallery

- Responsive image-style placeholder grid with six items.
- Labels: Classroom Learning, Quran Session, Group Activity, Reading Session, Exam Workshop, Holiday Program.
- Tiles have rounded corners and hover zoom treatment.
- The grid should feel lively without becoming visually noisy.

### 10. Testimonials

- Three cards with quote, parent name placeholder, child program, and star rating.
- Use subtle depth and strong readability.
- Cards should feel credible and calm rather than flashy.

### 11. Final CTA

- Strong conversion band near the bottom of the page.
- Blue/yellow gradient background with centered text and dual CTA buttons.
- Headline: `Give Your Child The Best Learning Experience`
- Supporting copy emphasizes starting the learning journey today.

### 12. Contact

- Two-column layout on desktop.
- One side contains phone, address, email, and possibly quick response cues.
- Other side contains a simple form with name, phone, child age, and message.
- Form is UI-only in this phase unless implementation context makes a local submission handler trivial.

### 13. Footer

- Includes logo, short description, quick links, contact details, and social placeholders.
- Ends with copyright line for 2026.

## Component Architecture

Create a page-level composition with reusable section components:

- `TopBar`
- `Header`
- `Hero`
- `Stats`
- `About`
- `Programs`
- `WhyChooseUs`
- `LearningMethod`
- `Gallery`
- `Testimonials`
- `FinalCTA`
- `Contact`
- `Footer`

Supporting utilities and shared UI may include:

- Reusable `Container`
- Reusable `SectionHeading`
- Reusable `Button`
- Reusable reveal-on-scroll wrapper
- Data modules for stats, programs, steps, testimonials, gallery, and navigation

## State and Behavior

- Sticky navigation state tracks scroll position for shadow and mobile drawer visibility.
- Mobile menu opens and closes with animated transitions and focus-friendly behavior.
- Smooth scrolling is used for section navigation.
- Reveal animations trigger once when sections enter the viewport.
- Buttons, cards, and gallery tiles use restrained motion and clear focus states.

## Accessibility

- Use semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Preserve heading hierarchy and readable text contrast.
- All interactive elements must support keyboard navigation and visible focus treatment.
- Mobile menu must be operable via keyboard and screen readers.
- Form fields require labels, not just placeholders.
- Decorative visuals should not interfere with content readability.

## Animation

- Fade-up reveal on section entry.
- Hover lift on cards.
- Slight transform and shadow response on buttons.
- Zoom-on-hover for gallery tiles.
- Slide animation for mobile navigation drawer.

Animations should remain subtle, performant, and non-blocking.

## Styling Approach

Use standard CSS with variables and clear class naming, unless the remaining project structure strongly favors CSS Modules. Keep styles centralized enough to preserve consistency and avoid fragmented visual rules across too many files.

The CSS system should define:

- Color variables
- Typography scale
- Spacing scale
- Border radius values
- Shadow tokens
- Transition timing tokens
- Shared section, card, button, and grid patterns

## Error Handling

- If any locale content is missing, the page should still render safely with stable structure.
- Form submission in this phase should fail gracefully or remain intentionally non-submitting.
- Decorative images or placeholders should not break layout if assets are absent.

## Testing Strategy

- Verify the page renders successfully in both English and Bahasa Melayu.
- Verify the navigation scroll targets and mobile drawer interactions.
- Verify responsive layout behavior across mobile, tablet, and desktop widths.
- Verify key interactive states: hover, focus, active CTA buttons, and section reveal classes.
- Run a production build to catch TypeScript and bundling issues.

## Assumptions

- The current repository state may need partial recreation of the frontend scaffold because the working tree currently shows deleted app files.
- Logo assets and reference imagery may not be available locally, so the first implementation may use polished placeholders or abstract illustration blocks unless assets are restored.
- Contact form behavior can remain presentational for this phase unless the user requests live submission handling.

## Implementation Readiness

This scope is intentionally narrow enough for a single implementation plan and build cycle. The page can be delivered as a focused marketing rewrite without requiring portal changes or backend integration.
