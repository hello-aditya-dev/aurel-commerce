"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, X, Check, Camera, ImagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useUserReviews } from "@/lib/commerce/user-reviews-store";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Product, SkinType, Review } from "@/types/commerce";

const SKIN_TYPES: { value: SkinType; label: string }[] = [
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "combination", label: "Combination" },
  { value: "balanced", label: "Balanced" },
  { value: "sensitive", label: "Sensitive" },
];

const AGE_RANGES = ["18–24", "25–34", "35–44", "45–54", "55–64", "65+"];

export function WriteReviewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const reduce = useReducedMotion();
  const add = useUserReviews((s) => s.add);

  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [skinType, setSkinType] = React.useState<SkinType | "">("");
  const [ageRange, setAgeRange] = React.useState("");
  const [photo, setPhoto] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const reset = () => {
    setRating(0);
    setHoverRating(0);
    setTitle("");
    setBody("");
    setAuthor("");
    setSkinType("");
    setAgeRange("");
    setPhoto(null);
    setErr(null);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setErr("Photo must be under 2MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErr("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      setErr(null);
      track("review_photo_add", { slug: product.slug });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) { setErr("Please select a star rating."); return; }
    if (title.trim().length < 3) { setErr("Please enter a title (3+ characters)."); return; }
    if (body.trim().length < 10) { setErr("Please enter a review body (10+ characters)."); return; }
    if (author.trim().length < 2) { setErr("Please enter your name."); return; }

    const review: Review = {
      id: `user-${Date.now()}`,
      author: author.trim(),
      rating,
      title: title.trim(),
      body: body.trim(),
      date: new Date().toISOString().slice(0, 10),
      skinType: skinType || undefined,
      ageRange: ageRange || undefined,
      verified: false,
      helpful: 0,
      photo: photo || undefined,
    };

    add(product.slug, review);
    track("review_submit", { slug: product.slug, rating, hasPhoto: !!photo });
    toast("Review submitted", {
      description: "Thanks for sharing your experience.",
    });
    reset();
    onOpenChange(false);
  };

  const displayRating = hoverRating || rating;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="max-w-lg p-0 top-[8vh] translate-y-0 gap-0 overflow-hidden bg-background max-h-[88vh]">
        <DialogTitle className="sr-only">Write a review for {product.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Submit your review of {product.name}. Select a star rating, write a title and body, and optionally share your skin type and age range.
        </DialogDescription>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <p className="text-eyebrow text-muted-foreground">Review</p>
            <h2 className="font-serif text-xl mt-1 leading-tight">{product.name}</h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5 overflow-y-auto scroll-aurel" noValidate>
          {/* Star rating */}
          <div>
            <label className="text-eyebrow text-muted-foreground block mb-3">Your rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  className="p-1 -m-1"
                >
                  <motion.span
                    initial={false}
                    animate={reduce ? undefined : { scale: displayRating >= n ? 1 : 0.92 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "inline-block transition-colors",
                      displayRating >= n ? "text-foreground" : "text-muted-foreground/30"
                    )}
                  >
                    <Star
                      className={cn("h-7 w-7", displayRating >= n && "fill-current")}
                    />
                  </motion.span>
                </button>
              ))}
              {displayRating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground tabular-nums">{displayRating}.0</span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="review-title" className="text-eyebrow text-muted-foreground block mb-3">Title</label>
            <input
              id="review-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarise your experience"
              required
              maxLength={80}
              className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="review-body" className="text-eyebrow text-muted-foreground block mb-3">Review</label>
            <textarea
              id="review-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What did you notice? How did the product feel? Would you repurchase?"
              required
              rows={4}
              maxLength={600}
              className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm resize-y transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right tabular-nums">{body.length}/600</p>
          </div>

          {/* Author */}
          <div>
            <label htmlFor="review-author" className="text-eyebrow text-muted-foreground block mb-3">Your name</label>
            <input
              id="review-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="How should we credit you?"
              required
              maxLength={40}
              className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
            />
          </div>

          {/* Photo upload (optional) */}
          <div>
            <label className="text-eyebrow text-muted-foreground block mb-3">Photo (optional)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
              aria-label="Upload a photo with your review"
            />
            {photo ? (
              <div className="relative inline-block">
                <img src={photo} alt="Review photo preview" className="h-24 w-24 object-cover border border-border" />
                <button
                  type="button"
                  onClick={() => { setPhoto(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-foreground text-background flex items-center justify-center"
                  aria-label="Remove photo"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 h-10 px-4 border border-dashed border-border hover:border-foreground/50 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <ImagePlus className="h-3.5 w-3.5" />
                Add a photo
              </button>
            )}
            <p className="text-[0.625rem] text-muted-foreground mt-1.5">Max 2MB · stored in your browser only</p>
          </div>

          {/* Skin type + age range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-eyebrow text-muted-foreground block mb-3">Skin type</label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value as SkinType | "")}
                className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
              >
                <option value="">Optional</option>
                {SKIN_TYPES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-eyebrow text-muted-foreground block mb-3">Age range</label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
              >
                <option value="">Optional</option>
                {AGE_RANGES.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {err && <p className="text-sm text-destructive">{err}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 h-12 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
            >
              <Check className="h-3.5 w-3.5" />
              Submit review
            </button>
            <button
              type="button"
              onClick={() => { reset(); onOpenChange(false); }}
              className="h-12 px-5 border border-foreground/30 text-foreground text-xs uppercase tracking-[0.14em] hover:border-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
          <p className="text-[0.6875rem] text-muted-foreground font-mono uppercase tracking-wider text-center">
            Demo review · stored in your browser only · not sent to a server
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
