import type { Product, Bundle, Collection, Ingredient } from "@/types/commerce";
import { img } from "@/lib/img";

// ============================================================================
// AUREL INGREDIENT LIBRARY
// ============================================================================
export const ingredients: Ingredient[] = [
  {
    slug: "ceramides",
    name: "Ceramides",
    inciName: "Ceramide NP, Ceramide AP, Ceramide EOP",
    role: "Barrier lipid",
    description:
      "Lipids that make up roughly 50% of the skin's protective barrier. They seal in moisture and keep external stressors out.",
    whyWeUseIt:
      "Modern cleansing, exfoliation and climate stress deplete ceramides faster than the skin replaces them. Replenishing them restores barrier integrity.",
    compatibility: "Pairs with nearly all actives. Stable across pH ranges.",
    image: img("/images/ingredient-ceramides.png"),
  },
  {
    slug: "peptides",
    name: "Peptides",
    inciName: "Palmitoyl Tripeptide-5, Palmitoyl Tetrapeptide-7",
    role: "Signal molecule",
    description:
      "Short chains of amino acids that communicate with skin cells, signaling repair, firmness and structural support.",
    whyWeUseIt:
      "Peptides are well-tolerated and support the skin's own collagen-related processes without the irritation of stronger actives.",
    compatibility: "Avoid simultaneous use with strong AHAs in the same step.",
    image: img("/images/ingredient-laboratory.png"),
  },
  {
    slug: "ectoin",
    name: "Ectoin",
    inciName: "Ectoin",
    role: "Extremolyte / stress protector",
    description:
      "An amino-acid derivative produced by extremophile organisms to survive salt, heat and UV stress. It stabilises cell membranes and proteins.",
    whyWeUseIt:
      "Ectoin visibly reduces the impact of environmental stress on the skin and improves hydration and comfort, especially for reactive skin.",
    compatibility: "Gentle; compatible with retinoids and exfoliating acids.",
    image: img("/images/ingredient-botanical.png"),
  },
  {
    slug: "retinal",
    name: "Retinal",
    inciName: "Retinaldehyde",
    role: "Retinoid",
    description:
      "A vitamin A derivative one metabolic step closer to retinoic acid than retinol. Works faster, with notably less irritation for most people.",
    whyWeUseIt:
      "Retinal at 0.1% supports skin renewal, texture refinement and the visible softening of fine lines without retinol's signature flaring.",
    compatibility:
      "Use in PM. Introduce gradually. Avoid combining with vitamin C in the same step.",
    image: img("/images/ingredient-laboratory.png"),
  },
  {
    slug: "niacinamide",
    name: "Niacinamide",
    inciName: "Niacinamide",
    role: "Vitamin B3",
    description:
      "A water-soluble vitamin that supports barrier function, regulates visible sebum and improves the appearance of uneven tone and enlarged pores.",
    whyWeUseIt:
      "Few actives are as multi-functional and as well-tolerated across skin types. It is foundational in a barrier-first routine.",
    compatibility: "Pairs well with retinoids, hyaluronic acid and ceramides.",
    image: img("/images/ingredient-ceramides.png"),
  },
  {
    slug: "vitamin-c",
    name: "Vitamin C",
    inciName: "15% L-Ascorbic Acid",
    role: "Antioxidant",
    description:
      "L-ascorbic acid at a clinically relevant concentration neutralises free radicals from UV and pollution, supporting a brighter, more even-looking tone.",
    whyWeUseIt:
      "A morning antioxidant step is one of the most defensible choices in modern skincare. Stabilised at low pH for efficacy.",
    compatibility: "Use in AM. Best separated from retinoids and strong acids.",
    image: img("/images/ingredient-botanical.png"),
  },
  {
    slug: "panthenol",
    name: "Panthenol",
    inciName: "Panthenol (Pro-Vitamin B5)",
    role: "Humectant / soother",
    description:
      "A hydrating provitamin that converts to pantothenic acid in the skin, supporting moisture retention and visible soothing.",
    whyWeUseIt:
      "Panthenol is one of the most reliable comfort ingredients for compromised, reactive or post-treatment skin.",
    compatibility: "Universally compatible.",
    image: img("/images/ingredient-botanical.png"),
  },
  {
    slug: "squalane",
    name: "Squalane",
    inciName: "Squalane (plant-derived)",
    role: "Emollient",
    description:
      "A saturated, stable hydrocarbon that mimics the skin's own sebum without feeling heavy. Restores softness and suppleness.",
    whyWeUseIt:
      "Plant-derived squalane is light, non-comedogenic and absorbs cleanly — ideal across skin types.",
    compatibility: "Universally compatible.",
    image: img("/images/texture-cream.png"),
  },
];

// ============================================================================
// AUREL PRODUCT CATALOGUE — 8 primary products
// ============================================================================

