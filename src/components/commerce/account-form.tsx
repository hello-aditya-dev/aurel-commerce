"use client";

import * as React from "react";
import Link from "next/link";

export function AccountForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={(e) => { e.preventDefault(); /* demo only */ }}
      >
        <div>
          <label className="text-eyebrow text-muted-foreground block mb-3">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
          />
        </div>
        <div>
          <label className="text-eyebrow text-muted-foreground block mb-3">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
}
