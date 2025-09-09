"use client"

import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

export function SimplePricingSection() {
  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-green-200 rounded-2xl bg-green-50/30 p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute top-4 right-4 flex gap-1">
            <div className="w-2 h-2 bg-green-200 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-green-300 rounded-full opacity-40"></div>
            <div className="w-2 h-2 bg-green-200 rounded-full opacity-60"></div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1F9D4D] rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1F9D4D] mb-3 leading-tight"
                style={{
                  fontFamily: "Unica One, cursive",
                  fontWeight: "normal",
                }}
              >
                SIMPLE, TRANSPARENT PRICING
              </h2>

              <p
                className="text-lg sm:text-xl text-gray-700 mb-4 max-w-2xl mx-auto"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                We charge a fixed 20% commission on net rental revenue.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#1F9D4D] rounded-full"></div>
                  <span style={{ fontFamily: "Poppins, sans-serif" }}>No monthly charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#1F9D4D] rounded-full"></div>
                  <span style={{ fontFamily: "Poppins, sans-serif" }}>No hidden extras</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#1F9D4D] rounded-full"></div>
                  <span style={{ fontFamily: "Poppins, sans-serif" }}>No long-term contracts</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
