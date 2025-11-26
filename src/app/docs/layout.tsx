import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SDK Documentation",
  description: "Official TypeScript SDK for AdsForge - Build powerful Meta advertising integrations with type-safe functions",
  alternates: {
    canonical: "/docs"
  }
}

export default function DocsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

