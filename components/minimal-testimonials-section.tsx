"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MinimalTestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Andrew Garrett",
      location: "Costa Tropical",
      type: "Property Owner",
      quote:
        "A very professional, friendly, and caring agency! They pay great attention to detail and ensure both owners and guests are comfortable.",
      rating: 5,
      initials: "AG",
    },
    {
      name: "Julia Ann Croft",
      location: "Costa del Sol",
      type: "Guest",
      quote:
        "Fresh Holidays hosted us recently on the Costa del Sol – super responsive to any enquiries, and the property was 10/10.",
      rating: 5,
      initials: "JC",
    },
    {
      name: "Tim Whiteley",
      location: "Axarquía",
      type: "Property Owner",
      quote:
        "Innovative, professional, efficient, and very well organized. Fresh offers the best rental management service we've experienced.",
      rating: 5,
      initials: "TW",
    },
  ]

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-8 sm:py-12 bg-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1F9D4D] mb-2 sm:mb-3 leading-tight"
            style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
          >
            WHAT OUR CLIENTS SAY
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-4 sm:mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Trusted by homeowners, buyers, and guests all over&nbsp;the&nbsp;country
          </p>

          {/* Stars + rating */}
          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#E0E01F] text-[#E0E01F]" />
            ))}
            <span
              className="text-sm font-medium text-gray-600 ml-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              5.0 rating
            </span>
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Quote icon */}
              <div className="w-12 h-12 bg-[#1F9D4D] rounded-full flex items-center justify-center mx-auto mb-6">
                <Quote className="h-6 w-6 text-white" />
              </div>

              {/* Quote text */}
              <blockquote
                className="text-lg sm:text-xl text-gray-700 italic leading-relaxed mb-6 max-w-2xl mx-auto"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              {/* Author info */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#1F9D4D] rounded-full flex items-center justify-center mb-3">
                  <span
                    className="text-white text-sm font-bold"
                    style={{ fontFamily: "Unica One, cursive" }}
                  >
                    {testimonials[currentTestimonial].initials}
                  </span>
                </div>
                <h3
                  className="text-lg font-normal text-gray-900 mb-1"
                  style={{ fontFamily: "Unica One, cursive" }}
                >
                  {testimonials[currentTestimonial].name}
                </h3>
                <p
                  className="text-sm text-[#1F9D4D] font-medium"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {testimonials[currentTestimonial].type} • {testimonials[currentTestimonial].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? "bg-[#1F9D4D] scale-125"
                    : "bg-gray-300 hover:bg-[#1F9D4D]/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
