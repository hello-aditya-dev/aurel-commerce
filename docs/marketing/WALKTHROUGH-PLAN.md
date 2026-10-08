# AUREL — Screen Recording Walkthrough Plan

This is the timed plan for a 75–120 second screen recording that walks a prospective client through the AUREL storefront. The plan covers hero, shop, PDP, cart, diagnostic, journal/about editorial, and case study + studio contact.

> **Note:** This is the plan only. No recording exists in this repository. The plan is written so that anyone with the dev server running (`bun run dev` on port 3000) or the deployed site open can record the sequence in a single take with minimal editing.

---

## Recording setup

- **Viewport:** 1440×900 (desktop) for the primary recording. Optionally intercut mobile (390×844) clips for the cart drawer and quick-view modal.
- **Browser:** Chrome or Arc with the bookmarks bar hidden and the dev console closed.
- **Cursor:** System default; smooth scrolling enabled.
- **Audio:** No voiceover in the base cut. Optional voiceover script notes are included per segment for a narrated variant.
- **Total duration:** 75–120 seconds. Target: 105 seconds.
- **Transitions:** Hard cuts only — AUREL's editorial voice does not call for crossfades.

---

## Timed sequence

### 0–10s — Hero "Care, considered."

- **Route:** `/`
- **Action:** Page loads with the hero in view. Let the scroll-linked parallax settle. Hold for ~3s. Slow scroll down to reveal the hero's lower edge and the announcement bar rotation.
- **On-screen:** AUREL wordmark, hero headline "Care, considered.", subhead "The Formulation Atelier", primary CTA "Shop the collection", secondary CTA "Find your routine". Warm bone background, hero campaign image with subtle parallax.
- **Voiceover (optional):** "AUREL — a fictional premium skincare concept, positioned as a formulation atelier. The brief: turn a barrier-first skincare idea into a distinctive, technically credible storefront."

### 10–20s — Essential Edit product grid

- **Route:** `/` (continue scrolling from hero)
- **Action:** Continue scrolling into the "Essential Edit" bestsellers section. Hover one card to reveal the Quick Add + View overlay and the wishlist heart + compare icon in the top-right.
- **On-screen:** 4-column product grid (C15 Antioxidant Serum, Peptide Recovery Serum, Ceramide Recovery Cream, Daily Mineral SPF 50). Editorial section header with eyebrow + serif headline. Hairline divider above the section.
- **Voiceover (optional):** "The homepage moves from brand to commerce without breaking voice — the same Fraunces serif, the same warm bone paper, the same mineral sage accent."

### 20–35s — Shop with filters + sort

- **Route:** `/shop`
- **Action:** Navigate to `/shop` via the header mega menu (or `g+s` keyboard shortcut). Click one filter checkbox (e.g. "Brightening" under Concerns) and watch the grid filter. Click the sort dropdown and switch from "Featured" to "Price: low to high."
- **On-screen:** Editorial collection header, sidebar filters (concern / skin type / category / ingredient / price), sort dropdown, responsive product grid updating live. Compare bar may slide in if products are queued.
- **Voiceover (optional):** "Shop supports filtering by concern, skin type, category, ingredient and price — with sort and a responsive grid. The compare bar lets a buyer queue up to three products for side-by-side review."

### 35–55s — PDP with gallery + variant + add-to-cart

- **Route:** `/products/peptide-recovery-serum`
- **Action:** Click a product card to enter the PDP. Hover the gallery thumbnails (scale 95→100, active thumbnail gets a 2px left-edge accent bar). Click a thumbnail to change the main image. Select "Subscribe & save 15% (demo)" — note the honest "(demo)" suffix and the "illustrative demo pricing — not a real recurring plan" note. Click "Add to bag."
- **On-screen:** Media gallery (left) + sticky purchase panel (right). Product name in Fraunces, price, size, rating. Formula Index signature device. Ingredient storytelling section, texture macro, complete-the-routine upsell. Cart drawer slides in with free-shipping progress and the just-added line.
- **Voiceover (optional):** "The product detail page pairs a media gallery with a sticky purchase panel. Subscription is honestly labelled as a demo — illustrative pricing, not a real recurring plan. The cart drawer surfaces free-shipping progress and an upsell."

### 55–70s — Cart drawer + dedicated `/cart`

- **Route:** `/cart`
- **Action:** From the cart drawer, click "View full bag" to navigate to the dedicated `/cart` page. Adjust a quantity stepper. Show the free-shipping progress bar updating. Click "Preview checkout" to enter `/checkout`. Hold on the "Demonstration only — no payment or order will be processed" disclosure banner.
- **On-screen:** `/cart` page with line items, quantity steppers, subtotal, free-shipping progress. `/checkout` page with 3-step form (contact / shipping / payment-disabled), demo disclosure banner, order summary sidebar, "Complete preview" button with "No charge · No order created · No email sent" caption.
- **Voiceover (optional):** "A dedicated cart page gives the buyer room to review. The checkout is a clearly labelled preview — no payment is processed, no order is created. In Shopify mode this step hands off to Shopify-hosted checkout."

