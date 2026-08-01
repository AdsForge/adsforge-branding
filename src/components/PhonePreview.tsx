"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bookmark,
  Globe,
  Heart,
  ImageIcon,
  MessageCircle,
  MoreHorizontal,
  Search,
  Send,
  Share2,
  ThumbsUp,
} from "lucide-react";
import type { FacebookCampaign } from "@/lib/campaignsService";

export type AdPlatform = "facebook" | "instagram";

/* ----------------------------- helpers ----------------------------- */

export function brandName(c: FacebookCampaign): string {
  const raw = c.adName || c.name || "";
  const cleaned = raw
    .replace(/\b(campaigns?|ads?|promotions?|marketing)\b/gi, "")
    .replace(/[-–—|]+\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "Your business";
}

export function brandHandle(c: FacebookCampaign): string {
  return (
    brandName(c)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 22) || "yourbusiness"
  );
}

const CTA_LABELS: Record<string, string> = {
  SHOP_NOW: "Shop now",
  LEARN_MORE: "Learn more",
  SIGN_UP: "Sign up",
  SUBSCRIBE: "Subscribe",
  CONTACT_US: "Contact us",
  DOWNLOAD: "Download",
  GET_OFFER: "Get offer",
  GET_QUOTE: "Get quote",
  BOOK_NOW: "Book now",
  BOOK_TRAVEL: "Book now",
  APPLY_NOW: "Apply now",
  ORDER_NOW: "Order now",
  WATCH_MORE: "Watch more",
  MESSAGE_PAGE: "Send message",
};

export function ctaLabel(value?: string): string {
  if (!value) return "Learn more";
  if (CTA_LABELS[value]) return CTA_LABELS[value];
  const words = value.toLowerCase().split("_").join(" ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/* -------------------------- phone chrome --------------------------- */

const nativeFont =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[12px] font-semibold text-black">
      <span>9:41</span>
      <span className="flex items-center gap-1" aria-hidden>
        {/* signal bars */}
        <svg
          width="15"
          height="10"
          viewBox="0 0 15 10"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
          <rect x="4" y="4" width="2.5" height="6" rx="0.5" />
          <rect x="8" y="2" width="2.5" height="8" rx="0.5" />
          <rect x="12" y="0" width="2.5" height="10" rx="0.5" opacity="0.35" />
        </svg>
        {/* wifi */}
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 9.5 4.6 7.1a3.4 3.4 0 0 1 4.8 0L7 9.5Z" />
          <path
            d="M2.7 5.2a6.1 6.1 0 0 1 8.6 0L9.9 6.6a4.1 4.1 0 0 0-5.8 0L2.7 5.2Z"
            opacity="0.9"
          />
          <path
            d="M.8 3.3a8.8 8.8 0 0 1 12.4 0l-1.4 1.4a6.8 6.8 0 0 0-9.6 0L.8 3.3Z"
            opacity="0.8"
          />
        </svg>
        {/* battery */}
        <svg
          width="20"
          height="10"
          viewBox="0 0 20 10"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="0.5"
            y="0.5"
            width="16"
            height="9"
            rx="2.5"
            stroke="currentColor"
            opacity="0.4"
          />
          <rect
            x="2"
            y="2"
            width="11"
            height="6"
            rx="1.5"
            fill="currentColor"
          />
          <path
            d="M18 3.5v3a1.7 1.7 0 0 0 0-3Z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </span>
    </div>
  );
}

function CreativePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-[#eceef1] ${className ?? ""}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, rgba(0,0,0,0.028) 0 10px, transparent 10px 20px)",
      }}
    >
      <div className="flex flex-col items-center gap-1.5 text-[#8a8d91]">
        <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-[11px] font-medium">Your creative</span>
      </div>
    </div>
  );
}

/* ------------------------- Facebook preview ------------------------ */