const sharedReviews = {
  peptideSerum: [
    {
      id: "r1",
      author: "Marisol V.",
      rating: 5,
      title: "Noticeably calmer skin",
      body: "Six weeks in and my skin looks less reactive. The texture is genuinely weightless — no tackiness, no pilling under sunscreen.",
      date: "2025-08-12",
      skinType: "combination" as const,
      ageRange: "35–44",
      verified: true,
      helpful: 47,
    },
    {
      id: "r2",
      author: "J. Whitfield",
      rating: 5,
      title: "Replaced three products",
      body: "I had been layering a peptide essence, a barrier serum and a hydrating toner. This does what those three did, in one step.",
      date: "2025-07-30",
      skinType: "dry" as const,
      ageRange: "45–54",
      verified: true,
      helpful: 31,
    },
    {
      id: "r3",
      author: "Anonymous",
      rating: 4,
      title: "Good, not dramatic",
      body: "Solid formulation, no irritation, absorbs well. I haven't seen the firmness claims materialise yet but my barrier is calmer.",
      date: "2025-06-18",
      skinType: "balanced" as const,
      ageRange: "25–34",
      verified: true,
      helpful: 12,
    },
    {
      id: "r4",
      author: "Priya R.",
      rating: 5,
      title: "Finally a serum that doesn't sting",
      body: "Reactive skin here. Most actives burn. This one is genuinely soothing and I've been able to layer retinal behind it without issue.",
      date: "2025-09-02",
      skinType: "sensitive" as const,
      ageRange: "25–34",
      verified: true,
      helpful: 58,
    },
  ],
  retinal: [
    {
      id: "r5",
      author: "C. Larsen",
      rating: 5,
      title: "No retinol uglies",
      body: "Switched from 0.3% retinol. Visible texture improvement in three weeks, zero flaking. The buffer in this formula is real.",
      date: "2025-08-22",
      skinType: "dry" as const,
      ageRange: "35–44",
      verified: true,
      helpful: 73,
    },
    {
      id: "r6",
      author: "A. Mehta",
      rating: 5,
      title: "Worth the patience",
      body: "Started twice a week. Skin adapted quickly. Fine lines around my eyes are visibly softer at the eight week mark.",
      date: "2025-07-14",
      skinType: "combination" as const,
      ageRange: "45–54",
      verified: true,
      helpful: 40,
    },
    {
      id: "r7",
      author: "Tomas K.",
      rating: 4,
      title: "Effective but introduce slowly",
      body: "I rushed to every other night and got mild irritation. Backed off to twice weekly, then built up. Now it's a staple.",
      date: "2025-06-30",
      skinType: "oily" as const,
      ageRange: "25–34",
      verified: true,
      helpful: 22,
    },
  ],
  cleanser: [
    {
      id: "r8",
      author: "H. Okafor",
      rating: 5,
      title: "Doesn't leave my skin tight",
      body: "Most gentle cleansers still leave me reaching for moisturiser immediately. This one leaves skin genuinely comfortable.",
      date: "2025-08-05",
      skinType: "dry" as const,
      ageRange: "35–44",
      verified: true,
      helpful: 35,
    },
    {
      id: "r9",
      author: "L. Park",
      rating: 5,
      title: "Removed my double-cleanse habit",
      body: "Removes SPF and tinted moisturiser in one pass. I've stopped double-cleansing entirely.",
      date: "2025-07-19",
      skinType: "combination" as const,
      ageRange: "25–34",
      verified: true,
      helpful: 28,
    },
    {
      id: "r10",
      author: "S. Marin",
      rating: 4,
      title: "Great formula, small bottle",
      body: "Love the formulation but I wish the 200ml was refillable. Goes fast in a two-person household.",
      date: "2025-06-22",
      skinType: "balanced" as const,
      ageRange: "45–54",
      verified: true,
      helpful: 9,
    },
  ],
  c15: [
    {
      id: "r11",
      author: "D. Foster",
      rating: 5,
      title: "Brightening without sting",
      body: "15% L-AA usually burns my skin. This is somehow tolerable and my post-acne marks have visibly faded.",
      date: "2025-08-18",
      skinType: "sensitive" as const,
      ageRange: "25–34",
      verified: true,
      helpful: 51,
    },
    {
      id: "r12",
      author: "M. Chen",
      rating: 4,
      title: "Effective, oxidises eventually",
      body: "Works beautifully for the first six weeks. After that the colour shifts — expected with L-AA. Worth it.",
      date: "2025-07-08",
      skinType: "oily" as const,
      ageRange: "35–44",
      verified: true,
      helpful: 19,
    },
  ],
  cream: [
    {
      id: "r13",
      author: "R. Vasquez",
      rating: 5,
      title: "My winter skin finally recovered",
      body: "Barrier was wrecked from over-exfoliating. Two weeks of this and the flaking stopped. Now a permanent fixture.",
      date: "2025-08-30",
      skinType: "dry" as const,
      ageRange: "35–44",
      verified: true,
      helpful: 64,
    },
    {
      id: "r14",
      author: "N. Brandt",
      rating: 5,
      title: "Rich but not heavy",
      body: "Concerned a ceramide cream would be too much for combo skin. It's surprisingly balanced — sits well under SPF.",
      date: "2025-07-25",
      skinType: "combination" as const,
      ageRange: "25–34",
      verified: true,
      helpful: 33,
    },
  ],
  spf: [
    {
      id: "r15",
      author: "I. Petrov",
      rating: 5,
      title: "No white cast on darker skin",
      body: "Mineral SPF and dark skin usually means a grey haze. This one rubs in cleanly. Finally a daily mineral I'll actually wear.",
      date: "2025-08-11",
      skinType: "oily" as const,
      ageRange: "25–34",
      verified: true,
      helpful: 88,
    },
    {
      id: "r16",
      author: "E. Sato",
      rating: 4,
      title: "Excellent, slight pilling with one foundation",
      body: "Works under most of my makeup. One silicone-heavy foundation pills slightly. Otherwise excellent.",
      date: "2025-07-04",
      skinType: "combination" as const,
      ageRange: "35–44",
      verified: true,
      helpful: 17,
    },
  ],
  mask: [
    {
      id: "r17",
      author: "K. Almeida",
      rating: 5,
      title: "The morning-after glow",
      body: "I use this twice a week. Skin looks rested and plump in the morning even when I haven't slept well.",
      date: "2025-08-27",
      skinType: "dry" as const,
      ageRange: "45–54",
      verified: true,
      helpful: 29,
    },
    {
      id: "r18",
      author: "T. Novak",
      rating: 5,
      title: "Saved my barrier on retinal nights",
      body: "I layer this over retinal on the nights my skin feels reactive. Zero irritation the next morning.",
      date: "2025-07-12",
      skinType: "sensitive" as const,
      ageRange: "25–34",
      verified: true,
      helpful: 41,
    },
  ],
  system: [
    {
      id: "r19",
      author: "Founding customer",
      rating: 5,
      title: "Built my whole routine in one purchase",
      body: "Bought the system as a reset. Now I understand what a coherent routine feels like. Wouldn't go back to mixing brands.",
      date: "2025-08-20",
      skinType: "combination" as const,
      ageRange: "35–44",
      verified: true,
      helpful: 52,
    },
  ],
};

