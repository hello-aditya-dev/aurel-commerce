import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="AUREL home"
      className={cn(
        "font-serif tracking-[0.22em] text-[1.05rem] leading-none font-medium select-none",
        className
      )}
    >
      AUREL
    </Link>
  );
}
