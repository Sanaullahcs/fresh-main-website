"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RentalAdviceFormSection } from "@/components/rental-advice-form-section"
import { ServiceFeaturesCarousel } from "@/components/service-features-carousel"
import { ServicesCarouselSection } from "@/components/services-carousel-section"
import { SimplePricingSection } from "@/components/simple-pricing-section"
import { MinimalTestimonialsSection } from "@/components/minimal-testimonials-section"
import { PlatformVisibilitySection } from "@/components/platform-visibility-section"
import { ReadyToStartSection } from "@/components/ready-to-start-section"

import { Button } from "@/components/ui/button"
import { Home, Users, Star, ArrowRight, Trophy } from "lucide-react"
import { motion } from "framer-motion"

export default function RentOutPage() {
  const scrollToForm = () => {
    const element = document.getElementById("rental-advice")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const trustIndicators = [
    {
      icon: <Star className="h-5 w-5 text-white fill-white" />,
      text: "4.9 / 5.0 GOOGLE RATING",
    },
    {
      icon: <Home className="h-5 w-5 text-white" />,
      text: "6 YEARS OF RENTAL EXPERTISE",
    },
    {
      icon: <Users className="h-5 w-5 text-white" />,
      text: "1,000+ HAPPY GUESTS",
    },
    {
      icon: <Trophy className="h-5 w-5 text-white" />,
      text: "PROVEN SUCCESS MODEL",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="flex flex-col" id="home">
        {/* Hero Heading Section with Background Image */}
        <div
          className="relative flex items-center justify-center py-16 sm:py-20"
          style={{
            backgroundImage: `url('/images/macrame-bedroom-hero.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center max-w-6xl mx-auto">
              <motion.div variants={itemVariants}>
                <h1
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight tracking-tight"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "700",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                  }}
                >
                  Full-Service <span className="text-black font-bold">Holiday Rental</span> Management
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="bg-green-50 pb-2 sm:pb-8">
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 sm:py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center max-w-6xl mx-auto">
              <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
                <p
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Interested in what your property could earn?
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div className="flex justify-center items-center px-4 mb-6 sm:mb-8" variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={scrollToForm}
                    className="bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Home className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-sm sm:text-base">GET A FREE PROPERTY EVALUATION</span>
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div className="mb-4 sm:mb-0" variants={itemVariants}>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 max-w-6xl mx-auto px-2 sm:px-4">
                  {trustIndicators.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 xs:gap-3 bg-[#1F9D4D] text-white px-2 xs:px-3 sm:px-4 py-3 xs:py-4 sm:py-4 rounded-lg sm:rounded-xl shadow-lg min-h-[60px] xs:min-h-[70px] sm:min-h-[80px]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      <span className="text-xs xs:text-xs sm:text-sm font-medium leading-tight uppercase flex-1">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rental Advice Form Section */}
      <section id="rental-advice" className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RentalAdviceFormSection />
        </div>
      </section>

      {/* Service Features Carousel Section */}
      <section id="features" className="bg-green-50">
        <ServiceFeaturesCarousel />
      </section>

      {/* HOW IT WORKS section */}
      <section id="how-it-works" className="bg-white">
        <ServicesCarouselSection />
      </section>

      {/* SIMPLE, TRANSPARENT PRICING section */}
      <section id="pricing" className="bg-green-50">
        <SimplePricingSection />
      </section>

      {/* WHAT OUR CLIENTS SAY section */}
      <section id="testimonials" className="bg-white">
        <MinimalTestimonialsSection />
          </section>
          
           <section id="ready-to-start" className="bg-white">
          <ReadyToStartSection />
        </section>

      {/* WE MAKE SURE YOUR PROPERTY IS VISIBLE section */}
      <section id="visibility" className="bg-green-50">
        <PlatformVisibilitySection />
      </section>

      <Footer />
    </div>
  )
}
