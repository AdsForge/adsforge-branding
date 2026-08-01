import { ImageIcon } from "lucide-react";
import type { DemoCreative } from "@/lib/campaignsService";

/*
  Illustrated ad creatives for the demo campaigns — self-contained
  CSS/SVG "brand" visuals, so the phone preview shows a finished ad
  instead of a gray placeholder. No external images, no licensing.
  These render inside the phone (always light chrome), so colors are
  fixed rather than theme tokens.
*/

function SneakersCreative() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#16130e] p-4 text-[#f4ead2]">
      {/* soft gold glow */}
      <div
        aria-hidden
        className="absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, #ffcf48 0%, rgba(255,207,72,0) 70%)",
        }}
      />
      {/* diagonal texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #f4ead2 0 1px, transparent 1px 9px)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">
          Atelier Sole
        </span>
        <span className="rounded-full border border-[#f4ead2]/30 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em]">
          Batch 014
        </span>
      </div>
      <div className="relative">
        <div className="text-[30px] font-bold leading-none tracking-tight">
          Friday
          <br />
          Drop<span className="text-[#ffcf48]">.</span>
        </div>
        <div className="mt-2 h-px w-10 bg-[#ffcf48]" />
        <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#f4ead2]/70">
          Limited pairs · 10:00 EST
        </div>
      </div>
    </div>
  );
}

function YogaCreative() {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-4 text-[#35473c]"
      style={{
        background:
          "linear-gradient(160deg, #edf0e3 0%, #f8f4e9 55%, #f2ead9 100%)",
      }}
    >
      {/* rising sun arc */}
      <div
        aria-hidden
        className="absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full border border-[#b7c2a4]"
      />
      <div
        aria-hidden
        className="absolute -bottom-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border border-[#b7c2a4]/50"
      />
      <div
        aria-hidden
        className="absolute right-5 top-5 h-10 w-10 rounded-full bg-[#e4b756]/70"
      />
      <div className="relative text-[9px] font-semibold uppercase tracking-[0.3em]">
        Studio Flow · London
      </div>
      <div className="relative">
        <div className="text-[26px] font-semibold leading-[1.05] tracking-tight">
          First week,
          <br />
          on us.
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#35473c]/70">
          Unlimited classes · Book online
        </div>
      </div>
    </div>
  );
}

function MmaCreative() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#141518] p-4 text-[#f0efec]">
      {/* red diagonal slash */}
      <div
        aria-hidden
        className="absolute -left-10 top-1/2 h-24 w-[150%] -translate-y-1/2 -rotate-6 bg-[#c73e2e]/15"
      />
      {/* octagon */}
      <svg
        aria-hidden="true"
        role="presentation"
        viewBox="0 0 100 100"
        className="absolute -right-7 -bottom-7 h-36 w-36 text-[#c73e2e]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polygon points="30,3 70,3 97,30 97,70 70,97 30,97 3,70 3,30" />
        <polygon
          points="34,12 66,12 88,34 88,66 66,88 34,88 12,66 12,34"
          opacity="0.4"
        />
      </svg>
      <div className="relative flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#c73e2e]" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">
          Iron Cage MMA
        </span>
      </div>
      <div className="relative">
        <div className="text-[28px] font-extrabold uppercase leading-[0.95] tracking-tight">
          First
          <br />
          session
          <br />
          <span className="text-[#c73e2e]">free.</span>
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#f0efec]/60">
          No experience needed
        </div>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[#eceef1]"
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

export default function AdCreative({
  kind,
  className,
}: {
  kind?: DemoCreative;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
      {kind === "sneakers" ? (
        <SneakersCreative />
      ) : kind === "yoga" ? (
        <YogaCreative />
      ) : kind === "mma" ? (
        <MmaCreative />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}
