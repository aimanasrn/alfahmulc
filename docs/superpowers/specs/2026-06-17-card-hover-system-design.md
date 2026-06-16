# Card Hover System Design

## Goal

Add a unified hover system across the website’s cards so the interface feels more interactive, polished, and premium while staying warm, family-friendly, and easy to read.

## Scope

This change applies to card-like surfaces used throughout the public site.

Included:

- Shared base hover behavior for the site’s cards
- Small card-specific accent behavior where it adds value
- Keyboard-focus parity where appropriate
- Responsive behavior that avoids awkward motion on smaller screens

Excluded:

- Header and navigation hover redesign
- Button hover redesign
- Large content or layout changes
- Motion-heavy rework of non-card sections

## Current Card Surfaces

The current site already uses several card-like patterns in `src/styles/index.css`. The hover system should cover these surfaces:

- `stat-card`
- `program-card`
- `about-card`
- `about-objectives`
- `method-card`
- `testimonial-card`
- `testimonial-marquee-card`
- `contact-form-card`
- `gallery-card`

The `gallery-card` already has image zoom on hover, so its new hover behavior should build on that rather than replacing it.

## Recommended Approach

Use a shared base hover language with small per-card accents.

Why this approach:

- It keeps the site visually consistent
- It avoids a flat “all cards behave exactly the same” feel
- It works well with the existing design system and current CSS structure
- It keeps implementation focused in the stylesheet without requiring large component changes

## Hover Direction

The user approved the medium interaction style:

- slight upward lift
- stronger shadow
- very small scale-up
- subtle icon, border, or accent emphasis

The interaction should feel:

- noticeable
- smooth
- modern
- professional
- not flashy

## Shared Base Hover Behavior

All supported cards should share the same baseline interaction pattern:

- translate upward slightly
- scale very slightly
- increase shadow depth
- slightly strengthen border visibility
- animate smoothly with a short easing curve

The animation should feel soft rather than springy.

### Focus Parity

Where cards contain focusable elements or can receive `:focus-within`, the hover treatment should also respond to keyboard navigation. This is especially important for:

- `gallery-card`
- `program-card`
- `contact-form-card`
- `testimonial-card` where interactive controls exist nearby

## Card-Specific Accent Rules

### Stats, Programs, About, Method

These cards should use the shared lift and shadow behavior plus:

- slight icon or number emphasis
- slightly brighter accent tint
- small visual deepening of the card surface

### Testimonials

Testimonial cards should use the shared lift but remain calm and readable:

- slightly stronger shadow
- subtle border emphasis
- no aggressive scale

The text should never feel like it jumps or shifts too much.

### Testimonial Marquee Cards

These should receive a lighter version of the shared hover system so the moving marquee remains elegant and not overly busy.

### Gallery Cards

Gallery cards should combine:

- current image zoom
- card lift
- stronger shadow
- slightly stronger title presence

The gallery should feel more tactile without becoming too dramatic.

### Contact Form Card

The contact form card should receive the shared hover state very gently:

- subtle lift
- deeper shadow
- slightly more visible border

It should still feel stable and trustworthy, not like a floating promotional tile.

### About Objectives Panel

The objectives panel should be treated like a card surface and receive the same unified hover language, but softly, since it contains longer-form text content.

## Motion Rules

Motion should be tasteful and lightweight:

- short transitions
- small translation distance
- low scale delta
- no bounce
- no rotation

The hover must not create layout shift.

## Responsiveness

On desktop:

- full hover system is active

On touch devices and smaller screens:

- hover-dependent cues should remain harmless if hover is unavailable
- transitions should still be smooth if triggered through focus states

The design should not depend on hover for comprehension.

## Accessibility

The hover system must preserve usability:

- text remains readable
- cards do not move so much that reading becomes uncomfortable
- focus states remain clear
- decorative accent changes do not become the only sign of interaction

## Performance

The implementation should remain CSS-first:

- use transform, box-shadow, border-color, and filter carefully
- avoid expensive continuous animation
- avoid adding JavaScript just for hover effects

## Files Likely Affected

- `src/styles/index.css`
- `src/sections/ProgramsSection.tsx`
- `src/sections/GallerySection.tsx`
- `src/sections/TestimonialsSection.tsx`
- `src/sections/AboutSection.tsx`

## Testing

Validation should cover:

- hover consistency across all major card types
- no awkward card movement in the marquee or gallery
- readable testimonial and about content while hovered
- no visual regressions on mobile layouts
- production build success

## Success Criteria

The work is successful when:

- cards across the site feel consistently interactive
- the website feels more premium and polished
- hover behavior is noticeable but not flashy
- gallery and testimonial sections still feel calm and readable
- the implementation fits the existing AL-FAHMU visual language
