import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlowManager } from "@/components/layout/CursorGlowManager";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { SITE_METADATA, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_METADATA.title,
    template: "%s | Ajitesh Channa",
  },
  description: SITE_METADATA.description,
  applicationName: SITE_METADATA.name,
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  alternates: {
    canonical: "/",
  },
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  publisher: SITE_METADATA.author,
  keywords: [
    "AI engineer portfolio",
    "creative technologist",
    "LLM RAG projects",
    "machine learning engineer",
    "automation systems",
    "technical case studies",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_METADATA.name,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE_METADATA.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-fg">
        <CursorGlowManager />
        <a href="#content-start" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        {/* Top padding matches responsive fixed navbar + marquee stack */}
        <div className="flex flex-1 flex-col pt-[5rem] sm:pt-[5.5rem]">
          <div id="content-start" tabIndex={-1} className="outline-none">
            <RouteTransition>{children}</RouteTransition>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
