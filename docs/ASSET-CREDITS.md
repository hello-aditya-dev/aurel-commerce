# AUREL — Asset Credits

All imagery used on the AUREL demonstration site is **original, AI-generated content** produced specifically for this project using the `z-ai-web-dev-sdk` image generation API. No third-party photography, stock imagery, brand assets, or copyrighted material is used.

## Generation source

- **Tool:** `z-ai-web-dev-sdk` `images.generations.create`
- **Script:** `scripts/gen-images.ts` / `scripts/gen-all.sh`
- **Sizes used:** `1024×1024` (product packshots, textures, ingredient macros), `768×1344` (portrait editorial), `1344×768` (landscape hero / campaign / OG)

## Asset inventory

All assets live in `public/images/`. Original prompts and sizes are documented in `scripts/gen-images.ts`.

| File | Purpose | Used on |
| --- | --- | --- |
| `hero-campaign.png` | Homepage hero | `/` (above fold) |
| `method-film.png` | Homepage brand film section | `/` (section 07) |
| `og-card.png` | OpenGraph / Twitter card | all pages (metadata) |
| `product-cleanser.png` | Barrier Reset Cleanser packshot | PDP, ProductCard, homepage bestsellers |
| `product-c15-serum.png` | C15 Antioxidant Serum packshot | PDP, ProductCard |
| `product-peptide-serum.png` | Peptide Recovery Serum packshot | PDP, ProductCard, homepage bestsellers |
| `product-retinal.png` | Retinal Renewal 0.1 packshot | PDP, ProductCard |
| `product-recovery-cream.png` | Ceramide Recovery Cream packshot | PDP, ProductCard |
| `product-spf.png` | Daily Mineral SPF 50 packshot | PDP, ProductCard |
| `product-overnight-mask.png` | Overnight Barrier Mask packshot | PDP, ProductCard |
| `product-system.png` | Complete Barrier System group shot | PDP, bundle section, systems pages |
| `editorial-stone.png` | Bottle on raw mineral stone | `/` (brand statement), `/about`, journal |
| `editorial-routine.png` | Bathroom shelf routine moment | PDP lifestyle, `/approach`, `/journal` |
| `editorial-skin-macro.png` | Healthy skin macro close-up | `/journal/why-the-skin-barrier-matters` |
| `texture-serum-droplet.png` | Serum droplet macro | PDP texture sections |
| `texture-cream.png` | Cream texture macro | PDP texture, `/approach` |
| `texture-gel.png` | Gel texture macro | PDP texture, homepage results |
| `texture-water.png` | Water droplets on glass macro | PDP texture, homepage results |
| `ingredient-ceramides.png` | Ceramide molecular abstraction | `/ingredients/ceramides`, PDP |
| `ingredient-botanical.png` | Botanical leaf macro | `/ingredients/ectoin`, `/ingredients/panthenol`, `/ingredients/vitamin-c` |
| `ingredient-laboratory.png` | Laboratory glass macro | `/ingredients/peptides`, `/ingredients/retinal`, homepage results |

## Licensing

Every image on this site is original, AI-generated content with no third-party rights encumbrance. All assets are free to use within this demonstration project.

## Replacement guidance for production

For a real production deployment, AI-generated imagery would be replaced with:
- Original product photography shot against a consistent art direction
- 4K master assets, with responsive AVIF / WebP derivatives generated via `sharp` or a CDN
- Proper model releases for any human editorial imagery
- Licensed stock only where the source license is explicitly commercial-use-permitted

All product photography would use the same AUREL packaging system (frosted smoked glass, bone labels, restrained wordmark) so the visual universe remains cohesive across the catalogue.
