"use client";

import * as React from "react";
import { useRecentlyViewed } from "@/lib/commerce/recently-viewed-store";

// Records a product view. Mount this on the PDP — when the component mounts,
// it pushes the slug into the recently-viewed store.
export function RecordProductView({ slug }: { slug: string }) {
  const push = useRecentlyViewed((s) => s.push);
  React.useEffect(() => {
    push(slug);
  }, [slug, push]);
  return null;
}
