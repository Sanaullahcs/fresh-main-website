"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const services = [
  {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2022%2C%202025%2C%2010_44_13%20PM.jpg-xEoghHJHA24ZXA6kJS07UoKt33ZfIb.jpeg",
    title: "Rent out my property",
    description: "Full-service holiday rental management in Spain.",
    features: ["Full-service management", "Maximized rental income", "Local guest & property care"],
    buttonText: "Learn more",
    buttonLink: "#",
    tabName: "RENT OUT",
    isExternal: false,
  },
  {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%209%2C%202025%2C%2008_48_33%20PM.jpg-BSCQBlGOCCeYTe0iR5n1kfn4uJzs4e.jpeg",
    title: "Book a holiday",
    description: "Enjoy curated holiday stays with local service.",
    features: ["Stylish, well-equipped homes", "Professionally cleaned", "Personal local support"],
    buttonText: "Explore stays",
    buttonLink: "https://www.fresh.holiday/",
    tabName: "BOOK STAY",
    isExternal: true,
  },
  {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2016%2C%202025%2C%2010_24_44%20PM.jpg-vv7gyUm0sBpfp7IpStucdyJkhj7hbb.jpeg",
    title: "Buy a property",
    description: "Find your ideal home or investment property in Spain.",
    features: ["Local expertise", "Step-by-step guidance", "Legal peace of mind"],
    buttonText: "→ Start Buying",
    buttonLink: "/buy",
    tabName: "BUY PROPERTY",
    isExternal: false,
  },
]

export function ServiceOptionsSection() {
  const [activeTab, setActiveTab] = useState(0)

  const handleButtonClick = (service: any) => {
    if (service.disabled) return

    if (service.isExternal) {
      window.open(service.buttonLink, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = service.buttonLink
    }
  }

  return (
    <section className="pt-4 pb-4 sm:py-8 bg-gradient-to-b from-green-50/30 to-green-100/20 md:bg-gradient-to-b md:from-green-50/30 md:to-green-100/20 bg-green-50 md:bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-8 mt-0"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1F9D4D] mb-2 sm:mb-3"
            style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
          >
            WHAT WOULD YOU LIKE TO DO?
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto md:block hidden"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Select the service that best fits your needs
          </p>
          <p
            className="text-base text-gray-600 max-w-2xl mx-auto md:hidden block"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Choose your goal to get started
          </p>
        </motion.div>

        <div className="md:hidden">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-4">
            <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-200">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 sm:px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                    activeTab === index ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {service.tabName}
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F9D4D] rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 text-center"
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 flex items-center justify-center">
                <Image
                  src={services[activeTab].icon || "/placeholder.svg"}
                  alt={services[activeTab].title}
                  width={96}
                  height={96}
                  priority={activeTab === 0}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h3
              className="text-lg sm:text-xl md:text-2xl text-[#1F9D4D] mb-3"
              style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
            >
              {services[activeTab].title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
              {services[activeTab].description}
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {services[activeTab].features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center justify-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-[#1F9D4D] rounded-full flex items-center justify-center mr-3">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span
                    className="text-gray-700 text-base font-medium text-left"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => handleButtonClick(services[activeTab])}
              disabled={services[activeTab].disabled}
              className={`px-8 py-3 text-base font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group mx-auto ${
                services[activeTab].disabled
                  ? "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed"
                  : "bg-transparent hover:bg-[#1F9D4D] text-[#1F9D4D] hover:text-white border-2 border-[#1F9D4D]"
              }`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {services[activeTab].buttonText}
              {!services[activeTab].disabled && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt={service.title}
                      width={120}
                      height={120}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <h3
                  className="text-lg sm:text-xl md:text-2xl text-[#1F9D4D] mb-3 text-center leading-tight"
                  style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-gray-600 text-center mb-4 leading-relaxed text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 bg-[#1F9D4D] rounded-full flex items-center justify-center mr-3">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span
                        className="text-gray-700 text-sm sm:text-base font-medium"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-auto">
                  <Button
                    onClick={() => handleButtonClick(service)}
                    disabled={service.disabled}
                    className={`w-full px-6 py-3 text-base font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group ${
                      service.disabled
                        ? "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed"
                        : "bg-transparent hover:bg-[#1F9D4D] text-[#1F9D4D] hover:text-white border-2 border-[#1F9D4D]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {service.buttonText}
                    {!service.disabled && (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
