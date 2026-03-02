import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GetInTouch from "@/components/GetInTouch";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
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
      logo: "https://adsforge.io/logos/Color%20Dark%20-%20Logo.svg",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61588507254894",
        "https://www.instagram.com/adsforge.ai",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to launch Meta Ads with AdsForge AI",
      description:
        "Create a complete Meta Ads campaign in three simple steps using natural language.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Describe your intent",
          text: "Use natural language to express your marketing objective, target audience, budget, and goals. For example: 'I want to sell more sneakers to men in New York with a $50 daily budget.'",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Upload your creative",
          text: "Provide your image or video ad assets. AdsForge AI analyzes them and suggests optimizations for better performance.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Review and launch",
          text: "Review the generated campaign structure including audience targeting, placements, and budget allocation, then publish with one click.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is AdsForge AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AdsForge AI is an intelligent automation platform that lets you create and launch Meta Ads (Facebook & Instagram) by describing your goals in plain English. It automatically configures audience targeting, budget allocation, placements, and optimization rules.",
          },
        },
        {
          "@type": "Question",
          name: "How does AdsForge AI create ad campaigns from text?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You describe your marketing intent in natural language (e.g., target audience, budget, and objectives). AdsForge AI uses large language models to translate that into a complete Meta Ads campaign configuration — including audience segmentation, placement selection, and bid strategy.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need Meta Ads experience to use AdsForge AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. AdsForge AI is designed for anyone — from small business owners to marketing professionals. The AI handles the technical complexity of campaign setup so you can focus on your business goals.",
          },
        },
        {
          "@type": "Question",
          name: "Is AdsForge AI free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AdsForge AI is currently in early access. You can join the waitlist for free to get notified when the platform launches and secure priority access.",
          },
        },
        {
          "@type": "Question",
          name: "What platforms does AdsForge AI support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AdsForge AI currently supports Meta Ads, which covers both Facebook and Instagram advertising. Multi-language and multi-region campaigns are supported with sensible defaults.",
          },
        },
        {
          "@type": "Question",
          name: "How is AdsForge AI different from Meta's built-in AI features?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "While Meta offers tools like Advantage+ for automated campaign optimization, AdsForge AI focuses on the entire campaign creation workflow — from intent to launch. You don't need to understand campaign structures, ad set configurations, or targeting options. AdsForge translates your business goals directly into a ready-to-publish campaign, whereas Meta's native tools still require you to navigate Ads Manager and make configuration decisions.",
          },
        },
        {
          "@type": "Question",
          name: "Is my data secure with AdsForge AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AdsForge AI follows strict data handling practices and never shares your information with third parties. Your campaign data and creative assets are processed securely and are only used to generate your campaigns.",
          },
        },
      ],
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
        <HowItWorks />
        <LiveDemo />
        <JoinWaitlist />
        <Faq />
        <GetInTouch />
        <Footer />
      </main>
    </>
  );
}
