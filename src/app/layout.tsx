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
  metadataBase: new URL("https://hello-aditya-dev.github.io/aurel-commerce"),
  title: {
    default: "AUREL — Clinical Skincare for Stressed Modern Skin",
    template: "%s — AUREL",
  },
  description:
    "Clinical actives. Botanical intelligence. Skin, restored. AUREL formulates barrier-first skincare for stressed modern skin.",
  keywords: [
    "AUREL",
    "skincare",
    "barrier skincare",
    "clinical skincare",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hello-aditya-dev.github.io/aurel-commerce",
    siteName: "AUREL",
    title: "AUREL — Clinical Skincare for Stressed Modern Skin",
    description:
      "Clinical actives. Botanical intelligence. Skin, restored.",
    images: [
      {
        url: img("/images/og-card.png"),
        width: 1344,
        height: 768,
        alt: "AUREL — Clinical skincare for stressed modern skin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUREL — Clinical Skincare for Stressed Modern Skin",
    description:
      "Clinical actives. Botanical intelligence. Skin, restored.",
    images: [img("/images/og-card.png")],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
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
