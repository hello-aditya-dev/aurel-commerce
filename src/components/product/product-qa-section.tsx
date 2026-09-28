"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useProductQA } from "@/lib/commerce/product-qa-store";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/commerce";

export function ProductQASection({ product }: { product: Product }) {
  const hasHydrated = useProductQA((s) => s.hasHydrated);
  const byProduct = useProductQA((s) => s.byProduct);
  const add = useProductQA((s) => s.add);
  const vote = useProductQA((s) => s.vote);
  const [writeOpen, setWriteOpen] = React.useState(false);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [voted, setVoted] = React.useState<Record<string, "helpful" | "not-helpful">>({});
  const reduce = useReducedMotion();

  const items = React.useMemo(
    () => byProduct[product.slug] ?? [],
    [byProduct, product.slug]
  );

  const handleVote = (qaId: string, voteType: "helpful" | "not-helpful") => {
    if (voted[qaId]) return; // one vote per question
    vote(product.slug, qaId, voteType);
    setVoted((prev) => ({ ...prev, [qaId]: voteType }));
    track("qa_vote", { slug: product.slug, qaId, vote: voteType });
    toast(voteType === "helpful" ? "Marked as helpful" : "Marked as not helpful");
  };

  return (
    <section className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
      <div className="md:col-span-4">
        <p className="text-eyebrow text-muted-foreground mb-5">Q&amp;A</p>
        <h2 className="font-serif text-editorial">Questions &amp; answers.</h2>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
          Community-submitted questions about {product.name}. Demo content — your submissions are stored in your browser only.
        </p>
        <button
          onClick={() => setWriteOpen(true)}
          className="mt-6 inline-flex items-center gap-2 h-10 px-4 border border-foreground/30 text-foreground text-xs uppercase tracking-[0.14em] hover:border-foreground hover:bg-foreground/5 transition-colors"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Ask a question
        </button>
      </div>

      <div className="md:col-span-8">
        {hasHydrated && items.length === 0 ? (
          <div className="text-center py-16 border border-border">
            <MessageCircle className="h-6 w-6 text-muted-foreground mx-auto mb-4" />
            <p className="font-serif text-xl mb-2">No questions yet.</p>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Be the first to ask about {product.name}.
            </p>
            <button
              onClick={() => setWriteOpen(true)}
              className="inline-flex items-center gap-2 h-10 px-5 bg-foreground text-background text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Ask a question
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-border border-t border-border">
            {items.map((item, i) => (
              <li key={item.id} className="py-6">
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full text-left group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-muted-foreground mt-1 shrink-0">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-lg leading-snug group-hover:underline underline-offset-4">
                        {item.question}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {item.author} · {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        {!item.answered && (
                          <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 bg-muted text-muted-foreground text-[0.625rem] uppercase tracking-wider font-mono">
                            Pending
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {openId === item.id && item.answer && (
                    <motion.div
                      initial={reduce ? undefined : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduce ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 pt-4 border-l-2 border-border ml-3 mt-3">
                        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                          AUREL · Answer
                        </p>
                        <p className="text-sm text-foreground/85 leading-relaxed">{item.answer}</p>
                        {/* Voting */}
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            onClick={() => handleVote(item.id, "helpful")}
                            disabled={!!voted[item.id]}
                            className={cn(
                              "inline-flex items-center gap-1.5 text-xs transition-colors",
                              voted[item.id] === "helpful"
                                ? "text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                          >
                            <ThumbsUp className={cn("h-3.5 w-3.5", voted[item.id] === "helpful" && "fill-current")} />
                            Helpful ({item.helpful ?? 0})
                          </button>
                          <button
                            onClick={() => handleVote(item.id, "not-helpful")}
                            disabled={!!voted[item.id]}
                            className={cn(
                              "inline-flex items-center gap-1.5 text-xs transition-colors",
                              voted[item.id] === "not-helpful"
                                ? "text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                          >
                            <ThumbsDown className={cn("h-3.5 w-3.5", voted[item.id] === "not-helpful" && "fill-current")} />
                            Not helpful ({item.notHelpful ?? 0})
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {openId === item.id && !item.answer && (
                    <motion.div
                      initial={reduce ? undefined : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduce ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 pt-4 ml-3 mt-3">
                        <p className="text-xs text-muted-foreground italic">
                          Thanks for asking — our team will answer this question soon. (Demo: questions are stored in your browser only.)
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AskQuestionDialog
        product={product}
        open={writeOpen}
        onOpenChange={setWriteOpen}
        onSubmit={(question, author) => {
          add(product.slug, question, author);
          track("qa_submit", { slug: product.slug });
          toast("Question submitted", {
            description: "Our team will review and answer soon.",
          });
        }}
      />
    </section>
  );
}

function AskQuestionDialog({
  product,
  open,
  onOpenChange,
  onSubmit,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (question: string, author: string) => void;
}) {
  const [question, setQuestion] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);

  const reset = () => {
    setQuestion("");
    setAuthor("");
    setErr(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim().length < 8) { setErr("Please enter a question (8+ characters)."); return; }
    if (author.trim().length < 2) { setErr("Please enter your name."); return; }
    onSubmit(question.trim(), author.trim());
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="max-w-lg p-0 top-[12vh] translate-y-0 gap-0 overflow-hidden bg-background max-h-[88vh]">
        <DialogTitle className="sr-only">Ask a question about {product.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Submit a question about {product.name}. Your question will be visible to the community.
        </DialogDescription>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <p className="text-eyebrow text-muted-foreground">Q&amp;A</p>
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
          <div>
            <label htmlFor="qa-question" className="text-eyebrow text-muted-foreground block mb-3">Your question</label>
            <textarea
              id="qa-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Can I use this with retinol? Is it safe during pregnancy?"
              required
              rows={4}
              maxLength={300}
              className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm resize-y transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right tabular-nums">{question.length}/300</p>
          </div>

          <div>
            <label htmlFor="qa-author" className="text-eyebrow text-muted-foreground block mb-3">Your name</label>
            <input
              id="qa-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="How should we credit you?"
              required
              maxLength={40}
              className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
            />
          </div>

          {err && <p className="text-sm text-destructive">{err}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 h-12 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="h-3.5 w-3.5" />
              Submit question
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
            Demo Q&amp;A · stored in your browser only · not sent to a server
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
