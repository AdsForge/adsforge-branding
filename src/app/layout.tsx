import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
  metadataBase: new URL("https://adsforge.ai"),
  title: {
    default: "AdsForge AI – Launch Meta Ads from plain English",
    template: "%s | AdsForge AI",
  },
  description:
    "Create and launch Meta Ads by describing your goals in natural language. Upload your creative, state your intent, and AdsForge AI configures the full campaign.",
  applicationName: "AdsForge AI",
  authors: [{ name: "AdsForge AI" }],
  creator: "AdsForge AI",
  publisher: "AdsForge AI",
  keywords: [
    "AdsForge AI",
    "Meta Ads",
    "Facebook Ads",
    "ads automation",
    "AI marketing",
    "campaign generator",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AdsForge AI – Launch Meta Ads from plain English",
    description:
      "Create and launch Meta Ads by describing your goals in natural language.",
    type: "website",
    url: "https://adsforge.ai",
    siteName: "AdsForge AI",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AdsForge AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsForge AI – Launch Meta Ads from plain English",
    description:
      "Create and launch Meta Ads by describing your goals in natural language.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
