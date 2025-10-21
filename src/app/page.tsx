import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LiveDemo from "@/components/LiveDemo";
import JoinWaitlist from "@/components/JoinWaitlist";
import GetInTouch from "@/components/GetInTouch";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AdsForge AI",
  url: "https://adsforge.ai",
  description:
    "Create and launch Meta Ads by describing your goals in natural language.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://adsforge.ai/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
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
