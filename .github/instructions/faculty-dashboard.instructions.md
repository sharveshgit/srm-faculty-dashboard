---
applyTo: "src/**/*.{ts,tsx,css}"
description: "Project conventions for the faculty/HOD dashboard app."
---

# Faculty Dashboard Instructions

## Code style
- Use TypeScript for all new code.
- Prefer functional React components and hooks.
- Keep components small, focused, and easy to reuse.
- Use existing UI primitives from src/components/ui before creating new ones.

## Structure
- Keep page-level components under src/pages.
- Keep shared UI in src/components/ui or src/components/Layout.
- Place data helpers in src/utils.
- Keep route-based features organized by role folder when possible.

## Styling
- Use Tailwind utility classes for layout and styling.
- Match the existing visual tone and spacing patterns.
- Avoid introducing inline styles unless necessary.

## Data and state
- Keep state local when possible.
- Reuse context providers when the data is shared across multiple views.
- Preserve the existing sample data structure unless a broader schema change is intended.

## Validation
- Prefer a build check after UI or logic changes.
- Keep imports clean and avoid unused code.
