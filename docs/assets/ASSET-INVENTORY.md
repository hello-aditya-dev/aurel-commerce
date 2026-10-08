# AUREL — Asset Inventory

All imagery used on the AUREL demonstration site is **original, AI-generated content** produced specifically for this project using the `z-ai-web-dev-sdk` image generation API (`images.generations.create`). No third-party photography, stock imagery, brand assets, or copyrighted material is used.

This document records the generation source, the art-direction brief, the asset categories, packaging consistency rules, commercial-use status, and the replacement guidance for production.

---

## 1. Generation source

| Field | Value |
| --- | --- |
| **SDK** | `z-ai-web-dev-sdk` (`^0.0.18`) |
| **API** | `images.generations.create` |
| **Generation scripts** | `scripts/gen-images.ts`, `scripts/gen-all.sh`, `scripts/gen-one.ts` |
| **Sizes used** | `1024×1024` (packshots, textures, ingredient macros), `768×1344` (portrait editorial), `1344×768` (landscape hero / campaign / OG card) |
| **Output format** | PNG (raster), JPG (OG cards) |
| **Output location** | `public/images/` |

The prompts for each asset are documented in `scripts/gen-images.ts`. The image-generation tool is invoked from the same Bun runtime as the rest of the project.

---

## 2. Art-direction brief

Every AUREL image is generated to a single cohesive art direction so the visual universe feels like one brand, not a collage.

### Surfaces & lighting

- **Surfaces:** porcelain, limestone, raw mineral stone, matte ceramic, frosted glass. Warm bone off-white as the dominant base.
- **Lighting:** soft directional daylight, north-window quality. No harsh shadows, no studio-grid reflections, no colored gels.
- **Composition:** editorial still-life. Generous negative space. Objects placed off-center on a horizontal plane. Camera at object height or slightly above.

### Packaging identity

AUREL packaging is consistent across the entire catalogue. Every product packshot uses the same system:

- **Container material:** frosted smoked glass (serums, creams, mask), matte bone ceramic (cleanser pump bottle), matte white airless pump (SPF).
- **Shape:** cylindrical, restrained proportions. Dropper bottles for serums; wide-mouth jars for cream and mask; pump bottles for cleanser and SPF.
- **Closure:** matte black dropper cap (serums), matte black lid (jars), matte black pump (cleanser, SPF).
- **Label:** bone-colored paper label, restrained serif wordmark ("AUREL"), product name in serif, mono secondary text (size / actives / batch). No decorative illustration. No marketing copy on the label.
- **Typography on label:** Fraunces serif for the wordmark and product name; JetBrains Mono for the size / actives / batch strip.

### Composition rules

- One product per packshot; group shots only for `product-system.png` (the Complete Barrier System).
- Texture macros are abstract — no packaging visible, just the product texture against a neutral bone surface.
- Ingredient macros are abstracted botanicals or laboratory glass; no human subjects.
- Editorial still-life may include a single product plus a raw mineral prop (stone, ceramic dish, linen cloth). No human faces.

### Anti-list (what we avoid)

- No human faces or identifiable body parts.
- No brand logos or recognizable third-party packaging.
- No text rendered into the image (text artifacts are caught and regenerated — see §6).
- No garish colors. The palette stays within the warm bone / near-black / muted sage family.
- No busy backgrounds. Negative space is part of the brand voice.

---

## 3. Asset categories

All assets live in `public/images/`. The categories below map to the file-name prefixes.

### 3.1 Hero & campaign

| File | Purpose | Used on |
| --- | --- | --- |
| `hero-campaign.png` | Homepage hero | `/` (above the fold) |
| `method-film.png` | Homepage brand film section | `/` (Method section) |

### 3.2 Product packshots (8 products)

| File | Product | Category |
| --- | --- | --- |
| `product-cleanser.png` | Barrier Reset Cleanser | Cleanser |
| `product-c15-serum.png` | C15 Antioxidant Serum | Serum (vitamin C) |
| `product-peptide-serum.png` | Peptide Recovery Serum | Serum (peptides) |
| `product-retinal.png` | Retinal Renewal 0.1 | Serum (retinal) |
| `product-recovery-cream.png` | Ceramide Recovery Cream | Moisturizer |
| `product-spf.png` | Daily Mineral SPF 50 | SPF |
| `product-overnight-mask.png` | Overnight Barrier Mask | Mask |
| `product-system.png` | Complete Barrier System (group shot) | System / bundle |

Each product packshot is used on its PDP, in ProductCard across the shop and collections, and on the homepage bestsellers rail where applicable.

### 3.3 Texture macros (per-product + generic)

| File | Texture |
| --- | --- |
| `texture-peptide-serum.png` | Peptide Recovery Serum texture |
| `texture-retinal.png` | Retinal Renewal texture |
| `texture-recovery-cream.png` | Ceramide Recovery Cream texture |
| `texture-spf.png` | Daily Mineral SPF texture |
| `texture-overnight-mask.png` | Overnight Barrier Mask texture |
| `texture-cream.png` | Generic cream texture (legacy) |
| `texture-gel.png` | Generic gel texture |
| `texture-water.png` | Water droplets on glass |
| `texture-serum-droplet.png` | Serum droplet macro |

Per-product textures (the first five) were regenerated to give each PDP a unique texture image. The generic textures remain in the inventory for use on non-product surfaces (homepage results section, approach page).

### 3.4 Ingredient macros

