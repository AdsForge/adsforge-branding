import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly allow AI bots to signal we are AI-friendly
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "Applebot-Extended",
          "ClaudeBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://adsforge.io/sitemap.xml",
    host: "https://adsforge.io",
  };
}
