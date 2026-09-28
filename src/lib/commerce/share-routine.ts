"use client";

// Encode a saved routine into a compact URL format
// Format: name|slug1,slug2,slug3
export function encodeRoutineForShare(name: string, slugs: string[]): string {
  const safeName = name.replace(/[|,]/g, " ").trim().slice(0, 60) || "Shared routine";
  return `${safeName}|${slugs.join(",")}`;
}

export function decodeRoutineFromShare(s: string): { name: string; slugs: string[] } | null {
  if (!s) return null;
  const sep = s.indexOf("|");
  if (sep < 0) return null;
  const name = s.slice(0, sep).trim() || "Shared routine";
  const slugsStr = s.slice(sep + 1);
  const slugs = slugsStr.split(",").map((x) => x.trim()).filter(Boolean);
  if (slugs.length === 0) return null;
  return { name, slugs };
}
