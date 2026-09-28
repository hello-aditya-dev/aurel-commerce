"use client";

import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * Tracked CTA used on the case-study page. Fires an analytics event
 * (`project_cta_click`) before navigating to the configured contact URL.
 *
 * Kept as a client component so the parent page can remain a server component
 * while still emitting a commerce event on click.
 */
export function CaseStudyCtaButton({
  url,
  label = "Start a project",
}: {
  url: string;
  label?: string;
}) {
  const handleClick = () => {
    track("project_cta_click", { url });
  };

  const isExternal = /^https?:\/\//.test(url);

  if (isExternal) {
    return (
      <a
        href={url}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-14 items-center justify-center bg-background px-8 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-all hover:bg-background/90"
      >
        {label}
        <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    );
  }

  return (
    <a
      href={url}
      onClick={handleClick}
      className="group inline-flex h-14 items-center justify-center bg-background px-8 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-all hover:bg-background/90"
    >
      {label}
      <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}
