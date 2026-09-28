"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useWishlist } from "@/lib/commerce/wishlist-store";
import { decodeWishlistFromShare } from "@/lib/commerce/share-wishlist";
import { toast } from "sonner";

// Reads ?wishlist=slug1,slug2,... from URL on first mount and merges into the wishlist.
export function WishlistLoader() {
  const params = useSearchParams();
  const hasImported = React.useRef(false);
  const add = useWishlist((s) => s.add);

  React.useEffect(() => {
    if (hasImported.current) return;
    const raw = params.get("wishlist");
    if (!raw) return;
    hasImported.current = true;

    const decoded = decodeWishlistFromShare(raw);
    if (decoded.length === 0) return;

    let added = 0;
    for (const slug of decoded) {
      add(slug);
      added++;
    }

    if (added > 0) {
      toast(`Imported ${added} ${added === 1 ? "product" : "products"} from shared wishlist`, {
        description: "Your wishlist has been updated.",
      });
      const url = new URL(window.location.href);
      url.searchParams.delete("wishlist");
      window.history.replaceState({}, "", url.toString());
    }
  }, [params, add]);

  return null;
}