export const products: Product[] = [
  // 1. CLEANSER
  {
    id: "p1",
    slug: "barrier-reset-cleanser",
    name: "Barrier Reset Cleanser",
    subtitle: "Gel-to-milk cleanser that removes SPF and impurities without stripping the barrier.",
    number: "AR-01",
    price: 34,
    size: "150ml",
    category: "cleanser",
    concerns: ["dryness", "sensitivity", "barrier"],
    skinTypes: ["dry", "oily", "combination", "balanced", "sensitive"],
    keyIngredients: ["ceramides", "panthenol", "squalane"],
    routineStep: "cleanse",
    timeOfDay: "BOTH",
    description:
      "A pH-balanced gel-to-milk cleanser that dissolves SPF, makeup and daily grime while leaving the lipid barrier intact.",
    longDescription:
      "Barrier Reset Cleanser was formulated around a single principle: clean skin should not feel tight. A ceramide lipid complex, panthenol and plant squalane work together so that water rinses away impurities without taking the skin's protective oils with them. The texture transforms from a transparent gel to a cushioning milk on contact with water — sensory, efficient and kind to compromised skin.",
    benefits: [
      { label: "Barrier-respecting", detail: "pH 5.2 and lipid-enriched so the skin never feels stripped" },
      { label: "Removes SPF", detail: "Emulsifies mineral sunscreen and light makeup in a single pass" },
      { label: "Comforting", detail: "Panthenol and squalane leave skin soft, not squeaky" },
      { label: "All skin types", detail: "Designed for daily AM and PM use" },
    ],
    howToUse: [
      "Dispense two pumps onto damp hands.",
      "Massage onto wet skin for 30–60 seconds, including the neck.",
      "Rinse thoroughly with lukewarm water.",
      "Pat dry. Follow with the appropriate AUREL serum.",
    ],
    texture: "A clear, cushioning gel that emulsifies into a silky milk on contact with water.",
    pairings: ["c15-antioxidant-serum", "peptide-recovery-serum", "retinal-renewal-0-1"],
    faq: [
      { q: "Does this remove eye makeup?", a: "It removes face makeup, SPF and lightweight eye makeup. For waterproof mascara, use a dedicated eye makeup remover first." },
      { q: "Is it suitable for very reactive skin?", a: "Yes. It is fragrance-free, soap-free and pH-balanced. Patch test if your skin is acutely compromised." },
      { q: "Can I double-cleanse with it?", a: "You can. Use an oil cleanser first for heavy SPF or makeup, then Barrier Reset as the second step." },
    ],
    reviews: sharedReviews.cleanser,
    rating: 4.8,
    reviewCount: 612,
    media: [
      { src: img("/images/product-cleanser.png"), alt: "Barrier Reset Cleanser in frosted glass pump bottle", kind: "packshot" },
      { src: img("/images/texture-gel.png"), alt: "Gel-to-milk texture of the cleanser", kind: "texture" },
      { src: img("/images/editorial-routine.png"), alt: "Cleanser in a calm bathroom routine moment", kind: "lifestyle" },
      { src: img("/images/product-system.png"), alt: "Cleanser within the AUREL system", kind: "environment" },
    ],
    subscriptionEligible: true,
    bestseller: true,
    claimIllustrative: "97% of 38 trial users agreed skin felt comfortable after cleansing (illustrative demo claim).",
  },
  // 2. C15 SERUM
  {
    id: "p2",
    slug: "c15-antioxidant-serum",
    name: "C15 Antioxidant Serum",
    subtitle: "15% stabilised L-ascorbic acid with ectoin for daytime defence.",
    number: "AR-02",
    price: 58,
    size: "30ml",
    category: "serum",
    concerns: ["dark-spots", "dullness", "fine-lines"],
    skinTypes: ["dry", "oily", "combination", "balanced"],
    keyIngredients: ["vitamin-c", "ectoin", "panthenol"],
    routineStep: "treat",
    timeOfDay: "AM",
    description:
      "A low-pH 15% L-ascorbic acid serum stabilised with ectoin and ferulic acid for visible antioxidant defence against UV and pollution.",
    longDescription:
      "Vitamin C is one of the most studied actives in skincare, and one of the most unstable. C15 pairs 15% L-ascorbic acid with ectoin — an extremolyte that protects both the formula and the skin — and ferulic acid to extend stability. Used in the morning, it visibly brightens tone and reinforces the skin's defences against the day's oxidative load.",
    benefits: [
      { label: "Brightens tone", detail: "L-ascorbic acid visibly evens post-acne marks and dullness" },
      { label: "Antioxidant defence", detail: "Ectoin and ferulic acid extend stabilisation and environmental protection" },
      { label: "Lightweight", detail: "Water-thin, absorbs in seconds, layers cleanly under SPF" },
      { label: "Morning ritual", detail: "Designed for AM use; pairs with sunscreen for cumulative benefit" },
    ],
    howToUse: [
      "Apply 4–5 drops to clean, dry skin in the morning.",
      "Press gently into the face, neck and décolleté.",
      "Wait 30 seconds before following with moisturiser.",
      "Always finish with Daily Mineral SPF 50.",
    ],
    texture: "A water-thin, slightly viscous serum that absorbs without tackiness.",
    pairings: ["barrier-reset-cleanser", "ceramide-recovery-cream", "daily-mineral-spf-50"],
    faq: [
      { q: "Why does the colour change over time?", a: "L-ascorbic acid oxidises on exposure to light and air, shifting from clear to amber. Use within 3 months of opening for full potency." },
      { q: "Can I use it with retinal?", a: "Use C15 in the morning and retinal at night. Avoid layering them in the same step." },
      { q: "Is it suitable for sensitive skin?", a: "Low pH vitamin C can sting compromised skin. Patch test first; the ectoin buffer helps but does not eliminate irritation for everyone." },
    ],
    reviews: sharedReviews.c15,
    rating: 4.7,
    reviewCount: 284,
    media: [
      { src: img("/images/product-c15-serum.png"), alt: "C15 Antioxidant Serum in amber dropper bottle", kind: "packshot" },
      { src: img("/images/texture-serum-droplet.png"), alt: "A single serum droplet at the tip of the glass dropper", kind: "texture" },
      { src: img("/images/editorial-stone.png"), alt: "Serum bottle resting on raw stone", kind: "environment" },
    ],
    subscriptionEligible: true,
    bestseller: true,
    claimIllustrative: "Visible brightening reported by 84% of trial users at week 8 (illustrative demo claim).",
  },
  // 3. PEPTIDE SERUM
  {
    id: "p3",
    slug: "peptide-recovery-serum",
    name: "Peptide Recovery Serum",
    subtitle: "Barrier-supporting peptide serum for stressed and dehydrated skin.",
    number: "AR-03",
    price: 72,
    size: "30ml",
    category: "serum",
    concerns: ["sensitivity", "barrier", "fine-lines", "dryness"],
    skinTypes: ["dry", "combination", "balanced", "sensitive"],
    keyIngredients: ["peptides", "ceramides", "ectoin", "panthenol"],
    routineStep: "treat",
    timeOfDay: "BOTH",
    description:
      "A multi-peptide, ceramide and ectoin serum designed to visibly calm stressed skin and reinforce the barrier over time.",
    longDescription:
      "Peptide Recovery Serum is the centrepiece of the AUREL system. A signal peptide complex works alongside ceramides, ectoin and panthenol to address the three things stressed modern skin struggles with most: barrier integrity, visible redness and moisture retention. The texture is genuinely weightless — it absorbs into clean skin in seconds and layers cleanly under every other product in the range.",
    benefits: [
      { label: "Supports barrier function", detail: "Ceramides and panthenol reinforce the lipid matrix" },
      { label: "Helps improve hydration", detail: "Ectoin and glycerin hold water in the upper layers" },
      { label: "Designed for stressed skin", detail: "Signal peptides support visible firmness and recovery" },
      { label: "Lightweight serum texture", detail: "Absorbs in seconds, layers cleanly, zero tackiness" },
    ],
    howToUse: [
      "Apply 4–5 drops to clean skin, AM and/or PM.",
      "Press into the face and neck. Layer over Vitamin C in the morning.",
      "Layer retinal behind this serum in the evening for a buffered retinal experience.",
      "Follow with Ceramide Recovery Cream.",
    ],
    texture: "Weightless. Fast-absorbing. No tackiness.",
    pairings: ["barrier-reset-cleanser", "ceramide-recovery-cream", "retinal-renewal-0-1"],
    faq: [
      { q: "Can I use this with retinoids?", a: "Yes. Peptide Recovery Serum is an excellent buffering layer behind retinal or retinol, particularly if your skin is reactive." },
      { q: "Is it safe during pregnancy?", a: "Peptides, ceramides and ectoin are generally considered compatible. Consult your physician for personalised guidance." },
      { q: "Will it replace my moisturiser?", a: "No. It is a treatment serum. Follow with Ceramide Recovery Cream or your preferred AUREL moisturiser." },
      { q: "How long until I see results?", a: "Most users report calmer, more hydrated skin within two weeks. Visible firmness shifts are typically noticed from week six." },
    ],
    reviews: sharedReviews.peptideSerum,
    rating: 4.9,
    reviewCount: 428,
    media: [
      { src: img("/images/product-peptide-serum.png"), alt: "Peptide Recovery Serum in frosted glass dropper bottle", kind: "packshot" },
      { src: img("/images/texture-serum-droplet.png"), alt: "Serum droplet at the tip of the glass dropper", kind: "texture" },
      { src: img("/images/editorial-routine.png"), alt: "Serum within a calm bathroom routine", kind: "lifestyle" },
      { src: img("/images/product-system.png"), alt: "Peptide Recovery Serum within the AUREL system", kind: "environment" },
    ],
    subscriptionEligible: true,
    hero: true,
    bestseller: true,
    claimIllustrative: "92% of 50 trial users reported softer, calmer skin after 4 weeks (illustrative demo claim).",
  },
  // 4. RETINAL
  {
    id: "p4",
    slug: "retinal-renewal-0-1",
    name: "Retinal Renewal 0.1",
    subtitle: "0.1% stabilised retinaldehyde for overnight texture and renewal.",
    number: "AR-04",
    price: 64,
    size: "30ml",
    category: "serum",
    concerns: ["texture", "fine-lines", "dullness"],
    skinTypes: ["dry", "oily", "combination", "balanced"],
    keyIngredients: ["retinal", "ectoin", "niacinamide"],
    routineStep: "treat",
    timeOfDay: "PM",
    description:
      "A 0.1% retinaldehyde serum stabilised with ectoin and niacinamide for overnight texture refinement without retinol's signature irritation.",
    longDescription:
      "Retinal Renewal 0.1 sits one metabolic step closer to active retinoic acid than retinol. The result is faster visible renewal — softer fine lines, refined texture, more even tone — at a fraction of the irritation. Ectoin and niacinamide buffer the formula and support barrier integrity throughout the renewal process. We recommend introducing it twice weekly and building gradually.",
    benefits: [
      { label: "Faster than retinol", detail: "Retinaldehyde requires one fewer conversion step" },
      { label: "Buffered for tolerance", detail: "Ectoin and niacinamide reduce visible irritation" },
      { label: "Refines texture", detail: "Supports skin renewal overnight for a smoother appearance" },
      { label: "Softens fine lines", detail: "Visible improvement typically noted from week six" },
    ],
    howToUse: [
      "Use in the PM, two to three times per week to begin.",
      "Apply 2–3 drops to clean, dry skin.",
      "Layer Peptide Recovery Serum behind it for additional buffering.",
      "Always follow with Ceramide Recovery Cream.",
      "Use Daily Mineral SPF 50 the next morning.",
    ],
    texture: "A lightweight, slightly oily-feeling serum that absorbs within seconds.",
    pairings: ["barrier-reset-cleanser", "peptide-recovery-serum", "ceramide-recovery-cream", "overnight-barrier-mask"],
    faq: [
      { q: "How is retinal different from retinol?", a: "Retinaldehyde is one step closer to retinoic acid in the skin's conversion pathway. Most users see visible results faster, with less irritation than retinol." },
      { q: "Can I use it every night?", a: "Build up gradually. Start twice weekly. Most users tolerate nightly use after four to six weeks. Listen to your skin." },
      { q: "Should I avoid it during pregnancy?", a: "Yes. Retinoids of all kinds should be avoided during pregnancy and breastfeeding. Switch to Peptide Recovery Serum." },
      { q: "Can I use it with exfoliating acids?", a: "Avoid using in the same step. Alternate nights — retinal one night, an AHA/BHA the next." },
    ],
    reviews: sharedReviews.retinal,
    rating: 4.8,
    reviewCount: 319,
    media: [
      { src: img("/images/product-retinal.png"), alt: "Retinal Renewal 0.1 in dark amber dropper bottle", kind: "packshot" },
      { src: img("/images/texture-serum-droplet.png"), alt: "Retinal serum droplet", kind: "texture" },
      { src: img("/images/editorial-stone.png"), alt: "Retinal bottle on raw stone", kind: "environment" },
    ],
    subscriptionEligible: true,
    isNew: true,
    claimIllustrative: "Visible texture refinement reported by 79% of trial users at week 8 (illustrative demo claim).",
  },
  // 5. RECOVERY CREAM
  {
    id: "p5",
    slug: "ceramide-recovery-cream",
    name: "Ceramide Recovery Cream",
    subtitle: "Barrier-restoring moisturiser with a 3:1:1 ceramide ratio.",
    number: "AR-05",
    price: 52,
    size: "50ml",
    category: "moisturizer",
    concerns: ["dryness", "sensitivity", "barrier"],
    skinTypes: ["dry", "combination", "balanced", "sensitive"],
    keyIngredients: ["ceramides", "squalane", "panthenol", "niacinamide"],
    routineStep: "restore",
    timeOfDay: "BOTH",
    description:
      "A barrier-restoring cream with a skin-identical 3:1:1 ceramide ratio, squalane and panthenol for comfortable, hydrated skin.",
    longDescription:
      "Ceramide Recovery Cream mirrors the skin's own lipid ratio (3:1:1 ceramide : cholesterol : fatty acids) to actively reinforce the barrier rather than simply coating it. Squalane and panthenol complete the formula, giving it a cushioning but never heavy finish that sits cleanly under sunscreen and makeup. Use it morning and night — particularly after active treatments.",
    benefits: [
      { label: "Restores barrier lipids", detail: "Skin-identical 3:1:1 ceramide ratio" },
      { label: "Deeply hydrating", detail: "Squalane and glycerin hold moisture in the upper layers" },
      { label: "Calms compromised skin", detail: "Panthenol and niacinamide visibly soothe" },
      { label: "Layerable", detail: "Sits cleanly under SPF and makeup" },
    ],
    howToUse: [
      "Apply a pea-sized amount to clean skin, morning and evening.",
      "Layer over serums and treatments.",
      "Use generously on the neck and décolleté.",
    ],
    texture: "A rich-but-breathable cream that cushions the skin without heaviness.",
    pairings: ["peptide-recovery-serum", "retinal-renewal-0-1", "c15-antioxidant-serum"],
    faq: [
      { q: "Is it heavy enough for very dry skin?", a: "For acutely dry or compromised skin, layer Overnight Barrier Mask on top two to three nights per week." },
      { q: "Is it non-comedogenic?", a: "The formula is non-comedogenic and suitable across most skin types, including oily and combination." },
      { q: "Can I use it around the eyes?", a: "Yes, up to the orbital bone. For direct undereye use, a dedicated eye product is preferable." },
    ],
    reviews: sharedReviews.cream,
    rating: 4.9,
    reviewCount: 514,
    media: [
      { src: img("/images/product-recovery-cream.png"), alt: "Ceramide Recovery Cream in frosted glass jar", kind: "packshot" },
      { src: img("/images/texture-cream.png"), alt: "Cream texture swirled on glass", kind: "texture" },
      { src: img("/images/editorial-routine.png"), alt: "Cream in a bathroom routine moment", kind: "lifestyle" },
    ],
    subscriptionEligible: true,
    bestseller: true,
    claimIllustrative: "94% of 42 trial users reported visibly improved hydration at week 4 (illustrative demo claim).",
  },
  // 6. SPF
  {
    id: "p6",
    slug: "daily-mineral-spf-50",
    name: "Daily Mineral SPF 50",
    subtitle: "Invisible-finish mineral sunscreen with zinc oxide and ectoin.",
    number: "AR-06",
    price: 42,
    size: "50ml",
    category: "spf",
    concerns: ["sensitivity", "dark-spots", "barrier"],
    skinTypes: ["dry", "oily", "combination", "balanced", "sensitive"],
    keyIngredients: ["ectoin", "niacinamide", "squalane"],
    routineStep: "protect",
    timeOfDay: "AM",
    description:
      "A broad-spectrum SPF 50 mineral sunscreen with non-nano zinc oxide, ectoin and niacinamide — no white cast, no greasy finish.",
    longDescription:
      "Daily Mineral SPF 50 is the non-negotiable final step of every AUREL morning routine. Non-nano zinc oxide delivers broad-spectrum protection without chemical filters. Ectoin and niacinamide provide antioxidant and barrier support, while a carefully tuned silicone dispersion ensures no white cast across skin tones. It wears cleanly under makeup and re-applies without pilling.",
    benefits: [
      { label: "Broad-spectrum SPF 50", detail: "Non-nano zinc oxide, PA++++ rated" },
      { label: "No white cast", detail: "Tested across Fitzpatrick I–VI skin tones" },
      { label: "Antioxidant backup", detail: "Ectoin visibly defends against environmental stress" },
      { label: "Layers cleanly", detail: "Sits under makeup; re-applies without pilling" },
    ],
    howToUse: [
      "Apply as the final step of your morning routine.",
      "Use a generous two-finger amount for the face and neck.",
      "Reapply every two hours of sun exposure.",
    ],
    texture: "A lightweight fluid-cream that absorbs to a soft matte finish.",
    pairings: ["c15-antioxidant-serum", "ceramide-recovery-cream"],
    faq: [
      { q: "Is it reef-safe?", a: "Yes. Non-nano zinc oxide is widely considered reef-safe. No oxybenzone or octinoxate." },
      { q: "Will it leave a white cast on darker skin?", a: "It is designed to rub in cleanly across all skin tones. Apply in thin layers and allow 60 seconds to absorb." },
      { q: "Can I use it around the eyes?", a: "Yes. It is ophthalmologist-tested. For very sensitive eyes, apply carefully along the orbital bone." },
    ],
    reviews: sharedReviews.spf,
    rating: 4.7,
    reviewCount: 372,
    media: [
      { src: img("/images/product-spf.png"), alt: "Daily Mineral SPF 50 in frosted squeeze tube", kind: "packshot" },
      { src: img("/images/texture-gel.png"), alt: "SPF texture on glass", kind: "texture" },
      { src: img("/images/editorial-routine.png"), alt: "SPF in a calm bathroom routine", kind: "lifestyle" },
    ],
    subscriptionEligible: true,
    bestseller: true,
  },
  // 7. OVERNIGHT MASK
  {
    id: "p7",
    slug: "overnight-barrier-mask",
    name: "Overnight Barrier Mask",
    subtitle: "An occlusive night treatment that seals in actives and resets the barrier.",
    number: "AR-07",
    price: 48,
    size: "50ml",
    category: "mask",
    concerns: ["dryness", "sensitivity", "barrier"],
    skinTypes: ["dry", "combination", "sensitive"],
    keyIngredients: ["ceramides", "squalane", "panthenol"],
    routineStep: "restore",
    timeOfDay: "PM",
    description:
      "A cushioning overnight mask that seals in actives and visibly reinforces the barrier by morning.",
    longDescription:
      "Overnight Barrier Mask is the final seal in a complete PM routine — and a recovery tool when skin feels compromised. A 5% ceramide complex, squalane and panthenol sit under a breathable occlusive matrix that prevents transepidermal water loss overnight. Wake to visibly calmer, more hydrated skin. Use two to three times weekly, or nightly on reactive skin.",
    benefits: [
      { label: "Seals in actives", detail: "Locks in serums and treatments overnight" },
      { label: "Reinforces barrier", detail: "5% ceramide complex with squalane and panthenol" },
      { label: "Reduces visible redness", detail: "Calms compromised skin overnight" },
      { label: "No pillow residue", detail: "Absorbs fully within 10 minutes" },
    ],
    howToUse: [
      "Use as the final step of your PM routine, two to three nights per week.",
      "Apply a thin layer over serums and cream.",
      "Allow 10 minutes to absorb before bed.",
      "Rinse or cleanse as usual in the morning.",
    ],
    texture: "A cushioning, slightly tacky mask that absorbs within minutes.",
    pairings: ["retinal-renewal-0-1", "peptide-recovery-serum", "ceramide-recovery-cream"],
    faq: [
      { q: "Can I use it nightly?", a: "Yes, particularly on reactive or very dry skin. For oily skin, two to three nights per week is sufficient." },
      { q: "Will it transfer to my pillow?", a: "Allow 10 minutes to absorb. After that, transfer is minimal." },
      { q: "Can I use it over retinal?", a: "Yes — it is an excellent buffer layer over retinal on nights when skin feels sensitive." },
    ],
    reviews: sharedReviews.mask,
    rating: 4.8,
    reviewCount: 198,
    media: [
      { src: img("/images/product-overnight-mask.png"), alt: "Overnight Barrier Mask in frosted glass jar", kind: "packshot" },
      { src: img("/images/texture-cream.png"), alt: "Mask texture", kind: "texture" },
      { src: img("/images/editorial-stone.png"), alt: "Mask jar on stone", kind: "environment" },
    ],
    subscriptionEligible: true,
    isNew: true,
  },
  // 8. COMPLETE SYSTEM
  {
    id: "p8",
    slug: "complete-barrier-system",
    name: "Complete Barrier System",
    subtitle: "The full AUREL routine — cleanse, treat AM and PM, restore and protect.",
    number: "AR-08",
    price: 168,
    compareAt: 204,
    size: "5-piece system",
    category: "system",
    concerns: ["barrier", "dryness", "sensitivity", "texture", "dullness"],
    skinTypes: ["dry", "oily", "combination", "balanced", "sensitive"],
    keyIngredients: ["ceramides", "peptides", "retinal", "vitamin-c", "ectoin"],
    routineStep: "cleanse",
    timeOfDay: "BOTH",
    description:
      "The complete barrier-first routine: cleanser, C15, Peptide Recovery Serum, Retinal Renewal, Ceramide Recovery Cream, Daily Mineral SPF.",
    longDescription:
      "The Complete Barrier System is the entire AUREL philosophy in one box. Five full-size products engineered to work as a sequence: a barrier-respecting cleanser, an AM antioxidant serum, a peptide recovery serum, a buffered retinal for night, a barrier-restoring cream and a mineral SPF. Designed to be the only routine you need.",
    benefits: [
      { label: "Coherent routine", detail: "Every step is formulated to layer with the next" },
      { label: "Saves $36", detail: "Versus purchasing each product individually" },
      { label: "Free shipping", detail: "Complimentary shipping on the system" },
      { label: "Subscription eligible", detail: "Subscribe & save 15% on refills" },
    ],
    howToUse: [
      "AM: Cleanse → C15 → Peptide Recovery Serum → Ceramide Recovery Cream → SPF.",
      "PM: Cleanse → Peptide Recovery Serum → Retinal Renewal → Ceramide Recovery Cream.",
      "2–3 nights per week: layer Overnight Barrier Mask as the final PM step.",
    ],
    texture: "Five full-size products — see individual product pages for texture detail.",
    pairings: [],
    faq: [
      { q: "Is the system suitable for beginners?", a: "Yes. The included routine card explains how to introduce retinal gradually. Start with twice weekly." },
      { q: "Can I customise the system?", a: "The system is fixed. To swap a product, add the system plus your preferred individual product to your bag." },
      { q: "Does it include the Overnight Barrier Mask?", a: "The standard system includes five products. The mask is available separately or as part of the Night Repair Protocol." },
    ],
    reviews: sharedReviews.system,
    rating: 4.9,
    reviewCount: 142,
    media: [
      { src: img("/images/product-system.png"), alt: "The Complete Barrier System — five AUREL products together", kind: "packshot" },
      { src: img("/images/editorial-stone.png"), alt: "System on raw stone", kind: "environment" },
      { src: img("/images/texture-water.png"), alt: "Water droplets on glass — AUREL sensory detail", kind: "texture" },
    ],
    subscriptionEligible: true,
    badge: "Save $36",
    bestseller: true,
  },
];

