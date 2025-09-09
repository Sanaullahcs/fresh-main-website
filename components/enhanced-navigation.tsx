"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ["home", "why-fresh", "opportunity", "success-plan", "testimonials", "partners", "faq"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const navItems = [
    { label: "HOME", id: "home" },
    { label: "WHY FRESH", id: "why-fresh" },
    { label: "OPPORTUNITY", id: "opportunity" },
    { label: "SUCCESS PLAN", id: "success-plan" },
    { label: "TESTIMONIALS", id: "testimonials" },
    { label: "PARTNERS", id: "partners" },
    { label: "FAQ", id: "faq" },
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-1 border-b border-[#1F9D4D]/10" : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with subtle animation */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FreshPropertyLogo-vUgMOJhAUN9UxvZzIKmM4PP8pPyBQi.svg"
              alt="Fresh Properties"
              className="h-9 w-auto"
              onClick={() => scrollToSection("home")}
              style={{ cursor: "pointer" }}
            />
          </motion.div>

          {/* Desktop Navigation with aesthetic hover effects */}
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-base transition-colors ${
                  scrolled ? "text-gray-700 hover:text-[#1F9D4D]" : "text-white/90 hover:text-white"
                }`}
                style={{ fontFamily: "Unica One, cursive" }}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#1F9D4D] transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0"
                  }`}
                  style={{
                    transformOrigin: "left",
                  }}
                ></span>
              </motion.button>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection("apply")}
                className="bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white text-xs px-5 py-1 h-auto relative overflow-hidden group"
                style={{ fontFamily: "Unica One, cursive" }}
              >
                <span className="relative z-10">START APPLICATION</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button with animation */}
          <motion.div className="lg:hidden" whileTap={{ scale: 0.9 }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-4 rounded-md ${scrolled ? "text-[#1F9D4D]" : "text-white"}`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-7 w-7" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-7 w-7" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation with enhanced aesthetics */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg overflow-hidden mt-1 border-t border-[#1F9D4D]/10"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex justify-between items-center w-full text-left px-5 py-5 text-base ${
                      activeSection === item.id
                        ? "bg-[#1F9D4D]/5 text-[#1F9D4D] font-medium"
                        : "text-gray-700 hover:bg-[#1F9D4D]/5"
                    }`}
                    style={{ fontFamily: "Unica One, cursive" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </motion.button>
                ))}
                <motion.div
                  className="pt-2 px-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <Button
                    onClick={() => scrollToSection("apply")}
                    className="w-full bg-[#1F9D4D] hover:bg-[#1F9D4D]/90 text-white text-xs py-3"
                    style={{ fontFamily: "Unica One, cursive" }}
                  >
                    START APPLICATION
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
