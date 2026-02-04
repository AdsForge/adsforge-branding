import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GetInTouch from "@/components/GetInTouch";
import Hero from "@/components/Hero";
import JoinWaitlist from "@/components/JoinWaitlist";
import LiveDemo from "@/components/LiveDemo";
import Navbar from "@/components/Navbar";

export const dynamic = "force-static";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "AdsForge AI",
      url: "https://adsforge.io",
      description:
        "Create and launch Meta Ads by describing your goals in natural language.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://adsforge.io/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "AdsForge AI",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI-powered automation platform that configures Meta Ads campaigns from natural language descriptions.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Waitlist access",
      },
    },
    {
      "@type": "Organization",
      name: "AdsForge AI",
      url: "https://adsforge.io",
      logo: "https://adsforge.io/logos/logo.png",
      sameAs: ["https://x.com/adsforge_ai"],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Navbar />
        <Hero />
        <Features />
        <LiveDemo />
        <JoinWaitlist />
        <GetInTouch />
        <Footer />
      </main>
    </>
  );
}
