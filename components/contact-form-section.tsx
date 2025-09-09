"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, CheckCircle, Phone, Mail, MapPin, Shield } from "lucide-react"
import Script from "next/script"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

declare global {
  interface Window {
    onloadRecaptcha?: () => void
    grecaptcha?: any
    onRecaptchaSuccess?: (token: string) => void
    onRecaptchaExpired?: () => void
  }
}

export function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  // ✅ Use your real key via env in prod; Google’s test key on localhost
  const SITE_KEY =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      : "6Led0sArAAAAAI4dk6S_MRN5nbn03W_ed9ewpakN")

  const recaptchaRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)

  // Explicit render so it reliably shows up in Next.js
  useEffect(() => {
    window.onRecaptchaSuccess = (token: string) => setRecaptchaToken(token)
    window.onRecaptchaExpired = () => setRecaptchaToken(null)

    const render = () => {
      if (!recaptchaRef.current || !window.grecaptcha) return
      if (widgetIdRef.current !== null) return // already rendered

      widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: SITE_KEY,
        callback: "onRecaptchaSuccess",
        "expired-callback": "onRecaptchaExpired",
      })
    }

    // Called by script onload
    window.onloadRecaptcha = render

    // In case the script was already loaded (hot reload)
    if (typeof window.grecaptcha !== "undefined") {
      render()
    }

    return () => {
      window.onloadRecaptcha = undefined
      window.onRecaptchaSuccess = undefined
      window.onRecaptchaExpired = undefined
    }
  }, [SITE_KEY])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification")
      return
    }

    setIsSubmitting(true)

    try {
      const form = e.target as HTMLFormElement
      const fd = new FormData(form)

      // Ensure token goes to FormSubmit for verification
      fd.set("g-recaptcha-response", recaptchaToken)

      const response = await fetch("https://formsubmit.co/info@fresh-propertymanagement.com", {
        method: "POST",
        body: fd,
      })

      if (response.ok) {
        setIsSubmitted(true)
        setRecaptchaToken(null)
        // reset widget for next time
        if (widgetIdRef.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetIdRef.current)
          } catch {}
        }
      } else {
        alert("Something went wrong. Please try again.")
        setRecaptchaToken(null)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setRecaptchaToken(null)
      alert("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.message && recaptchaToken

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Us",
      details: ["NL: +31 6 23700433", "ES: +34 744 74 92 03"],
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      details: ["info@fresh-propertymanagement.com"],
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Locations",
      details: ["Netherlands & Spain"],
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white">
      {/* Explicit render & onload callback */}
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onloadRecaptcha&render=explicit"
        async
        defer
      />

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
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
            }}
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
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                }}
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
                      <p
                        key={idx}
                        className="text-gray-600 text-sm lg:text-base"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* ★ Only the form has a light-green border */}
            <Card className="border-2 border-[#1F9D4D] shadow-none bg-white">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                {!isSubmitted ? (
                  <form
                    action="https://formsubmit.co/info@fresh-propertymanagement.com"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="_captcha" value="true" />
                    <input type="hidden" name="_template" value="table" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="h-12 border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="h-12 border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="h-12 border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your property management needs or franchise interest..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        rows={5}
                        className="border-2 border-gray-200 focus:border-[#1F9D4D] rounded-lg resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-[#1F9D4D]" />
                        <Label
                          className="text-sm font-medium text-gray-700"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Security Verification *
                        </Label>
                      </div>
                      <div className="flex justify-center">
                        {/* ✅ Explicitly rendered reCAPTCHA widget */}
                        <div ref={recaptchaRef} />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full h-12 bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white font-semibold rounded-lg transition-all duration-300 disabled:bg-gray-300"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-[#1F9D4D]" />
                    </div>
                    <h3
                      className="text-2xl lg:text-3xl text-[#1F9D4D] mb-4"
                      style={{
                        fontFamily: "Unica One, cursive",
                        fontWeight: "normal",
                      }}
                    >
                      THANK YOU!
                    </h3>
                    <p
                      className="text-gray-700 text-lg leading-relaxed mb-6"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Your message has been sent successfully!
                    </p>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                      We'll get back to you within 24 hours to discuss your property management needs.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
