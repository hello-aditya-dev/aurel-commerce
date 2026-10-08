import { Suspense } from "react";
import { SearchContent } from "./search-content";

export const metadata = {
  title: "Search — AUREL",
  description: "Search AUREL products, concerns and ingredients.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-aurel py-20" />}>
      <SearchContent />
    </Suspense>
  );
}
