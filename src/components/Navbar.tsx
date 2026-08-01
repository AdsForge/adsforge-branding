"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EASE, SPRING } from "@/lib/motion";
import ThemeToggle from "./ThemeToggle";
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
  index,
  active,
  ariaCurrent,
  reduceMotion,
  inkId,
  textClass,
}: {
  href: string;
  label: string;
  index?: string;
  active: boolean;
  ariaCurrent?: "true" | "page";
  reduceMotion: boolean;
  inkId: string;
  textClass: string;
}) {
  const [lifted, setLifted] = useState(false);

  return (
    <Link
      href={href}
      aria-current={ariaCurrent}
      className={`relative inline-flex items-baseline ${textClass} ${focusRing}`}
      onMouseEnter={() => setLifted(true)}
      onMouseLeave={() => setLifted(false)}
      onFocus={() => setLifted(true)}
      onBlur={() => setLifted(false)}
    >
      {index !== undefined && (
        <span
          className={`mr-1.5 font-mono text-[10px] ${
            active ? "text-accent" : "text-faint"
          }`}
        >
          {index}
        </span>
      )}
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
          layoutId={inkId}
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

  /* Mobile bar backdrop */
  const [condensed, setCondensed] = useState(false);
  /* Desktop floating dock */
  const [docked, setDocked] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(false);

  const onHome = pathname === "/";
  const onBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  /*
    Scroll-driven state, both with hysteresis:
    - mobile bar backdrop: on past 24, released below 8
    - dock: shows past 160, hides below 120
  */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCondensed((prev) => (prev ? y >= 8 : y > 24));
      setDocked((prev) => (prev ? y >= 120 : y > 160));
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
    <>
      {/* A) Top header — static, in-flow, desktop only */}
      <header className="hidden w-full md:block">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
          <LogoCluster />

          <div className="flex items-center gap-7">
            <nav aria-label="Primary" className="flex items-center gap-7">
              {LINKS.map((link, i) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={`0${i + 1}`}
                  active={isActive(link)}
                  ariaCurrent={ariaCurrentFor(link)}
                  reduceMotion={reduceMotion}
                  inkId="nav-ink-top"
                  textClass="text-sm"
                />
              ))}
            </nav>

            <ThemeToggle />

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
        </div>
      </header>

      {/* B) The Dock — floating capsule once the header scrolls away */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 hidden justify-center md:flex">
        <AnimatePresence>
          {docked && (
            <motion.div
              className="pointer-events-auto flex h-12 items-center gap-5 rounded-xl border border-edge-strong bg-background/90 px-3 shadow-card backdrop-blur"
              initial={reduceMotion ? { opacity: 0 } : { y: -24, opacity: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0, transition: { duration: 0.01 } }
                  : {
                      y: -12,
                      opacity: 0,
                      transition: { duration: 0.2, ease: EASE },
                    }
              }
              transition={reduceMotion ? { duration: 0.01 } : SPRING}
            >
              <Link
                href="/"
                aria-label="AdsForge home"
                className={`inline-flex items-center ${focusRing}`}
              >
                <Image
                  src="/logos/Color Dark - Logo.svg"
                  alt=""
                  width={26}
                  height={17}
                />
              </Link>

              <span aria-hidden className="h-5 w-px bg-edge" />

              <nav
                aria-label="Quick navigation"
                className="flex items-center gap-5"
              >
                {LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={isActive(link)}
                    ariaCurrent={ariaCurrentFor(link)}
                    reduceMotion={reduceMotion}
                    inkId="nav-ink-dock"
                    textClass="text-[13px]"
                  />
                ))}
              </nav>

              <span aria-hidden className="h-5 w-px bg-edge" />

              <ThemeToggle className="h-8! w-8!" />

              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-md bg-accent-fill px-3 py-1.5 text-[13px] font-medium text-black transition-colors hover:bg-accent-fill-hover ${focusRing}`}
              >
                Get started
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* C) Mobile bar — sticky, below md only */}
      <header className="sticky top-0 z-50 w-full md:hidden">
        <div className="relative h-14">
          {/* Backdrop + hairline, faded in once scrolled */}
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

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <button
                ref={triggerRef}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-edge-strong ${focusRing}`}
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
        </div>
      </header>

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
            {/* Mirror of the mobile bar so the icon appears not to move */}
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
              <LogoCluster onClick={() => setOpen(false)} />
              <div className="flex items-center gap-3">
                <ThemeToggle />
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
    </>
  );
}

export default Navbar;
