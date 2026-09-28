"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

export function NewsletterForm({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Please enter a valid email.");
      return;
    }
    setErr(null);
    track("newsletter_signup", { source: "footer" });
    setDone(true);
    toast("Welcome to AUREL.", {
      description: "Check your inbox for a confirmation.",
    });
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-md", className)} noValidate>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center gap-3 border-b pb-2 transition-colors",
          isDark
            ? "border-background/30 focus-within:border-background"
            : "border-foreground/30 focus-within:border-foreground"
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          disabled={done}
          className={cn(
            "flex-1 bg-transparent text-sm md:text-base outline-none placeholder:opacity-50",
            isDark ? "text-background" : "text-foreground"
          )}
        />
        <button
          type="submit"
          disabled={done}
          aria-label="Subscribe"
          className={cn(
            "shrink-0 h-8 w-8 inline-flex items-center justify-center rounded-full transition-all",
            isDark
              ? "bg-background text-foreground hover:scale-105"
              : "bg-foreground text-background hover:scale-105"
          )}
        >
          {done ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      {err && (
        <p className={cn("text-xs mt-2", isDark ? "text-background/70" : "text-destructive")}>
          {err}
        </p>
      )}
      {done && (
        <p className={cn("text-xs mt-2", isDark ? "text-background/80" : "text-muted-foreground")}>
          You're subscribed. Welcome to AUREL.
        </p>
      )}
    </form>
  );
}