// ============================================================================
// BUNDLES
// ============================================================================
export const bundles: Bundle[] = [
  {
    slug: "essential-barrier-routine",
    name: "Essential Barrier Routine",
    subtitle: "Cleanse, treat and protect — the foundation.",
    price: 124,
    compareAt: 134,
    productSlugs: ["barrier-reset-cleanser", "peptide-recovery-serum", "daily-mineral-spf-50"],
    image: img("/images/product-system.png"),
    description:
      "A three-piece foundation routine for first-time AUREL customers. Cleanse, treat and protect — without retinal or vitamin C.",
  },
  {
    slug: "brightening-protocol",
    name: "Brightening Protocol",
    subtitle: "AM antioxidant routine for visible tone and radiance.",
    price: 142,
    compareAt: 152,
    productSlugs: ["barrier-reset-cleanser", "c15-antioxidant-serum", "ceramide-recovery-cream", "daily-mineral-spf-50"],
    image: img("/images/product-system.png"),
    description:
      "A morning-focused routine built around 15% L-ascorbic acid, barrier support and mineral SPF — for visible brightness and even tone.",
  },
  {
    slug: "night-repair-protocol",
    name: "Night Repair Protocol",
    subtitle: "PM retinal protocol with full barrier buffering.",
    price: 168,
    compareAt: 188,
    productSlugs: ["barrier-reset-cleanser", "peptide-recovery-serum", "retinal-renewal-0-1", "overnight-barrier-mask"],
    image: img("/images/product-system.png"),
    description:
      "A buffered retinal protocol for overnight renewal. The peptide serum and barrier mask cushion retinal so even reactive skin can tolerate it.",
  },
  {
    slug: "complete-barrier-system",
    name: "Complete Barrier System",
    subtitle: "The entire AUREL routine, in one box.",
    price: 168,
    compareAt: 204,
    productSlugs: [
      "barrier-reset-cleanser",
      "c15-antioxidant-serum",
      "peptide-recovery-serum",
      "retinal-renewal-0-1",
      "ceramide-recovery-cream",
      "daily-mineral-spf-50",
    ],
    image: img("/images/product-system.png"),
    description:
      "The complete barrier-first routine — five full-size products engineered to work as one sequence. Save $36 versus buying individually.",
    steps: [
      { label: "01 Cleanse", productSlug: "barrier-reset-cleanser" },
      { label: "02 Treat AM", productSlug: "c15-antioxidant-serum" },
      { label: "03 Treat", productSlug: "peptide-recovery-serum" },
      { label: "04 Treat PM", productSlug: "retinal-renewal-0-1" },
      { label: "05 Restore", productSlug: "ceramide-recovery-cream" },
      { label: "06 Protect", productSlug: "daily-mineral-spf-50" },
    ],
  },
];

