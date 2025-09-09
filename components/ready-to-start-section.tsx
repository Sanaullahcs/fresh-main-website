"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Home } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation" // ✅ added

export function ReadyToStartSection() {
  const router = useRouter() // ✅ added

  const handleButtonClick = (type: string) => {
    switch (type) {
      case "rent":
        window.location.href = "/services/holiday-rental-management"
        break
      case "book":
        window.open("https://www.fresh.holiday/", "_blank", "noopener,noreferrer")
        break
      case "buy":
        router.push("/buy") // ✅ changed to router.push
        break
    }
  }

  const buttons = [
    { type: "rent", title: "Rent out your property", buttonText: "Learn More" },
    { type: "book", title: "Book your stay", buttonText: "Explore Stays" },
    { type: "buy", title: "Buy a property", buttonText: "Start Buying" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 mt-8 sm:mt-10 lg:mt-16 bg-gradient-to-br from-green-50/20 to-green-100/30 border border-green-200/60 rounded-3xl mx-4 sm:mx-6 lg:mx-8 relative overflow-hidden backdrop-blur-sm mb-10">
      {/* Home icons pill with margin from top */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200/60">
          <Home className="w-4 h-4 text-green-500" />
          <Home className="w-5 h-5 text-green-600" />
          <Home className="w-4 h-4 text-green-500" />
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-16 right-6 opacity-10">
        <div className="w-20 h-20 border border-green-300 rounded-full"></div>
      </div>
      <div className="absolute bottom-6 left-6 opacity-10">
        <div className="w-14 h-14 border border-green-300 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8 mt-12">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F9D4D] mb-4 tracking-wide"
              style={{ fontFamily: "Unica One, sans-serif", fontWeight: "400" }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "300" }}
            >
              Select the service that best fits your needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto"
          >
            {buttons.map((button, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col items-center space-y-3">
                <h3
                  className="text-xl sm:text-2xl text-gray-700 text-center leading-tight"
                  style={{ fontFamily: "Unica One, sans-serif", fontWeight: "400" }}
                >
                  {button.title}
                </h3>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    onClick={() => handleButtonClick(button.type)}
                    className="bg-white hover:bg-[#1F9D4D] text-[#1F9D4D] hover:text-white border border-green-300 hover:border-[#1F9D4D] px-8 py-4 text-base rounded-xl shadow-sm hover:shadow-lg hover:shadow-green-200/30 transition-all duration-300 group min-w-[180px] backdrop-blur-sm"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: "400" }}
                  >
                    {button.buttonText}
                    <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
