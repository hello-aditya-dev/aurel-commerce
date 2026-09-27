// AUREL commerce type system
// All product/catalog data flows through these types.

export type SkinType = "dry" | "oily" | "combination" | "balanced" | "sensitive";
export type Concern =
  | "dryness"
  | "breakouts"
  | "dark-spots"
  | "texture"
  | "fine-lines"
  | "sensitivity"
  | "barrier"
  | "dullness";
export type RoutineStep = "cleanse" | "treat" | "restore" | "protect";
export type TimeOfDay = "AM" | "PM" | "BOTH";
export type Category =
  | "cleanser"
  | "serum"
  | "moisturizer"
  | "spf"
  | "mask"
  | "system";

export interface Ingredient {
  slug: string;
  name: string;
  inciName: string;
  role: string;
  description: string;
  whyWeUseIt: string;
  compatibility?: string;
  image: string;
}

export interface ProductMedia {
  src: string;
  alt: string;
  kind: "packshot" | "angle" | "environment" | "texture" | "lifestyle" | "video";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  skinType?: SkinType;
  ageRange?: string;
  verified: boolean;
  helpful: number;
  photo?: string; // base64 data URL for user-submitted review photos
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Benefit {
  label: string;
  detail: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  number: string;
  price: number;
  compareAt?: number;
  size: string;
  category: Category;
  concerns: Concern[];
  skinTypes: SkinType[];
  keyIngredients: string[];
  routineStep: RoutineStep;
  timeOfDay: TimeOfDay;
  description: string;
  longDescription: string;
  benefits: Benefit[];
  howToUse: string[];
  texture: string;
  pairings: string[];
  faq: FaqItem[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  media: ProductMedia[];
  subscriptionEligible: boolean;
  badge?: string;
  hero?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  claimIllustrative?: string;
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  productSlugs: string[];
  heroImage: string;
  concern?: Concern;
}

export interface Bundle {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAt: number;
  productSlugs: string[];
  image: string;
  description: string;
  steps?: { label: string; productSlug: string }[];
}

export interface CartLine {
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  variant: "one-time" | "subscription";
  isBundle?: boolean;
  bundleSlug?: string;
}

export interface QuizAnswer {
  concerns: Concern[];
  skinType: SkinType | "not-sure";
  reactivity: 1 | 2 | 3 | 4 | 5;
  routineTime: "essential" | "balanced" | "complete";
  budget: "under-100" | "100-150" | "150-plus";
}

export interface RoutineResult {
  am: string[];
  pm: string[];
  total: number;
  savings: number;
  protocolName: string;
  rationale: string[];
}
