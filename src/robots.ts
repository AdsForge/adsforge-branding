import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://adsforge.ai/sitemap.xml",
    host: "https://adsforge.ai",
  };
}
