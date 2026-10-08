"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useSavedRoutines } from "@/lib/commerce/saved-routines-store";
import { decodeRoutineFromShare } from "@/lib/commerce/share-routine";
import { getProductsBySlugs } from "@/lib/commerce/provider";
import { toast } from "sonner";

// Reads ?routine=... from URL on first mount and imports the shared routine.
export function RoutineLoader() {
  const params = useSearchParams();
  const hasImported = React.useRef(false);
  const save = useSavedRoutines((s) => s.save);

  React.useEffect(() => {
    if (hasImported.current) return;
    const raw = params.get("routine");
    if (!raw) return;
    hasImported.current = true;

    const decoded = decodeRoutineFromShare(raw);
    if (!decoded) return;

    const products = getProductsBySlugs(decoded.slugs);
    if (products.length === 0) return;

    const total = products.reduce((sum, p) => sum + p.price, 0);
    const savings = Math.round(total * 0.12);

    save(decoded.name, decoded.slugs, total - savings, savings);
    toast(`Imported "${decoded.name}"`, {
      description: `${products.length} products · saved to your routines.`,
    });

    const url = new URL(window.location.href);
    url.searchParams.delete("routine");
    window.history.replaceState({}, "", url.toString());
  }, [params, save]);

  return null;
}