### 70–85s — Skin diagnostic + routine results

- **Route:** `/diagnostic` → `/diagnostic/results`
- **Action:** Navigate to `/diagnostic` (or `g+d`). Step through the five-question quiz (concerns, skin type, reactivity, routine time, budget). On completion, the site routes to `/diagnostic/results`. Show the AM/PM protocol with rationale, the add-all-to-cart CTA, and the Save-as-PDF button.
- **On-screen:** Five-step quiz with custom reactivity scale. Results page with AM/PM protocol, per-product rationale, total + savings, "Add routine to bag" CTA, "Save as PDF" button.
- **Voiceover (optional):** "A five-question skin diagnostic returns a deterministic AM/PM routine from the catalogue — editable, exportable as PDF, and addable to the bag in one click."

### 85–100s — Journal / about editorial

- **Route:** `/journal` → `/about`
- **Action:** Navigate to `/journal`. Show the editorial index with the featured article and 3-column grid of subsequent articles. Click into one article to show the long-form layout with related products. Then navigate to `/about` to show the brand platform editorial section.
- **On-screen:** Journal index with featured article + 3-column grid. Long-form article with editorial section rhythm. About page with brand statement, method, and the AUREL Formula Index chapter dividers.
- **Voiceover (optional):** "Editorial surfaces — journal, about, approach — use the same hairline-divider rhythm and the same Formula Index chapter dividers as the commerce surfaces, so the brand voice stays coherent across the entire site."

### 100–115s — Case study + studio contact

- **Route:** `/case-study`
- **Action:** Navigate to `/case-study` (note: not linked from consumer nav — prospective-client surface only). Hold on the hero headline and the "01 / Objective" section. Scroll to show the "02 / Designed" capability grid and the "03 / Engineering" spec grid. End on the final CTA section with the tracked "START A PROJECT" button.
- **On-screen:** Case-study hero with mono metadata strip. Staggered 3-column capability grid. Bone-deep tinted engineering spec section. Real screenshots of the live site (homepage, PDP, quiz, cart, collection). Final CTA on a dark editorial section with the tracked button linking to `NEXT_PUBLIC_CONTACT_URL`.
- **Voiceover (optional):** "The case study — for prospective clients, not linked from the consumer nav — positions AUREL as a flagship demonstration of the studio's premium ecommerce offering. The CTA is analytics-tracked."

### 115–120s — Hold + fade

- **Action:** Hold on the case-study final CTA for ~3s. Hard cut to black. AUREL wordmark fades in for ~2s. Fade out.
- **On-screen:** AUREL wordmark on black. Optional caption: "Concept showcase. AUREL is a fictional brand. hello-aditya.dev@gmail.com"

---

## Optional voiceover variant

For a narrated 105-second cut, use the per-segment voiceover notes above. Total spoken word count is approximately 165 words, which fits comfortably in 105 seconds at a measured editorial pace.

## Optional mobile intercuts

For a variant that demonstrates responsive behaviour, intercut 3–5 second mobile (390×844) clips after the corresponding desktop segments:

- After §2 (Essential Edit): mobile product card with always-visible wishlist heart + compare icon
- After §4 (PDP): mobile sticky purchase bar at the bottom of the PDP
- After §5 (cart): mobile cart drawer with full-width line items
- After §6 (diagnostic): mobile quiz step with custom reactivity scale

## Recording checklist

- [ ] Dev server running on port 3000 (or deployed site open)
- [ ] Viewport set to 1440×900, bookmarks bar hidden, dev console closed
- [ ] Cart cleared and wishlist cleared before recording (clean state)
- [ ] Reduced motion disabled (so parallax and reveals are visible)
- [ ] Announcement bar rotation visible at start (do not skip past it)
- [ ] Cursor smooth-scrolling enabled
- [ ] Single take recorded; hard cuts only in post
- [ ] Final frame: AUREL wordmark on black + contact caption

## Important disclaimers for the recording

- Do not claim the recording depicts a real transaction. The `/checkout` segment must include the "Demonstration only" disclosure banner in frame.
- Do not claim the subscription is a real recurring plan. The "(demo)" suffix must be visible when the subscription option is selected in §4.
- Do not claim reviews are verified purchases. If a review is visible in frame, do not voice-over-claim it as a real customer review.
- Do not claim AUREL is a real brand. The closing frame's "Concept showcase. AUREL is a fictional brand." caption is required.
