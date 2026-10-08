# AUREL — Design System

AUREL's design system is "editorial atelier meets formulation library." It pairs a quietly luxurious skincare-brand voice (Fraunces serif, warm bone paper, near-black ink) with the precision of a laboratory formulation index (JetBrains Mono, hairline rules, mono labels). The intent is to make a storefront that feels considered and clinical without ever feeling cold.

This document defines the visual philosophy, colour tokens, typography, type scale, spacing, containers, grids, components, interaction patterns, imagery rules, responsive behaviour and accessibility commitments.

> The implementation source of truth is `src/app/globals.css`. Tokens defined there should be the only values used; ad-hoc colours and font sizes are discouraged.

---

## 1. Visual philosophy

- **Editorial atelier.** The page is a piece of editorial design — generous whitespace, considered hierarchy, a single accent colour, no decorative gradients, no shadow effects beyond the lightest hairline.
- **Formulation library.** Information is organised like a chemist's reference: numbered sections (`01 / RESTORE`), mono labels (`FORM / CREAM · RITUAL / AM + PM`), tabular numerals. The **AUREL Formula Index** signature device (see §11) is the visual embodiment of this.
- **Mineral palette.** A warm bone off-white background with near-black ink and a muted mineral sage accent. The palette is narrow on purpose — cohesion over range.
- **Restraint.** Animations are slow and quiet (0.4–0.9s cubic-bezier easings). Hover states are subtle. No bounce, no flash, no pulsing.

---

## 2. Colour tokens

All tokens are defined as OKLCH values in `:root` (and remapped for `.dark`).

### Core tokens (light, default)

| Token | OKLCH | Usage |
| --- | --- | --- |
| `--background` | `oklch(0.975 0.008 75)` | Warm bone — page background |
| `--foreground` | `oklch(0.18 0.01 75)` | Near-black ink — primary text |
| `--bone` | `oklch(0.975 0.008 75)` | Alias for `--background` |
| `--bone-deep` | `oklch(0.94 0.012 75)` | Tinted surfaces (info banners, dark-section cards) |
| `--graphite` | `oklch(0.22 0.008 75)` | Deep neutral |
| `--mineral` | `oklch(0.55 0.01 75)` | Mid neutral for muted text |
| `--sage` | `oklch(0.72 0.04 145)` | Muted mineral sage accent |
| `--sage-deep` | `oklch(0.5 0.05 145)` | Deep sage for accent surfaces |
| `--clay` | `oklch(0.7 0.045 45)` | Warm clay accent (use sparingly) |
| `--card` | `oklch(0.99 0.004 75)` | Card surface (slightly lifted from background) |
| `--card-foreground` | `oklch(0.18 0.01 75)` | Card text |
| `--popover` / `--popover-foreground` | matches card | Dialogs / popovers |
| `--primary` | `oklch(0.2 0.01 75)` | Primary button background |
| `--primary-foreground` | `oklch(0.975 0.008 75)` | Primary button text |
| `--secondary` / `--muted` / `--accent` | `oklch(0.93 0.012 75)` | Secondary surfaces |
| `--muted-foreground` | `oklch(0.48 0.012 75)` | Secondary text |
| `--destructive` | `oklch(0.55 0.18 25)` | Errors / destructive actions |
| `--border` / `--input` | `oklch(0.88 0.01 75)` | Hairlines, input borders |
| `--ring` | `oklch(0.3 0.01 75)` | Focus ring |

### Dark theme

A `.dark` class remaps every token to a warm dark variant (e.g. `--background: oklch(0.16 0.008 75)`). The dark theme is structurally complete but AUREL is currently shipped in light mode only; dark mode is reserved for the case study's final CTA section, which uses `bg-foreground text-background` directly.

### Tailwind bridge

`@theme inline` exposes the CSS variables to Tailwind utilities — `bg-background`, `text-foreground`, `bg-bone-deep`, `text-sage`, etc. Brand extension utilities `bg-bone`, `bg-bone-deep`, `bg-graphite`, `bg-sage`, `bg-sage-deep`, `bg-clay` are available alongside the standard shadcn/ui palette.

---

## 3. Typography

AUREL pairs three families, loaded via `next/font` with `display: "swap"` and Latin subsetting.

