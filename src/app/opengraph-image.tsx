import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "AdsForge AI – Launch Meta Ads from plain English";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getLogoDataUri() {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "logos",
    "Color Dark - Logo.svg",
  );
  const svg = await fs.readFile(logoPath);
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

export default async function Image() {
  const logoDataUri = await getLogoDataUri();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(ellipse at top left, rgba(180,131,185,0.30), transparent 60%), radial-gradient(ellipse at bottom right, rgba(255,207,72,0.22), transparent 55%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <img
          src={logoDataUri}
          width={132}
          height={60}
          alt=""
          style={{ display: "block" }}
        />
        <span
          style={{
            fontSize: "40px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          AdsForge AI
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: "88px",
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            backgroundImage:
              "linear-gradient(90deg, #ffffff 0%, #e6d0ea 50%, #ffcf48 100%)",
            backgroundClip: "text",
            color: "transparent",
            maxWidth: "980px",
          }}
        >
          Launch Meta Ads from plain English
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#9ca3af",
            maxWidth: "900px",
            lineHeight: 1.3,
          }}
        >
          Describe your goal — AdsForge AI configures your Meta Ads campaigns
          for you.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "28px", color: "#9ca3af" }}>adsforge.io</span>
        <span
          style={{
            fontSize: "24px",
            padding: "12px 24px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          Open for beta testing
        </span>
      </div>
    </div>,
    { ...size },
  );
}
