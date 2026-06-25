<span class="mcl-back-button">[[Technology/To Be Clean Up/Interview/Middle/index|← Middle]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - scss
  - css
  - tailwind
  - advance
  - intermediate
---
## What SCSS gives you over plain CSS

```scss
// Variables
$brand-color: #1D9E75;
$spacing-base: 8px;

// Nesting
.card {
  padding: $spacing-base * 2;

  &:hover { background: lighten($brand-color, 40%); }

  &__title {
    font-size: 1.25rem;
    color: $brand-color;
  }
}

// Mixins — reusable blocks
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero { @include flex-center; }

// Extends
%button-base {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary { @extend %button-base; background: $brand-color; }
.btn-ghost   { @extend %button-base; background: transparent; }
```

---

## What Tailwind looks like

```jsx
// All styling inline, no separate file
<div className="flex items-center gap-4 p-6 rounded-lg border border-gray-200 hover:bg-gray-50">
  <img className="w-12 h-12 rounded-full object-cover" src={avatar} />
  <div>
    <p className="text-sm font-medium text-gray-900">{name}</p>
    <p className="text-xs text-gray-500">{role}</p>
  </div>
</div>
```

Custom values when utilities aren't enough:

```jsx
<div className="w-[340px] bg-[#1D9E75] top-[117px]">
```

---

## Trade-off breakdown

### Separation of concerns

- **SCSS** — styles and markup are separate files; classic web architecture
- **Tailwind** — styles live with the component; aligns with component-driven React/Next.js

Neither is objectively correct. The industry has largely shifted toward co-location for component-based UIs — your markup and its styles change together, so keeping them together reduces context switching.

### Naming things

- **SCSS** — you name everything (`.card__title`, `.hero-section`, `.cta-button`); naming is hard and inconsistent across a team
- **Tailwind** — no naming; utility classes are the shared vocabulary

The "naming problem" is real at scale. BEM helps but it's still a convention that teams drift from. Tailwind sidesteps it entirely.

### Design system consistency

- **SCSS** — you define your own scale (`$spacing-4: 16px`); easy to go off-piste with one-off values
- **Tailwind** — constrained by the config; `p-4` always means `1rem`; harder to accidentally break the grid

Tailwind's constraint is a feature in teams — it forces consistency by making arbitrary values slightly awkward.

### Bundle size

- **SCSS** — ships all the CSS you write; unused styles accumulate over time
- **Tailwind** — JIT compiler scans files at build time, outputs only classes actually used; typically smaller in large apps

### Dynamic styles

- **SCSS** — trivial with CSS custom properties or class toggling
- **Tailwind** — cannot construct class names dynamically from strings:

```jsx
// ❌ Tailwind purges this — class never exists at build time
const color = 'red';
<div className={`text-${color}-500`} />

// ✅ Correct — full class name present in source
const cls = isError ? 'text-red-500' : 'text-gray-500';
<div className={cls} />
```

This is a genuine footgun. Anyone new to Tailwind will hit it.

### Theming and variants

- **SCSS** — CSS custom properties + class swapping; full control
- **Tailwind** — `dark:` `hover:` `md:` `lg:` variants built in; v4 uses CSS `@theme` natively

```jsx
<button className="bg-white dark:bg-gray-900 hover:bg-gray-50 md:px-6 px-4">
```

### Responsive design

- **SCSS** — explicit `@media` blocks, usually in a separate mixin
- **Tailwind** — inline breakpoint prefixes; faster to write, harder to read in complex layouts

```jsx
// Tailwind responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// SCSS equivalent
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px)  { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
}
```

### Readability at scale

- **SCSS** — component file stays clean; style complexity hidden in `.scss`
- **Tailwind** — JSX becomes dense with 10+ class names; `cn()` / `clsx` helps but it's still a lot

```jsx
// Real-world Tailwind gets verbose
<button className="inline-flex items-center justify-center rounded-md text-sm font-medium
  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
  disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
```

### Component libraries

- **SCSS** — MUI, Bootstrap, Ant Design all use their own SCSS/CSS; easy to override with more SCSS
- **Tailwind** — shadcn/ui, Headless UI, Radix UI are all Tailwind-first; growing ecosystem

---

## When to pick which

|Situation|Pick|Why|
|---|---|---|
|Large team, shared design system|Tailwind|Enforces consistent spacing/color scale|
|Existing codebase with SCSS|SCSS|Migration cost is rarely worth it|
|Component library (React/Next.js)|Tailwind|Co-location fits the mental model|
|Static site, CMS-driven content|SCSS|Styles applied to arbitrary HTML, not components|
|Heavy animations / complex pseudo-selectors|SCSS|More expressive for advanced CSS|
|Rapid prototyping|Tailwind|No context switching between files|
|Theming multiple brands|Both|SCSS for token definition, Tailwind for utility layer|
|Email templates|SCSS / inline|Tailwind doesn't work in email clients|

---

## Common hybrid approach

Most mature codebases use both:

```
tailwind.config.js   ← design tokens (colors, spacing, fonts)
globals.scss         ← resets, typography base, third-party overrides
components/*.tsx     ← Tailwind for component-level styling
complex-animation.scss ← SCSS for anything Tailwind can't express cleanly
```

Tailwind for 90% of UI work. SCSS for edge cases: complex animations, third-party overrides, generated content that Tailwind can't scan.

---

## Tailwind v4 changes (2025)

Worth knowing for senior candidates:

- Config moves from `tailwind.config.js` to CSS `@theme` block
- No more `purge` config — Vite/PostCSS handles it
- Nesting supported natively (no SASS needed for that)
- CSS custom properties as first-class tokens

```css
@theme {
  --color-brand: #1D9E75;
  --spacing-section: 5rem;
}
```

---

## Interview probes (for interviewers)

**Good follow-ups:**

- "Why can't you build Tailwind class names dynamically?" → expect JIT/purge explanation
- "How would you share a reusable style pattern in Tailwind?" → expect `@apply`, `cn()`, or extracted component
- "How do you handle a design that goes outside Tailwind's default scale?" → expect arbitrary values `[]` or `extend` in config
- "How would you migrate an existing SCSS codebase to Tailwind — what's the risk?" → expect class naming loss, refactor scope, team alignment

**Red flags:**

- "Tailwind is just inline styles" — doesn't understand the utility class / JIT distinction
- Can't explain the dynamic class name gotcha
- Thinks SCSS variables and CSS custom properties are the same thing
- No opinion on when they'd choose one over the other
