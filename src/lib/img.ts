// Image path helper — prefixes basePath for GitHub Pages static export
export const IMAGE_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function img(path: string): string {
  if (!path) return path;
  if (path.startsWith("http") || path.startsWith("//")) return path;
  if (path.startsWith(IMAGE_BASE)) return path;
  return `${IMAGE_BASE}${path}`;
}
