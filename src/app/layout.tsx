import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemedToaster from "@/components/ThemedToaster";
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
  metadataBase: new URL("https://adsforge.io"),
  title: {
    default: "AdsForge AI – Launch Meta Ads from plain English",
    template: "%s | AdsForge AI",
  },
  description:
    "AdsForge AI is an AI-powered automation platform that configures Meta Ads campaigns from natural language descriptions. Describe your goal, upload your creative, and launch — no Ads Manager expertise required.",
  applicationName: "AdsForge AI",
  authors: [{ name: "AdsForge AI" }],
  creator: "AdsForge AI",
  publisher: "AdsForge AI",
  keywords: [
    "AdsForge AI",
    "Meta Ads",
    "Facebook Ads",
    "Instagram Ads",
    "ads automation",
    "AI marketing",
    "AI ad campaign generator",
    "generative AI marketing",
    "text to ad campaign",
    "LLM ad tool",
    "automated Facebook ads",
    "AI ads manager",
    "create ads with AI",
    "natural language ads",
    "Meta ads automation tool",
    "Facebook ad campaign builder",
    "AI powered advertising",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AdsForge AI – Launch Meta Ads from plain English",
    description:
      "Create and launch Meta Ads by describing your goals in natural language.",
    type: "website",
    url: "https://adsforge.io",
    siteName: "AdsForge AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsForge AI – Launch Meta Ads from plain English",
    description:
      "AI-powered automation platform that configures Meta Ads campaigns from natural language descriptions. No Ads Manager expertise required.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resolve the theme before first paint to avoid a flash. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static pre-paint theme resolver, no user input
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`,
          }}
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ThemedToaster />
        <GoogleAnalytics gaId="G-DTK2FDGB6E" />
      </body>
    </html>
  );
}
