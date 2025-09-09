"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const whatsappNumber = "+31623700433" // Netherlands number
  const message = "Hi! I'm interested in your property services. Can you help me?"

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className={`absolute ${isMobile ? "-top-20 right-1/2 translate-x-1/2 max-w-xs text-center px-4" : "bottom-16 right-0"} bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg text-sm border border-green-100`}
          role="status"
        >
          <span className="block break-words">Chat with us on WhatsApp</span>
          <div className={`absolute ${isMobile ? "-bottom-3 left-1/2 -translate-x-1/2" : "-bottom-1 right-4"} w-2 h-2 bg-white border-r border-b border-green-100 transform rotate-45`} />
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openWhatsApp}
        onMouseEnter={() => !isMobile && setShowTooltip(true)}
        onMouseLeave={() => !isMobile && setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
        aria-label="Open WhatsApp chat"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 group"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
      </motion.button>

      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20 pointer-events-none" />
    </div>
  )
}
