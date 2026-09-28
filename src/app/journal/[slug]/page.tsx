import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { journalArticles } from "@/data/catalog";
import { getProductBySlug } from "@/lib/commerce/provider";
import { Reveal } from "@/components/motion/reveal";
import { formatPrice } from "@/lib/commerce/provider";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = journalArticles.find((x) => x.slug === slug);
  if (!a) return { title: "Article not found" };
  return { title: a.title, description: a.excerpt };
}

export function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = journalArticles.find((x) => x.slug === slug);
  if (!article) notFound();

  const relatedProducts = (article.relatedProducts ?? [])
    .map(getProductBySlug)
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];
  const related = journalArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <div className="border-b border-border">
        <div className="container-aurel py-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/journal" className="hover:text-foreground">Journal</Link>
          <span>/</span>
          <span className="text-foreground truncate">{article.title}</span>
        </div>
      </div>

      <article>
        <header className="container-aurel py-12 md:py-20 max-w-3xl">
          <p className="text-eyebrow text-muted-foreground mb-5">
            {article.category} · {article.readTime}
          </p>
          <h1
            className="font-serif font-light leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {article.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-6 leading-relaxed">
            {article.excerpt}
          </p>
          <p className="text-xs text-muted-foreground mt-5 font-mono uppercase tracking-wider">
            {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </header>

        <div className="container-aurel">
          <Reveal>
            <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-muted">
              <Image
                src={article.hero}
                alt={article.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>

        <div className="container-aurel py-12 md:py-20 max-w-2xl">
          {article.body.map((para, i) => (
            <Reveal key={i} delay={0.03 * i}>
              <p className="font-serif text-lg md:text-xl leading-[1.6] text-foreground/90 mb-6">
                {para}
              </p>
            </Reveal>
          ))}

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              AUREL is a fictional concept brand. Articles are educational demonstration content
              and do not constitute medical advice.
            </p>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="bg-bone-deep py-16 md:py-24">
            <div className="container-aurel">
              <p className="text-eyebrow text-muted-foreground mb-8">Mentioned in this article</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
                {relatedProducts.map((p, i) => (
                  <Link key={p.id} href={`/products/${p.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden bg-muted mb-3">
                      <Image src={p.media[0].src} alt={p.media[0].alt} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <p className="font-serif text-sm leading-tight group-hover:italic transition-all">{p.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatPrice(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="container-aurel py-16 md:py-24">
            <p className="text-eyebrow text-muted-foreground mb-8">Related reading</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((a) => (
                <Link key={a.slug} href={`/journal/${a.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4">
                    <Image src={a.hero} alt={a.title} fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="text-eyebrow text-muted-foreground mb-2">{a.category}</p>
                  <h3 className="font-serif text-xl leading-tight group-hover:italic transition-all">{a.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
