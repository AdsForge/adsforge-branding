import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logos/Color Dark - Logo.svg"
                alt=""
                width={30}
                height={20}
              />
              <span className="text-sm font-semibold tracking-tight">
                AdsForge <span className="font-normal text-muted">AI</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Launch Meta Ads from plain English. AI-powered campaign automation
              for Facebook &amp; Instagram.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
              Product
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm">
              <Link
                href="/#live-demo"
                className="text-muted transition-colors hover:text-foreground"
              >
                Live demo
              </Link>
              <Link
                href="/#features"
                className="text-muted transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="/docs"
                className="text-muted transition-colors hover:text-foreground"
              >
                Documentation
              </Link>
              <Link
                href="/blog"
                className="text-muted transition-colors hover:text-foreground"
              >
                Blog
              </Link>
              <Link
                href="https://app.adsforge.io/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                Log in
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
              Company
            </h3>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm">
              <Link
                href="/privacy"
                className="text-muted transition-colors hover:text-foreground"
              >
                Privacy policy
              </Link>
              <Link
                href="/terms"
                className="text-muted transition-colors hover:text-foreground"
              >
                Terms of service
              </Link>
              <Link
                href="mailto:adsforgeio@gmail.com"
                className="text-muted transition-colors hover:text-foreground"
              >
                Contact us
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61588507254894"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                Facebook
              </Link>
              <Link
                href="https://www.instagram.com/adsforge.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                Instagram
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-edge pt-6 text-sm text-faint">
          © {new Date().getFullYear()} AdsForge AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
