import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for AdsForge AI - Learn about the terms of service for using our platform.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
            Terms and Conditions
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
            <h2 className="text-2xl font-semibold mb-4">
              1. Agreement to Terms
            </h2>
            <p className="opacity-80 leading-relaxed">
              By accessing or using AdsForge AI ("Service," "we," "our," or
              "us"), you agree to be bound by these Terms and Conditions
              ("Terms"). If you disagree with any part of these terms, you may
              not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Description of Service
            </h2>
            <p className="opacity-80 leading-relaxed">
              AdsForge AI is a platform that enables users to create and launch
              Meta advertising campaigns using natural language processing and
              artificial intelligence. The Service allows you to upload creative
              assets, describe campaign objectives, and automatically configure
              advertising campaigns.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">
              3.1 Account Creation
            </h3>
            <p className="opacity-80 leading-relaxed mb-4">
              To use certain features of the Service, you must create an
              account. You agree to:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>
                Notify us immediately of any unauthorized use of your account
              </li>
              <li>
                Accept responsibility for all activities that occur under your
                account
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              3.2 Account Eligibility
            </h3>
            <p className="opacity-80 leading-relaxed">
              You must be at least 18 years old and have the legal capacity to
              enter into these Terms. By using the Service, you represent and
              warrant that you meet these requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Meta Platform Integration
            </h2>
            <p className="opacity-80 leading-relaxed mb-4">
              Our Service integrates with Meta's advertising platform. By using
              AdsForge AI, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>
                You must comply with Meta's Terms of Service and Advertising
                Policies
              </li>
              <li>
                You grant us permission to access and manage your Meta Ads
                account
              </li>
              <li>
                We are not responsible for changes to Meta's platform or
                policies
              </li>
              <li>
                Campaign performance depends on Meta's platform and is not
                guaranteed
              </li>
              <li>
                You are ultimately responsible for all advertising costs and
                compliance
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. User Responsibilities
            </h2>
            <p className="opacity-80 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Violate any laws, regulations, or third-party rights</li>
              <li>
                Upload content that is offensive, discriminatory, or violates
                advertising policies
              </li>
              <li>Attempt to interfere with or disrupt the Service</li>
              <li>
                Reverse engineer, decompile, or attempt to extract source code
              </li>
              <li>
                Use automated systems to access the Service without permission
              </li>
              <li>Misrepresent your affiliation with any person or entity</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Content and Intellectual Property
            </h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">
              6.1 Your Content
            </h3>
            <p className="opacity-80 leading-relaxed mb-4">
              You retain all rights to the content you upload to the Service. By
              uploading content, you grant us a worldwide, non-exclusive,
              royalty-free license to use, store, display, and process your
              content solely to provide the Service.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              6.2 Our Intellectual Property
            </h3>
            <p className="opacity-80 leading-relaxed">
              The Service, including its original content, features, and
              functionality, is owned by AdsForge AI and is protected by
              international copyright, trademark, and other intellectual
              property laws. You may not copy, modify, distribute, or create
              derivative works without our express permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Payment and Billing
            </h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">
              7.1 Service Fees
            </h3>
            <p className="opacity-80 leading-relaxed mb-4">
              Certain features of the Service may require payment. You agree to
              pay all applicable fees as described in our pricing plans. All
              fees are non-refundable unless otherwise stated.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              7.2 Advertising Costs
            </h3>
            <p className="opacity-80 leading-relaxed mb-4">
              You are solely responsible for all advertising costs incurred
              through Meta's platform. AdsForge AI does not control or determine
              these costs and is not liable for any expenses related to your
              advertising campaigns.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              7.3 Automatic Renewal
            </h3>
            <p className="opacity-80 leading-relaxed">
              Subscription plans automatically renew unless cancelled before the
              renewal date. You may cancel your subscription at any time through
              your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Disclaimers and Warranties
            </h2>
            <p className="opacity-80 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT
              NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>
                Warranties of merchantability, fitness for a particular purpose,
                or non-infringement
              </li>
              <li>
                Guarantees regarding campaign performance or advertising results
              </li>
              <li>Promises of uninterrupted or error-free service</li>
              <li>
                Accuracy, reliability, or completeness of content or
                AI-generated recommendations
              </li>
            </ul>
            <p className="opacity-80 leading-relaxed mt-4">
              We do not guarantee that the Service will meet your requirements
              or that campaign results will match expectations. You use the
              Service at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              9. Limitation of Liability
            </h2>
            <p className="opacity-80 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ADSFORGE AI SHALL NOT BE
              LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 opacity-80 space-y-2">
              <li>
                Indirect, incidental, special, consequential, or punitive
                damages
              </li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>
                Damages resulting from advertising campaigns or Meta platform
                issues
              </li>
              <li>
                Unauthorized access to or alteration of your transmissions or
                data
              </li>
              <li>Any third-party conduct or content on the Service</li>
            </ul>
            <p className="opacity-80 leading-relaxed mt-4">
              Our total liability shall not exceed the amount you paid to us in
              the twelve (12) months preceding the claim, or $100, whichever is
              greater.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="opacity-80 leading-relaxed">
              You agree to indemnify, defend, and hold harmless AdsForge AI, its
              officers, directors, employees, and agents from any claims,
              damages, losses, liabilities, and expenses (including legal fees)
              arising from your use of the Service, violation of these Terms, or
              infringement of any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              11. Service Modifications and Termination
            </h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">
              11.1 Modifications
            </h3>
            <p className="opacity-80 leading-relaxed mb-4">
              We reserve the right to modify, suspend, or discontinue any part
              of the Service at any time without notice. We may also update
              these Terms from time to time. Continued use of the Service after
              changes constitutes acceptance of the new Terms.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              11.2 Termination
            </h3>
            <p className="opacity-80 leading-relaxed">
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice, for any reason, including
              breach of these Terms. Upon termination, your right to use the
              Service will cease immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Privacy</h2>
            <p className="opacity-80 leading-relaxed">
              Your use of the Service is also governed by our{" "}
              <Link
                href="/privacy"
                className="text-blue-400 hover:text-blue-300"
              >
                Privacy Policy
              </Link>
              . Please review our Privacy Policy to understand our practices
              regarding your personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              13. Dispute Resolution
            </h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">
              13.1 Informal Resolution
            </h3>
            <p className="opacity-80 leading-relaxed mb-4">
              If you have any dispute with us, you agree to first contact us at{" "}
              <a
                href="mailto:adsforgeio@gmail.com"
                className="text-blue-400 hover:text-blue-300"
              >
                adsforgeio@gmail.com
              </a>{" "}
              and attempt to resolve the dispute informally.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              13.2 Arbitration
            </h3>
            <p className="opacity-80 leading-relaxed">
              Any disputes not resolved informally shall be settled by binding
              arbitration in accordance with the rules of the applicable
              arbitration association. The arbitration shall be conducted in
              English, and the decision shall be final and binding.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
            <p className="opacity-80 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which AdsForge AI operates,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
            <p className="opacity-80 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary, and the remaining provisions shall
              remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              16. Entire Agreement
            </h2>
            <p className="opacity-80 leading-relaxed">
              These Terms, along with our Privacy Policy, constitute the entire
              agreement between you and AdsForge AI regarding the use of the
              Service and supersede all prior agreements and understandings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              17. Contact Information
            </h2>
            <p className="opacity-80 leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us:
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

          <section className="mb-8">
            <p className="opacity-80 leading-relaxed italic">
              By using AdsForge AI, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
