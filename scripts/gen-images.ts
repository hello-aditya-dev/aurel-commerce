import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/images';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const STYLE = 'premium clinical skincare photography, warm bone off-white background, soft diffused natural studio lighting, minimalist museum-like composition, editorial luxury beauty campaign, restrained earthy mineral palette, subtle muted botanical accent, no text, no watermark, ultra high detail, 4k quality, shallow depth of field';

const JOBS: { name: string; size: string; prompt: string }[] = [
  // Smaller square products first (these worked at ~30s each)
  { name: 'product-cleanser', size: '1024x1024',
    prompt: `Premium frosted smoked glass pump bottle of facial cleanser with brushed metal pump and minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}` },
  { name: 'product-c15-serum', size: '1024x1024',
    prompt: `Premium frosted amber-tinted glass dropper bottle of vitamin C antioxidant serum, glass dropper cap, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}` },
  { name: 'product-peptide-serum', size: '1024x1024',
    prompt: `Premium frosted smoked glass dropper bottle of peptide serum, matte black dropper cap, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}` },
  { name: 'product-retinal', size: '1024x1024',
    prompt: `Premium dark frosted amber glass dropper bottle of retinal serum, matte black dropper cap, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}` },
  { name: 'product-recovery-cream', size: '1024x1024',
    prompt: `Premium frosted smoked glass cosmetic jar of ceramide recovery cream with brushed metal lid, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}` },
  { name: 'product-spf', size: '1024x1024',
    prompt: `Premium frosted smoked soft-touch squeeze tube of mineral SPF sunscreen with matte metal cap, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}` },
  { name: 'product-overnight-mask', size: '1024x1024',
    prompt: `Premium frosted smoked glass cosmetic jar of overnight barrier mask with brushed aluminum lid, minimalist bone-colored label, standing centered on a flat warm beige surface, ${STYLE}` },
  { name: 'product-system', size: '1024x1024',
    prompt: `Group of three to four premium frosted smoked glass skincare bottles and jars arranged together on a smooth warm stone surface, cohesive minimal packaging system, soft morning light, ${STYLE}` },
  // Textures
  { name: 'texture-serum-droplet', size: '1024x1024',
    prompt: `Macro photograph of a single clear serum droplet suspended at the tip of a glass dropper, about to fall, warm bone background, soft light refraction, clinical and sensual, ${STYLE}` },
  { name: 'texture-cream', size: '1024x1024',
    prompt: `Macro photograph of a smooth pale cream skincare texture swirled on a frosted glass surface, soft peaks, warm directional light, clinical and luxurious, ${STYLE}` },
  { name: 'texture-gel', size: '1024x1024',
    prompt: `Macro photograph of translucent skincare gel texture on a smoked glass surface, light catching through the gel, warm bone background, clinical precision, ${STYLE}` },
  { name: 'texture-water', size: '1024x1024',
    prompt: `Macro photograph of clear water droplets on a frosted smoked glass surface, light refracting through each droplet, warm bone background, calm minimal composition, ${STYLE}` },
  // Ingredient macros
  { name: 'ingredient-ceramides', size: '1024x1024',
    prompt: `Macro scientific photograph of lipid ceramide molecules abstracted as translucent layered sheets, iridescent soft highlights, warm bone background, laboratory aesthetic, ${STYLE}` },
  { name: 'ingredient-botanical', size: '1024x1024',
    prompt: `Macro photograph of a single fresh botanical leaf with dewdrops, soft natural light, warm bone background, scientific botanical specimen aesthetic, ${STYLE}` },
  { name: 'ingredient-laboratory', size: '1024x1024',
    prompt: `Macro photograph of a scientific laboratory glass beaker containing clear serum, soft warm light, brushed metal laboratory tools blurred behind, clinical precision, ${STYLE}` },
  // Editorial (portrait worked at 768x1344)
  { name: 'editorial-routine', size: '768x1344',
    prompt: `Editorial portrait of a calm bathroom shelf moment, a hand reaching for a frosted smoked glass skincare bottle, warm morning light through sheer curtain, soft skin tones, restrained minimal styling, ${STYLE}` },
  { name: 'editorial-skin-macro', size: '1024x1024',
    prompt: `Extreme macro editorial close-up of healthy hydrated human skin texture, soft warm directional light revealing subtle pore detail, dewy smooth surface, neutral earthy tones, no face features visible, ${STYLE}` },
  // Landscape — use 1344x768 (32-multiple, smaller than 1440x768)
  { name: 'hero-campaign', size: '1344x768',
    prompt: `Single frosted smoked glass skincare serum bottle with brushed metal pump standing on a smooth warm stone slab, a few clear water droplets around the base, soft morning light casting long shadow, vast empty bone-white background, ${STYLE}` },
  { name: 'editorial-stone', size: '1344x768',
    prompt: `Editorial luxury skincare campaign image, a single frosted glass serum bottle resting on a large raw mineral stone, soft directional warm light, vast negative space, calm museum-like composition, ${STYLE}` },
  { name: 'method-film', size: '1344x768',
    prompt: `Wide cinematic editorial image of a single frosted smoked glass serum bottle on a wet stone surface, water slowly dripping past, moody warm directional light, vast negative space, calm luxury skincare film aesthetic, ${STYLE}` },
  { name: 'og-card', size: '1344x768',
    prompt: `Premium minimal brand campaign image, single frosted smoked glass skincare bottle centered on a smooth warm beige surface, soft morning light, vast empty negative space around the bottle, museum-like composition, ${STYLE}` },
];

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error('timeout ' + ms + 'ms')), ms)),
  ]);
}

async function run() {
  const zai = await ZAI.create();
  for (const job of JOBS) {
    const outPath = path.join(OUT_DIR, `${job.name}.png`);
    if (fs.existsSync(outPath)) { console.log(`SKIP ${job.name}`); continue; }
    const start = Date.now();
    try {
      console.log(`GEN ${job.name} (${job.size})...`);
      const res = await withTimeout(zai.images.generations.create({
        prompt: job.prompt, size: job.size as any,
      }), 120000);
      fs.writeFileSync(outPath, Buffer.from(res.data[0].base64, 'base64'));
      console.log(`OK  ${job.name} (${Date.now() - start}ms)`);
    } catch (e: any) {
      console.error(`ERR ${job.name}: ${e.message}`);
    }
  }
  console.log('DONE all images');
}

run().catch((e) => { console.error(e); process.exit(1); });
