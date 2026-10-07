// Lesson 28 — the checklist I run before shipping a React app. Author: Adarsh

// STRUCTURE
// src/
//   components/   (shared, dumb-ish)
//   features/     (feature folders: components + hooks + api together)
//   hooks/        (cross-feature custom hooks)
//   lib/          (api client, utils)
//   pages/        (route-level components)

// CODE
// [ ] one component per file, PascalCase
// [ ] components stay small — extract when JSX or logic > ~150 lines
// [ ] every fetch wrapped in a custom hook with loading/error
// [ ] no state that could be derived (computed, not stored)
// [ ] effects have ALL deps + cleanup; eslint react-hooks passes clean
// [ ] keys from data, never array index (on reorderable lists)
// [ ] forms: controlled inputs + validation feedback on every field

// QUALITY
// [ ] npx depcheck (unused deps), npm audit
// [ ] error boundary per page region
// [ ] images lazy-loaded, heavy routes code-split (React.lazy)
// [ ] Lighthouse > 90 on mobile

// UX DETAILS
// [ ] every async action shows loading + handles failure
// [ ] disabled buttons while submitting (no double posts)
// [ ] empty states designed, not blank boxes
// [ ] keyboard works: tab order, Enter submits, Esc closes modals

// MY SHIP RITUAL
// [ ] npm run build locally — if it builds, ship it
// [ ] tag the commit, write 3-line release note

// Practice: run this checklist against your latest project and fix the
// first three failures.
