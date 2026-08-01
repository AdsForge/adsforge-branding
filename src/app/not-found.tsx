import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "404 – Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="relative overflow-hidden">
        <BackgroundDecor />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-40 md:pt-28 md:pb-56 flex flex-col items-center justify-center text-center">
          <span className="inline-flex items-center rounded-full border border-edge-strong bg-surface px-3 py-1 text-xs tracking-wide uppercase text-muted">
            Error 404
          </span>

          <h1 className="mt-6 text-7xl md:text-9xl font-semibold tracking-tight text-foreground select-none">
            404
          </h1>

          <span aria-hidden className="mt-6 block h-0.5 w-12 bg-accent" />

          <p className="mt-4 text-xl md:text-2xl font-semibold tracking-tight">
            Page not found
          </p>

          <p className="mt-3 text-base md:text-lg max-w-md mx-auto text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full bg-accent-fill px-5 py-2.5 text-sm font-medium text-black shadow-card transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-accent-fill-hover"
            >
              <span className="relative z-10">Back to home</span>
            </Link>

            <Link
              href="/#contact"
              className="group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border border-edge-strong bg-surface px-5 py-2.5 text-sm font-medium transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-foreground/3"
            >
              <span className="relative z-10 text-foreground">
                Contact support
              </span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,transparent_23%,var(--edge)_24%,transparent_25%),linear-gradient(to_bottom,transparent_0,transparent_23%,var(--edge)_24%,transparent_25%)] bg-size-[48px_48px]" />
      </div>
    </div>
  );
}
