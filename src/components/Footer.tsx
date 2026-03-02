import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-medium">AdsForge AI</h3>
            <p className="mt-2 text-sm opacity-60 max-w-xs">
              Launch Meta Ads from plain English. AI-powered campaign
              automation for Facebook & Instagram.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium">Product</h3>
            <nav className="mt-2 flex flex-col gap-2 text-sm">
              <Link href="#features" className="opacity-60 hover:opacity-100">
                Features
              </Link>
              <Link href="#live-demo" className="opacity-60 hover:opacity-100">
                Live demo
              </Link>
              <Link href="/docs" className="opacity-60 hover:opacity-100">
                Documentation
              </Link>
              <Link href="/blog" className="opacity-60 hover:opacity-100">
                Blog
              </Link>
              <Link href="#waitlist" className="opacity-60 hover:opacity-100">
                Join waitlist
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="mt-2 flex flex-col gap-2 text-sm">
              <Link href="/privacy" className="opacity-60 hover:opacity-100">
                Privacy policy
              </Link>
              <Link href="/terms" className="opacity-60 hover:opacity-100">
                Terms of service
              </Link>
              <Link
                href="mailto:adsforgeio@gmail.com"
                className="opacity-60 hover:opacity-100"
              >
                Contact us
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61588507254894"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100"
              >
                Facebook
              </Link>
              <Link
                href="https://www.instagram.com/adsforge.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100"
              >
                Instagram
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} AdsForge AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
