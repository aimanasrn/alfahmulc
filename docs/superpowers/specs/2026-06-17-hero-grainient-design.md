# Hero Grainient Background Design

## Goal

Add a ReactBits-inspired `Grainient` background treatment to the homepage hero section that feels native to the AL-FAHMU brand. The result should feel modern, warm, and family-friendly while preserving strong readability for the hero headline, supporting copy, and call-to-action buttons.

## Scope

This change applies only to the homepage hero section.

Included:

- A branded animated background layer behind the hero content
- Integration with the current hero visual panel so the section feels cohesive
- Responsive adjustments for tablet and mobile
- Accessibility and performance-safe motion choices

Excluded:

- Global site background changes
- Header redesign
- Changes to hero copy structure
- New third-party dependencies beyond the existing stack

## Visual Direction

The hero should use a medium-strength branded ambient background inspired by the ReactBits `Grainient` look, but adapted to AL-FAHMU's existing palette:

- Deep primary blue as the anchor color
- Warm logo yellow as the highlight tone
- Soft white and pale cream haze to keep the section bright and approachable
- Fine grain texture layered lightly over the gradients
- Slow, subtle motion that suggests depth without distracting from the content

The overall impression should feel:

- warm
- caring
- polished
- trustworthy
- contemporary but not overly technical

## Recommended Approach

Implement the effect as a dedicated reusable hero background component or layer within the hero section, rather than importing an external demo verbatim.

Why this approach:

- It keeps the visuals aligned with the existing design system
- It avoids introducing unnecessary complexity
- It gives full control over motion intensity, colors, and responsiveness
- It makes the result easier to maintain inside the current Vite + React codebase

## Structure

### Hero Section Composition

The hero section should be organized into three visual layers:

1. Base hero container
2. Grainient background layer
3. Foreground content grid

The foreground content grid remains the same high-level structure:

- left: hero text, badge, description, CTA buttons
- right: hero visual panel and supporting card

### Background Layer

The new background layer should:

- sit absolutely within the hero section
- remain behind all interactive content
- use overflow clipping to stay within the hero boundary
- include multiple gradient blobs or radial fields
- include a subtle grain/noise texture
- use gentle animated drift or transform changes

The effect should feel like one cohesive field rather than separate decorative shapes.

### Hero Visual Panel Integration

The existing right-side visual panel should be adjusted to better sit on top of the new background:

- slightly more translucent surface treatment
- stronger edge separation if needed
- preserved floating icons and card structure
- enough contrast to avoid blending into the new background

The panel should feel connected to the hero atmosphere, not pasted on top of it.

## Styling Strategy

### Color Mapping

Use CSS custom properties and existing theme tokens where possible.

Suggested palette behavior:

- base: `--color-primary-dark` and `--color-primary`
- glow/highlight: `--color-accent`
- atmospheric neutral: white or very pale cream overlays

The yellow should be used as a highlight accent, not as the dominant field color.

### Grain Treatment

The grain should be subtle and tasteful. Preferred approaches:

- layered semi-transparent radial gradients with texture-like overlay
- CSS pseudo-element with opacity-controlled noise effect
- lightweight repeating pattern or blended overlay if needed

Avoid:

- heavy static noise
- visible pixelation
- high-contrast speckling

### Motion

Motion should be slow and ambient:

- drifting gradient positions
- soft transform movement
- low-amplitude animation loops

Motion must never:

- pulse aggressively
- flicker
- reduce text readability
- feel busy on mobile

Respect reduced motion preferences by disabling or simplifying animations when `prefers-reduced-motion` is enabled.

## Responsiveness

### Desktop

Desktop should show the full branded atmosphere with the strongest version of the effect.

### Tablet

Tablet should preserve the background but slightly reduce spread and intensity if the content stacks.

### Mobile

Mobile should keep the visual identity while simplifying:

- reduce motion intensity
- reduce blur or glow scale if needed
- keep text contrast strong
- avoid visual crowding around the hero headline and buttons

## Accessibility

The hero must remain easy to read and use:

- headline contrast must stay high
- supporting copy must remain legible over the background
- buttons must keep clear edge separation
- decorative background layers must not interfere with screen readers
- motion should respect `prefers-reduced-motion`

## Performance

Implementation should remain lightweight:

- prefer CSS gradients and transforms over heavy canvas effects
- keep animation count low
- avoid large runtime calculations in React on every frame unless clearly needed
- preserve fast first paint for the landing page

## Testing

Validation should cover:

- hero readability on desktop and mobile
- button visibility and hover/focus states
- no layout breakage when the hero stacks at smaller widths
- reduced motion behavior
- production build success

## Files Likely Affected

- `src/sections/HeroSection.tsx`
- `src/styles/index.css`
- `src/components/ui/HeroGrainient.tsx`

## Success Criteria

The work is successful when:

- the hero background clearly reflects the ReactBits `Grainient` inspiration
- the result feels branded to AL-FAHMU rather than generic
- the hero remains readable and family-friendly
- the right-side hero panel visually integrates with the new background
- the effect works cleanly across desktop and mobile
