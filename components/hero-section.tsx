"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Home, Users, Trophy, Check } from "lucide-react" // ← no ChevronDown
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()
  // Show/hide the scroll hint as the user moves past ~half of the hero
  const [showScrollHint, setShowScrollHint] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const h = heroRef.current?.offsetHeight ?? 0
      setShowScrollHint(window.scrollY < h * 0.5)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const header = 80
    const y = el.getBoundingClientRect().top + window.pageYOffset - header
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  // ⬇️ NEW redirection rules (from your reference snippet)
  const handleButtonClick = (service: Service) => {
    if (service.disabled) return

    if (service.isExternal && service.buttonLink) {
      window.open(service.buttonLink, "_blank", "noopener,noreferrer")
      return
    }

    if (service.title === "Rent out my property") {
      router.push("/services/holiday-rental-management")
      return
    }

    if (service.title === "Buy a property") {
      router.push("/buy")
      return
    }

    // default: scroll to the advice form
    scrollToForm()
  }

  const services: Service[] = [
    {
      icon:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2022%2C%202025%2C%2010_44_13%20PM.jpg-xEoghHJHA24ZXA6kJS07UoKt33ZfIb.jpeg",
      title: "Rent out my property",
      description: "Full-service holiday rental management in Spain.",
      features: ["Full-service management", "Maximized rental income", "Local guest & property care"],
      buttonText: "Learn more",
      tabName: "RENT OUT",
    },
    {
      icon:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%209%2C%202025%2C%2008_48_33%20PM.jpg-BSCQBlGOCCeYTe0iR5n1kfn4uJzs4e.jpeg",
      title: "Book a holiday",
      description: "Enjoy curated holiday stays with local service.",
      features: ["Stylish, well-equipped homes", "Professionally cleaned", "Personal local support"],
      buttonText: "Explore stays",
      buttonLink: "https://www.fresh.holiday/",
      tabName: "BOOK STAY",
      isExternal: true,
    },
    {
      icon:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2016%2C%202025%2C%2010_24_44%20PM.jpg-vv7gyUm0sBpfp7IpStucdyJkhj7hbb.jpeg",
      title: "Buy a property",
      description: "Find your ideal home or investment property in Spain.",
      features: ["Local expertise", "Step-by-step guidance", "Legal peace of mind"],
      buttonText: "Start Buying",
      tabName: "BUY PROPERTY",
      disabled: false,
    },
  ]

  const trustIndicators = [
    { icon: <Star className="h-5 w-5 text-white fill-white" />, text: "4.9 / 5.0 GOOGLE RATING" },
    { icon: <Home className="h-5 w-5 text-white" />, text: "6 YEARS OF RENTAL EXPERTISE" },
    { icon: <Users className="h-5 w-5 text-white" />, text: "1,000+ HAPPY GUESTS" },
    { icon: <Trophy className="h-5 w-5 text-white" />, text: "PROVEN SUCCESS MODEL" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  // Minimal, premium single-arrow indicator (black)
  const ScrollIndicator = () => (
    <motion.div
      onClick={() => scrollToSection("rental-advice")}
      className="absolute left-1/2 -translate-x-1/2 bottom-6 cursor-pointer flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      aria-label="Scroll"
    >
      {/* thin vertical line */}
      <motion.div
        className="w-[2px] h-6 bg-black"
        animate={{ scaleY: [1, 0.6, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* tiny arrowhead */}
      <motion.div
        className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-black mt-1"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )

  return (
    <section className="flex flex-col" id="home">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative flex items-center justify-center py-2 sm:py-8 md:py-12 lg:py-16 min-h-[20vh] sm:min-h-[35vh] md:min-h-[40vh]"
        style={{
          backgroundImage: `url('/images/macrame-bedroom-hero.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          className="max-w-2xl sm:max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-8 md:pt-12 lg:pt-16 mt-8 sm:mt-12 md:mt-16 lg:mt-20 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center max-w-2xl mx-auto">
            <motion.div variants={itemVariants}>
              <h1
                className="text-lg xs:text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white leading-tight tracking-tight px-2 sm:px-0 sm:my-[31px] my-[55px]"
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

        {/* Minimal black scroll indicator */}
        {showScrollHint && <ScrollIndicator />}
      </div>

      {/* —— Your original content below remains unchanged —— */}
      <div className="bg-white pb-1 sm:pb-4">
        <motion.div
          className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-0 sm:pt-2 pb-1 sm:py-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center max-w-6xl mx-auto">
            <motion.div className="mb-1 sm:mb-4 md:mb-6" variants={itemVariants}>
              <div className="pt-1 pb-1 sm:py-4 bg-green-50 sm:bg-gradient-to-b sm:from-green-50/30 sm:to-green-100/20 md:bg-gradient-to-b md:from-green-50/30 md:to-green-100/20 md:bg-transparent rounded-none sm:rounded-2xl min-h-[50vh] sm:min-h-screen md:min-h-0 flex flex-col justify-center md:block">
                <div className="container mx-auto px-1 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-2 sm:mb-6 md:mb-8 mt-0"
                  >
                    <h2
                      className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#1F9D4D] mb-1 sm:mb-3 px-2 sm:px-0"
                      style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
                    >
                      WHAT WOULD YOU LIKE TO DO?
                    </h2>
                    <p
                      className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:block hidden px-4"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Select the service that best fits your needs
                    </p>
                    <p
                      className="text-xs xs:text-sm text-gray-600 max-w-2xl mx-auto md:hidden block px-4"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Choose your goal to get started
                    </p>
                  </motion.div>

                  <div className="md:hidden">
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-2">
                      <div className="flex bg-white rounded-none sm:rounded-2xl p-1 shadow-sm border-0 sm:border border-gray-200 w-full">
                        {services.map((service, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`flex-1 px-1 xs:px-2 py-2 xs:py-3 text-xs xs:text-sm font-semibold rounded-none sm:rounded-xl transition-all duration-300 relative ${
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
                      className="bg-white rounded-none sm:rounded-3xl p-3 sm:p-6 md:p-8 shadow-lg border-0 sm:border border-gray-100 text-center -mx-1 sm:mx-2"
                    >
                      {/* Icon */}
                      <div className="flex justify-center mb-2 sm:mb-4">
                        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                          <Image
                            src={services[activeTab].icon || "/placeholder.svg"}
                            alt={services[activeTab].title}
                            width={64}
                            height={64}
                            priority={activeTab === 0}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      <h3
                        className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#1F9D4D] mb-1 sm:mb-3 px-2"
                        style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
                      >
                        {services[activeTab].title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-gray-600 mb-2 sm:mb-4 leading-relaxed text-xs xs:text-sm px-2"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {services[activeTab].description}
                      </p>

                      {/* Features */}
                      <div className="space-y-1 mb-3 sm:mb-6 px-2">
                        {services[activeTab].features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center justify-start">
                            <div className="flex-shrink-0 w-3 h-3 xs:w-4 xs:h-4 bg-[#1F9D4D] rounded-full flex items-center justify-center mr-2">
                              <Check className="w-1.5 h-1.5 xs:w-2 xs:h-2 text-white" />
                            </div>
                            <span
                              className="text-gray-700 text-xs xs:text-sm font-medium text-left"
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
                        className={`px-4 xs:px-6 py-2 xs:py-3 text-xs xs:text-sm font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group mx-auto ${
                          services[activeTab].disabled
                            ? "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed"
                            : "bg-transparent hover:bg-[#1F9D4D] text-[#1F9D4D] hover:text-white border-2 border-[#1F9D4D]"
                        }`}
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {services[activeTab].buttonText}
                        {!services[activeTab].disabled && (
                          <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        )}
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4"
                  >
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1 flex flex-col h-full"
                      >
                        <div className="flex flex-col h-full">
                          {/* Icon */}
                          <div className="flex justify-center mb-3">
                            <div className="w-20 h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                              <Image
                                src={service.icon || "/placeholder.svg"}
                                alt={service.title}
                                width={80}
                                height={80}
                                loading="lazy"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>

                          <h3
                            className="text-lg sm:text-xl text-[#1F9D4D] mb-2 text-center leading-tight"
                            style={{ fontFamily: "Unica One, cursive", fontWeight: "normal" }}
                          >
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="text-gray-600 text-center mb-3 leading-relaxed text-sm"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {service.description}
                          </p>

                          {/* Features */}
                          <div className="space-y-1.5 mb-4 flex-grow">
                            {service.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center">
                                <div className="flex-shrink-0 w-4 h-4 bg-[#1F9D4D] rounded-full flex items-center justify-center mr-2">
                                  <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span
                                  className="text-gray-700 text-sm font-medium"
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
                              className={`w-full px-4 py-2.5 text-sm font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group ${
                                service.disabled
                                  ? "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed"
                                  : "bg-transparent hover:bg-[#1F9D4D] text-[#1F9D4D] hover:text-white border-2 border-[#1F9D4D]"
                              }`}
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {service.buttonText}
                              {!service.disabled && (
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div className="mt-4 sm:mt-6 md:mt-8" variants={itemVariants}>
                    <p
                      className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-3 sm:mb-4 md:mb-6"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: "400" }}
                    >
                      Interested in what your property could earn?
                    </p>

                    <div className="flex justify-center items-center px-2 sm:px-4">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Button
                          onClick={() => scrollToSection("rental-advice")}
                          className="bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 text-sm xs:text-base sm:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          <Home className="mr-1 xs:mr-2 sm:mr-3 h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                          <span className="text-xs xs:text-sm sm:text-base">GET A FREE PROPERTY EVALUATION</span>
                          <ArrowRight className="ml-1 xs:ml-2 sm:ml-3 h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div className="mb-1 sm:mb-0" variants={itemVariants}>
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
  )
}
