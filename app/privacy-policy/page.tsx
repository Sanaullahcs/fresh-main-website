export const dynamic = "force-static"; // ✅ ensure this route can be exported
export const revalidate = 86400;       // optional (safe for export/ISR-style)

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-20">
        {/* Header Section */}
        <section className="bg-green-50 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Unica One, cursive" }}
            >
              PRIVACY POLICY
            </h1>
            <p className="text-lg text-gray-600">How we collect, use, and protect your personal information</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  At Fresh Properties, we are committed to protecting your privacy and ensuring the security of your
                  personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit our website, use our services, or interact with us in any way.
                </p>
                <p className="text-gray-700 mb-6">
                  By using our services, you consent to the collection and use of information in accordance with this
                  policy. We may update this policy from time to time, and we will notify you of any changes by posting
                  the new policy on this page.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Register for an account or use our services</li>
                <li>Contact us through our website, email, or phone</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Fill out forms or surveys</li>
                <li>Book properties or make inquiries about our services</li>
              </ul>

              <p className="text-gray-700 mb-4">This information may include:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Name, email address, and phone number</li>
                <li>Property information and rental preferences</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication preferences and feedback</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-6">
                When you visit our website, we may automatically collect certain information about your device and usage
                patterns, including IP address, browser type, operating system, referring URLs, pages viewed, and the
                dates/times of visits. This information helps us improve our website and services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Providing and maintaining our property management services</li>
                <li>Processing bookings and managing property rentals</li>
                <li>Communicating with you about our services, updates, and promotional offers</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Improving our website, services, and user experience</li>
                <li>Complying with legal obligations and protecting our rights</li>
                <li>Preventing fraud and ensuring the security of our platform</li>
                <li>Analyzing usage patterns to enhance our offerings</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We respect your privacy and do not sell, trade, or rent your personal information to third parties.
                However, we may share your information in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share information with trusted third-party service providers who assist us in operating our
                business, such as payment processors, cleaning services, maintenance providers, and marketing platforms.
                These providers are contractually obligated to protect your information and use it only for the
                specified purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required by law, court order, or government regulation, or if we
                believe disclosure is necessary to protect our rights, property, or safety, or that of others.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Business Transfers</h3>
              <p className="text-gray-700 mb-6">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of
                the business transaction, subject to the same privacy protections.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Encryption of sensitive data during transmission and storage</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication procedures</li>
                <li>Employee training on data protection practices</li>
              </ul>
              <p className="text-gray-700 mb-6">
                However, please note that no method of transmission over the internet or electronic storage is 100%
                secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have several rights regarding your personal information:</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Access and Correction</h3>
              <p className="text-gray-700 mb-4">
                You have the right to access, update, or correct your personal information. You can do this by logging
                into your account or contacting us directly.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Portability</h3>
              <p className="text-gray-700 mb-4">
                You have the right to request a copy of your personal information in a structured, commonly used, and
                machine-readable format.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Deletion</h3>
              <p className="text-gray-700 mb-4">
                You may request the deletion of your personal information, subject to certain legal obligations that may
                require us to retain certain data.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Marketing Communications</h3>
              <p className="text-gray-700 mb-6">
                You can opt out of receiving marketing communications from us at any time by clicking the unsubscribe
                link in our emails or contacting us directly. Please note that you may still receive transactional
                communications related to our services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze
                website traffic, and personalize content. Cookies are small data files stored on your device that help
                us remember your preferences and improve our services.
              </p>
              <p className="text-gray-700 mb-6">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect
                the functionality of our website and your user experience.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Data Transfers</h2>
              <p className="text-gray-700 mb-6">
                As we operate in multiple countries, your information may be transferred to and processed in countries
                other than your own. We ensure that such transfers comply with applicable data protection laws and
                implement appropriate safeguards to protect your information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 mb-6">
                Our services are not intended for children under the age of 16. We do not knowingly collect personal
                information from children under 16. If we become aware that we have collected such information, we will
                take steps to delete it promptly.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                legal requirements, or other factors. We will notify you of any material changes by posting the updated
                policy on our website and updating the "Last Updated" date. We encourage you to review this policy
                periodically to stay informed about how we protect your information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                please don't hesitate to contact us:
              </p>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Fresh Properties</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> privacy@fresh-propertymanagement.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>General Inquiries:</strong> info@fresh-propertymanagement.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone (Netherlands):</strong> +31 6 23700433
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Phone (Spain):</strong> +34 744 74 92 03
                </p>
                <p className="text-gray-700">We will respond to your inquiry within 30 days of receipt.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Last updated:</strong> January 2025
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This Privacy Policy is effective as of the date listed above and applies to all information collected
                  by Fresh Properties.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