| Family | Variable | Role |
| --- | --- | --- |
| **Fraunces** | `--font-fraunces` | Editorial display serif — headlines, product names, prices. Optical sizing + soft + wonk axes enabled. |
| **Inter** | `--font-inter` | Sans body text, UI labels, form fields. `ss01` + `cv11` features on. |
| **JetBrains Mono** | `--font-jetbrains` | Technical mono — eyebrows, Formula Index, metadata strips, breadcrumbs. |

Body base settings: `-webkit-font-smoothing: antialiased`, `font-variant-numeric: tabular-nums`, `font-feature-settings: "ss01" "cv11" "kern"`. Selection inverts to `background: var(--foreground); color: var(--background)`.

---

## 4. Type scale utilities

All editorial sizing uses `clamp()` for fluid responsive behaviour. Defined as Tailwind utilities in `@layer utilities`:

| Utility | Size | Line height | Tracking | Weight | Use |
| --- | --- | --- | --- | --- | --- |
| `text-display` | `clamp(2.75rem, 8vw, 7.5rem)` | 0.95 | -0.04em | 400 | Homepage hero headline |
| `text-display-sm` | `clamp(2rem, 5vw, 4rem)` | 1 | -0.03em | 400 | Section-level display headlines |
| `text-editorial` | `clamp(1.5rem, 3vw, 2.5rem)` | 1.15 | -0.02em | 400 | Editorial section headlines |
| `text-eyebrow` | `0.6875rem` | 1 | `0.22em` upper | 500 | Section eyebrows, small caps labels |
| `text-label` | `0.75rem` | 1.2 | `0.12em` upper | 500 | UI labels, button copy |
| `text-mono` | `0.6875rem` | — | `0.06em` upper | — | Mono metadata, Formula Index, breadcrumbs |

`.font-serif` is configured with `font-optical-sizing: auto` and `font-feature-settings: "ss01" "ss02" "kern"` so Fraunces renders with its alternate stylistic sets.

---

## 5. Spacing & container

AUREL does not introduce a custom spacing scale — Tailwind's default `4px`-based scale is used throughout. Vertical rhythm on editorial pages is established with `py-16 md:py-24` and `py-20 md:py-28` patterns; section transitions use `border-y border-border` hairlines.

### `.container-aurel`

| Breakpoint | Padding (inline) | Max width |
| --- | --- | --- |
| `< 768px` | `1.25rem` | `80rem` |
| `≥ 768px` | `2rem` | `80rem` |
| `≥ 1536px` | `3rem` | `88rem` |

`margin-inline: auto` centers the container at all sizes. This is the only container utility AUREL uses; shadcn/ui's `container` is not used on AUREL surfaces.

---

## 6. Grids

- **Editorial 12-column grid** — used on case-study, about, and long-form article pages via `grid grid-cols-1 md:grid-cols-12` with `col-span`/`col-start` placements.
- **Product grid** — `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-14` for shop, collection, bestsellers, wishlist, recently-viewed.
- **Comparison grid** — sticky left spec column + per-product columns on `/compare`.
- **PDP grid** — `grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16` for gallery + sticky purchase panel.

Grid gaps are intentionally generous (`gap-10`, `gap-16`) — the whitespace is part of the editorial voice.

---

## 7. Components

AUREL uses shadcn/ui (New York) as the base primitive library and adds bespoke editorial components on top.

### shadcn/ui primitives (in `src/components/ui/`)

`button`, `dialog`, `sheet`, `drawer`, `popover`, `dropdown-menu`, `command`, `tabs`, `accordion`, `carousel`, `select`, `checkbox`, `radio-group`, `switch`, `slider`, `tooltip`, `toast`/`sonner`, `skeleton`, `aspect-ratio`, `card`, `badge`, `breadcrumb`, `calendar`, `chart`, `form`, `input`, `textarea`, `label`, `separator`, `scroll-area`, `avatar`, `alert-dialog`, `alert`, `context-menu`, `hover-card`, `menubar`, `navigation-menu`, `pagination`, `progress`, `resizable`, `sidebar`, `table`, `toggle`, `toggle-group`, `input-otp`, `collapsible`.

### AUREL bespoke components

