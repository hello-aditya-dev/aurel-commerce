import Link from "next/link";

export const metadata = {
  title: "Account",
  description: "Sign in to your AUREL account.",
};

export default function AccountPage() {
  return (
    <div className="container-aurel py-20 md:py-32 max-w-md">
      <p className="text-eyebrow text-muted-foreground mb-5">Account</p>
      <h1
        className="font-serif font-light leading-[1] tracking-[-0.025em]"
        style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
      >
        Sign in.
      </h1>
      <p className="text-base text-muted-foreground mt-5 leading-relaxed">
        Account functionality is a concept demonstration. Sign in, order history, saved routines
        and subscriptions are not connected to a real backend.
      </p>
      <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-eyebrow text-muted-foreground block mb-3">Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
          />
        </div>
        <div>
          <label className="text-eyebrow text-muted-foreground block mb-3">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full h-12 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
        >
          Sign in
        </button>
      </form>
      <p className="text-sm text-muted-foreground mt-8 text-center">
        New to AUREL?{" "}
        <Link href="/shop" className="link-underline text-foreground">Start with the diagnostic</Link>.
      </p>
    </div>
  );
}
