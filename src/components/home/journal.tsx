import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { journalArticles } from "@/data/catalog";
import { Reveal } from "@/components/motion/reveal";

export function JournalSection() {
  const articles = journalArticles.slice(0, 3);
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-aurel">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-eyebrow text-muted-foreground mb-5">The Journal</p>
            <h2
              className="font-serif font-light leading-[1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Notes on better skin.
            </h2>
          </div>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
          >
            All articles
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={0.06 * i}>
              <Link
                href={`/journal/${a.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-5">
                  <Image
                    src={a.hero}
                    alt={a.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-eyebrow text-muted-foreground mb-3">{a.category}</p>
                <h3 className="font-serif text-2xl leading-tight tracking-tight group-hover:italic transition-all">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                  {a.excerpt}
                </p>
                <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-muted-foreground mt-5">
                  {a.readTime}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
