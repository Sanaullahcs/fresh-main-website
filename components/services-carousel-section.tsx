"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function ServicesCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const services = [
    {
      id: 1,
      number: "1",
      timeframe: "Step 1",
      title: "MEET YOUR LOCAL EXPERT",
      description:
        "We visit your property in person to get to know you, walk through the home, and explain how our service works.",
      icon: "/images/handshake-icon.png",
      features: ["Personal property visit", "Service explanation", "Local expertise introduction"],
    },
    {
      id: 2,
      number: "2",
      timeframe: "Step 2",
      title: "SETUP & LISTING",
      description:
        "We handle everything: photography, licenses, description, pricing strategy, and publishing your listing across major booking platforms.",
      icon: "/images/proven-system-icon.png",
      features: ["Professional photography", "License handling", "Multi-platform publishing"],
    },
    {
      id: 3,
      number: "3",
      timeframe: "Step 3",
      title: "YOUR HOME IN TRUSTED HANDS",
      description:
        "We manage bookings, guest support, and cleaning. You track everything in your personal owner portal and receive payouts automatically after each booking.",
      icon: "/images/income-growth-icon.png",
      features: ["Complete booking management", "Personal owner portal", "Automatic payouts"],
    },
  ]

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  const currentService = services[currentSlide]

  return (
    <section className="py-0 bg-green-50 border-t border-b border-green-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 pt-12 sm:pt-16">
          <div className="mb-3 sm:mb-4">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1F9D4D] leading-tight"
              style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
            >
              HOW IT WORKS
            </h2>
          </div>
          <p
            className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Start renting your property in just a few simple steps.
          </p>
        </div>

        <div className="relative pb-12 sm:pb-16">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-green-200 relative">
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1F9D4D] rounded-lg flex items-center justify-center shadow-md">
                <span
                  className="text-sm sm:text-base text-white font-normal"
                  style={{ fontFamily: "Unica One, cursive" }}
                >
                  {currentService.number}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8">
              <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-1/3 lg:w-2/5 py-2 sm:py-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 relative">
                  <Image
                    src={currentService.icon || "/placeholder.svg"}
                    alt={currentService.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left sm:w-2/3 lg:w-3/5">
                <div className="mb-3">
                  <div className="inline-flex items-center px-3 py-1.5 bg-green-50 text-[#1F9D4D] rounded-full text-sm font-medium border border-green-200">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {currentService.timeframe}
                  </div>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  <button
                    onClick={prevSlide}
                    className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200 text-[#1F9D4D] border border-green-200 hover:border-[#1F9D4D]"
                    aria-label="Previous step"
                  >
                    <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>

                  <h3
                    className="text-lg sm:text-xl lg:text-2xl text-[#1F9D4D] leading-tight flex-1 text-center sm:text-left"
                    style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
                  >
                    {currentService.title}
                  </h3>

                  <button
                    onClick={nextSlide}
                    className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200 text-[#1F9D4D] border border-green-200 hover:border-[#1F9D4D]"
                    aria-label="Next step"
                  >
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>
                </div>

                <p
                  className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {currentService.description}
                </p>

                <div className="space-y-2">
                  {currentService.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-left">
                      <div className="w-4 h-4 bg-[#1F9D4D] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span
                        className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-green-200">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span style={{ fontFamily: "Poppins, sans-serif" }}>
                  Step {currentSlide + 1} of {services.length}
                </span>
                <span style={{ fontFamily: "Poppins, sans-serif" }}>
                  {Math.round(((currentSlide + 1) / services.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#1F9D4D] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentSlide + 1) / services.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[#1F9D4D] w-8" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
