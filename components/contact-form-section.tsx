"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"
import React, { useRef, useCallback } from "react"

export function ContactFormSection() {
  const contactInfo = [
    { icon: <Phone className="h-5 w-5" />, title: "Call Us", details: ["NL: +31 6 23700433", "ES: +34 744 74 92 03"] },
    { icon: <Mail className="h-5 w-5" />, title: "Email Us", details: ["info@fresh-propertymanagement.com"] },
    { icon: <MapPin className="h-5 w-5" />, title: "Locations", details: ["Netherlands & Spain"] },
  ]

  // 👉 When iframe loads our /bigin-thanks URL, redirect parent page to thank-you
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const handleIframeLoad = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    try {
      const href = iframe.contentWindow?.location.href || ""
      if (href.includes("/bigin-thanks")) {
        window.location.href = "https://www.fresh-properties.com/thank-you/"
      }
    } catch {
      // Ignore cross-origin loads (normal Bigin form page)
    }
  }, [])

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F9D4D] mb-4 sm:mb-6 leading-tight"
            style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
          >
            GET IN TOUCH
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Ready to start your property management journey? We're here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8"
          >
            <div>
              <h3
                className="text-xl sm:text-2xl lg:text-3xl text-[#1F9D4D] mb-4 lg:mb-6"
                style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
              >
                CONTACT INFORMATION
              </h3>
              <p
                className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Whether you're interested in our property management services or franchise opportunities, our team is
                ready to provide personalized guidance and answer all your questions.
              </p>
            </div>

            <div className="space-y-4 lg:space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 lg:gap-4 p-4 lg:p-6 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#1F9D4D] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-gray-900 text-base lg:text-lg mb-1 lg:mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {item.title}
                    </h4>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm lg:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Embedded Zoho Bigin Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-[#1F9D4D] shadow-none bg-white">
              <CardContent className="p-0">
                <div className="w-full">
                  <iframe
                    ref={iframeRef}
                    onLoad={handleIframeLoad}
                    title="Request Free Rental Advice"
                    src="https://eu.bigin.online/org20106773877/forms/request-free-rental-advice"
                    style={{
                      width: "100%",
                      height: "650px",
                      border: "0",
                      borderRadius: "0.75rem",
                    }}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
