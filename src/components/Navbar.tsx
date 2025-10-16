"use client";

import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between border-b border-white/10">
        <Link href="#" className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-foreground" />
          <span className="font-semibold tracking-tight">AdsForge AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="#features"
            className="opacity-80 hover:opacity-100 transition"
          >
            Features
          </Link>
          <Link
            href="#live-demo"
            className="opacity-80 hover:opacity-100 transition"
          >
            Live demo
          </Link>
          <Link
            href="#contact"
            className="opacity-80 hover:opacity-100 transition"
          >
            Contact
          </Link>
        </nav>
        <button
          onClick={() => toast.info("Join the waitlist – coming soon!")}
          className="inline-flex items-center rounded-full bg-white text-black px-4 py-2 text-sm font-medium shadow hover:shadow-md transition"
        >
          Get early access
        </button>
      </div>
    </header>
  );
}

export default Navbar;
