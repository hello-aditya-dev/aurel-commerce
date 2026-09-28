"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Concern, SkinType, Category } from "@/types/commerce";

const CONCERN_OPTIONS: { value: Concern; label: string }[] = [
  { value: "barrier", label: "Barrier" },
  { value: "dryness", label: "Dryness" },
  { value: "sensitivity", label: "Sensitivity" },
  { value: "dark-spots", label: "Dark spots" },
  { value: "texture", label: "Texture" },
  { value: "fine-lines", label: "Fine lines" },
  { value: "dullness", label: "Dullness" },
];
const SKIN_OPTIONS: { value: SkinType; label: string }[] = [
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "combination", label: "Combination" },
  { value: "balanced", label: "Balanced" },
  { value: "sensitive", label: "Sensitive" },
];
const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "cleanser", label: "Cleansers" },
  { value: "serum", label: "Serums" },
  { value: "moisturizer", label: "Moisturisers" },
  { value: "spf", label: "SPF" },
  { value: "mask", label: "Masks" },
  { value: "system", label: "Systems" },
];

export function FilterDrawer({
  open,
  onOpenChange,
  concerns,
  skinTypes,
  categories,
  priceMax,
  onConcernToggle,
  onSkinToggle,
  onCategoryToggle,
  onPriceChange,
  onClear,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  concerns: Set<Concern>;
  skinTypes: Set<SkinType>;
  categories: Set<Category>;
  priceMax: number;
  onConcernToggle: (v: Concern) => void;
  onSkinToggle: (v: SkinType) => void;
  onCategoryToggle: (v: Category) => void;
  onPriceChange: (v: number) => void;
  onClear: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 flex flex-col rounded-t-xl">
        <SheetHeader className="px-6 pt-5 pb-4 border-b border-border flex flex-row items-center justify-between">
          <SheetTitle className="font-serif text-xl">Filter</SheetTitle>
          <SheetDescription className="sr-only">
            Filter AUREL products by concern, skin type, product type, and price.
          </SheetDescription>
          <button
            onClick={() => onOpenChange(false)}
            className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
          >
            Close
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto scroll-aurel px-6 py-6 space-y-8">
          <FilterGroup title="Concern">
            <div className="grid grid-cols-2 gap-2">
              {CONCERN_OPTIONS.map((o) => (
                <Chip
                  key={o.value}
                  checked={concerns.has(o.value)}
                  onClick={() => onConcernToggle(o.value)}
                  label={o.label}
                />
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="Skin type">
            <div className="grid grid-cols-2 gap-2">
              {SKIN_OPTIONS.map((o) => (
                <Chip
                  key={o.value}
                  checked={skinTypes.has(o.value)}
                  onClick={() => onSkinToggle(o.value)}
                  label={o.label}
                />
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="Product type">
            <div className="grid grid-cols-2 gap-2">
              {CATEGORY_OPTIONS.map((o) => (
                <Chip
                  key={o.value}
                  checked={categories.has(o.value)}
                  onClick={() => onCategoryToggle(o.value)}
                  label={o.label}
                />
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title={`Max price · $${priceMax}`}>
            <input
              type="range"
              min={30}
              max={200}
              step={5}
              value={priceMax}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              className="w-full accent-foreground"
              aria-label="Maximum price"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$30</span>
              <span>$200+</span>
            </div>
          </FilterGroup>
        </div>

        <SheetFooter className="px-6 py-4 border-t border-border flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClear}
            className="flex-1 rounded-none h-12"
          >
            Clear all
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-none h-12 bg-foreground hover:bg-foreground/90"
          >
            Show results
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-3">{title}</p>
      {children}
    </div>
  );
}

function Chip({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-3 text-sm text-left border transition-all",
        checked
          ? "border-foreground bg-foreground text-background"
          : "border-border text-foreground hover:border-foreground/50"
      )}
    >
      {label}
    </button>
  );
}
