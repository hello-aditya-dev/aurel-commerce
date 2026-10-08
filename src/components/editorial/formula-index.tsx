// ============================================================================
// AUREL Formula Index — signature identity device
// ----------------------------------------------------------------------------
// A small graphic organisational system that visually connects storytelling
// and commerce. Appears on product labels, information panels, routine
// recommendations and editorial chapter transitions.
//
//   A / 03 — RESTORE
//   FORM / CREAM
//   RITUAL / AM + PM
//
// This is a graphic system, not a decorative element pasted into every
// component. It is used selectively to reinforce hierarchy.
// ============================================================================

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormulaIndexProps {
  /** Index letter + number, e.g. "A / 03" */
  index: string;
  /** Function label, e.g. "RESTORE" */
  label: string;
  /** Form, e.g. "CREAM", "SERUM", "CLEANSER" */
  form?: string;
  /** Ritual placement, e.g. "AM + PM", "PM" */
  ritual?: string;
  /** Visual variant */
  variant?: "stacked" | "inline" | "minimal";
  /** Optional className override */
  className?: string;
  /** Invert colors (for dark backgrounds) */
  invert?: boolean;
}

/**
 * The AUREL Formula Index. A restrained, monospaced editorial mark.
 *
 * @example
 * <FormulaIndex index="A / 03" label="RESTORE" form="CREAM" ritual="AM + PM" />
 */
export function FormulaIndex({
  index,
  label,
  form,
  ritual,
  variant = "stacked",
  className,
  invert = false,
}: FormulaIndexProps) {
  const tone = invert
    ? "text-background/70"
    : "text-muted-foreground";
  const toneStrong = invert ? "text-background" : "text-foreground";

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]",
          tone,
          className
        )}
      >
        <span className={toneStrong}>{index}</span>
        <span className="opacity-40">—</span>
        <span className={toneStrong}>{label}</span>
        {form && (
          <>
            <span className="opacity-40">·</span>
            <span>{form}</span>
          </>
        )}
        {ritual && (
          <>
            <span className="opacity-40">·</span>
            <span>{ritual}</span>
          </>
        )}
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "font-mono text-[0.6875rem] uppercase tracking-[0.14em]",
          tone,
          className
        )}
      >
        <span className={toneStrong}>{index}</span>
        <span className="mx-2 opacity-40">—</span>
        <span className={toneStrong}>{label}</span>
      </div>
    );
  }

  // stacked (default)
  return (
    <div
      className={cn("font-mono text-[0.6875rem] uppercase tracking-[0.14em]", tone, className)}
      role="group"
      aria-label={`Formula index ${index} ${label}${form ? `, form ${form}` : ""}${
        ritual ? `, ritual ${ritual}` : ""
      }`}
    >
      <div className="flex items-baseline gap-2">
        <span className={cn(toneStrong, "text-[0.75rem]")}>{index}</span>
        <span className="opacity-40">—</span>
        <span className={cn(toneStrong, "text-[0.75rem]")}>{label}</span>
      </div>
      {(form || ritual) && (
        <div className="mt-1 flex items-center gap-2">
          {form && (
            <span>
              <span className="opacity-50">FORM / </span>
              <span className={toneStrong}>{form}</span>
            </span>
          )}
          {form && ritual && <span className="opacity-30">·</span>}
          {ritual && (
            <span>
              <span className="opacity-50">RITUAL / </span>
              <span className={toneStrong}>{ritual}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * A horizontal rule that uses the Formula Index as a chapter divider.
 * Used between editorial sections.
 */
export function FormulaIndexRule({
  index,
  label,
  className,
  invert = false,
}: {
  index: string;
  label: string;
  className?: string;
  invert?: boolean;
}) {
  const lineColor = invert ? "bg-background/20" : "bg-foreground/15";
  const tone = invert ? "text-background/60" : "text-muted-foreground";
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden="true">
      <div className={cn("h-px flex-1", lineColor)} />
      <FormulaIndex index={index} label={label} variant="minimal" invert={invert} className={tone} />
      <div className={cn("h-px flex-1", lineColor)} />
    </div>
  );
}
