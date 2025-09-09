"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle, Users, TrendingUp, ArrowRight, Star } from "lucide-react"

export function ApplicationSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // FIXED: Allow form to submit naturally, then detect success
    const handleFormSubmission = () => {
      console.log("Form successfully submitted - redirecting to thank you page")
      // Small delay to ensure form data is sent
      setTimeout(() => {
        window.location.replace("https://franchise.fresh-properties.com/thankyou.html")
      }, 500) // 500ms delay to ensure submission completes
    }

    // Method 1: Listen for success messages from Bigin iframe
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from Zoho domains
      if (event.origin.includes("zohopublic.eu") || event.origin.includes("zoho.")) {
        console.log("Message from Zoho Forms:", event.data)

        // Check for various success indicators
        if (event.data && typeof event.data === "string") {
          const message = event.data.toLowerCase()
          if (
            message.includes("success") ||
            message.includes("submitted") ||
            message.includes("thank") ||
            message.includes("complete")
          ) {
            console.log("Success message received from Zoho Forms")
            handleFormSubmission()
          }
        } else if (event.data && (event.data.type === "form_submitted" || event.data.status === "success")) {
          console.log("Form submission confirmed by Zoho Forms")
          handleFormSubmission()
        }
      }
    }

    // Method 2: Monitor iframe for successful submission (non-intrusive)
    const iframe = document.getElementById("zoho-form") as HTMLIFrameElement
    if (iframe) {
      iframe.onload = () => {
        console.log("Zoho Forms form iframe loaded successfully")

        // Monitor for successful form submission without interfering
        const checkForSuccess = () => {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
            if (iframeDoc) {
              const url = iframeDoc.URL || ""

              // Check if URL indicates successful submission
              if (url.includes("success") || url.includes("thank") || url.includes("submitted")) {
                console.log("Success detected in iframe URL:", url)
                handleFormSubmission()
                return true
              }

              // Check for success messages in the document
              const bodyText = iframeDoc.body?.textContent?.toLowerCase() || ""
              if (bodyText.includes("thank you") || bodyText.includes("success") || bodyText.includes("submitted")) {
                console.log("Success message found in iframe content")
                handleFormSubmission()
                return true
              }
            }
          } catch (error) {
            // Cross-origin restrictions - this is expected and normal
            console.log("Cross-origin access restricted (normal behavior)")
          }
          return false
        }

        // Check for success every 2 seconds (less aggressive)
        const successChecker = setInterval(() => {
          if (checkForSuccess()) {
            clearInterval(successChecker)
          }
        }, 2000)

        // Clear checker after 10 minutes
        setTimeout(() => clearInterval(successChecker), 600000)
      }
    }

    // Method 3: Detect form interaction and wait for completion
    const detectFormCompletion = () => {
      const iframe = document.getElementById("zoho-form") as HTMLIFrameElement
      if (iframe) {
        let formStartTime: number | null = null
        let hasInteracted = false

        const handleInteraction = () => {
          if (!hasInteracted) {
            hasInteracted = true
            formStartTime = Date.now()
            console.log("User started interacting with form")
          }
        }

        // Listen for user interactions with the form
        iframe.addEventListener("mousedown", handleInteraction)
        iframe.addEventListener("touchstart", handleInteraction)
        iframe.addEventListener("focus", handleInteraction)

        // Check for form completion after reasonable interaction time
        const completionChecker = setInterval(() => {
          if (hasInteracted && formStartTime) {
            const interactionTime = Date.now() - formStartTime

            // Reduce the time threshold for Zoho forms (20 seconds instead of 30)
            if (interactionTime > 20000) {
              if (document.visibilityState === "visible") {
                console.log("Interaction detected, likely form completion")
                handleFormSubmission()
                clearInterval(completionChecker)
              }
            }
          }
        }, 3000) // Check every 3 seconds instead of 5

        // Clear checker after 10 minutes
        setTimeout(() => clearInterval(completionChecker), 600000)

        return () => {
          iframe.removeEventListener("mousedown", handleInteraction)
          iframe.removeEventListener("touchstart", handleInteraction)
          iframe.removeEventListener("focus", handleInteraction)
          clearInterval(completionChecker)
        }
      }
    }

    const cleanupInteractionDetection = detectFormCompletion()

    // Method 4: Page visibility change (refined)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Store when user left the page
        const iframe = document.getElementById("zoho-form")
        if (iframe) {
          sessionStorage.setItem("form_page_left", Date.now().toString())
        }
      } else if (document.visibilityState === "visible") {
        // Check if user returned after a brief absence (possible form submission)
        const leftTime = sessionStorage.getItem("form_page_left")
        if (leftTime) {
          const timeDiff = Date.now() - Number.parseInt(leftTime)

          // If user was away for 2-10 seconds, might indicate form submission
          if (timeDiff >= 2000 && timeDiff <= 10000) {
            console.log("Brief page absence detected, checking for form submission")

            // Give a moment for any success messages to load
            setTimeout(() => {
              try {
                const iframe = document.getElementById("zoho-form") as HTMLIFrameElement
                if (iframe && iframe.contentDocument) {
                  const url = iframe.contentDocument.URL || ""
                  if (url.includes("success") || url.includes("thank")) {
                    console.log("Success confirmed after page return")
                    handleFormSubmission()
                  }
                }
              } catch (error) {
                // Cross-origin restriction - normal
              }
            }, 1000)
          }

          sessionStorage.removeItem("form_page_left")
        }
      }
    }

    // Add event listeners
    window.addEventListener("message", handleMessage)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Cleanup
    return () => {
      window.removeEventListener("message", handleMessage)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (cleanupInteractionDetection) cleanupInteractionDetection()
    }
  }, [])

  const contactMethods = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Netherlands",
      action: "+31 6 23700433",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      href: "tel:+31623700433",
      clickable: isMobile,
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Spain",
      action: "+34 744 74 92 03",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      href: "tel:+34744749203",
      clickable: isMobile,
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      action: "info@fresh-propertymanagement.com",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      href: "mailto:info@fresh-propertymanagement.com",
      clickable: true,
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "WhatsApp",
      action: "Start Conversation",
      color: "from-green-600 to-green-700",
      bgColor: "bg-green-50",
      href: "https://wa.me/31623700433",
      clickable: true,
    },
  ]

  const whyChooseUs = [
    {
      icon: <Star className="h-5 w-5" />,
      title: "4.9/5 Rating",
      description: "Trusted by partners worldwide",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Expert Support",
      description: "24/7 dedicated franchise support",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Proven Results",
      description: "€100K+ revenue potential",
    },
  ]

  return (
    <section id="apply" className="py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-[#1F9D4D]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Intro Quote */}
          <motion.div
            className="mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#1F9D4D]/5 to-green-50 rounded-3xl p-8 lg:p-12 border border-[#1F9D4D]/10 shadow-lg">
              <blockquote
                className="text-lg lg:text-xl text-[#1F9D4D] italic leading-relaxed font-medium"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "The other day I cruised the coastline after a lunch with clients who just bought their dream home.
                Later, I squeezed in a mid-day swim and finished some work from my favorite beach café. That kind of
                freedom? That's exactly what this business gives me."
              </blockquote>
            </div>
          </motion.div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-[#1F9D4D] mb-6 leading-tight"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
            }}
          >
            WHAT IF YOUR LIFE DIDN't NEED A HOLIDAY?
          </h2>
          <p
            className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            We'll show you how to turn that kind of freedom into your everyday.
          </p>

          {/* Start Conversation Button with Arrow */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#1F9D4D] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg cursor-default">
              <span style={{ fontFamily: "Poppins, sans-serif" }}>Start the Conversation</span>
            </div>

            {/* Arrow pointing down-right to form */}
            <motion.div
              className="flex items-center gap-2 text-[#1F9D4D]"
              animate={{
                x: [0, 10, 0],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[#1F9D4D]">
                <path
                  d="M10 15 L25 25 L20 30"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span className="text-sm font-medium opacity-80" style={{ fontFamily: "Poppins, sans-serif" }}>
                Fill out the form below
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Content - Balanced Two-Column Layout */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Left Column - Contact Information */}
            <div className="space-y-8 min-h-[800px] md:min-h-[900px]">
              {/* Contact Header */}
              <div className="text-center lg:text-left">
                <h3
                  className="text-2xl lg:text-3xl text-[#1F9D4D] mb-4"
                  style={{
                    fontFamily: "Unica One, cursive",
                    fontWeight: "normal",
                  }}
                >
                  GET IN TOUCH
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Ready to start your franchise journey? Our team is here to guide you through every step of the
                  process.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const CardComponent = method.clickable ? motion.a : motion.div
                  const cardProps = method.clickable
                    ? {
                        href: method.href,
                        target: method.href.startsWith("http") ? "_blank" : "_self",
                        rel: method.href.startsWith("http") ? "noopener noreferrer" : undefined,
                        className: "group cursor-pointer block",
                      }
                    : {
                        className: "group block",
                      }

                  return (
                    <CardComponent
                      key={index}
                      {...cardProps}
                      whileHover={method.clickable ? { scale: 1.02, y: -2 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Card
                        className={`border-0 shadow-lg transition-all duration-300 bg-white h-full ${
                          method.clickable ? "hover:shadow-xl group-hover:bg-gray-50 cursor-pointer" : "cursor-default"
                        }`}
                      >
                        <CardContent className="p-8">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0 ${
                                method.clickable ? "group-hover:scale-105" : ""
                              } transition-transform duration-300`}
                            >
                              {method.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                className="font-bold text-gray-900 text-lg mb-1"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                              >
                                {method.title}
                              </h4>
                              <p
                                className={`font-medium transition-colors duration-300 ${
                                  method.clickable ? "text-[#1F9D4D] group-hover:text-[#1F9D4D]/80" : "text-gray-600"
                                }`}
                                style={{ fontFamily: "Poppins, sans-serif" }}
                              >
                                {method.action}
                              </p>
                            </div>
                            {method.clickable && (
                              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#1F9D4D] group-hover:translate-x-1 transition-all duration-300" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </CardComponent>
                  )
                })}
              </div>

              {/* Why Choose Us Section */}
              <div className="mt-12">
                <h4
                  className="text-xl text-gray-900 mb-4 text-center lg:text-left"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  Why Choose Fresh Properties?
                </h4>
                <div className="space-y-3">
                  {whyChooseUs.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-8 h-8 bg-[#1F9D4D]/10 rounded-lg flex items-center justify-center text-[#1F9D4D] flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h5
                          className="font-semibold text-gray-900 text-sm"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {item.title}
                        </h5>
                        <p className="text-gray-600 text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Application Form */}
            <div className="lg:pl-4">
              <Card className="border-0 shadow-2xl bg-white overflow-hidden relative h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="bg-gradient-to-r from-[#1F9D4D] to-green-600 p-8 text-white text-center">
                    <h3
                      className="text-2xl lg:text-3xl mb-3"
                      style={{
                        fontFamily: "Unica One, cursive",
                        fontWeight: "normal",
                      }}
                    >
                      REQUEST FRANCHISE DETAILS
                    </h3>
                    <p className="text-white/90 text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Get your comprehensive information package in minutes
                    </p>
                  </div>

                  {/* Form Container */}
                  <div className="relative flex-1">
                    <iframe
                      id="zoho-form"
                      src="https://forms.zohopublic.eu/infofreshproper1/form/FranchiseeWishlistForm/formperma/9fSoyQSM8VWkYYkl5tcKZGgqwE-x-ZsdbClKr5In0yU"
                      width="100%"
                      height="900"
                      frameBorder="0"
                      scrolling="auto"
                      seamless
                      allow="forms"
                      loading="eager"
                      className="w-full block min-h-[800px] md:min-h-[900px]"
                      style={{
                        border: "none",
                        background: "transparent",
                        height: "900px",
                        overflow: "auto",
                        maxHeight: "none",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#1F9D4D] to-green-600 text-white overflow-hidden max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12 text-center">
              <h3
                className="text-2xl lg:text-3xl mb-4"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                }}
              >
                QUESTIONS? WE'RE HERE TO HELP
              </h3>
              <p
                className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Our franchise development team is available to discuss your specific situation and answer any questions
                about the Fresh Properties opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.open("tel:+31623700433", "_self")}
                  className="bg-white text-[#1F9D4D] hover:bg-gray-100 px-8 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Schedule a Call
                </Button>
                <Button
                  onClick={() => window.open("mailto:info@fresh-propertymanagement.com", "_self")}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1F9D4D] px-8 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 bg-transparent"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Email Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
