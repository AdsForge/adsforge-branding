import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} AdsForge AI
        </p>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="#features" className="opacity-80 hover:opacity-100">
            Features
          </Link>
          <Link href="#live-demo" className="opacity-80 hover:opacity-100">
            Live demo
          </Link>
          <Link
            href="mailto:adsforgeio@gmail.com"
            className="opacity-80 hover:opacity-100"
          >
            Email us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