| Component | File | Purpose |
| --- | --- | --- |
| `FormulaIndex` / `FormulaIndexRule` | `src/components/editorial/formula-index.tsx` | Signature identity device (see §11) |
| `Section` / `Eyebrow` | `src/components/editorial/section.tsx` | Editorial section wrapper |
| `Reveal` / `RevealText` / `StaggerGroup` | `src/components/motion/reveal.tsx` | Scroll-triggered reveal (IntersectionObserver) |
| `ProductCard` | `src/components/commerce/product-card.tsx` | Card with hover overlay (Quick Add + View), wishlist heart, compare icon |
| `PurchasePanel` | `src/components/product/purchase-panel.tsx` | PDP right column — variant, qty, add to bag, subscription |
| `ProductGallery` | `src/components/product/product-gallery.tsx` | PDP gallery with thumbnails |
| `CartDrawer` | `src/components/layout/cart-drawer.tsx` | Slide-in cart with free-shipping progress + upsell |
| `CartView` | `src/components/cart/cart-view.tsx` | `/cart` dedicated page |
| `CheckoutView` | `src/components/cart/checkout-view.tsx` | `/checkout` demo preview |
| `SearchOverlay` | `src/components/layout/search-overlay.tsx` | Cmd+K predictive search |
| `MobileNav` | `src/components/layout/mobile-nav.tsx` | Mobile slide-in nav |
| `QuickView` | `src/components/commerce/quick-view.tsx` | Product quick-view modal |
| `CompareBar` | `src/components/commerce/compare-bar.tsx` | Fixed bottom compare tray (AnimatePresence) |
| `WriteReviewDialog` | `src/components/product/write-review-dialog.tsx` | Review submission modal (browser-local) |
| `CompatibilityChecker` | `src/components/product/compatibility-checker.tsx` | Two-product ingredient compatibility tool |

### Cart drawer / sheet / dialog convention

shadcn/ui's `SheetContent` and `DialogContent` were extended with a `showCloseButton?: boolean` prop. AUREL's custom close buttons (cart drawer, filter drawer, search overlay, keyboard help, write-review, ask-question) pass `showCloseButton={false}` to avoid duplicate X icons. This is a non-negotiable convention for any new overlay component.

---

## 8. Interaction patterns

AUREL has a small, consistent interaction vocabulary. Reuse these utilities rather than inventing new transitions.

### `.link-underline`

```css
.link-underline::after {
  /* 1px underline, scaleX(0) → scaleX(1) on hover,
     0.4s cubic-bezier(0.65, 0, 0.35, 1),
     origin flips right→left on hover for a "draw-in" feel */
}
```

Use on every text link that should communicate clickability without a button affordance.

### `.reveal-mask`

A `clip-path: inset(0 0 100% 0)` mask that animates to `inset(0 0 0 0)` over 0.9s. Used by the motion `Reveal` components to mask content into view on scroll.

### `.grain`

A subtle SVG turbulence noise overlay at `opacity: 0.04`, `mix-blend-mode: multiply`. Applied to editorial sections that should feel like printed paper (the brand statement dark section, the case-study final CTA).

### Scroll reveals

`Reveal`, `RevealText`, `StaggerGroup` from `src/components/motion/reveal.tsx` use `IntersectionObserver` to add an `in-view` class. All respect `prefers-reduced-motion` via the global `@media (prefers-reduced-motion: reduce)` reset that zeroes animation and transition durations.

### Framer Motion usage

- Hero: scroll-linked parallax (y + scale on background image, y + opacity on text), disabled for reduced-motion.
- Film section: scroll-linked x-pan on the image, with editorial film-slate corner marks.
- Cart drawer: spring-in.
- Compare bar: `AnimatePresence` slide-in from bottom.
- Quick view: spring-in modal.
- Gallery thumbnails: hover scale 95→100 with smooth transition; active thumbnail gets a 2px left-edge accent bar.

---

## 9. Imagery

All imagery is AI-generated via the `z-ai-web-dev-sdk` and shares one art direction: porcelain and limestone surfaces, soft directional daylight, restrained AUREL packaging identity. See [docs/assets/ASSET-INVENTORY.md](../assets/ASSET-INVENTORY.md) for the full art-direction brief and asset categories.

`next/image` is configured with `qualities: [75, 80, 85, 90]` and `formats: ["image/avif", "image/webp"]`. In static export mode `unoptimized: true` is set because the optimization server cannot run on a static host.