// ============================================================================
// COLLECTIONS
// ============================================================================
export const collections: Collection[] = [
  {
    slug: "all",
    name: "All Products",
    tagline: "The complete AUREL catalogue",
    description:
      "Eight products engineered as one coherent system. Browse the full range or filter by concern, ingredient, skin type or routine step.",
    productSlugs: products.map((p) => p.slug),
    heroImage: "/images/product-system.png",
  },
  {
    slug: "barrier-repair",
    name: "Barrier Repair",
    tagline: "Reinforce the skin's protective lipid layer",
    description:
      "Products formulated around ceramides, panthenol and ectoin — for compromised, reactive or dehydrated skin that needs the barrier restored first.",
    productSlugs: [
      "barrier-reset-cleanser",
      "peptide-recovery-serum",
      "ceramide-recovery-cream",
      "overnight-barrier-mask",
    ],
    heroImage: "/images/editorial-stone.png",
    concern: "barrier",
  },
  {
    slug: "brightening",
    name: "Brightening",
    tagline: "Visible tone, radiance and antioxidant defence",
    description:
      "Vitamin C, niacinamide and exfoliating actives for uneven tone, post-acne marks and dullness.",
    productSlugs: ["c15-antioxidant-serum", "retinal-renewal-0-1", "ceramide-recovery-cream", "daily-mineral-spf-50"],
    heroImage: "/images/ingredient-botanical.png",
    concern: "dark-spots",
  },
  {
    slug: "renewal",
    name: "Renewal",
    tagline: "Retinal and peptide actives for texture and lines",
    description:
      "Overnight renewal for visible texture refinement, softening of fine lines and a brighter, more even appearance.",
    productSlugs: ["retinal-renewal-0-1", "peptide-recovery-serum", "overnight-barrier-mask"],
    heroImage: "/images/ingredient-laboratory.png",
    concern: "texture",
  },
  {
    slug: "systems",
    name: "Systems & Bundles",
    tagline: "Coherent routines, not loose products",
    description:
      "Pre-built routines engineered to work as one sequence. Save versus buying individually.",
    productSlugs: ["complete-barrier-system"],
    heroImage: "/images/product-system.png",
  },
];

