"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EASE, SPRING } from "@/lib/motion";
import { btnPrimary } from "./ui";

const LOGIN_URL = "https://app.adsforge.io/login";

const LINKS = [
  { href: "/#live-demo", label: "Demo", section: "live-demo" },
  { href: "/#how-it-works", label: "How it works", section: "how-it-works" },
  { href: "/#features", label: "Features", section: "features" },
  { href: "/blog", label: "Blog", section: null },
  { href: "/#contact", label: "Contact", section: "contact" },
] as const;

const SECTION_IDS = ["live-demo", "how-it-works", "features", "contact"];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function LogoCluster({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${focusRing}`}
      onClick={onClick}
    >
      <Image
        src="/logos/Color Dark - Logo.svg"
        alt=""
        width={34}
        height={22}
        priority
      />
      <span className="text-[15px] font-semibold tracking-tight">
        AdsForge <span className="font-normal text-muted">AI</span>
      </span>
    </Link>
  );
}

function NavLink({
  href,
  label,
  active,
  ariaCurrent,
  reduceMotion,
}: {
  href: string;
  label: string;
  active: boolean;
  ariaCurrent?: "true" | "page";
  reduceMotion: boolean;
}) {
  const [lifted, setLifted] = useState(false);

  return (
    <Link
      href={href}
      aria-current={ariaCurrent}
      className={`relative ${focusRing}`}
      onMouseEnter={() => setLifted(true)}
      onMouseLeave={() => setLifted(false)}
      onFocus={() => setLifted(true)}
      onBlur={() => setLifted(false)}
    >
      <span className="block overflow-hidden">
        {reduceMotion ? (
          <span
            className={`block transition-colors ${
              lifted || active ? "text-foreground" : "text-muted"
            }`}
          >
            {label}
          </span>
        ) : (
          <motion.span
            className="relative block"
            initial={false}
            animate={{ y: lifted ? "-100%" : "0%" }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <span
              className={`block ${active ? "text-foreground" : "text-muted"}`}
            >
              {label}
            </span>
            <span
              aria-hidden
              className="absolute left-0 top-full block text-foreground"
            >
              {label}
            </span>
          </motion.span>
        )}
      </span>
      {active && (
        <motion.span
          aria-hidden
          layoutId="nav-ink"
          transition={reduceMotion ? { duration: 0 } : SPRING}
          className="absolute left-0 top-[calc(100%+6px)] h-px w-full bg-accent"
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;

  const [condensed, setCondensed] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(false);

  const onHome = pathname === "/";
  const onBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  /* Condense on scroll, with hysteresis: down past 24, back up below 8. */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCondensed((prev) => (prev ? y >= 8 : y > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scrollspy — only mounts on the home route. */
  useEffect(() => {
    if (!onHome) {
      setActiveId(null);
      return;
    }
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setActiveId((prev) =>
            entry.isIntersecting
              ? entry.target.id
              : prev === entry.target.id
                ? null
                : prev,
          );
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, [onHome]);

  /* Body scroll lock while the mobile menu is open. */
  useEffect(() => {
    if (!open) return;
    const docEl = document.documentElement;
    const prevDoc = docEl.style.overflow;
    const prevBody = document.body.style.overflow;
    docEl.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      docEl.style.overflow = prevDoc;
      document.body.style.overflow = prevBody;
    };
  }, [open]);

  /* Focus trap + Esc while open; first focus lands on the close button. */
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const root = overlayRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!root.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* Return focus to the hamburger when the menu closes. */
  useEffect(() => {
    if (prevOpenRef.current && !open) triggerRef.current?.focus();
    prevOpenRef.current = open;
  }, [open]);

  /* Close the overlay if the viewport grows past the mobile breakpoint. */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  const isActive = (link: (typeof LINKS)[number]) => {
    if (onBlog) return link.href === "/blog";
    if (onHome) return link.section !== null && link.section === activeId;
    return false;
  };

  const ariaCurrentFor = (
    link: (typeof LINKS)[number],
  ): "true" | "page" | undefined => {
    if (onBlog && link.href === "/blog") return "page";
    if (onHome && isActive(link)) return "true";
    return undefined;
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? {}
        : { delayChildren: 0.1, staggerChildren: 0.05 },
    },
  } as const;

  const itemVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : {
        hidden: { y: "110%", opacity: 0 },
        visible: {
          y: "0%",
          opacity: 1,
          transition: { duration: 0.5, ease: EASE },
        },
      };

  return (
    <header className="sticky top-0 z-50 w-full">
      <motion.div
        className="relative"
        initial={false}
        animate={{ height: condensed ? 56 : 72 }}
        transition={reduceMotion ? { duration: 0 } : SPRING}
      >
        {/* Backdrop + hairline, faded in once condensed */}
        <motion.div
          aria-hidden
          className="absolute inset-0 border-b border-edge bg-background/85 backdrop-blur"
          initial={false}
          animate={{ opacity: condensed ? 1 : 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.3, ease: EASE }
          }
        />

        <div className="relative mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <LogoCluster onClick={() => setOpen(false)} />

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link)}
                ariaCurrent={ariaCurrentFor(link)}
                reduceMotion={reduceMotion}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm text-muted transition-colors hover:text-foreground ${focusRing}`}
              >
                Log in
              </a>
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btnPrimary}
              >
                Get started
              </a>
            </div>

            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-edge-strong md:hidden ${focusRing}`}
            >
              {reduceMotion ? (
                <span className="relative block h-4 w-4">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1.25"
                    initial={false}
                    animate={{ opacity: open ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="h-[1.5px] w-4 bg-foreground" />
                    <span className="h-[1.5px] w-4 bg-foreground" />
                  </motion.span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rotate-45 bg-foreground" />
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 -rotate-45 bg-foreground" />
                  </motion.span>
                </span>
              ) : (
                <span className="flex flex-col items-center justify-center gap-1.25">
                  <motion.span
                    className="block h-[1.5px] w-4 bg-foreground"
                    initial={false}
                    animate={
                      open ? { y: 3.25, rotate: 45 } : { y: 0, rotate: 0 }
                    }
                    transition={SPRING}
                  />
                  <motion.span
                    className="block h-[1.5px] w-4 bg-foreground"
                    initial={false}
                    animate={
                      open ? { y: -3.25, rotate: -45 } : { y: 0, rotate: 0 }
                    }
                    transition={SPRING}
                  />
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-60 bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: reduceMotion ? 0.01 : 0.2,
                ease: EASE,
              },
            }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.25,
              ease: EASE,
            }}
          >
            {/* Mirror of the header row so the icon appears not to move */}
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
              <LogoCluster onClick={() => setOpen(false)} />
              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-edge-strong ${focusRing}`}
              >
                <span className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rotate-45 bg-foreground" />
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 -rotate-45 bg-foreground" />
                </span>
              </button>
            </div>

            <nav className="absolute inset-x-0 top-[18vh] px-6">
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3.5"
              >
                {LINKS.map((link, i) => (
                  <li key={link.href} className="border-b border-edge pb-3.5">
                    <Link
                      href={link.href}
                      aria-current={ariaCurrentFor(link)}
                      onClick={() => setOpen(false)}
                      className={`block ${focusRing}`}
                    >
                      <span className="block overflow-hidden">
                        <motion.span
                          variants={itemVariants}
                          className="flex items-baseline gap-3"
                        >
                          <span
                            className={`font-mono text-[11px] ${
                              isActive(link) ? "text-accent" : "text-faint"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <span className="text-4xl font-semibold tracking-tight text-foreground">
                            {link.label}
                          </span>
                        </motion.span>
                      </span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </nav>

            <motion.div
              className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : { duration: 0.4, ease: EASE, delay: 0.35 }
              }
            >
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`py-1 text-center text-sm text-muted transition-colors hover:text-foreground ${focusRing}`}
              >
                Log in
              </a>
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`${btnPrimary} w-full`}
              >
                Get started
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
