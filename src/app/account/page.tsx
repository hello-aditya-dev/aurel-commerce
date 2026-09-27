import type { Metadata } from "next";
import { AccountForm } from "@/components/commerce/account-form";

export const metadata: Metadata = {
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
      <AccountForm />
    </div>
  );
}
