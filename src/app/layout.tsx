import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteShell } from "@/components/layout/site-shell";
import { cn } from "@/lib/utils";
import { img } from "@/lib/img";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase is the origin only — Next.js resolves relative image paths
  // against this. The img() helper adds NEXT_PUBLIC_BASE_PATH for GitHub Pages.
  metadataBase: new URL("https://hello-aditya-dev.github.io"),
  title: {
    default: "AUREL — The Formulation Atelier · Care, considered.",
    template: "%s — AUREL",
  },
  description:
    "AUREL is a formulation atelier for considered skincare. Thoughtful routines for the rhythm of everyday life — barrier-first serums, creams and systems. A concept showcase.",
  keywords: [
    "AUREL",
    "skincare",
    "barrier skincare",
    "formulation atelier",
    "serum",
    "ceramides",
    "peptides",
    "retinal",
    "vitamin C",
  ],
  authors: [{ name: "AUREL" }],
  creator: "AUREL",
  applicationName: "AUREL",
  alternates: {
    canonical: "/",
  },
  manifest: img("/manifest.json"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hello-aditya-dev.github.io/aurel-commerce",
    siteName: "AUREL",
    title: "AUREL — The Formulation Atelier · Care, considered.",
    description:
      "Thoughtful skincare for the rhythm of everyday life. Less noise, more intention.",
    images: [
      {
        url: img("/images/og-default.jpg"),
        width: 1200,
        height: 630,
        alt: "AUREL — The Formulation Atelier. Care, considered.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUREL — The Formulation Atelier · Care, considered.",
    description:
      "Thoughtful skincare for the rhythm of everyday life. Less noise, more intention.",
    images: [img("/images/og-default.jpg")],
  },
  icons: {
    icon: [
      { url: img("/favicon.svg"), type: "image/svg+xml" },
      { url: img("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: img("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: img("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  category: "beauty",
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          fraunces.variable,
          jetbrains.variable,
          "antialiased font-sans bg-background text-foreground min-h-screen"
        )}
      >
        <SiteShell>{children}</SiteShell>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "font-sans",
          }}
        />
      </body>
    </html>
  );
}