function FacebookPreview({ campaign }: { campaign: FacebookCampaign }) {
  const brand = brandName(campaign);
  const domain = `${brandHandle(campaign)}.com`;

  return (
    <div className="flex h-full flex-col bg-[#f0f2f5] text-[#050505]">
      {/* app bar */}
      <div className="flex items-center justify-between bg-white px-3.5 py-2">
        <span className="text-[19px] font-bold tracking-tighter text-[#0866ff]">
          facebook
        </span>
        <div className="flex items-center gap-2 text-[#050505]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e4e6eb]">
            <Search className="h-3.5 w-3.5" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e4e6eb]">
            <MessageCircle className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* post */}
      <div className="mt-2 bg-white pb-1">
        <div className="flex items-center gap-2.5 px-3 pt-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1c1e21] text-[15px] font-semibold text-white">
            {brand.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold leading-tight">
              {brand}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#65676b]">
              Sponsored · <Globe className="h-2.5 w-2.5" />
            </div>
          </div>
          <MoreHorizontal className="ml-auto h-4.5 w-4.5 shrink-0 text-[#65676b]" />
        </div>

        <p className="px-3 pt-2 pb-2.5 text-[13px] leading-snug">
          {campaign.primaryText || campaign.description}
        </p>

        <CreativePlaceholder className="aspect-4/3" />

        <div className="flex items-center justify-between gap-3 bg-[#f0f2f5] px-3 py-2.5">
          <div className="min-w-0">
            <div className="truncate text-[10px] uppercase tracking-wide text-[#65676b]">
              {domain}
            </div>
            <div className="truncate text-[13px] font-semibold leading-tight">
              {campaign.headline}
            </div>
            {campaign.description && (
              <div className="truncate text-[11px] text-[#65676b]">
                {campaign.description}
              </div>
            )}
          </div>
          <span className="shrink-0 rounded-md bg-[#e4e6eb] px-3 py-1.5 text-[12px] font-semibold">
            {ctaLabel(campaign.callToAction)}
          </span>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5 text-[11px] text-[#65676b]">
          <span className="flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0866ff]">
              <ThumbsUp className="h-2 w-2 fill-white text-white" />
            </span>
            128
          </span>
          <span>14 comments · 9 shares</span>
        </div>

        <div className="mx-3 flex justify-around border-t border-[#e4e6eb] py-1.5 text-[12px] font-medium text-[#65676b]">
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="h-4 w-4" /> Like
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" /> Comment
          </span>
          <span className="flex items-center gap-1.5">
            <Share2 className="h-4 w-4" /> Share
          </span>
        </div>
      </div>

      <div className="mt-2 h-full bg-white" />
    </div>
  );
}

/* ------------------------ Instagram preview ------------------------ */

function InstagramPreview({ campaign }: { campaign: FacebookCampaign }) {
  const handle = brandHandle(campaign);
  const brand = brandName(campaign);

  return (
    <div className="flex h-full flex-col bg-white text-black">
      {/* app bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <span className="text-[20px] font-semibold tracking-tight">
          Instagram
        </span>
        <div className="flex items-center gap-4">
          <Heart className="h-5 w-5" strokeWidth={1.8} />
          <Send className="h-5 w-5" strokeWidth={1.8} />
        </div>
      </div>

      {/* post header */}
      <div className="flex items-center gap-2.5 px-3 pb-2">
        <div className="rounded-full bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2px]">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#1c1e21] text-[12px] font-semibold text-white">
            {brand.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[13px] font-semibold">{handle}</div>
          <div className="text-[11px] text-[#737373]">Sponsored</div>
        </div>
        <MoreHorizontal className="ml-auto h-4.5 w-4.5 shrink-0" />
      </div>

      <CreativePlaceholder className="aspect-square" />

      {/* CTA banner */}
      <div className="flex items-center justify-between bg-[#0095f6] px-3.5 py-2.5 text-[13px] font-semibold text-white">
        {ctaLabel(campaign.callToAction)}
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1.5 1 6.5 6l-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* actions */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-4">
          <Heart className="h-5.5 w-5.5" strokeWidth={1.8} />
          <MessageCircle
            className="h-5.5 w-5.5 -scale-x-100"
            strokeWidth={1.8}
          />
          <Send className="h-5.5 w-5.5" strokeWidth={1.8} />
        </div>
        <Bookmark className="h-5.5 w-5.5" strokeWidth={1.8} />
      </div>

      <div className="px-3 text-[13px] font-semibold">1,248 likes</div>
      <p className="line-clamp-2 px-3 pt-1 pb-3 text-[12.5px] leading-snug">
        <span className="font-semibold">{handle}</span>{" "}
        {campaign.primaryText || campaign.headline}
      </p>
    </div>
  );
}

/* ----------------------------- the phone --------------------------- */

export default function PhonePreview({
  campaign,
  platform,
  dimmed = false,
}: {
  campaign: FacebookCampaign;
  platform: AdPlatform;
  dimmed?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-[300px] rounded-[2.75rem] border border-edge-strong bg-[#0d0d0c] p-2.5 shadow-[0_32px_90px_-28px_rgba(0,0,0,0.9)] transition-opacity duration-300"
      style={{ opacity: dimmed ? 0.5 : 1 }}
    >
      <div
        className="relative flex h-[590px] flex-col overflow-hidden rounded-[2.1rem] bg-white"
        style={{ fontFamily: nativeFont }}
      >
        {/* dynamic island */}
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
        <StatusBar />

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${platform}-${campaign.headline}-${campaign.name}`}
              className="absolute inset-0"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: platform === "facebook" ? -14 : 14 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, x: platform === "facebook" ? 14 : -14 }
              }
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {platform === "facebook" ? (
                <FacebookPreview campaign={campaign} />
              ) : (
                <InstagramPreview campaign={campaign} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* home indicator */}
        <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-black/25" />
      </div>
    </div>
  );
}
