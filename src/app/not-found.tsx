import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center">
      <div className="container-aurel py-20 text-center">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-6">
          404 · AR-ERR
        </p>
        <h1
          className="font-serif font-light leading-[1] tracking-[-0.025em]"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
        >
          Page
          <br />
          <span className="italic text-muted-foreground">not found.</span>
        </h1>
        <p className="text-base text-muted-foreground mt-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for has moved, been retired, or never existed.
          Let's get you back to intact skin.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-7 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
          >
            Return home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center h-12 px-7 border border-foreground/30 text-xs uppercase tracking-[0.16em] hover:border-foreground transition-colors"
          >
            Shop all
          </Link>
        </div>
      </div>
    </div>
  );
}