Master assets are 1024×1024 PNGs. Production would replace these with 4K photography and responsive AVIF/WebP derivatives served via a CDN.

---

## 10. Responsive rules

- Mobile-first breakpoints: `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`, `2xl 1536px`.
- Type uses `clamp()` for fluid scaling — there are no hard breakpoint font-size changes.
- Mobile (390×844) is a first-class viewport: quick view uses `flex flex-col md:grid md:grid-cols-2`; mobile sticky purchase bar appears at the bottom of every PDP; mobile nav replaces the desktop mega menu below `md`.
- Touch targets are minimum 44×44px (`h-11` buttons are the baseline; the mobile sticky purchase bar uses `h-12`).
- `.pb-safe` / `.pt-safe` utilities apply `env(safe-area-inset-*)` for iOS notch / home-indicator accommodation on sticky bars.

---

## 11. The AUREL Formula Index — signature device

The Formula Index is the single most identifiable AUREL signature. It is a small graphic organisational system rendered in `JetBrains Mono`, `0.6875rem`, uppercase, `0.14em` tracking:

```
A / 03 — RESTORE
FORM / CREAM · RITUAL / AM + PM
```

Three variants exist:

- **Stacked** (default) — index + label on line one, `FORM /` and `RITUAL /` on line two. Includes an `aria-label` describing the full mark.
- **Inline** — single horizontal line with `·` separators; used inside dense information panels.
- **Minimal** — index + label only; used in compact contexts.
- **`FormulaIndexRule`** — a chapter divider that places a minimal Formula Index between two hairlines (`h-px bg-foreground/15`).

Usage discipline: the Formula Index is a graphic system, not a decorative element pasted into every component. It is used selectively on product labels, information panels, routine recommendations and editorial chapter transitions to reinforce hierarchy. Do not add it to body copy, buttons or form labels.

Source: `src/components/editorial/formula-index.tsx`.

---

## 12. Accessibility

AUREL targets **WCAG 2.2 AA** where practical.

### Commitments

- **Semantic HTML** throughout (`main`, `header`, `nav`, `section`, `article`, `footer`, `figure`, `figcaption`).
- **Keyboard navigation** across all interactive elements. Vim-style `g`-prefix shortcuts (`g+h` home, `g+s` shop, `g+d` diagnostic, `g+w` wishlist, `g+c` compare, `g+b` build-routine, `g+j` journal) alongside `Cmd+K` (search), `Cmd+.` (cart), `?` (keyboard help), `Esc` (close). Shortcuts are suppressed while typing in inputs.
- **Visible focus** via `:focus-visible { outline: 1px solid var(--foreground); outline-offset: 2px; }`. Never remove this outline.
- **Dialog focus trapping and Escape-to-close** via Radix Dialog/Sheet (shadcn/ui).
- **ARIA labels** on every icon-only button (cart, search, wishlist, compare, close, back-to-top).
- **`prefers-reduced-motion`** is honored globally — the `@media (prefers-reduced-motion: reduce)` reset in `globals.css` zeroes animation and transition durations. Framer Motion components additionally check the media query for parallax / scroll-linked effects.
- **44px+ touch targets** on mobile.
- **Safe-area insets** (`.pb-safe`, `.pt-safe`) on sticky bars for iOS.
- **`sr-only` descriptions** on every Radix Dialog/Sheet to silence the `Missing aria-describedby` warning.
- **Color contrast** — foreground/background and muted-foreground/background pairs are tested for AA contrast. The sage accent (`oklch(0.72 0.04 145)`) is used for non-essential decorative elements and not as the sole carrier of information.

### Known accessibility work

- A full `axe` automated audit has **not** been run in this build environment. See [docs/release/KNOWN-LIMITATIONS.md](../release/KNOWN-LIMITATIONS.md) item (h).
- The `/accessibility` page documents the user-facing accessibility statement.

---

## 13. Print

A `@media print` block in `globals.css` supports the routine-results "Save as PDF" flow. It:

- Hides chrome (header, footer, drawers, fixed UI, sticky elements).
- Forces a light theme and an 11pt body.
- Sets `.container-aurel` to full width.
- Adds `break-inside: avoid` to `a, li, article, figure`.
- Prints canonical URLs after internal links so printed routines remain navigable offline.
