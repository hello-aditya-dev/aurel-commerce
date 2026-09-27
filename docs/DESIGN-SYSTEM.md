# AUREL — Design System

AUREL's design system is built on three principles: **editorial typography**, **mineral palette**, **restrained motion**. Everything else is execution.

## Colour

AUREL uses a warm mineral palette — no indigo, no blue, no neon. The base is a warm bone off-white; the ink is a near-black; accent is a muted botanical sage used sparingly.

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| `--background` | `oklch(0.975 0.008 75)` warm bone | `oklch(0.16 0.008 75)` deep graphite | Page background |
| `--foreground` | `oklch(0.18 0.01 75)` near-black ink | `oklch(0.94 0.008 75)` warm bone | Body text |
| `--bone-deep` | `oklch(0.94 0.012 75)` | `oklch(0.19 0.008 75)` | Sectional background variation |
| `--graphite` | `oklch(0.22 0.008 75)` | `oklch(0.85 0.008 75)` | Secondary ink |
| `--mineral` | `oklch(0.55 0.01 75)` | `oklch(0.65 0.01 75)` | Mid-grey for metadata |
| `--sage` | `oklch(0.72 0.04 145)` | `oklch(0.6 0.04 145)` | Botanical accent (sparingly) |
| `--sage-deep` | `oklch(0.5 0.05 145)` | `oklch(0.5 0.05 145)` | Deep botanical |
| `--clay` | `oklch(0.7 0.045 45)` | `oklch(0.6 0.045 45)` | Warm earth accent |
| `--muted-foreground` | `oklch(0.48 0.012 75)` | `oklch(0.62 0.01 75)` | Captions, labels |
| `--border` | `oklch(0.88 0.01 75)` | `oklch(0.28 0.008 75)` | Hairline borders |

All colours are defined as OKLCH values in `src/app/globals.css`. Dark mode is supported via the `.dark` class but the site defaults to light.

## Typography

A three-family editorial system. Every page uses all three.

### Families

| Family | Variable | Role |
| --- | --- | --- |
| **Fraunces** | `--font-fraunces` | Display serif for editorial headlines, product names, journal titles |
| **Inter** | `--font-inter` | Sans-serif for UI, commerce metadata, body |
| **JetBrains Mono** | `--font-jetbrains` | Mono for technical metadata, product numbers, timestamps |

All loaded via `next/font/google` with `display: swap` and subset to Latin. Fraunces uses variable axes `opsz`, `SOFT`, `WONK` for optical sizing and italic/soft variants.

### Type scale (fluid, via `clamp()`)

| Class | Size | Line height | Tracking | Usage |
| --- | --- | --- | --- | --- |
| `.text-display` | `clamp(2.75rem, 8vw, 7.5rem)` | 0.95 | -0.04em | Hero only |
| `.text-display-sm` | `clamp(2rem, 5vw, 4rem)` | 1 | -0.03em | Major section openers |
| `.text-editorial` | `clamp(1.5rem, 3vw, 2.5rem)` | 1.15 | -0.02em | Section headings |
| `.text-eyebrow` | 0.6875rem | 1 | 0.22em upper | Section eyebrows |
| `.text-label` | 0.75rem | 1.2 | 0.12em upper | Commerce labels |
| `.text-mono` | 0.6875rem | — | 0.06em upper | Technical metadata |

Major headlines often use italic Fraunces for emphasis: `font-serif italic text-muted-foreground`.

## Spacing & layout

- Container: `.container-aurel` — `max-w-80rem` (1280px), `px-5 sm:px-8 2xl:px-12 2xl:max-w-88rem`
- Section padding: `py-16 md:py-24` (default), `py-24 md:py-40` for major editorial moments
- Grid: standard 12-column on desktop
- Hairline borders: `border-border` (oklch 0.88 light)
- Radii: `--radius: 0.25rem` (almost square — luxury brands rarely use heavy rounding)

## Breakpoints

| Name | Width | Notes |
| --- | --- | --- |
| `sm` | 640px | Phone landscape / small tablet |
| `md` | 768px | Tablet portrait — nav switches to mobile menu below this |
| `lg` | 1024px | Tablet landscape / small laptop — desktop nav appears |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop / ultrawide — container expands |

Manually inspected at 320, 360, 375, 390, 430, 480, 768, 820, 1024, 1280, 1366, 1440, 1536, 1728, 1920 and 2560.

## Motion

Motion is restrained and meaningful. Three patterns:

1. **Reveal** — `Reveal` component wraps content; on scroll-into-view it animates opacity + y with `[0.22, 1, 0.36, 1]` easing over 0.7–0.9s.
2. **Stagger** — `StaggerGroup` staggers children by 80ms for list/grid entrances.
3. **Spring** — Cart drawer uses Framer Motion spring on the free-shipping progress bar.

All motion respects `prefers-reduced-motion` (Framer Motion's `useReducedMotion`). When reduced motion is requested, reveals become instant and parallax is disabled.

Easing: `[0.22, 1, 0.36, 1]` is the AUREL signature ease — fast start, slow finish.

## Image treatment

- All imagery uses `next/image` with `sizes` set per usage
- `qualities: [75, 80, 85, 90]`, AVIF/WebP formats
- `priority` only on LCP hero images
- Hover image swap on product cards (primary → secondary) over 700ms
- Subtle scale on hover (`group-hover:scale-[1.04]`) over 1.1s with the signature ease
- Editorial sections use object-cover with consistent aspect ratios (4:5 portrait, 4:3 or 3:2 landscape)

## Interaction rules

- **Buttons**: square (no radius), uppercase tracked labels, `bg-foreground text-background` for primary, transparent border for secondary
- **Links**: `link-underline` class — animated underline that scales from right-to-left, reveals left-to-right on hover
- **Cards**: minimal — image + meta, no heavy card chrome
- **Drawers / sheets**: `Sheet` from shadcn/ui, refined with `bg-background` and editorial typography in headers
- **Toasts**: `sonner` with `position="bottom-right"` and `font-sans` override

## Z-index system

| Layer | Value |
| --- | --- |
| Header | 50 |
| Mega menu | inherits 50 |
| Mobile sticky purchase bar | 40 |
| Cart drawer (Sheet) | 50+ (shadcn default) |
| Search overlay (Dialog) | 50+ |
| Mobile nav full-screen | 60 |
| Toasts (sonner) | built-in |

## Accessibility principles

- All interactive elements ≥ 44px touch target on mobile
- `:focus-visible` outline (1px) on every interactive element
- Dialog focus trapping + Escape-to-close (shadcn default)
- `prefers-reduced-motion` honored throughout
- Semantic HTML (`main`, `header`, `nav`, `section`, `article`, `footer`)
- ARIA labels on icon-only buttons
- Alt text on every image (descriptive, not keyword-stuffed)

## What AUREL does NOT do

- No glassmorphism excess
- No neon / tech aesthetics
- No generic Tailwind template look
- No pink / blue / indigo colour dominance
- No bouncing or floating animations
- No long intro loaders users must wait through
- No 100vh bugs (uses `100svh` for hero)
