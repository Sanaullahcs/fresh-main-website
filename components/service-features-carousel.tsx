"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

const features = [
  {
    id: 1,
    title: "Local Expertise",
    description:
      "Your property is managed by a local expert who knows the area, speaks the language, and is available when needed.",
    iconSrc: "/images/location-pin-icon.png",
  },
  {
    id: 2,
    title: "Maximum Visibility",
    description:
      "We create a professional listing and advertise it on all major platforms including Airbnb, Booking.com, and Vrbo to get the best possible exposure.",
    iconSrc: "/images/income-growth-icon.png",
  },
  {
    id: 3,
    title: "Everything Handled",
    description: "From guest messages and pricing to cleaning and repairs, we manage every step so you don't have to.",
    iconSrc: "/images/stress-free-icon.png",
  },
  {
    id: 4,
    title: "Hotel-Quality Cleaning",
    description:
      "We use trusted cleaners, hotel-grade laundry service, and clear checklists to ensure your property is spotless between every stay.",
    iconSrc: "/images/proven-system-icon.png",
  },
  {
    id: 5,
    title: "Owner Portal",
    description:
      "Track bookings, revenue, and cleaning updates in your personal dashboard with full access from anywhere.",
    iconSrc: "/images/laptop-icon.png",
  },
  {
    id: 6,
    title: "Guest Support",
    description:
      "We're available before and during each stay to handle questions and solve issues, ensuring great reviews and repeat bookings.",
    iconSrc: "/images/customer-support-icon.png",
  },
]

export function ServiceFeaturesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // useEffect(() => {
  //   if (!isAutoPlaying) return
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % features.length)
  //   }, 4000)
  //   return () => clearInterval(interval)
  // }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#1F9D4D]"></div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-[#1F9D4D] rounded-full"></div>
              <div className="w-3 h-3 bg-[#1F9D4D] rounded-full"></div>
              <div className="w-2 h-2 bg-[#1F9D4D] rounded-full"></div>
            </div>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#1F9D4D]"></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F9D4D] mb-4 leading-tight"
            style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
          >
            EVERYTHING YOU NEED TO SUCCEED
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join a model designed for simplicity, scale, and long-term success.
          </p>
        </motion.div>

        <div className="relative">
          <div className="relative overflow-hidden bg-white border-2 border-green-200 rounded-2xl p-4 sm:p-8 lg:p-12">
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[#1F9D4D] hover:bg-green-50 transition-none transform-none hover:transform-none active:transform-none focus:transform-none hover:scale-100 active:scale-100 z-10 border border-green-200"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[#1F9D4D] hover:bg-green-50 transition-none transform-none hover:transform-none active:transform-none focus:transform-none hover:scale-100 active:scale-100 z-10 border border-green-200"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 lg:gap-16 max-w-5xl mx-auto w-full">
                    <div className="flex-shrink-0 flex items-center justify-center p-6 relative">
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#1F9D4D] rounded-full items-center justify-center z-10 hidden sm:flex">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <Image
                        src={features[currentIndex].iconSrc || "/placeholder.svg"}
                        alt={features[currentIndex].title}
                        width={180}
                        height={180}
                        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain drop-shadow-lg"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left px-2 sm:px-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight">
                        {features[currentIndex].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl max-w-none sm:max-w-lg lg:max-w-none">
                        {features[currentIndex].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#1F9D4D] w-8" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