// ============================================================================
// JOURNAL ARTICLES
// ============================================================================
export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Barrier" | "Actives" | "Routine" | "Education";
  date: string;
  readTime: string;
  hero: string;
  body: string[];
  relatedProducts?: string[];
}

export const journalArticles: JournalArticle[] = [
  {
    slug: "why-the-skin-barrier-matters",
    title: "Why the skin barrier matters",
    excerpt:
      "The barrier is not a trend. It is the foundation everything else — cleansers, serums, retinoids — sits on top of.",
    category: "Barrier",
    date: "2025-08-14",
    readTime: "6 min read",
    hero: img("/images/editorial-skin-macro.png"),
    body: [
      "The skin barrier is the outermost layer of the epidermis — a thin matrix of corneocytes embedded in a lipid mortar of ceramides, cholesterol and free fatty acids. Its job is simple and unforgiving: keep water in, keep the outside world out.",
      "When the barrier is intact, skin looks calm, even and hydrated. When it is compromised — by over-cleansing, harsh actives, climate, stress or hard water — water escapes, irritants enter, and skin becomes visibly reactive, dry and dull.",
      "Most of what people call 'sensitive skin' is in fact compromised barrier function. The good news: the barrier is responsive. With the right cleanser, the right ceramide ratio and a restrained routine, it recovers.",
      "AUREL is built around this principle. We formulate barrier-first because no active — no matter how clever — can do its best work on top of a compromised barrier.",
    ],
    relatedProducts: ["barrier-reset-cleanser", "ceramide-recovery-cream", "peptide-recovery-serum"],
  },
  {
    slug: "retinal-vs-retinol",
    title: "Retinal vs retinol: what actually differs",
    excerpt:
      "Both are vitamin A derivatives. One converts in one step, the other in two. The difference, in practice, is larger than marketing suggests.",
    category: "Actives",
    date: "2025-07-22",
    readTime: "8 min read",
    hero: img("/images/ingredient-laboratory.png"),
    body: [
      "Retinol and retinal are both vitamin A derivatives. To become active in the skin, both must convert to retinoic acid. Retinol converts in two steps. Retinal converts in one.",
      "That single step difference has two practical consequences. First, retinal is meaningfully faster at producing visible results — typically by a factor of around ten, in equivalent concentrations. Second, retinal is, for most users, less irritating than retinol at the same effective concentration.",
      "This is the central reason we formulated Retinal Renewal 0.1 rather than a retinol. The modern user wants visible change without the four-week 'retinol uglies' phase — flaking, redness, sensitivity — that derails so many routines.",
      "Begin twice weekly. Listen to your skin. Layer Peptide Recovery Serum behind it for additional buffering if you are prone to reactivity. Always use SPF the next morning.",
    ],
    relatedProducts: ["retinal-renewal-0-1", "peptide-recovery-serum", "ceramide-recovery-cream"],
  },
  {
    slug: "building-a-minimalist-routine",
    title: "Building a minimalist routine",
    excerpt:
      "Four steps. Two times of day. Most skin does not need ten products — it needs the right four.",
    category: "Routine",
    date: "2025-06-30",
    readTime: "5 min read",
    hero: img("/images/editorial-routine.png"),
    body: [
      "The skincare industry rewards excess — more products, more steps, more actives. But the skin barrier does not reward excess. It rewards restraint.",
      "A coherent routine has four steps: cleanse, treat, restore, protect. Each step has a single job. The treat step is where the active sits — vitamin C in the morning, retinal at night, a peptide serum for barrier support underneath both.",
      "Anything beyond these four steps should be intentional: an overnight mask two or three nights a week, an exfoliating acid on alternate nights, an eye product if your eye area needs it.",
      "The AUREL method is built around this four-step skeleton. Buy fewer products. Use them consistently. The barrier will respond.",
    ],
    relatedProducts: ["complete-barrier-system"],
  },
];
