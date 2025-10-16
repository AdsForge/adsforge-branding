import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for AdsForge AI - Learn how we collect, use, and protect your data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            ← Back to Home
          </Link>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg opacity-80 mb-8">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="opacity-80 leading-relaxed">
              Welcome to AdsForge AI ("we," "our," or "us"). We respect your
              privacy and are committed to protecting your personal data. This
              privacy policy explains how we collect, use, and safeguard your
              information when you use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">
              2.1 Information You Provide
            </h3>
            <p className="opacity-80 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>Email address when you sign up for early access</li>
              <li>Campaign data and creative assets you upload</li>
              <li>Communication preferences and feedback</li>
              <li>
                Meta Ads account information when you connect your account
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              2.2 Automatically Collected Information
            </h3>
            <p className="opacity-80 leading-relaxed mb-4">
              When you use our service, we automatically collect:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>Usage data and analytics</li>
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p className="opacity-80 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Generate and manage your Meta Ads campaigns</li>
              <li>
                Send you updates, notifications, and marketing communications
              </li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>
                Detect, prevent, and address technical issues or fraudulent
                activity
              </li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="opacity-80 leading-relaxed mb-4">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>
                <strong>Meta Platforms:</strong> To create and manage your
                advertising campaigns
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                assist in operating our service
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="opacity-80 leading-relaxed">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p className="opacity-80 leading-relaxed">
              We retain your personal information for as long as necessary to
              provide our services and fulfill the purposes outlined in this
              privacy policy. When your data is no longer needed, we will
              securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p className="opacity-80 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="opacity-80 leading-relaxed mt-4">
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:adsforgeio@gmail.com"
                className="text-blue-400 hover:text-blue-300"
              >
                adsforgeio@gmail.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Cookies and Tracking
            </h2>
            <p className="opacity-80 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your
              experience, analyze usage, and deliver personalized content. You
              can control cookies through your browser settings, but disabling
              them may affect functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              9. Third-Party Links
            </h2>
            <p className="opacity-80 leading-relaxed">
              Our service may contain links to third-party websites or services.
              We are not responsible for the privacy practices of these external
              sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              10. Children's Privacy
            </h2>
            <p className="opacity-80 leading-relaxed">
              Our service is not intended for children under 18 years of age. We
              do not knowingly collect personal information from children. If
              you believe we have collected data from a child, please contact us
              immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              11. International Data Transfers
            </h2>
            <p className="opacity-80 leading-relaxed">
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              to protect your data in accordance with this privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              12. Changes to This Policy
            </h2>
            <p className="opacity-80 leading-relaxed">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date. We encourage you to review
              this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p className="opacity-80 leading-relaxed">
              If you have any questions about this privacy policy or our data
              practices, please contact us:
            </p>
            <div className="mt-4 opacity-80">
              <p>
                Email:{" "}
                <a
                  href="mailto:adsforgeio@gmail.com"
                  className="text-blue-400 hover:text-blue-300"
                >
                  adsforgeio@gmail.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://adsforge.io"
                  className="text-blue-400 hover:text-blue-300"
                >
                  https://adsforge.io
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
