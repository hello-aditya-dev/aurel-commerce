import type { MetadataRoute } from "next";
import { products, ingredients, collections, journalArticles } from "@/data/catalog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://hello-aditya-dev.github.io/aurel-commerce";
  const now = new Date();

  const staticPages = [
    "/",
    "/shop",
    "/ingredients",
    "/compatibility",
    "/concerns",
    "/approach",
    "/about",
    "/journal",
    "/faq",
    "/contact",
    "/diagnostic",
    "/case-study",
    "/account",
    "/search",
    "/systems",
    "/wishlist",
    "/compare",
    "/build-routine",
    "/recently-viewed",
  ].map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 }));

  const productPages = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const ingredientPages = ingredients.map((i) => ({
    url: `${base}/ingredients/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const concernPages = ["barrier", "dryness", "sensitivity", "dark-spots", "texture", "fine-lines", "dullness", "breakouts"].map((c) => ({
    url: `${base}/concerns/${c}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const collectionPages = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const journalPages = journalArticles.map((a) => ({
    url: `${base}/journal/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...ingredientPages,
    ...concernPages,
    ...collectionPages,
    ...journalPages,
  ];
}
