import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { journalArticles } from "@/data/catalog";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on better skin — research, routines and product education from AUREL.",
};

export default function JournalPage() {
  const articles = journalArticles;
  const [featured, ...rest] = articles;
  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <p className="text-eyebrow text-muted-foreground mb-5">The Journal</p>
          <h1
            className="font-serif font-light leading-[1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Notes on better skin.
          </h1>
        </div>
      </section>

      {/* Featured */}
      <section className="container-aurel py-12 md:py-20">
        <Reveal>
          <Link href={`/journal/${featured.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-muted">
                <Image
                  src={featured.hero}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  priority
                />
              </div>
            </div>
            <div className="md:col-span-5 md:pt-6 flex flex-col justify-center">
              <p className="text-eyebrow text-muted-foreground mb-3">{featured.category} · {featured.readTime}</p>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight group-hover:italic transition-all">
                {featured.title}
              </h2>
              <p className="text-base text-muted-foreground mt-4 leading-relaxed">{featured.excerpt}</p>
              <p className="text-xs uppercase tracking-[0.14em] mt-6">Read article →</p>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Rest */}
      {rest.length > 0 && (
        <section className="bg-bone-deep py-16 md:py-24">
          <div className="container-aurel">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rest.map((a, i) => (
                <Reveal key={a.slug} delay={0.05 * i}>
                  <Link href={`/journal/${a.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-5">
                      <Image
                        src={a.hero}
                        alt={a.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="text-eyebrow text-muted-foreground mb-2">{a.category} · {a.readTime}</p>
                    <h3 className="font-serif text-xl leading-tight group-hover:italic transition-all">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{a.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
