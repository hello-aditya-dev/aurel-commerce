import type { NextConfig } from "next";

// AUREL supports two build modes:
// - default: `output: 'standalone'` for the local dev server and Node deploy
// - STATIC_EXPORT=true: `output: 'export'` with unoptimized images for GitHub Pages
const isStaticExport = process.env.STATIC_EXPORT === "true";
// basePath for GitHub Pages project sites (e.g. /aurel-commerce)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  // Static export requires trailing slashes for nested route assets
  trailingSlash: isStaticExport,
  // basePath + assetPrefix for GitHub Pages project sites
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  reactStrictMode: true,
  images: {
    // GitHub Pages static export cannot run the optimization server.
    // For dev/standalone we still allow AVIF/WebP via formats below.
    unoptimized: isStaticExport,
    qualities: [75, 80, 85, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
