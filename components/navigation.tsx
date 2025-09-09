"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/", label: "Home", external: false },
    { href: "/services/holiday-rental-management", label: "Rent out", external: false },
    { href: "https://www.fresh.holiday/", label: "Book a Stay", external: true },
    { href: "/buy", label: "Buy", external: false },
    { href: "https://franchise.fresh-properties.com/", label: "Franchise", external: true },
  ]

  const goToContact = (e?: React.MouseEvent) => {
    if (pathname === "/") {
      e?.preventDefault()
      setIsOpen(false)
      const el = document.getElementById("contact")
      el?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      // Navigate to home with hash if we're on any other page
      setIsOpen(false)
      router.push("/#contact")
    }
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href="/" className="flex items-center gap-3" aria-label="Fresh Properties - Home">
              <motion.img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FreshPropertyLogo-vUgMOJhAUN9UxvZzIKmM4PP8pPyBQi.svg"
                alt="Fresh Properties Logo"
                className="h-16 w-16 drop-shadow-md flex-shrink-0"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <div className="flex flex-col">
                <span
                  className="text-[#1F9C4D] text-xl font-bold leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  FRESH PROPERTIES
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#1F9C4D] font-medium transition-colors duration-200"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <motion.span whileHover={{ y: -2 }}>{item.label}</motion.span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-[#1F9C4D] font-medium transition-colors duration-200"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <motion.span whileHover={{ y: -2 }}>{item.label}</motion.span>
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Contact CTA (desktop) */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button
                asChild
                className="bg-[#1F9C4D] hover:bg-[#1a8542] text-white px-6 py-2 font-medium transition-colors duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Link href="/#contact" onClick={goToContact} aria-label="Go to contact form">
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#1F9C4D] hover:bg-gray-50 p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-left py-3 text-lg font-medium text-gray-700 hover:text-[#1F9C4D] transition-colors duration-200"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-left py-3 text-lg font-medium text-gray-700 hover:text-[#1F9C4D] transition-colors duration-200"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Contact CTA (mobile) */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <Button
                    asChild
                    className="bg-[#1F9C4D] hover:bg-[#1a8542] text-white px-6 py-2 font-medium transition-colors duration-200 w-full"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Link href="/#contact" onClick={goToContact} aria-label="Go to contact form">
                      Get in Touch
                    </Link>
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

export default Navigation
