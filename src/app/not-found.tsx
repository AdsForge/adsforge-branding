import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Link from "next/link"

export const metadata = {
  title: "404 – Page Not Found",
  description: "The page you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="relative overflow-hidden">
        <BackgroundDecor />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-40 md:pt-28 md:pb-56 flex flex-col items-center justify-center text-center">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wide uppercase">
            Error 404
          </span>

          <h1 className="mt-6 text-7xl md:text-9xl font-semibold tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent select-none">
            404
          </h1>

          <p className="mt-4 text-xl md:text-2xl font-semibold tracking-tight">
            Page not found
          </p>

          <p className="mt-3 text-base md:text-lg max-w-md mx-auto opacity-70">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <span className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-400 via-fuchsia-400 to-amber-300 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Back to home
              </span>
            </Link>

            <Link
              href="/#contact"
              className="group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-fuchsia-500/20"
            >
              <span className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/20 to-amber-500/20 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              <span className="absolute inset-0 -z-10 rounded-full ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-fuchsia-400/40" />
              <span className="relative z-10 text-white">Contact support</span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -inset-[10rem] bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.18),transparent_40%)]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,transparent_23%,rgba(255,255,255,0.6)_24%,transparent_25%),linear-gradient(to_bottom,transparent_0,transparent_23%,rgba(255,255,255,0.6)_24%,transparent_25%)] bg-[size:48px_48px]" />
        </div>
      </div>
    </div>
  )
}
