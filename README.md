# Lumen Design System

Lumen is a brand-neutral enterprise design system for premium hospitality and wellness experiences. It is implemented as static HTML, reusable CSS and vanilla JavaScript, with no build step or runtime dependency.

## Live URL

https://mxmsmnv.github.io/lumen-enterprise-design-system/

## Catalog

- Foundations: color, typography, spacing, grid, breakpoints, shape, elevation, icons, imagery and motion
- Actions: buttons, icon buttons and links
- Forms: input, textarea, select, checkbox, radio, switch, validation, search and availability search
- Feedback: alerts, modal, loading, empty states, progress and toast
- Navigation: header, breadcrumbs, tabs, accordion, pagination and footer
- Content: cards, service tiles, metrics, tables, media gallery and rich text
- Patterns: booking, consultation, search results and modal flows
- Blocks: hero, task wall, card collection, promotion, information CTA, quick links, article, related content and share group
- Complete pages: retreat home, room collection and program detail

The documentation follows a two-level discovery model: full-width overview pages for Foundation, Components, Patterns, Examples and About, plus a searchable local sidebar on detail pages. Every catalog entry has its own hash route and four isolated examples or states. Each example has independent responsive controls, a local light/dark preview, revealable copyable HTML, usage guidance, public classes, token references and accessibility requirements.

## Files

```text
.
├── index.html              # Catalog shell and metadata
├── 404.html                # GitHub Pages hash-route fallback
├── favicon.svg             # Project-specific icon
├── styles.css              # Reusable component and token CSS
├── docs.css                # Documentation shell and preview harness
├── app.js                  # Registry, hash router and interactions
├── tokens.json             # Portable design tokens
├── package.json            # Optional local QA commands
├── scripts/check.mjs       # Catalog contract validation
└── assets/
    └── wellness-hero.png   # Original generated imagery; no source-brand assets
```

## Run locally

No installation or build is needed. Serve the directory with any static server:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/#/home`.

Run the catalog contract check after changes:

```bash
npm run check
```

The check validates required files, route coverage, theme and responsive contracts, independent preview controls, source-brand removal and JavaScript/token syntax.

## Use the CSS and tokens

Copy `styles.css` and `tokens.json` into a project. Load the stylesheet after the project reset:

```html
<link rel="stylesheet" href="/styles.css">
```

Use semantic classes and let theme variables resolve their colors:

```html
<article class="card">
  <div class="card-body">
    <span class="badge">Available</span>
    <h3>Ridge suite</h3>
    <p>Panoramic outlook, king bed and quiet workspace.</p>
    <a href="/stays/ridge-suite">Explore →</a>
  </div>
</article>
```

Do not copy component colors into local declarations. Extend semantic roles in `:root` and `[data-theme="dark"]` instead.

## Themes

Set `data-theme` on the root element:

```html
<html data-theme="light">
<html data-theme="dark">
<html data-theme="system">
```

`system` follows `prefers-color-scheme`. The catalog stores the global preference in local storage. Every component preview also has an independent light/dark control.

## Responsive behavior

- 390 px: single-column components, compact navigation, stacked booking controls
- 768 px: tablet catalog shell and two-column supporting layouts where space allows
- 1024 px: expanded page layouts and desktop-scale typography
- 1440 px+: full catalog sidebar, 76 rem content container and three-column collections

Components use intrinsic sizing and fluid gutters. Tables are locally scrollable; the document itself does not create horizontal overflow.

## Accessibility

- Semantic buttons, links, forms, labels, fieldsets, headings, landmarks and dialog roles
- Visible focus ring and logical keyboard order
- Minimum 44 px default control size
- Text and status cues that do not rely on color alone
- Reduced-motion support through `prefers-reduced-motion`
- System color-scheme support and high-contrast semantic roles
- Descriptive alternative text for meaningful imagery
- Skip link and responsive navigation with expanded state

When reusing a component, preserve its native element, label, accessible name and state attributes.

## Deployment

The project is ready for GitHub Pages at the repository root. In repository settings, select **Deploy from a branch**, then publish the root of `main`. Hash routing requires no server rewrites, and `404.html` provides a safe fallback.

## Application prompt

> Apply the Lumen design system to this project. Import `styles.css` and `tokens.json`; use semantic color roles for light, dark and system themes; compose existing Lumen classes before adding new ones; preserve native accessible HTML, visible focus, 44 px controls, reduced motion and the 390/768/1024/1440 px responsive behavior. Use the display serif only for editorial hierarchy and the sans-serif for interface text. Do not add hardcoded component colors or brand-specific assets.

## Asset note

The retreat photograph was generated specifically for this project with the built-in image generation tool. It contains no copied logo, property, text or source-site imagery.
