"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function PlatformVisibilitySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F9D4D] mb-4 sm:mb-6 leading-tight"
              style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
            >
              WE MAKE SURE YOUR PROPERTY IS VISIBLE
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Your home is listed across major global platforms and our own direct booking site.
            </p>
          </motion.div>

          {/* Platform Logos */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/images/booking-platforms.png"
                alt="Major booking platforms: Airbnb, Booking.com, VRBO, and Expedia"
                width={800}
                height={200}
                className="max-w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Additional Trust Element */}
          <motion.div variants={itemVariants} className="mt-12 sm:mt-16">
            <div className="inline-flex items-center px-6 py-3 bg-green-50 rounded-full border border-green-100">
              <div className="w-2 h-2 bg-[#1F9D4D] rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                Maximum exposure across all major booking channels
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
