"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, ShoppingBag, Heart, ArrowUp, X, HelpCircle } from "lucide-react";

const SHORTCUTS: { keys: string[]; description: string; icon: React.ReactNode }[] = [
  { keys: ["⌘", "K"], description: "Open search", icon: <Search className="h-4 w-4" /> },
  { keys: ["⌘", "."], description: "Open cart", icon: <ShoppingBag className="h-4 w-4" /> },
  { keys: ["?"], description: "Show this help", icon: <HelpCircle className="h-4 w-4" /> },
  { keys: ["Esc"], description: "Close any dialog or drawer", icon: <X className="h-4 w-4" /> },
  { keys: ["G", "H"], description: "Go home", icon: <ArrowUp className="h-4 w-4" /> },
  { keys: ["G", "S"], description: "Go to shop", icon: <ArrowUp className="h-4 w-4" /> },
  { keys: ["G", "D"], description: "Take the skin diagnostic", icon: <Heart className="h-4 w-4" /> },
];

export function KeyboardHelp() {
  const [open, setOpen] = React.useState(false);
  const [heldG, setHeldG] = React.useState(false);
  const gTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const isTyping = (el: Element | null) => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || (el as HTMLElement).isContentEditable;
    };

    const handler = (e: KeyboardEvent) => {
      // ? to open help — but not when typing in inputs
      if (e.key === "?" && !isTyping(document.activeElement)) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        setHeldG(false);
        return;
      }
      // g + key combos (vim-style)
      if (!isTyping(document.activeElement) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() === "g" && !heldG) {
          setHeldG(true);
          if (gTimer.current) clearTimeout(gTimer.current);
          gTimer.current = setTimeout(() => setHeldG(false), 800);
          return;
        }
        if (heldG) {
          const target = (() => {
            if (e.key.toLowerCase() === "h") return "/";
            if (e.key.toLowerCase() === "s") return "/shop";
            if (e.key.toLowerCase() === "d") return "/diagnostic";
            if (e.key.toLowerCase() === "w") return "/wishlist";
            if (e.key.toLowerCase() === "c") return "/compare";
            if (e.key.toLowerCase() === "b") return "/build-routine";
            if (e.key.toLowerCase() === "j") return "/journal";
            return null;
          })();
          if (target) {
            e.preventDefault();
            window.location.href = target;
            setHeldG(false);
            if (gTimer.current) clearTimeout(gTimer.current);
          }
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [heldG]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0 top-[15vh] translate-y-0 gap-0 overflow-hidden bg-background" showCloseButton={false}>
        <DialogTitle className="sr-only">Keyboard shortcuts</DialogTitle>
        <DialogDescription className="sr-only">
          List of keyboard shortcuts available on the AUREL website.
        </DialogDescription>
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <p className="text-eyebrow text-muted-foreground">Help</p>
            <h2 className="font-serif text-xl mt-1">Keyboard shortcuts</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="divide-y divide-border">
          {SHORTCUTS.map((s) => (
            <li key={s.description} className="flex items-center justify-between px-6 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{s.icon}</span>
                <span className="text-sm text-foreground">{s.description}</span>
              </div>
              <div className="flex items-center gap-1">
                {s.keys.map((k, i) => (
                  <kbd
                    key={i}
                    className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 border border-border bg-muted/40 font-mono text-[0.6875rem] uppercase"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div className="px-6 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tip: hold <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1 border border-border bg-muted/40 font-mono text-[0.6875rem] uppercase">G</kbd> then press a letter to navigate quickly. Available on every page.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
