"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

type NavItem = { href: string; label: string; external: boolean }

const EXIT_MS = 220 // matches the 0.18s exit + a little buffer

export default function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isContactHref = (href: string) =>
    href === "/#contact" || href === "#contact" || href.endsWith("#contact")

  const closeThen = (fn: () => void) => {
    setIsOpen(false)
    setTimeout(fn, EXIT_MS) // wait for the exit animation so unmount doesn't kill the click
  }

  const goToContact = (e?: React.MouseEvent) => {
    e?.preventDefault()
    closeThen(() => {
      if (pathname === "/") {
        // Smooth-scroll on the homepage
        const el = document.getElementById("/#contact")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
        // Keep the hash for deep-linking/back
        if (location.hash !== "#contact") history.replaceState(null, "", "/#contact")
      } else {
        // Navigate to home#contact without the default scroll reset
        router.push("/#contact", { scroll: false })
      }
    })
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        className="text-gray-700 hover:text-[#1F9C4D] hover:bg-gray-50 p-2"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-panel"
            className="fixed left-0 right-0 top-20 z-40 bg-white border-t border-gray-100 shadow-lg"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="px-4 py-6 space-y-3 w-full">
              {navItems.map((item) => {
                const contactLink = isContactHref(item.href)

                return (
                  <div key={item.label + item.href} className="border-b last:border-b-0 border-gray-100">
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => closeThen(() => {})}
                        className="block w-full text-left py-4 text-lg font-medium text-gray-700 hover:text-[#1F9C4D] transition-colors duration-200 px-3"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {item.label}
                      </a>
                    ) : contactLink ? (
                      <a
                        href="/#contact"
                        onClick={goToContact}
                        className="block w-full text-left py-4 text-lg font-medium text-gray-700 hover:text-[#1F9C4D] transition-colors duration-200 px-3"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          closeThen(() => router.push(item.href))
                        }}
                        className="block w-full text-left py-4 text-lg font-medium text-gray-700 hover:text-[#1F9C4D] transition-colors duration-200 px-3"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                )
              })}

              {/* CTA */}
              <div className="pt-3 px-3">
                <a
                  href="/#contact"
                  onClick={goToContact}
                  className="block w-full text-center bg-[#1F9C4D] text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  aria-label="Go to contact form"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
