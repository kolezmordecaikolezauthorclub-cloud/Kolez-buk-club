import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site";

const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "./fonts/playfair-display-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/playfair-display-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/playfair-display-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/playfair-display-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/playfair-display-600-italic.woff2", weight: "600", style: "italic" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kolezbukclub.vercel.app"),
  title: {
    default:
      "Kolez Buk Club | Where Authors and Great Stories Come Together",
    template: "%s | Kolez Buk Club",
  },
  description:
    "Kolez Buk Club is a curated literary club for independent authors — structured book discovery, honest discussion, and reviews that give stories a lasting life.",
  keywords: [
    "Kolez Buk Club",
    "kolezbukclub",
    "Kolez",
    "Kolez Mordecai",
    "Kolez Buk Club official website",
    "author community",
    "literary club",
    "book club",
    "writers community",
    "author network",
    "book discussion",
    "independent authors",
    "author support",
    "literary events",
    "book discovery",
    "submit your book",
  ],
  authors: [{ name: "Kolez Buk Club" }],
  creator: "Kolez Buk Club",
  publisher: "Kolez Buk Club",
  icons: {
    icon: [{ url: "/kolez-logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/kolez-logo.svg" }],
  },
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: "Kolez Buk Club",
    title: "Kolez Buk Club | Where Authors and Great Stories Come Together",
    description:
      "A curated literary club for independent authors — structured book discovery, honest conversation, and stories that outlive launch week.",
    images: [{ url: "/images/hero-home.jpg", width: 1600, height: 1199, alt: "Kolez Buk Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kolez Buk Club",
    description:
      "Where Authors and Great Stories Come Together. Submit your book to a literary club built around discovery, honest conversation, and lasting connection.",
  },
  alternates: {
    canonical: "/",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "uKnmiszdnc-Et5vsv-ZDubBy0le3MOamF2KIsO1z7zk",
  },
};

export const viewport: Viewport = {
  themeColor: "#071B35",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://kolezbukclub.vercel.app/#organization",
      name: "Kolez Buk Club",
      alternateName: "Kolez",
      url: "https://kolezbukclub.vercel.app",
      logo: "https://kolezbukclub.vercel.app/kolez-logo.svg",
      description:
        "Kolez Buk Club gives independent authors' books a lasting reading life through merit-based book discovery, honest discussion, and devoted readers.",
      slogan: "Where Authors and Great Stories Come Together.",
      email: siteConfig.email,
      sameAs: siteConfig.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": "https://kolezbukclub.vercel.app/#website",
      url: "https://kolezbukclub.vercel.app",
      name: "Kolez Buk Club",
      alternateName: "kolezbukclub",
      description:
        "A curated literary club for independent authors — structured book discovery, honest conversation, and stories that outlive launch week.",
      publisher: { "@id": "https://kolezbukclub.vercel.app/#organization" },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
