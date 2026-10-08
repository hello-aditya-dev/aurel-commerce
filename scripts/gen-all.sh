#!/bin/bash
# Generate all AUREL images sequentially, each in its own process.
set -u
cd /home/z/my-project
LOG=/home/z/my-project/gen-images.log
: > "$LOG"

STYLE='premium clinical skincare photography, warm bone off-white background, soft diffused natural studio lighting, minimalist museum-like composition, editorial luxury beauty campaign, restrained earthy mineral palette, subtle muted botanical accent, no text, no watermark, ultra high detail, 4k quality, shallow depth of field'

gen() {
  local name="$1" size="$2" prompt="$3"
  echo "GEN ${name} (${size})..." >> "$LOG"
  if timeout 180 bun scripts/gen-one.ts "$name" "$size" "$prompt" >> "$LOG" 2>&1; then
    echo "  done" >> "$LOG"
  else
    echo "  FAILED (exit $?, continuing)" >> "$LOG"
  fi
}

gen product-cleanser 1024x1024 "Premium frosted smoked glass pump bottle of facial cleanser with brushed metal pump and minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}"
gen product-c15-serum 1024x1024 "Premium frosted amber-tinted glass dropper bottle of vitamin C antioxidant serum, glass dropper cap, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}"
gen product-peptide-serum 1024x1024 "Premium frosted smoked glass dropper bottle of peptide serum, matte black dropper cap, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}"
gen product-retinal 1024x1024 "Premium dark frosted amber glass dropper bottle of retinal serum, matte black dropper cap, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}"
gen product-recovery-cream 1024x1024 "Premium frosted smoked glass cosmetic jar of ceramide recovery cream with brushed metal lid, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}"
gen product-spf 1024x1024 "Premium frosted smoked soft-touch squeeze tube of mineral SPF sunscreen with matte metal cap, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}"
gen product-overnight-mask 1024x1024 "Premium frosted smoked glass cosmetic jar of overnight barrier mask with brushed aluminum lid, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}"
gen product-system 1024x1024 "Group of three to four premium frosted smoked glass skincare bottles and jars arranged together on a smooth warm stone surface, cohesive minimal packaging system, soft morning light, ${STYLE}"
gen texture-serum-droplet 1024x1024 "Macro photograph of a single clear serum droplet suspended at the tip of a glass dropper, about to fall, warm bone background, soft light refraction, clinical and sensual, ${STYLE}"
gen texture-cream 1024x1024 "Macro photograph of a smooth pale cream skincare texture swirled on a frosted glass surface, soft peaks, warm directional light, clinical and luxurious, ${STYLE}"
gen texture-gel 1024x1024 "Macro photograph of translucent skincare gel texture on a smoked glass surface, light catching through the gel, warm bone background, clinical precision, ${STYLE}"
gen texture-water 1024x1024 "Macro photograph of clear water droplets on a frosted smoked glass surface, light refracting through each droplet, warm bone background, calm minimal composition, ${STYLE}"
gen ingredient-ceramides 1024x1024 "Macro scientific photograph of lipid ceramide molecules abstracted as translucent layered sheets, iridescent soft highlights, warm bone background, laboratory aesthetic, ${STYLE}"
gen ingredient-botanical 1024x1024 "Macro photograph of a single fresh botanical leaf with dewdrops, soft natural light, warm bone background, scientific botanical specimen aesthetic, ${STYLE}"
gen ingredient-laboratory 1024x1024 "Macro photograph of a scientific laboratory glass beaker containing clear serum, soft warm light, brushed metal laboratory tools blurred behind, clinical precision, ${STYLE}"
gen editorial-routine 768x1344 "Editorial portrait of a calm bathroom shelf moment, a hand reaching for a frosted smoked glass skincare bottle, warm morning light through sheer curtain, soft skin tones, restrained minimal styling, ${STYLE}"
gen editorial-skin-macro 1024x1024 "Extreme macro editorial close-up of healthy hydrated human skin texture, soft warm directional light revealing subtle pore detail, dewy smooth surface, neutral earthy tones, no face features visible, ${STYLE}"
gen hero-campaign 1344x768 "Single frosted smoked glass skincare serum bottle with brushed metal pump standing on a smooth warm stone slab, a few clear water droplets around the base, soft morning light casting long shadow, vast empty bone-white background, ${STYLE}"
gen editorial-stone 1344x768 "Editorial luxury skincare campaign image, a single frosted glass serum bottle resting on a large raw mineral stone, soft directional warm light, vast negative space, calm museum-like composition, ${STYLE}"
gen method-film 1344x768 "Wide cinematic editorial image of a single frosted smoked glass serum bottle on a wet stone surface, water slowly dripping past, moody warm directional light, vast negative space, calm luxury skincare film aesthetic, ${STYLE}"
gen og-card 1344x768 "Premium minimal brand campaign image, single frosted smoked glass skincare bottle centered on a smooth warm beige surface, soft morning light, vast empty negative space around the bottle, museum-like composition, ${STYLE}"

echo "ALL DONE" >> "$LOG"
