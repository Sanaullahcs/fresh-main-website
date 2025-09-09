"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

const teamSlides = [
  {
    id: 1,
    names: "Mike & Maayke",
    image: "/images/mike-maayke.jpg",
    description:
      "We've been managing holiday homes in the beautiful hills and coastal towns of the Axarquía for years. As property owners ourselves and founders of Fresh Properties, we combine deep local knowledge with hands-on experience to help homeowners and guests alike. We love creating seamless stays for guests and helping owners get the most out of their property, with personal care every step of the way.",
    buttonText: "Speak to Mike & Maayke",
    buttonAction: "contact",
  },
  {
    id: 2,
    names: "Lissy & Mario",
    image: "/images/lissy-mario-mountains.jpg",
    description:
      "Based in the stunning Costa Tropical region, we manage holiday homes both by the sea and in the lush countryside around Almuñécar. We're passionate about welcoming guests to this hidden gem on the Spanish coast and supporting homeowners with everything from bookings to maintenance. We're always nearby and happy to help.",
    buttonText: "Speak to Lissy & Mario",
    buttonAction: "contact",
  },
  {
    id: 3,
    names: "Work with Us",
    image: "/images/handshake-icon.png",
    description:
      "Love where you live? Want to build your own local property business with full support? As a Fresh Properties partner, you'll manage homes in your area while using our tools, training and booking platform. Join a growing team of local experts across Spain.",
    buttonText: "Explore the Opportunity",
    buttonAction: "franchise",
  },
]

export function TeamCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamSlides.length) % teamSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleButtonClick = (action: string) => {
    if (action === "franchise") {
      window.open("https://franchise.fresh-properties.com/", "_blank")
    } else {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section className="py-0 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 pt-12 sm:pt-16"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1F9D4D] mb-4 sm:mb-6 leading-tight"
            style={{
              fontFamily: "Unica One, cursive",
              fontWeight: "normal",
            }}
          >
            MEET OUR LOCAL EXPERTS
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
Fresh Properties’ team of experts, delivering excellence nationwide          </p>
        </motion.div>

        <div className="relative pb-12 sm:pb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 items-center"
              >
                <div className="relative flex justify-center">
                  <div
                    className={`relative rounded-xl overflow-hidden ${
                      teamSlides[currentSlide].id === 3
                        ? "w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
                        : "aspect-[4/3] w-full max-w-md lg:max-w-none"
                    }`}
                  >
                    <Image
                      src={teamSlides[currentSlide].image || "/placeholder.svg"}
                      alt={teamSlides[currentSlide].names}
                      fill
                      className={teamSlides[currentSlide].id === 3 ? "object-contain" : "object-cover"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center text-center lg:text-left">
                  <div className="mb-6">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                      <button
                        onClick={prevSlide}
                        className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200 text-[#1F9D4D] border border-green-200 hover:border-[#1F9D4D]"
                        aria-label="Previous team member"
                      >
                        <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                      </button>

                      <h3
                        className="text-lg sm:text-xl lg:text-2xl text-[#1F9D4D] leading-tight flex-1 text-center lg:text-left"
                        style={{
                          fontFamily: "Unica One, cursive",
                          fontWeight: "normal",
                        }}
                      >
                        {teamSlides[currentSlide].names}
                      </h3>

                      <button
                        onClick={nextSlide}
                        className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200 text-[#1F9D4D] border border-green-200 hover:border-[#1F9D4D]"
                        aria-label="Next team member"
                      >
                        <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
                      </button>
                    </div>
                    <p
                      className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {teamSlides[currentSlide].description}
                    </p>
                    <div className="flex justify-center lg:justify-start">
                      <Button
                        onClick={() => handleButtonClick(teamSlides[currentSlide].buttonAction)}
                        className="bg-transparent hover:bg-[#1F9D4D] text-[#1F9D4D] hover:text-white border-2 border-[#1F9D4D] px-6 py-3 text-base font-semibold transition-all duration-300"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {teamSlides[currentSlide].buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center pb-8 space-x-2">
          {teamSlides.map((_, index) => (
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
    </section>
  )
}
