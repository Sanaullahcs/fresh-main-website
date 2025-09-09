"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function InteractiveBenefits() {
  const benefits = [
    {
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%209%2C%202025%2C%2001_32_39%20AM-BKhgHx2vyNoW4aHIBlYCxxzOhhEJvG.png",
      title: "MAKE MORE MONEY",
      description:
        "Hosts can earn 70 - 120% more than renting their home residentially. We optimise the pricing to ensure maximum earnings.",
    },
    {
      icon: "/images/stress-free-icon.png",
      title: "STRESS FREE",
      description:
        "We handle everything for you. Guest communications, 24hr check-in, cleaning, linen, restocking and more.",
    },
    {
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%209%2C%202025%2C%2001_35_41%20AM-DXLy9XxqoG3wSqLptHVSGPZ1McDtut.png",
      title: "FLEXIBLE",
      description: "It's your home. Rent it on your terms. You decide when the property is available for bookings.",
    },
    {
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%209%2C%202025%2C%2001_26_25%20AM-AueEFe9tq1XxKmHnF4O6AHir5KBTMS.png",
      title: "GLOBAL REACH",
      description:
        "Access international markets and guests from around the world with our proven marketing strategies.",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-[#1F9D4D] mb-6 leading-tight"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
            }}
          >
            WHY CHOOSE FRESH?
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: "300" }}
          >
            Discover the unique advantages that set Fresh Properties apart
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                  <div className="flex justify-center mb-6">
                    <motion.img
                      src={benefit.icon}
                      alt={benefit.title}
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
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

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#1F9D4D] to-green-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3
              className="text-2xl lg:text-3xl mb-4"
              style={{
                fontFamily: "Unica One, cursive",
                fontWeight: "normal",
              }}
            >
              READY TO EXPERIENCE THESE BENEFITS?
            </h3>
            <p
              className="text-lg opacity-90 mb-6 max-w-2xl mx-auto"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "300" }}
            >
              Join hundreds of successful entrepreneurs who've transformed their lives with Fresh Properties
            </p>
            <motion.button
              onClick={() => {
                const element = document.getElementById("apply")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="bg-white text-[#1F9D4D] px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
