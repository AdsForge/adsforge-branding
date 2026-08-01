"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  // null until mounted — the server can't know the visitor's theme.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — theme still applies for this visit */
    }
    setTheme(next);
  };

  const isDark = theme !== "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-edge-strong text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      <motion.span
        key={theme ?? "initial"}
        className="inline-flex"
        initial={
          reduceMotion || theme === null
            ? false
            : { rotate: -90, scale: 0.5, opacity: 0 }
        }
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {isDark ? (
          <Moon className="h-4 w-4" strokeWidth={1.75} />
        ) : (
          <Sun className="h-4 w-4" strokeWidth={1.75} />
        )}
      </motion.span>
    </button>
  );
}
