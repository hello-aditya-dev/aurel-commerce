import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  bleed = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", bleed && "py-0", className)}>
      {bleed ? children : <div className="container-aurel">{children}</div>}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-eyebrow text-muted-foreground", className)}>{children}</p>
  );
}
