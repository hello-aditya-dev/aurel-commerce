"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const TOPICS = ["Orders", "Product questions", "Routine questions", "Press", "Wholesale", "Other"];

export default function ContactPage() {
  const [topic, setTopic] = React.useState("Product questions");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Please enter a valid email.");
      return;
    }
    if (message.trim().length < 10) {
      setErr("Please enter a message of at least 10 characters.");
      return;
    }
    setErr(null);
    track("newsletter_signup", { source: "contact_form", topic });
    setSent(true);
    toast("Message received.", {
      description: "We respond to most enquiries within one business day.",
    });
  };

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-24">
          <p className="text-eyebrow text-muted-foreground mb-5">Contact</p>
          <h1
            className="font-serif font-light leading-[1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Customer care.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-6 max-w-xl leading-relaxed">
            Questions about your order, a product, or building a routine? Our team responds within
            one business day.
          </p>
        </div>
      </section>

      <div className="container-aurel py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7">
            {sent ? (
              <div className="border border-border p-8 md:p-12 text-center">
                <div className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-6">
                  <Check className="h-5 w-5" />
                </div>
                <p className="font-serif text-2xl md:text-3xl mb-3">Thank you.</p>
                <p className="text-base text-muted-foreground max-w-md mx-auto">
                  Your message has been received. We will respond to {email} within one business day.
                </p>
                <button
                  onClick={() => { setSent(false); setEmail(""); setMessage(""); setName(""); }}
                  className="mt-8 text-sm uppercase tracking-[0.14em] link-underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6" noValidate>
                <div>
                  <label className="text-eyebrow text-muted-foreground block mb-3">Topic</label>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={cn(
                          "px-4 py-2 text-sm border transition-all",
                          topic === t
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/50"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    value={name}
                    onChange={setName}
                    placeholder="Your name"
                    required
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-eyebrow text-muted-foreground block mb-3">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={6}
                    required
                    className="w-full bg-transparent border border-border focus:border-foreground outline-none p-4 text-sm resize-y transition-colors"
                  />
                </div>

                {err && <p className="text-sm text-destructive">{err}</p>}

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 h-12 px-8 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
                >
                  Send message
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="text-eyebrow text-muted-foreground mb-5">Other ways to reach us</p>
            <div className="space-y-6">
              <div>
                <p className="font-serif text-lg">Email</p>
                <p className="text-sm text-muted-foreground mt-1">care@aurel.example</p>
              </div>
              <div>
                <p className="font-serif text-lg">Hours</p>
                <p className="text-sm text-muted-foreground mt-1">Mon–Fri · 9am–6pm CET</p>
              </div>
              <div>
                <p className="font-serif text-lg">Press &amp; wholesale</p>
                <p className="text-sm text-muted-foreground mt-1">press@aurel.example</p>
              </div>
              <div className="pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  AUREL is a fictional concept brand. The contact form does not transmit data —
                  this is a demonstration interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-eyebrow text-muted-foreground block mb-3">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border border-border focus:border-foreground outline-none p-3 text-sm transition-colors"
      />
    </div>
  );
}
