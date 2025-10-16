import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: "AdsForge AI – Launch Meta Ads from plain English",
  description:
    "Create and launch Meta Ads by describing your goals in natural language. Upload your creative, state your intent, and AdsForge AI configures the full campaign.",
  keywords: [
    "AdsForge AI",
    "Meta Ads",
    "Facebook Ads",
    "ads automation",
    "AI marketing",
    "campaign generator",
  ],
  openGraph: {
    title: "AdsForge AI – Launch Meta Ads from plain English",
    description:
      "Create and launch Meta Ads by describing your goals in natural language.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsForge AI – Launch Meta Ads from plain English",
    description:
      "Create and launch Meta Ads by describing your goals in natural language.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