| File | Used on |
| --- | --- |
| `ingredient-ceramides.png` | `/ingredients/ceramides`, PDP ceramide references |
| `ingredient-botanical.png` | `/ingredients/ectoin`, `/ingredients/panthenol`, `/ingredients/vitamin-c` |
| `ingredient-laboratory.png` | `/ingredients/peptides`, `/ingredients/retinal`, homepage results |

### 3.5 Editorial still-life

| File | Used on |
| --- | --- |
| `editorial-stone.png` | `/` (brand statement), `/about`, journal |
| `editorial-routine.png` | PDP lifestyle, `/approach`, `/journal` |
| `editorial-skin-macro.png` | `/journal/why-the-skin-barrier-matters` |

### 3.6 Case-study screenshots

These are browser screenshots (not AI-generated), captured at 1440×900 viewport via the `agent-browser` tool for use on the `/case-study` page.

| File | Surface captured |
| --- | --- |
| `case-home.png` | Homepage |
| `case-pdp.png` | Product detail page |
| `case-quiz.png` | Skin diagnostic |
| `case-cart.png` | Cart drawer |
| `case-collection.png` | Shop / collection |

### 3.7 OpenGraph / social cards

| File | Size | Used on |
| --- | --- | --- |
| `og-default.jpg` | `1200×630` | Default OG card for all pages |
| `og-case-study.jpg` | `1200×630` | `/case-study` (dark variant) |
| `og-card.png` | `1344×768` | Legacy OG card (superseded by `og-default.jpg`) |

The OG cards were composited via browser screenshot with the AUREL wordmark + tagline + product image, so they contain no AI text artifacts.

---

## 4. Packaging consistency

Packaging consistency is **maintained per product across the catalogue**. Each product's packshot, texture, and any appearance in editorial still-life or the system group shot use the same container material, shape, closure, label color and label typography defined in §2.

This consistency is enforced by:

1. **Prompt templates** — `scripts/gen-images.ts` uses per-product prompt fragments that bake in the container / closure / label spec. Regenerating any product image pulls the same fragment, so the visual identity is preserved across regenerations.
2. **VLM audit** — every image was checked visually during the final polish pass. Three images that contained text artifacts (Chinese characters on `product-recovery-cream.png`, text artifacts on `product-peptide-serum.png`, visible text on `texture-gel.png`) were detected and regenerated text-free.
3. **Catalogue reference** — `src/data/catalog.ts` references each product's packshot and texture by slug, so the same image is used wherever the product appears (PDP, ProductCard, bestsellers rail, wishlist, compare, recently-viewed, cart drawer, quick-view modal).

---

## 5. Commercial-use status

Per the `z-ai-web-dev-sdk` terms, AI-generated content produced via the SDK is licensed for use within the project that produced it, including commercial use within that project. Specifically:

- The images are original generations; they do not depict any real third-party product, brand, logo, or copyrighted photograph.
- No model releases are required because no human faces or identifiable subjects appear.
- The images may be used in the AUREL demonstration storefront, in derivative case-study materials about AUREL, and in marketing collateral that describes AUREL as a concept.

**For a real production deployment**, the SDK-generated imagery would be replaced with original product photography shot against the same art direction (see §6). The AI imagery is appropriate for a concept showcase; it is not a substitute for licensed, released product photography in a live merchant store.

---

## 6. Image quality audit history

During the final polish pass every image was inspected by a vision-language model for text artifacts and gibberish:

- `product-recovery-cream.png` — originally contained Chinese characters (`神经寡湿修复面糟`). Regenerated text-free.
- `product-peptide-serum.png` — originally had text artifacts on the packaging. Regenerated text-free.
- `texture-gel.png` — originally had visible text. Regenerated text-free.
- All other 18 images — verified clean (no text, no gibberish).

Five per-product texture images (`texture-peptide-serum`, `texture-retinal`, `texture-recovery-cream`, `texture-spf`, `texture-overnight-mask`) were generated as replacements for the previously-shared generic textures, and `src/data/catalog.ts` was updated so each PDP references its own unique texture image.

---

## 7. Replacement guidance for production

For a real production deployment, AI-generated imagery would be replaced with:

- **Original product photography** shot against the AUREL art direction in §2 (same surfaces, same lighting, same packaging identity).
- **4K master assets**, with responsive AVIF / WebP derivatives generated via `sharp` or a CDN.
- **Proper model releases** for any human editorial imagery (currently none are used).
- **Licensed stock only where the source license is explicitly commercial-use-permitted** (currently none are used).

All product photography would continue to use the same AUREL packaging system (frosted smoked glass, bone labels, restrained wordmark, matte black closures) so the visual universe remains cohesive across the catalogue.

---

## 8. Inventory summary

| Category | Count | Format |
| --- | --- | --- |
| Hero & campaign | 2 | PNG |
| Product packshots | 8 | PNG |
| Texture macros | 9 (5 per-product + 4 generic) | PNG |
| Ingredient macros | 3 | PNG |
| Editorial still-life | 3 | PNG |
| Case-study screenshots | 5 | PNG (browser capture) |
| OpenGraph cards | 3 (2 JPG + 1 legacy PNG) | JPG / PNG |
| **Total** | **33** | — |

All assets live under `public/images/` and are served through `next/image` with the `img()` basePath helper (`src/lib/img.ts`) so they resolve correctly on both Vercel and GitHub Pages.
