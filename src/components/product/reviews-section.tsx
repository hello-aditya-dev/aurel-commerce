"use client";

import * as React from "react";
import { RatingStars } from "@/components/commerce/product-card";
import { Reveal } from "@/components/motion/reveal";
import { ThumbsUp } from "lucide-react";
import type { Product, Review } from "@/types/commerce";

export function ReviewsSection({ product }: { product: Product }) {
  const [filter, setFilter] = React.useState<number | null>(null);
  const [helpful, setHelpful] = React.useState<Set<string>>(new Set());

  const distribution = React.useMemo(() => {
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    product.reviews.forEach((r) => {
      dist[r.rating] = (dist[r.rating] ?? 0) + 1;
    });
    return dist;
  }, [product.reviews]);

  const reviews = filter
    ? product.reviews.filter((r) => r.rating === filter)
    : product.reviews;

  const toggleHelpful = (id: string) => {
    setHelpful((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
      <div className="md:col-span-4">
        <p className="text-eyebrow text-muted-foreground mb-5">Reviews</p>
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-5xl font-light">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">/ 5</span>
        </div>
        <RatingStars value={product.rating} size="md" className="mt-3" />
        <p className="text-sm text-muted-foreground mt-3">
          Based on {product.reviewCount.toLocaleString()} reviews
        </p>

        {/* Distribution */}
        <div className="mt-8 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star];
            const pct = product.reviewCount > 0 ? (count / product.reviewCount) * 100 : 0;
            return (
              <button
                key={star}
                onClick={() => setFilter(filter === star ? null : star)}
                className="flex items-center gap-3 w-full group"
              >
                <span className="text-xs text-muted-foreground w-6 text-right tabular-nums">{star}★</span>
                <div className="flex-1 h-1.5 bg-muted overflow-hidden rounded-full">
                  <div
                    className={`h-full transition-all ${
                      filter === star ? "bg-foreground" : "bg-foreground/60 group-hover:bg-foreground"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10 tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>
        {filter && (
          <button
            onClick={() => setFilter(null)}
            className="mt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="md:col-span-8">
        <div className="divide-y divide-border border-t border-border">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={0.04 * i}>
              <ReviewCard
                review={r}
                helpful={helpful.has(r.id)}
                onHelpful={() => toggleHelpful(r.id)}
              />
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-8 font-mono uppercase tracking-wider">
          Illustrative demonstration reviews · AUREL is a fictional concept brand
        </p>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  helpful,
  onHelpful,
}: {
  review: Review;
  helpful: boolean;
  onHelpful: () => void;
}) {
  return (
    <article className="py-6 md:py-8">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-medium text-sm">{review.author}</span>
            {review.verified && (
              <span className="text-[0.625rem] font-mono uppercase tracking-wider text-muted-foreground border border-border px-1.5 py-0.5">
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            <RatingStars value={review.rating} />
            <span>·</span>
            <span>{formatDate(review.date)}</span>
            {review.skinType && (
              <>
                <span>·</span>
                <span className="capitalize">{review.skinType} skin</span>
              </>
            )}
            {review.ageRange && (
              <>
                <span>·</span>
                <span>{review.ageRange}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <h4 className="font-serif text-lg leading-tight mt-3">{review.title}</h4>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{review.body}</p>
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={onHelpful}
          className={`inline-flex items-center gap-1.5 text-xs ${
            helpful ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          } transition-colors`}
        >
          <ThumbsUp className="h-3 w-3" />
          Helpful ({review.helpful + (helpful ? 1 : 0)})
        </button>
      </div>
    </article>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
