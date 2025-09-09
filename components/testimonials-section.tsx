"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      name: "Andrew Garrett",
      location: "Costa Tropical",
      type: "Property Owner",
      quote:
        "A very professional, friendly, and caring agency! They pay great attention to detail and ensure both owners and guests are comfortable. We're extremely happy using Fresh as our agency and can't recommend them enough!",
      rating: 5,
      initials: "AG",
    },
    {
      name: "Julia Ann Croft",
      location: "Costa del Sol",
      type: "Guest",
      quote:
        "Fresh Holidays hosted us recently on the Costa del Sol – super responsive to any enquiries, and the property was 10/10. We had a fantastic holiday!",
      rating: 5,
      initials: "JC",
    },
    {
      name: "Tim Whiteley",
      location: "Axarquía",
      type: "Property Owner",
      quote:
        "Innovative, professional, efficient, and very well organized. Fresh offers the best rental management service we've experienced in the Axarquía area. Keep up the great work!",
      rating: 5,
      initials: "TW",
    },
    {
      name: "Michael Nikitovich",
      location: "Costa Tropical",
      type: "Guest",
      quote:
        "Had an amazing stay with friends at this lovely house. Everything we needed was there. Very quiet and comfortable. Many thanks!",
      rating: 5,
      initials: "MN",
    },
    {
      name: "Juriën Grintjes",
      location: "Costa Tropical",
      type: "Guest",
      quote:
        "We enjoyed our stay very much! Great accommodation and lovely people that helped us with everything during our stay throughout the whole day. Thanks a lot!",
      rating: 5,
      initials: "JG",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Fresh Properties",
            review: testimonials.map((testimonial) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: testimonial.name,
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: testimonial.rating,
                bestRating: 5,
              },
              reviewBody: testimonial.quote,
            })),
          }),
        }}
      />

      <section
        id="testimonials"
        className="py-16 lg:py-24 bg-gradient-to-br from-[#1F9D4D]/5 to-green-50 relative overflow-hidden"
        ref={ref}
        aria-label="Customer testimonials"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-4 sm:left-20 w-48 sm:w-80 h-48 sm:h-80 bg-[#1F9D4D]/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-4 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-green-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.header
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-[#1F9D4D]/10 text-[#1F9D4D] px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-[#E0E01F] text-[#E0E01F]" />
              <span className="text-sm sm:text-base font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                Client Testimonials
              </span>
            </motion.div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#1F9D4D] mb-4 sm:mb-6 leading-tight"
              style={{
                fontFamily: "Unica One, cursive",
                fontWeight: "normal",
              }}
            >
              WHAT OUR CLIENTS SAY
            </h2>

            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-[#E0E01F] text-[#E0E01F]" />
              ))}
              <span
                className="text-sm sm:text-base font-semibold text-[#1F9D4D] ml-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                5.0 average rating
              </span>
            </div>

            <p
              className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Trusted by property owners and guests across Costa Tropical and beyond
            </p>
          </motion.header>

          <motion.div
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            {/* Main Testimonial Card */}
            <div className="relative" role="region" aria-label="Featured testimonial">
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="focus-within:ring-2 focus-within:ring-[#1F9D4D] rounded-3xl"
                >
                  <Card className="border-0 shadow-xl overflow-hidden bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-6 sm:p-8">
                      <div className="text-center max-w-2xl mx-auto">
                        {/* Quote Icon */}
                        <motion.div
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1F9D4D] to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </motion.div>

                        {/* Rating Stars */}
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                            >
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-[#E0E01F] text-[#E0E01F] mx-1" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote
                          className="text-base sm:text-lg text-[#1F9D4D] italic leading-relaxed mb-6"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          "{testimonials[currentTestimonial].quote}"
                        </blockquote>

                        {/* Author Info */}
                        <div className="flex flex-col items-center">
                          {/* Initial Circle */}
                          <motion.div
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1F9D4D] to-green-600 rounded-full flex items-center justify-center mb-3"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <span
                              className="text-white text-sm sm:text-base font-bold"
                              style={{ fontFamily: "Unica One, cursive" }}
                            >
                              {testimonials[currentTestimonial].initials}
                            </span>
                          </motion.div>

                          <h3
                            className="text-base sm:text-lg text-black mb-1"
                            style={{
                              fontFamily: "Unica One, cursive",
                              fontWeight: "normal",
                            }}
                          >
                            {testimonials[currentTestimonial].name}
                          </h3>
                          <p
                            className="text-sm text-[#1F9D4D]/80 font-medium mb-1"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {testimonials[currentTestimonial].type}
                          </p>
                          <p className="text-xs text-[#1F9D4D]/60" style={{ fontFamily: "Poppins, sans-serif" }}>
                            {testimonials[currentTestimonial].location}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? "bg-[#1F9D4D] w-8" : "bg-gray-300 hover:bg-gray-400 w-2"
                  }`}
                  role="tab"
                  aria-selected={currentTestimonial === index}
                  aria-label={`View testimonial ${index + 1} from ${testimonials[index].name}`}
                />
              ))}
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {testimonials.map((testimonial, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                    currentTestimonial === index
                      ? "bg-[#1F9D4D] text-white shadow-lg scale-105"
                      : "bg-white/80 text-[#1F9D4D] hover:bg-white hover:shadow-md"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Select testimonial from ${testimonial.name}`}
                >
                  <div className="text-center">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1 ${
                        currentTestimonial === index ? "bg-white/20 text-white" : "bg-[#1F9D4D]/10 text-[#1F9D4D]"
                      }`}
                      style={{ fontFamily: "Unica One, cursive" }}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="text-xs font-medium truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {testimonial.name.split(" ")[0]}
                    </div>
                    <div className="text-xs opacity-80 truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {testimonial.type}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
