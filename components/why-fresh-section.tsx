"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function WhyFreshSection() {
  const benefits = [
    {
      icon: "/images/proven-system-icon.png",
      title: "PROVEN SYSTEM",
      description:
        "Our tested blueprint has delivered real results. With our system behind you, it's your turn to succeed.",
    },
    {
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%209%2C%202025%2C%2001_34_18%20AM-xMklj4ZWt6kcqMnYLrPywa9LWupWcP.png",
      title: "FULL SUPPORT & TRAINING",
      description:
        "From guest communication to daily operations — we guide you with tech, marketing, and mentorship every step of the way.",
    },
    {
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%209%2C%202025%2C%2001_32_39%20AM-BKhgHx2vyNoW4aHIBlYCxxzOhhEJvG.png",
      title: "REAL INCOME POTENTIAL",
      description:
        "Earn from multiple revenue streams by managing holiday rentals and earning buyer commissions — all within one streamlined system.",
    },
  ]

  return (
    <section id="why-fresh" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-[#1F9D4D] mb-6 leading-tight"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
            }}
          >
            EVERYTHING YOU NEED TO SUCCEED
          </h2>
          <p
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: "300" }}
          >
            Join a model designed for simplicity, scale, and long-term success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white group">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-8 p-4">
                    <motion.img
                      src={benefit.icon}
                      alt={benefit.title}
                      className="w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-[#1F9D4D]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {benefit.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: "300" }}
                  >
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
